"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

export default function PaymentIssueBanner() {
  const { data: session } = authClient.useSession()
  const [issue, setIssue] = useState<{ paymentIssue: boolean; accessUntil: string | null }>({
    paymentIssue: false,
    accessUntil: null,
  })

  useEffect(() => {
    // Signing out does a full page reload (see Navbar's handleSignOut), so the
    // default `false` initial state already covers the logged-out case.
    if (!session) return
    fetch("/api/community/membership-status")
      .then((res) => res.json())
      .then((data) => setIssue({ paymentIssue: !!data.paymentIssue, accessUntil: data.accessUntil ?? null }))
      .catch(() => {})
  }, [session])

  if (!issue.paymentIssue) return null

  const formatted = issue.accessUntil
    ? new Date(issue.accessUntil).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })
    : "soon"

  return (
    <div className="bg-red-600 text-white text-center py-2.5 px-4">
      <p className="text-xs sm:text-sm font-bold [font-family:var(--font-barlow)]">
        Your Community payment failed — access ends {formatted}.{" "}
        <Link href="/community/checkout" className="underline underline-offset-2 hover:text-white/80">
          Update payment
        </Link>
      </p>
    </div>
  )
}
