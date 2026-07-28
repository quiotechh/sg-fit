"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, AlertCircle } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const inputClass =
    "w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-sm font-semibold text-zinc-950 placeholder:text-zinc-400 outline-none focus:border-zinc-950 focus:bg-white transition-all duration-200 [font-family:var(--font-barlow)]"

  async function handleGoogleLogin() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/my-programs",
    })
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    await authClient.signIn.email(
      { email, password, callbackURL: "/my-programs" },
      {
        onRequest: () => {
          setLoading(true)
        },
        onSuccess: () => {
          router.push("/my-programs")
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
        onClick={handleGoogleLogin}
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

      <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={inputClass}
        />

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
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Login"}
        </button>
      </form>

      <p className="text-center text-sm font-semibold text-zinc-500 [font-family:var(--font-barlow)]">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="text-zinc-950 underline underline-offset-2">Sign up</a>
      </p>
    </div>
  )
}
