"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export default function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  const inputClass =
    "w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-sm font-semibold text-zinc-950 placeholder:text-zinc-400 outline-none focus:border-zinc-950 focus:bg-white transition-all duration-200 [font-family:var(--font-barlow)]"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!token) {
      setError("Invalid or missing reset link.")
      return
    }
    await authClient.resetPassword(
      { newPassword: password, token },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setDone(true)
          setLoading(false)
        },
        onError: (ctx) => {
          setError(ctx.error.message)
          setLoading(false)
        },
      }
    )
  }

  if (!token) {
    return (
      <div className="flex flex-col items-center gap-4 text-center py-6">
        <AlertCircle className="size-10 text-red-500" />
        <div>
          <p className="text-base font-black uppercase text-zinc-950 [font-family:var(--font-barlow)] mb-1">
            Invalid Link
          </p>
          <p className="text-sm font-medium text-zinc-500 [font-family:var(--font-barlow)] mb-4">
            This password reset link is invalid or has expired.
          </p>
          <a
            href="/forgot-password"
            className="text-sm font-black uppercase tracking-widest text-zinc-950 underline underline-offset-2 [font-family:var(--font-barlow)]"
          >
            Request New Link
          </a>
        </div>
      </div>
    )
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 text-center py-6">
        <CheckCircle className="size-10 text-[#C9953A]" />
        <div>
          <p className="text-base font-black uppercase text-zinc-950 [font-family:var(--font-barlow)] mb-1">
            Password Updated
          </p>
          <p className="text-sm font-medium text-zinc-500 [font-family:var(--font-barlow)] mb-4">
            You can now log in with your new password.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="text-sm font-black uppercase tracking-widest text-zinc-950 underline underline-offset-2 [font-family:var(--font-barlow)]"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password (min 8 characters)"
          className={`${inputClass} pr-12`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-950 transition-colors"
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
          <AlertCircle className="size-4 text-red-500 shrink-0" />
          <p className="text-sm font-semibold text-red-600 [font-family:var(--font-barlow)]">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-3 w-full py-4 rounded-xl text-zinc-950 text-sm font-black uppercase tracking-widest [font-family:var(--font-barlow)] active:scale-95 transition-all duration-150 disabled:opacity-60"
        style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
      >
        {loading ? <Loader2 className="size-4 animate-spin" /> : "Update Password"}
      </button>
    </form>
  )
}
