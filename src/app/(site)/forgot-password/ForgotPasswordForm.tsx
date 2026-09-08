"use client"

import { useState } from "react"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [sent, setSent] = useState(false)

  const inputClass =
    "w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-sm font-semibold text-zinc-950 placeholder:text-zinc-400 outline-none focus:border-zinc-950 focus:bg-white transition-all duration-200 [font-family:var(--font-barlow)]"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    await authClient.requestPasswordReset(
      {
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => setSent(true),
        onError: (ctx) => {
          setError(ctx.error.message)
          setLoading(false)
        },
      }
    )
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 text-center py-6">
        <CheckCircle className="size-10 text-[#C9953A]" />
        <div>
          <p className="text-base font-black uppercase text-zinc-950 [font-family:var(--font-barlow)] mb-1">
            Check your email
          </p>
          <p className="text-sm font-medium text-zinc-500 [font-family:var(--font-barlow)]">
            We&apos;ve sent a password reset link to {email}.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="text-sm font-medium text-zinc-500 [font-family:var(--font-barlow)] mb-1">
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className={inputClass}
      />

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
          <AlertCircle className="size-4 text-red-500 shrink-0" />
          <p className="text-sm font-semibold text-red-600 [font-family:var(--font-barlow)]">{error}</p>
        </div>
      )}

      <p className="text-xs font-medium text-zinc-400 [font-family:var(--font-barlow)] -mt-1">
        Signed up with Google? There&apos;s no password to reset — just sign in with Google directly.
      </p>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-3 w-full py-4 rounded-xl text-zinc-950 text-sm font-black uppercase tracking-widest [font-family:var(--font-barlow)] active:scale-95 transition-all duration-150 disabled:opacity-60"
        style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
      >
        {loading ? <Loader2 className="size-4 animate-spin" /> : "Send Reset Link"}
      </button>
    </form>
  )
}
