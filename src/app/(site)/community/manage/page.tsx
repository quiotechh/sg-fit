import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getUserCommunitySubscription } from "@/lib/data/subscriptions"
import CommunityManageClient from "./CommunityManageClient"

export default async function CommunityManagePage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/login?redirect=/community/manage")

  const sub = await getUserCommunitySubscription(session.user.id)
  if (!sub || !sub.currentPeriodEnd || sub.currentPeriodEnd < new Date()) {
    redirect("/community/checkout")
  }

  return (
    <CommunityManageClient
      status={sub.status}
      currentPeriodEnd={sub.currentPeriodEnd.toISOString()}
    />
  )
}
