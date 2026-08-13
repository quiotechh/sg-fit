"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Shield, Tag, Mail, Loader2 } from "lucide-react"
import { useCart } from "@/store/cartStore"
import { authClient } from "@/lib/auth-client"

export default function CheckoutClient() {
  const { items, appliedCoupon, email, setEmail, subtotal, discountAmount, total } = useCart()
  const { data: session } = authClient.useSession()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!email && session?.user.email) {
      setEmail(session.user.email)
    }
  }, [email, session, setEmail])

  async function handlePay() {
    setProcessing(true)
    setError("")
    try {
      const res = await fetch("/api/checkout/paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ couponCode: appliedCoupon?.code ?? null, email }),
      })
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

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
        <p className="text-base font-black uppercase text-zinc-950 [font-family:var(--font-barlow)]">
          Your cart is empty
        </p>
        <Link
          href="/programs/workouts"
          className="inline-flex items-center gap-2 bg-zinc-950 text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-zinc-800 transition-all [font-family:var(--font-barlow)]"
        >
          Browse Programs
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white px-4 sm:px-10 xl:px-16 py-10 sm:py-16">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">

        <div>
          <p
            className="text-[10px] font-black uppercase tracking-[0.28em] mb-1.5 [font-family:var(--font-barlow)]"
            style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Almost there
          </p>
          <h1 className="text-3xl sm:text-4xl font-black uppercase leading-none tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
            Checkout
          </h1>
        </div>

        {/* Order summary */}
        <div className="flex flex-col rounded-2xl border border-zinc-200 divide-y divide-zinc-100 overflow-hidden">
          {items.map((item) => (
            <div key={item.slug} className="flex items-center gap-4 px-5 py-4">
              <div className={`w-14 h-14 rounded-xl shrink-0 bg-linear-to-br ${item.bgClass}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black uppercase tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
                  {item.title}
                </p>
                <p className="text-xs font-medium text-zinc-400 [font-family:var(--font-barlow)] mt-0.5">
                  {item.level} &nbsp;·&nbsp; {item.duration}
                </p>
              </div>
              <span className="text-sm font-black text-zinc-950 [font-family:var(--font-barlow)]">
                ${item.price}
              </span>
            </div>
          ))}
        </div>

        {appliedCoupon && (
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 [font-family:var(--font-barlow)]">
            <Tag className="size-3.5" />
            Coupon <span className="text-zinc-950">{appliedCoupon.code}</span> applied
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 [font-family:var(--font-barlow)]">
            <Mail className="size-3" />
            Email for receipt
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="border-2 border-zinc-200 focus:border-zinc-950 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-950 placeholder:text-zinc-300 [font-family:var(--font-barlow)] outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5 py-4 border-t border-zinc-100">
          <div className="flex items-center justify-between text-sm [font-family:var(--font-barlow)]">
            <span className="font-semibold text-zinc-400">Subtotal</span>
            <span className="font-black text-zinc-950">${subtotal.toFixed(2)}</span>
          </div>
          {appliedCoupon && (
            <div className="flex items-center justify-between text-sm [font-family:var(--font-barlow)]">
              <span className="font-semibold text-zinc-400">Discount ({appliedCoupon.code})</span>
              <span className="font-black" style={{ color: "#B8841F" }}>−${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex items-center justify-between pt-2 mt-1 border-t border-zinc-100">
            <span className="text-base font-black uppercase tracking-wide text-zinc-950 [font-family:var(--font-barlow)]">Total</span>
            <span className="text-2xl font-black text-zinc-950 [font-family:var(--font-barlow)]">${total.toFixed(2)}</span>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
            <p className="text-sm font-semibold text-red-600 [font-family:var(--font-barlow)]">{error}</p>
          </div>
        )}

        <button
          onClick={handlePay}
          disabled={!email || processing}
          className="w-full inline-flex items-center justify-center gap-3 text-zinc-950 text-sm font-black uppercase tracking-widest px-6 py-4 rounded-xl active:scale-[0.98] transition-all duration-150 [font-family:var(--font-barlow)] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
        >
          {processing ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Pay Now — ${total.toFixed(2)}
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
