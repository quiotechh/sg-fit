import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import CommunityDashboardClient from "./CommunityDashboardClient"

export default async function CommunityDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/login")

  return <CommunityDashboardClient />
}
