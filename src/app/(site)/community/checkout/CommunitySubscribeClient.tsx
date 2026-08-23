"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Shield, Loader2, RefreshCcw } from "lucide-react"

export default function CommunitySubscribeClient({ email }: { email: string }) {
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState("")

  async function handleSubscribe() {
    setProcessing(true)
    setError("")
    try {
      const res = await fetch("/api/community/subscribe", { method: "POST" })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Something went wrong. Please try again.")
        setProcessing(false)
        return
      }
      const { authorization_url } = await res.json()
      window.location.href = authorization_url
    } catch {
      setError("Something went wrong. Please try again.")
      setProcessing(false)
    }
  }

  return (
    <main className="min-h-screen bg-white px-4 sm:px-10 xl:px-16 py-10 sm:py-16">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <div>
          <p
            className="text-[10px] font-black uppercase tracking-[0.28em] mb-1.5 [font-family:var(--font-barlow)]"
            style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Join SGians
          </p>
          <h1 className="text-3xl sm:text-4xl font-black uppercase leading-none tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
            Community Membership
          </h1>
          <Link
            href="/community"
            className="inline-block mt-2 text-xs font-bold text-zinc-400 hover:text-zinc-950 underline underline-offset-2 [font-family:var(--font-barlow)]"
          >
            Learn more about the community →
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-200 divide-y divide-zinc-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-black uppercase tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
                SG Fit Community Membership
              </p>
              <p className="text-xs font-medium text-zinc-400 [font-family:var(--font-barlow)] mt-0.5">
                Billed monthly · cancel anytime
              </p>
            </div>
            <span className="text-sm font-black text-zinc-950 [font-family:var(--font-barlow)]">
              R99 / mo
            </span>
          </div>
          <div className="flex items-center gap-2.5 px-5 py-3">
            <RefreshCcw className="size-3.5 text-zinc-400 shrink-0" />
            <p className="text-xs font-medium text-zinc-400 [font-family:var(--font-barlow)]">
              Auto-renews every month to <span className="font-semibold text-zinc-600">{email}</span> until you cancel.
            </p>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
            <p className="text-sm font-semibold text-red-600 [font-family:var(--font-barlow)]">{error}</p>
          </div>
        )}

        <button
          onClick={handleSubscribe}
          disabled={processing}
          className="w-full inline-flex items-center justify-center gap-3 text-zinc-950 text-sm font-black uppercase tracking-widest px-6 py-4 rounded-xl active:scale-[0.98] transition-all duration-150 [font-family:var(--font-barlow)] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
        >
          {processing ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Subscribe — R99/mo
              <ArrowRight className="size-4" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-zinc-400">
          <Shield className="size-3.5 shrink-0" />
          <p className="text-[11px] font-medium [font-family:var(--font-barlow)]">
            Secure payment via Paystack
          </p>
        </div>
      </div>
    </main>
  )
}
