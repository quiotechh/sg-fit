"use client"

import { useState } from "react"
import ResendVerification from "@/components/ResendVerification"

// Email is typed in (not read from a session) because this page is reached by
// people who are NOT signed in — their link expired before they could be.
export default function VerifyEmailResend({ next }: { next: string }) {
  const [email, setEmail] = useState("")

  return (
    <div className="flex flex-col gap-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-sm font-semibold text-zinc-950 placeholder:text-zinc-400 outline-none focus:border-zinc-950 focus:bg-white transition-all duration-200 [font-family:var(--font-barlow)]"
      />
      <ResendVerification email={email} callbackURL={`/verify-email?next=${encodeURIComponent(next)}`} />
    </div>
  )
}
