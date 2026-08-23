import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { hasActiveCommunitySubscription } from "@/lib/data/subscriptions"

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ hasMembership: false })

  const hasMembership = await hasActiveCommunitySubscription(session.user.id)
  return NextResponse.json({ hasMembership })
}
