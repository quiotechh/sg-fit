import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { categoryConfigs, getAllCategories } from "@/data/programs"
import { getProgramsByCategory } from "@/lib/data/programs"
import PageHero from "@/components/PageHero"
import ProgramCard from "@/components/ProgramCard"

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params
  const config = categoryConfigs[category]
  if (!config) return {}
  return { title: `${config.label} — SG Fit` }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const config = categoryConfigs[category]
  if (!config) notFound()

  const programs = await getProgramsByCategory(category)

  return (
    <main className="flex flex-col min-h-screen">

      {/* Hero — same structure/height as homepage */}
      <PageHero
        goldText={config.goldText}
        whiteText={config.whiteText}
        subtext={config.subtext}
        ctaText={config.ctaText}
        ctaHref="#programs"
      />

      {/* Program grid */}
      <section id="programs" className="bg-white py-16 sm:py-20 xl:py-24 px-6 sm:px-10 xl:px-16">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="mb-10 sm:mb-12">
            <p
              className="text-xs sm:text-sm font-black uppercase tracking-[0.28em] mb-2 [font-family:var(--font-barlow)]"
              style={{
                background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {config.label}
            </p>
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black uppercase leading-none tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
              All {config.label}
            </h2>
            <p className="mt-2 text-zinc-500 text-sm sm:text-base font-medium [font-family:var(--font-barlow)]">
              {programs.length} program{programs.length !== 1 ? "s" : ""} available
            </p>
          </div>

          {/* Responsive grid — 1 col mobile / 2 col tablet / 3 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {programs.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>

        </div>
      </section>

      {/* Bottom CTA strip */}
      <section className="bg-zinc-950 py-14 sm:py-16 px-6 sm:px-10 xl:px-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase leading-none tracking-tight text-white [font-family:var(--font-barlow)] mb-2">
              Not sure which to pick?
            </h3>
            <p className="text-zinc-400 text-sm font-medium [font-family:var(--font-barlow)]">
              All programs come with community access — try one and scale from there.
            </p>
          </div>
          <Link
            href="/get-started"
            className="group shrink-0 inline-flex items-center gap-3 bg-white text-zinc-950 text-sm font-black uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-zinc-100 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
          >
            Get Started
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>

    </main>
  )
}
