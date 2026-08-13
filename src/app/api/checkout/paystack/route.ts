import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { randomUUID } from "crypto"
// we are generating a random UUID for the reference, so we don't need to use the Paystack SDK here
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { initializeTransaction } from "@/lib/paystack"
import { calculateDiscount } from "@/lib/coupons"
import { logEvent } from "@/lib/auditLog"

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { couponCode, email } = await request.json()
  const reference = `sgfit_${randomUUID()}`

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (typeof email !== "string" || !emailRegex.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 })
  }

  const cartItems = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
    include: { program: true },
  })

  if (cartItems.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
  }

  await logEvent({
    userId: session.user.id,
    userEmail: session.user.email,
    event: "checkout.initiated",
    success: true,
    reference,
    metadata: {
      couponCode: couponCode ?? null,
      programTitles: cartItems.map((i) => i.program.title),
      receiptEmail: email,
    },
  })

  const subtotal = cartItems.reduce((sum, i) => sum + i.program.price, 0)
  const discount = calculateDiscount(subtotal, couponCode)
  const total = Math.max(0, subtotal - discount)

  const siteUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000"
  const programIds = cartItems.map((i) => i.programId)

  try {
    const result = await initializeTransaction({
      email,
      amount: Math.round(total * 100),
      reference,
      callback_url: `${siteUrl}/checkout/success`,
      metadata: {
        userId: session.user.id,
        programIds,
        couponCode: couponCode ?? null,
      },
    })

    await logEvent({
      userId: session.user.id,
      userEmail: session.user.email,
      event: "checkout.paystack_initialized",
      success: true,
      reference,
      metadata: {
        amount: total,
        programTitles: cartItems.map((i) => i.program.title),
        receiptEmail: email,
      },
    })

    return NextResponse.json({ authorization_url: result.data.authorization_url })
  } catch (err) {
    await logEvent({
      userId: session.user.id,
      userEmail: session.user.email,
      event: "checkout.failed",
      success: false,
      reference,
      metadata: { error: String(err) },
    })
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 })
  }
}
