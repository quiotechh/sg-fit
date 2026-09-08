import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { randomUUID } from "crypto"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { initializeTransaction } from "@/lib/paystack"
import { logEvent } from "@/lib/auditLog"

const COMMUNITY_PLAN_CODE = process.env.PAYSTACK_COMMUNITY_PLAN_CODE!
// Paystack now requires `amount` even when `plan` is passed — it used to charge
// the plan's own amount automatically, but rejects the request with "Invalid
// Amount Sent" without this. Keep in sync with the plan's configured price.
const COMMUNITY_PLAN_AMOUNT = Number(process.env.PAYSTACK_COMMUNITY_PLAN_AMOUNT!)

export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const existing = await prisma.subscription.findFirst({
    where: {
      userId: session.user.id,
      planCode: COMMUNITY_PLAN_CODE,
      status: { in: ["active", "non-renewing"] },
      currentPeriodEnd: { gte: new Date() },
    },
  })
  if (existing) {
    return NextResponse.json({ error: "You already have an active community membership" }, { status: 400 })
  }

  const reference = `sgfit_sub_${randomUUID()}`
  const siteUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000"

  await logEvent({
    userId: session.user.id,
    userEmail: session.user.email,
    event: "subscription.checkout_initiated",
    success: true,
    reference,
    metadata: {
      message: `${session.user.email} started checkout for the Community Membership subscription.`,
      planCode: COMMUNITY_PLAN_CODE,
    },
  })

  try {
    const result = await initializeTransaction({
      email: session.user.email,
      amount: COMMUNITY_PLAN_AMOUNT,
      plan: COMMUNITY_PLAN_CODE,
      reference,
      callback_url: `${siteUrl}/community/checkout/success`,
      metadata: {
        userId: session.user.id,
        type: "community_subscription",
        planCode: COMMUNITY_PLAN_CODE,
      },
    })

    await logEvent({
      userId: session.user.id,
      userEmail: session.user.email,
      event: "subscription.paystack_initialized",
      success: true,
      reference,
      metadata: {
        message: `Paystack subscription checkout initialized for ${session.user.email} — waiting for payment to complete.`,
        planCode: COMMUNITY_PLAN_CODE,
      },
    })

    return NextResponse.json({ authorization_url: result.data.authorization_url })
  } catch (err) {
    console.error("Community subscribe: Paystack initialize failed", err)
    await logEvent({
      userId: session.user.id,
      userEmail: session.user.email,
      event: "subscription.checkout_failed",
      success: false,
      reference,
      metadata: {
        message: `Failed to start Paystack subscription checkout for ${session.user.email}.`,
        error: String(err),
      },
    })
    return NextResponse.json({ error: "Failed to start subscription checkout" }, { status: 500 })
  }
}
