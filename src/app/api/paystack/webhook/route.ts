import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyWebhookSignature, verifyTransaction } from "@/lib/paystack"
import { calculateDiscount } from "@/lib/coupons"

export async function POST(request: Request) {
  const rawBody = await request.text()
  const signature = request.headers.get("x-paystack-signature")

  if (!verifyWebhookSignature(rawBody, signature)) {
    console.error("Paystack webhook: signature mismatch")
    return new NextResponse("invalid", { status: 400 })
  }

  const event = JSON.parse(rawBody)

  if (event.event !== "charge.success") {
    return new NextResponse("OK")
  }

  const { reference } = event.data

  // Defense-in-depth — webhook payload par pura bharosa nahi, Paystack se dobara verify karo
  const verified = await verifyTransaction(reference)
  if (verified.data.status !== "success") {
    console.error("Paystack webhook: not verified as success", reference)
    return new NextResponse("OK")
  }

  const metadata = verified.data.metadata as { userId?: string; programIds?: string[]; couponCode?: string | null }
  const userId = metadata?.userId
  const programIds = metadata?.programIds ?? []
  const couponCode = metadata?.couponCode ?? null

  if (!userId || programIds.length === 0) {
    console.error("Paystack webhook: missing metadata", reference)
    return new NextResponse("OK")
  }

  const programs = await prisma.program.findMany({ where: { id: { in: programIds } } })
  const subtotal = programs.reduce((sum, p) => sum + p.price, 0)
  const discount = calculateDiscount(subtotal, couponCode)
  const expectedTotal = Math.max(0, subtotal - discount)

  const amountPaidRands = verified.data.amount / 100
  if (Math.abs(expectedTotal - amountPaidRands) > 0.5) {
    console.error("Paystack webhook: amount mismatch", { expectedTotal, amountPaidRands })
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

  return new NextResponse("OK")
}
