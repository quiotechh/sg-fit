import Link from "next/link"
import { XCircle, ArrowRight } from "lucide-react"

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      <XCircle className="size-12 text-red-400" />
      <div>
        <p className="text-2xl font-black uppercase text-zinc-950 [font-family:var(--font-barlow)] mb-2">
          Payment Cancelled
        </p>
        <p className="text-sm font-medium text-zinc-500 [font-family:var(--font-barlow)] max-w-sm">
          No charge was made. Your cart is still saved if you&apos;d like to try again.
        </p>
      </div>
      <Link
        href="/checkout"
        className="inline-flex items-center gap-2 bg-zinc-950 text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-zinc-800 transition-all [font-family:var(--font-barlow)] mt-2"
      >
        Back to Checkout
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  )
}
