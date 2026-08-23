import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyWebhookSignature, verifyTransaction } from "@/lib/paystack"
import { calculateDiscount } from "@/lib/coupons"
import { logEvent } from "@/lib/auditLog"
import { transporter } from "@/lib/mailer"

export async function POST(request: Request) {
  const rawBody = await request.text()
  const signature = request.headers.get("x-paystack-signature")

  let reference: string | undefined
  try {
    reference = JSON.parse(rawBody)?.data?.reference
  } catch {
    // ignore — reference stays undefined if body isn't valid JSON
  }

  await logEvent({
    event: "webhook.received",
    success: true,
    reference,
  })

  if (!verifyWebhookSignature(rawBody, signature)) {
    console.error("Paystack webhook: signature mismatch")
    await logEvent({
      event: "webhook.signature_invalid",
      success: false,
      reference,
    })
    return new NextResponse("invalid", { status: 400 })
  }

  const event = JSON.parse(rawBody)

  if (event.event !== "charge.success") {
    return new NextResponse("OK")
  }

  // Defense-in-depth — webhook payload par pura bharosa nahi, Paystack se dobara verify karo
  const verified = await verifyTransaction(reference!)
  if (verified.data.status !== "success") {
    console.error("Paystack webhook: not verified as success", reference)
    await logEvent({
      event: "webhook.verify_failed",
      success: false,
      reference,
      metadata: { status: verified.data.status },
    })
    return new NextResponse("OK")
  }

  const metadata = verified.data.metadata as { userId?: string; programIds?: string[]; couponCode?: string | null }
  const userId = metadata?.userId
  const programIds = metadata?.programIds ?? []
  const couponCode = metadata?.couponCode ?? null
  const userEmail = verified.data.customer.email

  if (!userId || programIds.length === 0) {
    console.error("Paystack webhook: missing metadata", reference)
    await logEvent({
      userEmail,
      event: "webhook.missing_metadata",
      success: false,
      reference,
    })
    return new NextResponse("OK")
  }

  const programs = await prisma.program.findMany({ where: { id: { in: programIds } } })
  const subtotal = programs.reduce((sum, p) => sum + p.price, 0)
  const discount = calculateDiscount(subtotal, couponCode)
  const expectedTotal = Math.max(0, subtotal - discount)

  const amountPaidRands = verified.data.amount / 100
  if (Math.abs(expectedTotal - amountPaidRands) > 0.5) {
    console.error("Paystack webhook: amount mismatch", { expectedTotal, amountPaidRands })
    await logEvent({
      userId,
      userEmail,
      event: "webhook.amount_mismatch",
      success: false,
      reference,
      metadata: { expectedTotal, amountPaidRands },
    })
    return new NextResponse("OK")
  }

  await Promise.all(
    programs.map((program) => {
      const share = subtotal > 0 ? (program.price / subtotal) * amountPaidRands : 0
      return prisma.purchase.upsert({
        where: { userId_programId: { userId, programId: program.id } },
        update: {},
        create: {
          userId,
          programId: program.id,
          amountPaid: parseFloat(share.toFixed(2)),
          couponCode: couponCode ?? undefined,
          paymentId: reference,
        },
      })
    })
  )

  await prisma.cartItem.deleteMany({
    where: { userId, programId: { in: programIds } },
  })

  await logEvent({
    userId,
    userEmail,
    event: "purchase.created",
    success: true,
    reference,
    metadata: {
      programTitles: programs.map((p) => p.title),
      amountPaid: amountPaidRands,
      couponCode,
    },
  })

  // Digital-download items (nutrition PDFs etc.) don't unlock in-app — they're
  // delivered by email, linking to our own protected page, never a raw file URL.
  const digitalPrograms = programs.filter((p) => p.fileKey)
  if (digitalPrograms.length > 0) {
    await sendDigitalDeliveryEmail({ userId, userEmail, reference: reference!, programs: digitalPrograms })
  }

  return new NextResponse("OK")
}

async function sendDigitalDeliveryEmail({
  userId,
  userEmail,
  reference,
  programs,
}: {
  userId: string
  userEmail: string
  reference: string
  programs: { title: string }[]
}) {
  const siteUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000"
  const trackedLink = `${siteUrl}/api/email-click?dest=${encodeURIComponent("/my-programs/nutrition")}&ref=${reference}`
  const titleList = programs.map((p) => `- ${p.title}`).join("\n")

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: userEmail,
      subject: programs.length === 1 ? `Your ${programs[0].title} is ready — SG Fit` : "Your Nutrition Guides are ready — SG Fit",
      text: `Thanks for your purchase! Your PDF guide is ready:\n\n${titleList}\n\nDownload it here: ${trackedLink}\n\nDon't see this email in your inbox? Check your Spam/Junk folder.\n\nYou can also come back anytime and download it again from My Programs → Nutrition Guides on the site.\n\n— SG Fit`,
    })

    await logEvent({
      userId,
      userEmail,
      event: "email.pdf_sent",
      success: true,
      reference,
      metadata: {
        message: `PDF delivery email sent successfully to ${userEmail} for: ${programs.map((p) => p.title).join(", ")}.`,
        to: userEmail,
        programTitles: programs.map((p) => p.title),
      },
    })
  } catch (err) {
    console.error("Failed to send PDF delivery email:", err)
    await logEvent({
      userId,
      userEmail,
      event: "email.pdf_send_failed",
      success: false,
      reference,
      metadata: {
        message: `Failed to send PDF delivery email to ${userEmail} for: ${programs.map((p) => p.title).join(", ")}. This customer purchased successfully but has NOT received their download email — needs manual follow-up.`,
        to: userEmail,
        programTitles: programs.map((p) => p.title),
        error: String(err),
      },
    })
  }
}
