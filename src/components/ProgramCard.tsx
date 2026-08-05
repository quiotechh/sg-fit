import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Program } from "@/generated/prisma/client"

export default function ProgramCard({ program }: { program: Program }) {
  const href = `/programs/${program.category}/${program.slug}`

  return (
    <Link
      href={href}
      className="group flex flex-col border-2 border-zinc-200 hover:border-zinc-950 rounded-2xl overflow-hidden transition-colors duration-300 bg-white"
    >
      {/* Image / colour block */}
      <div className={`relative w-full aspect-[4/3] bg-linear-to-br ${program.bgClass} overflow-hidden`}>
        {/* Subtle scale on hover — image will replace the gradient later */}
        <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-in-out bg-linear-to-br from-transparent to-black/20" />

        {/* Tags — top left */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
          {program.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-black uppercase tracking-wide bg-white/10 backdrop-blur-sm text-white px-2.5 py-1 rounded-full [font-family:var(--font-barlow)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Level badge — bottom right */}
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

        {/* Meta */}
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

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-zinc-950 [font-family:var(--font-barlow)]">
              ${program.price}
            </span>
            {program.originalPrice && (
              <span className="text-sm font-semibold text-zinc-400 line-through [font-family:var(--font-barlow)]">
                ${program.originalPrice}
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-zinc-950 [font-family:var(--font-barlow)] group-hover:gap-3 transition-all duration-200">
            View <ArrowRight className="size-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
