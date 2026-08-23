"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export default function SignupForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const inputClass =
    "w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-sm font-semibold text-zinc-950 placeholder:text-zinc-400 outline-none focus:border-zinc-950 focus:bg-white transition-all duration-200 [font-family:var(--font-barlow)]"

  async function handleGoogleSignup() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    })
  }

  async function handleEmailSignup(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    await authClient.signUp.email(
      { name, email, password, callbackURL: "/my-programs" },
      {
        onRequest: () => {
          setLoading(true)
        },
        onSuccess: () => {
          router.push("/dashboard")
        },
        onError: (ctx) => {
          setError(ctx.error.message)
          setLoading(false)
        },
      }
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <button
        onClick={handleGoogleSignup}
        type="button"
        className="flex items-center justify-center gap-3 w-full py-4 rounded-xl border-2 border-zinc-200 text-zinc-950 text-sm font-black uppercase tracking-widest [font-family:var(--font-barlow)] hover:border-zinc-950 active:scale-95 transition-all duration-150"
      >
        Continue with Google
      </button>

      <div className="flex items-center gap-4">
        <div className="h-px bg-zinc-100 flex-1" />
        <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400 [font-family:var(--font-barlow)]">or</span>
        <div className="h-px bg-zinc-100 flex-1" />
      </div>

      <form onSubmit={handleEmailSignup} className="flex flex-col gap-4">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className={inputClass}
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 8 characters)"
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
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm font-semibold text-zinc-500 [font-family:var(--font-barlow)]">
        Already have an account?{" "}
        <a href="/login" className="text-zinc-950 underline underline-offset-2">Login</a>
      </p>
    </div>
  )
}
