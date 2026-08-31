"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Loader2, CheckCircle, AlertTriangle, XCircle } from "lucide-react"

export default function CommunityManageClient({
  status: initialStatus,
  currentPeriodEnd,
}: {
  status: string
  currentPeriodEnd: string
}) {
  const [status, setStatus] = useState(initialStatus)
  const [confirming, setConfirming] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState("")

  const renewalDate = new Date(currentPeriodEnd).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  const isCancelled = status === "non-renewing" || status === "disabled"
  const paymentFailed = status === "attention"

  async function handleCancel() {
    setProcessing(true)
    setError("")
    try {
      const res = await fetch("/api/community/cancel", { method: "POST" })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Something went wrong. Please try again.")
        setProcessing(false)
        return
      }
      setStatus("non-renewing")
      setConfirming(false)
      setProcessing(false)
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
            Your Membership
          </p>
          <h1 className="text-3xl sm:text-4xl font-black uppercase leading-none tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
            Manage Membership
          </h1>
        </div>

        <div className="rounded-2xl border border-zinc-200 divide-y divide-zinc-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-black uppercase tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
                SG Fit Community Membership
              </p>
              <p className="text-xs font-medium text-zinc-400 [font-family:var(--font-barlow)] mt-0.5">
                R99 / month
              </p>
            </div>
            <span
              className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full [font-family:var(--font-barlow)] ${
                paymentFailed
                  ? "bg-red-50 text-red-600"
                  : isCancelled
                    ? "bg-zinc-100 text-zinc-500"
                    : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {paymentFailed ? "Payment Failed" : isCancelled ? "Ending" : "Active"}
            </span>
          </div>
          <div className="flex items-center gap-2.5 px-5 py-3">
            <p className="text-xs font-medium text-zinc-400 [font-family:var(--font-barlow)]">
              {paymentFailed ? (
                <>Your last renewal charge failed. Access continues until <span className="font-semibold text-zinc-600">{renewalDate}</span> — resubscribe before then to keep it.</>
              ) : isCancelled ? (
                <>Your access ends on <span className="font-semibold text-zinc-600">{renewalDate}</span> — no further charges.</>
              ) : (
                <>Renews automatically on <span className="font-semibold text-zinc-600">{renewalDate}</span>.</>
              )}
            </p>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
            <p className="text-sm font-semibold text-red-600 [font-family:var(--font-barlow)]">{error}</p>
          </div>
        )}

        {paymentFailed ? (
          <div className="flex flex-col gap-4 border border-red-200 bg-red-50 rounded-xl px-5 py-5">
            <div className="flex items-start gap-3">
              <XCircle className="size-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-red-700 [font-family:var(--font-barlow)]">
                Your card was declined on renewal. Resubscribe before {renewalDate} to avoid losing access.
              </p>
            </div>
            <Link
              href="/community/checkout"
              className="inline-flex items-center justify-center gap-2 bg-red-600 text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-red-700 active:scale-95 transition-all [font-family:var(--font-barlow)]"
            >
              Update Payment
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        ) : isCancelled ? (
          <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4">
            <CheckCircle className="size-4 text-zinc-400 shrink-0" />
            <p className="text-sm font-medium text-zinc-500 [font-family:var(--font-barlow)]">
              Your membership is set to end — you keep full access until {renewalDate}.
            </p>
          </div>
        ) : confirming ? (
          <div className="flex flex-col gap-4 border border-red-200 bg-red-50 rounded-xl px-5 py-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="size-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-red-700 [font-family:var(--font-barlow)]">
                You&apos;ll keep access until {renewalDate}, then it won&apos;t renew. You can resubscribe anytime after.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                disabled={processing}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-red-700 active:scale-95 transition-all [font-family:var(--font-barlow)] disabled:opacity-50"
              >
                {processing ? <Loader2 className="size-4 animate-spin" /> : "Confirm Cancellation"}
              </button>
              <button
                onClick={() => setConfirming(false)}
                disabled={processing}
                className="flex-1 text-xs font-black uppercase tracking-widest px-6 py-3 rounded-lg border-2 border-zinc-200 text-zinc-700 hover:border-zinc-950 transition-all [font-family:var(--font-barlow)] disabled:opacity-50"
              >
                Keep Membership
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            className="w-full text-xs font-black uppercase tracking-widest px-6 py-4 rounded-xl border-2 border-zinc-200 text-zinc-700 hover:border-red-300 hover:text-red-600 transition-all [font-family:var(--font-barlow)]"
          >
            Cancel Membership
          </button>
        )}

        <Link
          href="/community-dashboard"
          className="inline-flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors [font-family:var(--font-barlow)]"
        >
          Back to Community
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </main>
  )
}
