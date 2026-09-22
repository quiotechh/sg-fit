import { Globe } from "lucide-react"

// Shown wherever a price appears at checkout. Paystack's own payment page only
// ever shows ZAR (a South African Paystack account can't charge in USD), and
// international cardholders' banks do the conversion — so buyers abroad should
// know that BEFORE they reach the card form, not be surprised on their statement.
export default function CurrencyNote({ className = "" }: { className?: string }) {
  return (
    <p
      className={`flex items-start justify-center gap-1.5 text-center text-[11px] font-medium leading-relaxed text-zinc-400 [font-family:var(--font-barlow)] ${className}`}
    >
      <Globe className="size-3.5 shrink-0 mt-px" />
      <span>
        Prices are in South African Rand (ZAR). International cards accepted — your bank converts to your currency, so
        the amount on your statement may differ slightly.
      </span>
    </p>
  )
}
