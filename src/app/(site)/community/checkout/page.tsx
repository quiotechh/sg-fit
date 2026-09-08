import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { hasActiveCommunitySubscription } from "@/lib/data/subscriptions"
import CommunitySubscribeClient from "./CommunitySubscribeClient"

export default async function CommunityCheckoutPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/login?redirect=/community/checkout")
  if (await hasActiveCommunitySubscription(session.user.id))
    redirect("/community-dashboard")

  return <CommunitySubscribeClient email={session.user.email} />
}
