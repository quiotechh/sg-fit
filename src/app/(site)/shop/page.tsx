import Link from "next/link";

export default function ShopPage() {
  return (
    <main className="relative min-h-[85vh] flex items-center justify-center bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/40" />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4 [font-family:var(--font-barlow)]">
          SG Fit Shop
        </p>

        <h1 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-4xl sm:text-6xl xl:text-7xl mb-6">
          <span
            style={{
              background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Coming Soon
          </span>
        </h1>

        <p className="text-white/60 text-sm sm:text-base font-medium max-w-md mx-auto mb-10 [font-family:var(--font-barlow)] leading-relaxed">
          Supplements, wellness teas, and activewear built for your
          transformation — landing here shortly.
        </p>

        <Link
          href="/dashboard"
          className="inline-block bg-white text-zinc-950 text-sm font-black uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-zinc-100 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
