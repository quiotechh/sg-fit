import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import CheckoutClient from "./CheckoutClient"

export default async function CheckoutPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/login?redirect=/checkout")

  return (
    <CheckoutClient />
  )
}
