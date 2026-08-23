import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { disableSubscription } from "@/lib/paystack"
import { getUserCommunitySubscription } from "@/lib/data/subscriptions"
import { prisma } from "@/lib/prisma"
import { logEvent } from "@/lib/auditLog"

export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Scoped to this session's own userId — a user can only ever cancel their own subscription.
  const sub = await getUserCommunitySubscription(session.user.id)
  if (!sub || !sub.currentPeriodEnd || sub.currentPeriodEnd < new Date()) {
    return NextResponse.json({ error: "You don't have an active membership to cancel" }, { status: 400 })
  }

  if (!sub.subscriptionCode || !sub.emailToken) {
    // Can happen in the first few seconds after subscribing, before the
    // subscription.create webhook has filled these in — ask them to retry shortly.
    await logEvent({
      userId: session.user.id,
      userEmail: session.user.email,
      event: "subscription.cancel_failed",
      success: false,
      metadata: {
        message: `${session.user.email} tried to cancel their Community subscription, but we don't have their subscription code/token yet (webhook hasn't synced) — asked them to retry shortly.`,
      },
    })
    return NextResponse.json({ error: "Still setting up your membership — please try again in a minute" }, { status: 400 })
  }

  try {
    await disableSubscription(sub.subscriptionCode, sub.emailToken)

    // Optimistic local update — the real subscription.disable webhook will
    // also arrive and confirm this, but we don't make the user wait for it.
    await prisma.subscription.update({
      where: { id: sub.id },
      data: { status: "non-renewing" },
    })

    await logEvent({
      userId: session.user.id,
      userEmail: session.user.email,
      event: "subscription.cancelled",
      success: true,
      metadata: {
        message: `${session.user.email} cancelled their Community subscription. They keep access until ${sub.currentPeriodEnd.toDateString()}, then it stops renewing automatically.`,
      },
    })

    return NextResponse.json({ status: "ok", accessUntil: sub.currentPeriodEnd })
  } catch (err) {
    console.error("Community cancel: Paystack disable failed", err)
    await logEvent({
      userId: session.user.id,
      userEmail: session.user.email,
      event: "subscription.cancel_failed",
      success: false,
      metadata: {
        message: `Failed to cancel ${session.user.email}'s Community subscription via Paystack — their subscription is still active/billing, needs investigation.`,
        error: String(err),
      },
    })
    return NextResponse.json({ error: "Failed to cancel — please try again or contact support" }, { status: 500 })
  }
}
