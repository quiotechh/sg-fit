import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Clock, Zap, Users, CheckCircle, Shield } from "lucide-react"
import { categoryConfigs } from "@/data/programs"
import { getProgramBySlug, getProgramsByCategory, getAllProgramSlugs } from "@/lib/programs"
import ProgramCard from "@/components/ProgramCard"
import AddToCartButton from "@/components/AddToCartButton"

interface Props {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  const all = await getAllProgramSlugs()
  return all.map((p) => ({ category: p.category, slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params
  const program = await getProgramBySlug(category, slug)
  if (!program) return {}
  return { title: `${program.title} — SG Fit` }
}

export default async function ProgramDetailPage({ params }: Props) {
  const { category, slug } = await params

  const config = categoryConfigs[category]
  if (!config) notFound()

  const program = await getProgramBySlug(category, slug)
  if (!program) notFound()

  const related = (await getProgramsByCategory(category))
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  return (
    <main className="flex flex-col min-h-screen bg-white">

      {/* ── PRODUCT LAYOUT ───────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 xl:px-16 py-6 sm:py-14 xl:py-16">

          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-1.5 text-zinc-400 text-xs font-bold uppercase tracking-wide [font-family:var(--font-barlow)] mb-6 sm:mb-10">
            <Link href="/programs" className="hover:text-zinc-950 transition-colors">Programs</Link>
            <ChevronRight className="size-3 shrink-0" />
            <Link href={`/programs/${category}`} className="hover:text-zinc-950 transition-colors">{config.label}</Link>
            <ChevronRight className="size-3 shrink-0" />
            <span className="text-zinc-950">{program.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 xl:gap-16 items-start">

            {/* ── LEFT: Visual panel ── */}
            <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden bg-linear-to-br ${program.bgClass} min-h-64 sm:min-h-105 lg:min-h-150 xl:min-h-170 flex flex-col justify-between p-6 sm:p-10 xl:p-14`}>

              {/* Top: category + tags */}
              <div className="flex flex-col gap-3">
                <p
                  className="text-[10px] font-black uppercase tracking-[0.28em] [font-family:var(--font-barlow)]"
                  style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  {config.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {program.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-black uppercase tracking-widest text-white/50 border border-white/15 rounded-full px-3 py-1 [font-family:var(--font-barlow)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom: large decorative title */}
              <div>
                <h2
                  className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-5xl sm:text-6xl xl:text-7xl text-transparent select-none"
                  style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.2)" }}
                >
                  {program.title}
                </h2>
              </div>
            </div>

            {/* ── RIGHT: Product details ── */}
            <div className="flex flex-col gap-5 sm:gap-8 lg:sticky lg:top-8">

              {/* Title block */}
              <div className="flex flex-col gap-3">
                <p
                  className="text-[10px] font-black uppercase tracking-[0.28em] [font-family:var(--font-barlow)]"
                  style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  {config.label}
                </p>
                <h1 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-3xl sm:text-5xl xl:text-6xl text-zinc-950">
                  {program.title}
                </h1>
                <p className="text-base sm:text-lg font-semibold text-zinc-500 [font-family:var(--font-barlow)]">
                  {program.subtitle}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-5xl font-black text-zinc-950 [font-family:var(--font-barlow)]">
                  ${program.price}
                </span>
                {program.originalPrice && (
                  <span className="text-xl font-semibold text-zinc-400 line-through [font-family:var(--font-barlow)]">
                    ${program.originalPrice}
                  </span>
                )}
                <span className="text-xs font-bold text-zinc-400 [font-family:var(--font-barlow)]">one-time</span>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-2 bg-zinc-100 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide text-zinc-700 [font-family:var(--font-barlow)]">
                  <Clock className="size-3.5 shrink-0" />{program.duration}
                </span>
                <span className="inline-flex items-center gap-2 bg-zinc-100 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide text-zinc-700 [font-family:var(--font-barlow)]">
                  <Zap className="size-3.5 shrink-0" />{program.level}
                </span>
                {program.sessions && (
                  <span className="inline-flex items-center gap-2 bg-zinc-100 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide text-zinc-700 [font-family:var(--font-barlow)]">
                    <Users className="size-3.5 shrink-0" />{program.sessions}
                  </span>
                )}
              </div>

              <div className="h-px bg-zinc-100" />

              {/* Description */}
              <p className="text-sm sm:text-base font-medium text-zinc-500 [font-family:var(--font-barlow)] leading-relaxed">
                {program.description}
              </p>

              {/* What's included */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-zinc-950 [font-family:var(--font-barlow)] mb-4">
                  What&apos;s included
                </p>
                <ul className="flex flex-col gap-2.5">
                  {program.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-zinc-950 flex items-center justify-center shrink-0">
                        <CheckCircle className="size-3 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-zinc-700 [font-family:var(--font-barlow)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-px bg-zinc-100" />

              {/* Add to Cart */}
              <div className="flex flex-col gap-3">
                <AddToCartButton program={program} />
                <div className="flex items-center gap-2.5 px-1">
                  <Shield className="size-4 text-zinc-400 shrink-0" />
                  <p className="text-xs font-medium text-zinc-400 [font-family:var(--font-barlow)] leading-relaxed">
                    14-day money-back guarantee. Not happy? Full refund, no questions asked.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── WHY THIS WORKS ───────────────────────────────────────────── */}
      <section className="bg-zinc-950 py-16 sm:py-20 xl:py-24 px-6 sm:px-10 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-3xl sm:text-4xl xl:text-5xl mb-10 sm:mb-14">
            <span className="sm:hidden text-transparent" style={{ WebkitTextStroke: "1px #fff" }}>Why This Works</span>
            <span className="hidden sm:inline text-transparent" style={{ WebkitTextStroke: "2px #fff" }}>Why This</span>
            <br className="hidden sm:block" />
            <span className="hidden sm:inline text-white">Works.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 xl:gap-12">
            {program.highlights.map((h, i) => (
              <div key={i} className="flex flex-col gap-4">
                <span
                  className="text-5xl font-black [font-family:var(--font-barlow)] leading-none"
                  style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  0{i + 1}
                </span>
                <p className="text-sm sm:text-base font-semibold text-zinc-300 [font-family:var(--font-barlow)] leading-relaxed">{h}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED PROGRAMS ─────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-white py-16 sm:py-20 px-6 sm:px-10 xl:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
                More {config.label}
              </h2>
              <Link
                href={`/programs/${category}`}
                className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors [font-family:var(--font-barlow)] hidden sm:block"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {related.map((p) => (
                <ProgramCard key={p.slug} program={p} />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link
                href={`/programs/${category}`}
                className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors [font-family:var(--font-barlow)]"
              >
                View All {config.label} →
              </Link>
            </div>
          </div>
        </section>
      )}

    </main>
  )
}
