"use client"

import { useEffect, useState } from "react"
import { Loader2, MailCheck } from "lucide-react"
import { authClient } from "@/lib/auth-client"

// Better Auth rate-limits /send-verification-email to 3 requests per 60s —
// a 60s cooldown on the button keeps normal users well under that.
const COOLDOWN_SECONDS = 60

export default function ResendVerification({
  email,
  callbackURL,
  className = "",
}: {
  email: string
  callbackURL: string
  className?: string
}) {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  async function handleResend() {
    setSending(true)
    setError("")
    const { error: sendError } = await authClient.sendVerificationEmail({ email, callbackURL })
    setSending(false)
    if (sendError) {
      setError(
        sendError.status === 429
          ? "Too many requests — please wait a minute and try again."
          : "Couldn't send the email. Please try again.",
      )
      return
    }
    setSent(true)
    setCooldown(COOLDOWN_SECONDS)
  }

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleResend}
        disabled={sending || cooldown > 0 || !email}
        className="inline-flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl border-2 border-zinc-200 text-zinc-950 hover:border-zinc-950 transition-all [font-family:var(--font-barlow)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sending ? <Loader2 className="size-4 animate-spin" /> : null}
        {cooldown > 0 ? `Send again in ${cooldown}s` : "Send verification email again"}
      </button>
      {sent && cooldown > 0 && (
        <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 [font-family:var(--font-barlow)]">
          <MailCheck className="size-3.5" />
          Sent — check your inbox and spam/junk folder.
        </p>
      )}
      {error && <p className="text-xs font-semibold text-red-500 [font-family:var(--font-barlow)]">{error}</p>}
    </div>
  )
}
