import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function CommunityCheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      <CheckCircle className="size-12 text-[#C9953A]" />
      <div>
        <p className="text-2xl font-black uppercase text-zinc-950 [font-family:var(--font-barlow)] mb-2">
          Welcome to SGians
        </p>
        <p className="text-sm font-medium text-zinc-500 [font-family:var(--font-barlow)] max-w-sm">
          Your membership is being confirmed — this can take a few seconds while we verify your payment.
        </p>
      </div>
      <Link
        href="/community-dashboard"
        className="inline-flex items-center gap-2 bg-zinc-950 text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-zinc-800 transition-all [font-family:var(--font-barlow)] mt-2"
      >
        Go to Community
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  )
}
