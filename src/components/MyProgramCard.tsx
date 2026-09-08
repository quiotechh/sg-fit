import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import type { Program } from "@/generated/prisma/client"

export default function MyProgramCard({ program }: { program: Program }) {
  const href = `/my-programs/workouts/${program.slug}`

  return (
    <Link
      href={href}
      className="group flex flex-col border-2 border-zinc-200 hover:border-zinc-950 rounded-2xl overflow-hidden transition-colors duration-300 bg-white"
    >
      {/* Visual panel */}
      <div className={`relative w-full aspect-4/3 bg-linear-to-br ${program.bgClass} overflow-hidden`}>
        <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-in-out bg-linear-to-br from-transparent to-black/20" />

        {/* Purchased badge + tags — one flex row so tags wrap instead of
            overlapping the badge when combined text length runs long. */}
        <div className="absolute top-4 inset-x-4 flex items-start justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wide bg-white/15 backdrop-blur-sm text-white px-2.5 py-1 rounded-full shrink-0 [font-family:var(--font-barlow)]">
            <CheckCircle className="size-3 shrink-0" />
            Purchased
          </span>

          <div className="flex flex-wrap gap-1.5 justify-end">
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

        {/* Level badge */}
        <div className="absolute bottom-4 right-4">
          <span className="text-[10px] font-black uppercase tracking-wide bg-white text-zinc-950 px-3 py-1 rounded-full [font-family:var(--font-barlow)]">
            {program.level}
          </span>
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

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-zinc-400 [font-family:var(--font-barlow)] uppercase tracking-wide">
          <span>{program.duration}</span>
          {program.sessions && (
            <>
              <span className="text-zinc-200">·</span>
              <span>{program.sessions}</span>
            </>
          )}
        </div>

        <div className="h-px bg-zinc-100" />

        {/* Access CTA */}
        <div
          className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-lg text-zinc-950 text-xs font-black uppercase tracking-widest [font-family:var(--font-barlow)] active:scale-95 transition-all duration-150"
          style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
        >
          Access Program
          <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  )
}
