import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { getUserCommunitySubscription } from "@/lib/data/subscriptions"

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ hasMembership: false, paymentIssue: false, accessUntil: null })

  const sub = await getUserCommunitySubscription(session.user.id)
  const hasMembership = !!sub?.currentPeriodEnd && sub.currentPeriodEnd >= new Date()
  const paymentIssue = hasMembership && sub?.status === "attention"

  return NextResponse.json({
    hasMembership,
    paymentIssue,
    accessUntil: hasMembership ? sub!.currentPeriodEnd!.toISOString() : null,
  })
}
