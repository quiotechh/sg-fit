"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { CheckCircle, ArrowRight, Mail } from "lucide-react"
import { useCart } from "@/store/cartStore"

export default function CheckoutSuccessPage() {
  const items = useCart((s) => s.items)
  const clearCart = useCart((s) => s.clearCart)
  const captured = useRef(false)
  const [summary, setSummary] = useState({ workoutCount: 0, nutritionCount: 0 })

  useEffect(() => {
    if (captured.current || items.length === 0) return
    captured.current = true
    setSummary({
      workoutCount: items.filter((i) => i.category !== "nutrition").length,
      nutritionCount: items.filter((i) => i.category === "nutrition").length,
    })
    clearCart()
  }, [items, clearCart])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      <CheckCircle className="size-12 text-[#C9953A]" />
      <div className="flex flex-col gap-3 max-w-sm">
        <p className="text-2xl font-black uppercase text-zinc-950 [font-family:var(--font-barlow)]">
          Payment Successful
        </p>

        {summary.workoutCount > 0 && (
          <p className="text-sm font-medium text-zinc-500 [font-family:var(--font-barlow)]">
            {summary.workoutCount === 1 ? "Your workout program" : "Your workout programs"} will appear in My Programs shortly — this can take a few seconds while we confirm your payment.
          </p>
        )}

        {summary.nutritionCount > 0 && (
          <div className="flex items-start gap-2.5 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-left">
            <Mail className="size-4 text-zinc-400 shrink-0 mt-0.5" />
            <p className="text-xs font-medium text-zinc-500 [font-family:var(--font-barlow)] leading-relaxed">
              {summary.nutritionCount === 1 ? "Your nutrition guide PDF" : "Your nutrition guide PDFs"} will be emailed to you shortly.{" "}
              <strong className="text-zinc-950">Check your spam/junk folder</strong>{" "}
              if you don&apos;t see {summary.nutritionCount === 1 ? "it" : "them"} within a few minutes — you can also download{" "}
              {summary.nutritionCount === 1 ? "it" : "them"} anytime from My Programs → Nutrition Guides.
            </p>
          </div>
        )}
      </div>
      <Link
        href="/my-programs"
        className="inline-flex items-center gap-2 bg-zinc-950 text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-zinc-800 transition-all [font-family:var(--font-barlow)] mt-2"
      >
        Go to My Programs
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  )
}
