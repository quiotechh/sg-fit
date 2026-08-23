import { Download, CheckCircle } from "lucide-react"
import type { Program } from "@/generated/prisma/client"

export default function MyNutritionCard({ program }: { program: Program }) {
  return (
    <div className="group flex flex-col border-2 border-zinc-200 rounded-2xl overflow-hidden bg-white">
      {/* Visual panel */}
      <div className={`relative w-full aspect-4/3 bg-linear-to-br ${program.bgClass} overflow-hidden`}>
        <div className="absolute inset-0 bg-linear-to-br from-transparent to-black/20" />

        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wide bg-white/15 backdrop-blur-sm text-white px-2.5 py-1 rounded-full [font-family:var(--font-barlow)]">
            <CheckCircle className="size-3 shrink-0" />
            Purchased
          </span>
        </div>

        <div className="absolute top-4 right-4 flex flex-wrap gap-1.5 justify-end">
          {program.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-black uppercase tracking-wide bg-white/10 backdrop-blur-sm text-white px-2.5 py-1 rounded-full [font-family:var(--font-barlow)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 sm:p-6 flex-1">
        <div>
          <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-zinc-950 [font-family:var(--font-barlow)] leading-tight">
            {program.title}
          </h3>
          <p className="text-sm font-medium text-zinc-500 [font-family:var(--font-barlow)] mt-0.5">
            {program.subtitle}
          </p>
        </div>

        <div className="h-px bg-zinc-100" />

        <a
          href={`/api/download/${program.slug}`}
          className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-lg text-zinc-950 text-xs font-black uppercase tracking-widest [font-family:var(--font-barlow)] active:scale-95 transition-all duration-150"
          style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
        >
          Download PDF
          <Download className="size-3.5" />
        </a>

        <p className="text-[11px] text-zinc-400 font-medium [font-family:var(--font-barlow)] text-center">
          Also emailed to you — check spam/junk if you don&apos;t see it
        </p>
      </div>
    </div>
  )
}
