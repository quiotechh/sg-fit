import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyWebhookSignature, verifyTransaction } from "@/lib/paystack"
import { calculateDiscount } from "@/lib/coupons"
import { logEvent } from "@/lib/auditLog"
import { transporter } from "@/lib/mailer"

const COMMUNITY_PLAN_CODE = process.env.PAYSTACK_COMMUNITY_PLAN_CODE!

// Paystack's monthly plan has no fixed "period end" on a charge payload itself —
// we derive it ourselves (paid date + 1 month) as a same-day best estimate, then
// the subscription.create event (which does carry Paystack's own next_payment_date)
// corrects it precisely once it arrives, usually seconds later.
function addOneMonth(date: Date) {
  const next = new Date(date)
  next.setMonth(next.getMonth() + 1)
  return next
}

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

  switch (event.event) {
    case "charge.success":
      return handleChargeSuccess(reference)
    case "subscription.create":
      return handleSubscriptionCreate(event.data)
    case "subscription.not_renew":
      return handleSubscriptionNotRenew(event.data)
    case "subscription.disable":
      return handleSubscriptionDisable(event.data)
    case "invoice.payment_failed":
      return handleInvoicePaymentFailed(event.data)
    default:
      return new NextResponse("OK")
  }
}

async function handleChargeSuccess(reference: string | undefined) {
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

  // A subscription charge (first payment or a monthly renewal) carries a `plan`
  // code. One-time program purchases never do — that's how we tell them apart.
  if (verified.data.plan) {
    await handleSubscriptionCharge(verified.data, reference!)
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

// Fires for BOTH the first subscription payment and every monthly renewal —
// Paystack reuses the same charge.success event for both.
async function handleSubscriptionCharge(
  data: { plan?: string | null; customer: { email: string; customer_code?: string }; paid_at?: string },
  reference: string,
) {
  const planCode = data.plan
  if (planCode !== COMMUNITY_PLAN_CODE) return // some other plan we don't manage here — ignore safely

  const userEmail = data.customer.email
  const user = await prisma.user.findUnique({ where: { email: userEmail } })
  if (!user) {
    console.error("Subscription charge: no matching user for", userEmail)
    await logEvent({
      userEmail,
      event: "subscription.user_not_found",
      success: false,
      reference,
      metadata: {
        message: `Paystack confirmed a successful Community subscription charge for ${userEmail}, but no matching user account exists in our database — needs manual investigation, this customer paid but can't be linked to an account.`,
      },
    })
    return
  }

  const paidAt = data.paid_at ? new Date(data.paid_at) : new Date()
  const currentPeriodEnd = addOneMonth(paidAt)

  const existing = await prisma.subscription.findUnique({
    where: { userId_planCode: { userId: user.id, planCode } },
  })

  await prisma.subscription.upsert({
    where: { userId_planCode: { userId: user.id, planCode } },
    update: {
      status: "active",
      currentPeriodEnd,
      customerCode: data.customer.customer_code ?? undefined,
    },
    create: {
      userId: user.id,
      planCode,
      status: "active",
      currentPeriodEnd,
      customerCode: data.customer.customer_code ?? undefined,
    },
  })

  await logEvent({
    userId: user.id,
    userEmail,
    event: existing ? "subscription.renewed" : "subscription.activated",
    success: true,
    reference,
    metadata: {
      message: existing
        ? `${userEmail}'s monthly Community subscription renewed successfully. Access extended to ${currentPeriodEnd.toDateString()}.`
        : `${userEmail} paid for their first Community subscription charge. Access granted until ${currentPeriodEnd.toDateString()} (an estimate — the subscription.create event will correct this to Paystack's exact date shortly).`,
      currentPeriodEnd,
    },
  })
}

// Fires once, shortly after the first subscription charge — carries Paystack's
// own exact next_payment_date plus the subscription_code we need for cancellation.
async function handleSubscriptionCreate(data: {
  plan?: { plan_code?: string } | string
  subscription_code?: string
  email_token?: string
  next_payment_date?: string
  customer?: { email?: string; customer_code?: string }
}) {
  const planCode = typeof data.plan === "string" ? data.plan : data.plan?.plan_code
  if (planCode !== COMMUNITY_PLAN_CODE) return new NextResponse("OK")

  const userEmail = data.customer?.email
  const user = userEmail ? await prisma.user.findUnique({ where: { email: userEmail } }) : null
  if (!user) {
    console.error("subscription.create: no matching user for", userEmail)
    await logEvent({
      userEmail,
      event: "subscription.user_not_found",
      success: false,
      metadata: {
        message: `subscription.create webhook received for ${userEmail ?? "(unknown email)"}, but no matching user account exists.`,
        raw: data,
      },
    })
    return new NextResponse("OK")
  }

  await prisma.subscription.upsert({
    where: { userId_planCode: { userId: user.id, planCode } },
    update: {
      subscriptionCode: data.subscription_code,
      emailToken: data.email_token,
      customerCode: data.customer?.customer_code ?? undefined,
      currentPeriodEnd: data.next_payment_date ? new Date(data.next_payment_date) : undefined,
      status: "active",
    },
    create: {
      userId: user.id,
      planCode,
      subscriptionCode: data.subscription_code,
      emailToken: data.email_token,
      customerCode: data.customer?.customer_code ?? undefined,
      currentPeriodEnd: data.next_payment_date ? new Date(data.next_payment_date) : null,
      status: "active",
    },
  })

  await logEvent({
    userId: user.id,
    userEmail,
    event: "subscription.created",
    success: true,
    metadata: {
      message: `Paystack confirmed the Community subscription record for ${userEmail}. Subscription code saved so they can cancel later.`,
      subscriptionCode: data.subscription_code,
    },
  })

  return new NextResponse("OK")
}

// User (or we) turned off auto-renew. They keep access until currentPeriodEnd,
// then it lapses on its own — we don't revoke anything here.
async function handleSubscriptionNotRenew(data: { subscription_code?: string }) {
  const sub = data.subscription_code
    ? await prisma.subscription.findUnique({ where: { subscriptionCode: data.subscription_code } })
    : null

  if (!sub) {
    await logEvent({
      event: "subscription.correlation_failed",
      success: false,
      metadata: { message: "subscription.not_renew webhook received but couldn't find a matching Subscription row.", raw: data },
    })
    return new NextResponse("OK")
  }

  await prisma.subscription.update({ where: { id: sub.id }, data: { status: "non-renewing" } })
  await logEvent({
    userId: sub.userId,
    event: "subscription.set_to_not_renew",
    success: true,
    metadata: {
      message: `This user cancelled auto-renew on their Community subscription. They keep access until ${sub.currentPeriodEnd?.toDateString() ?? "the current period ends"}, then it stops automatically.`,
    },
  })
  return new NextResponse("OK")
}

// Subscription fully terminated on Paystack's side. Access still lapses via
// currentPeriodEnd, not immediately — this event is for record-keeping.
async function handleSubscriptionDisable(data: { subscription_code?: string }) {
  const sub = data.subscription_code
    ? await prisma.subscription.findUnique({ where: { subscriptionCode: data.subscription_code } })
    : null

  if (!sub) {
    await logEvent({
      event: "subscription.correlation_failed",
      success: false,
      metadata: { message: "subscription.disable webhook received but couldn't find a matching Subscription row.", raw: data },
    })
    return new NextResponse("OK")
  }

  await prisma.subscription.update({ where: { id: sub.id }, data: { status: "disabled" } })
  await logEvent({
    userId: sub.userId,
    event: "subscription.disabled",
    success: true,
    metadata: {
      message: `This user's Community subscription was fully disabled by Paystack. Their access ends ${sub.currentPeriodEnd?.toDateString() ?? "at the end of the paid period"} (or has already ended).`,
    },
  })
  return new NextResponse("OK")
}

// A renewal charge failed. Paystack does NOT retry automatically — we log this
// clearly for visibility, but access still only lapses via currentPeriodEnd.
async function handleInvoicePaymentFailed(data: { subscription_code?: string; subscription?: { subscription_code?: string } }) {
  const subscriptionCode = data.subscription_code ?? data.subscription?.subscription_code
  const sub = subscriptionCode
    ? await prisma.subscription.findUnique({ where: { subscriptionCode } })
    : null

  if (!sub) {
    await logEvent({
      event: "subscription.correlation_failed",
      success: false,
      metadata: { message: "invoice.payment_failed webhook received but couldn't find a matching Subscription row.", raw: data },
    })
    return new NextResponse("OK")
  }

  await prisma.subscription.update({ where: { id: sub.id }, data: { status: "attention" } })
  await logEvent({
    userId: sub.userId,
    event: "subscription.payment_failed",
    success: false,
    metadata: {
      message: `A renewal charge FAILED for this user's Community subscription. Paystack will NOT retry automatically — their access lapses on ${sub.currentPeriodEnd?.toDateString() ?? "the current period end"} unless they update their payment method and resubscribe.`,
    },
  })
  return new NextResponse("OK")
}
