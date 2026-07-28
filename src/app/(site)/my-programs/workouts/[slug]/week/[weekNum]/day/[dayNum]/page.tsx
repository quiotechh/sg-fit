import { notFound, redirect } from "next/navigation"
import { headers } from "next/headers"
import Link from "next/link"
import { ChevronRight, Flame, Dumbbell, Zap, Wind, Clock, Info } from "lucide-react"
import { programs } from "@/data/programs"
import { weeklyPlans } from "@/data/weeklyPlans"
import { dayPlans, type SectionType } from "@/data/dayPlans"
import { auth } from "@/lib/auth"

interface Props {
  params: Promise<{ slug: string; weekNum: string; dayNum: string }>
}

const purchasedSlugs = ["6-week-shred", "hiit-ignite"]

const sectionMeta: Record<SectionType, { icon: React.ElementType; color: string; bg: string }> = {
  warmup:   { icon: Flame,    color: "text-amber-400",  bg: "bg-amber-400/10" },
  main:     { icon: Dumbbell, color: "text-[#C9953A]",  bg: "bg-[#C9953A]/10" },
  finisher: { icon: Zap,      color: "text-[#F0CC72]",  bg: "bg-[#F0CC72]/10" },
  cooldown: { icon: Wind,     color: "text-sky-400",    bg: "bg-sky-400/10"  },
}

export async function generateMetadata({ params }: Props) {
  const { weekNum, dayNum } = await params
  return { title: `Week ${weekNum} · Day ${dayNum} — SG Fit` }
}

export default async function DayPage({ params }: Props) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/login")

  const { slug, weekNum, dayNum } = await params
  const wk = parseInt(weekNum)
  const dy = parseInt(dayNum)

  if (!purchasedSlugs.includes(slug)) notFound()

  const program = programs.find((p) => p.slug === slug && p.category === "workouts")
  const weeks   = weeklyPlans[slug]
  if (!program || !weeks) notFound()

  const week = weeks[wk - 1]
  const day  = week?.days[dy - 1]
  if (!day) notFound()

  const planKey  = `${slug}-d${dy}`
  const dayPlan  = dayPlans[planKey]
  if (!dayPlan) notFound()

  const tip = dayPlan.weekTips[wk - 1] ?? dayPlan.weekTips[0]
  const totalExercises = dayPlan.sections.reduce((acc, s) => acc + s.exercises.length, 0)

  return (
    <main className="flex flex-col min-h-screen bg-white">

      {/* ── COMPACT HEADER ────────────────────────────────────────────── */}
      <section className="border-b border-zinc-100 px-4 sm:px-10 xl:px-16 pt-8 sm:pt-10 pb-8 sm:pb-10">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-1.5 text-zinc-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest [font-family:var(--font-barlow)] mb-6 sm:mb-8">
            <Link href="/my-programs/workouts" className="hover:text-zinc-950 transition-colors">My Workouts</Link>
            <ChevronRight className="size-3 shrink-0" />
            <Link href={`/my-programs/workouts/${slug}`} className="hover:text-zinc-950 transition-colors">{program.title}</Link>
            <ChevronRight className="size-3 shrink-0" />
            <span className="text-zinc-950">Week {wk} · Day {dy}</span>
          </div>

          {/* Week · Day label */}
          <p
            className="text-[10px] sm:text-xs font-black uppercase tracking-[0.28em] mb-2 [font-family:var(--font-barlow)]"
            style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Week {wk} &nbsp;·&nbsp; Day {dy}
          </p>

          {/* Day name */}
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black uppercase leading-none tracking-tight text-zinc-950 [font-family:var(--font-barlow)] mb-1.5">
            {day.name}
          </h1>
          <p className="text-sm sm:text-base font-semibold text-zinc-400 [font-family:var(--font-barlow)] mb-6">
            {day.focus}
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 bg-zinc-100 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide text-zinc-700 [font-family:var(--font-barlow)]">
              <Clock className="size-3.5 shrink-0" />{day.duration}
            </span>
            <span className="inline-flex items-center gap-2 bg-zinc-100 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide text-zinc-700 [font-family:var(--font-barlow)]">
              <Dumbbell className="size-3.5 shrink-0" />{totalExercises} exercises
            </span>
          </div>

        </div>
      </section>

      {/* ── BODY ──────────────────────────────────────────────────────── */}
      <section className="flex-1 px-4 sm:px-10 xl:px-16 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-8 sm:gap-10">

          {/* Coaching tip */}
          <div className="flex gap-3 sm:gap-4 rounded-2xl bg-zinc-50 border border-zinc-100 px-4 sm:px-5 py-4 sm:py-5">
            <Info className="size-4 text-[#C9953A] shrink-0 mt-0.5" />
            <p className="text-sm font-semibold text-zinc-600 [font-family:var(--font-barlow)] leading-relaxed">
              {tip}
            </p>
          </div>

          {/* Workout sections */}
          {dayPlan.sections.map((section) => {
            const meta = sectionMeta[section.type]
            const Icon = meta.icon

            return (
              <div key={section.type} className="flex flex-col rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">

                {/* Section header */}
                <div className="bg-zinc-950 px-5 sm:px-7 py-5 sm:py-6 flex items-center gap-4 sm:gap-5">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${meta.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`size-5 sm:size-6 ${meta.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base sm:text-xl font-black uppercase tracking-wider text-white [font-family:var(--font-barlow)]">
                      {section.label}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-white/70 [font-family:var(--font-barlow)] mt-0.5">
                      {section.subtitle}
                    </p>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-white/90 uppercase tracking-widest [font-family:var(--font-barlow)] shrink-0">
                    {section.exercises.length} {section.exercises.length === 1 ? "exercise" : "exercises"}
                  </span>
                </div>

                {/* Column headers — desktop only */}
                <div className="hidden sm:grid grid-cols-[1fr_auto] items-center px-7 py-3 bg-zinc-50 border-b border-zinc-100">
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-400 [font-family:var(--font-barlow)]">Exercise</span>
                  <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-zinc-400 [font-family:var(--font-barlow)]">
                    <span className="w-16 text-center">Sets</span>
                    <span className="w-24 text-center">Reps / Time</span>
                    <span className="w-20 text-center">Rest</span>
                    <span className="w-20 text-center">Tempo</span>
                  </div>
                </div>

                {/* Exercise rows */}
                <div className="divide-y divide-zinc-100 bg-white">
                  {section.exercises.map((ex, ei) => (
                    <div key={ei} className="px-5 sm:px-7 py-5 sm:py-5 flex flex-col sm:grid sm:grid-cols-[1fr_auto] sm:items-center gap-3 sm:gap-4">

                      {/* Name + notes */}
                      <div className="flex flex-col gap-1">
                        <p className="text-sm sm:text-base font-black uppercase tracking-tight text-zinc-950 [font-family:var(--font-barlow)] leading-tight">
                          {ex.name}
                        </p>
                        {ex.notes && (
                          <p className="text-xs sm:text-sm font-medium text-zinc-400 [font-family:var(--font-barlow)] leading-snug">
                            {ex.notes}
                          </p>
                        )}
                      </div>

                      {/* Stats — mobile: pill row / desktop: fixed-width columns */}
                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4">

                        {/* Sets */}
                        <span className="inline-flex items-center sm:w-16 sm:justify-center px-3 sm:px-0 py-1.5 sm:py-0 rounded-full sm:rounded-none bg-zinc-950 sm:bg-transparent text-white sm:text-zinc-950 text-xs sm:text-sm font-black uppercase tracking-wide [font-family:var(--font-barlow)]">
                          <span className="sm:hidden mr-1 text-white/50">×</span>
                          {ex.sets}<span className="sm:hidden ml-0.5 text-white/50 font-semibold text-[10px]">sets</span>
                        </span>

                        {/* Reps */}
                        <span className="inline-flex items-center sm:w-24 sm:justify-center px-3 sm:px-0 py-1.5 sm:py-0 rounded-full sm:rounded-none bg-zinc-100 sm:bg-transparent text-zinc-700 text-xs sm:text-sm font-bold [font-family:var(--font-barlow)]">
                          {ex.reps}
                        </span>

                        {/* Rest — gold */}
                        <span
                          className="inline-flex items-center sm:w-20 sm:justify-center px-3 sm:px-0 py-1.5 sm:py-0 rounded-full sm:rounded-none text-xs sm:text-sm font-black [font-family:var(--font-barlow)]"
                          style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                        >
                          {ex.rest}
                        </span>

                        {/* Tempo — only if present */}
                        {ex.tempo && (
                          <span className="inline-flex items-center sm:w-20 sm:justify-center px-3 sm:px-0 py-1.5 sm:py-0 rounded-full sm:rounded-none bg-zinc-100 sm:bg-transparent text-zinc-500 text-xs sm:text-sm font-bold [font-family:var(--font-barlow)]">
                            {ex.tempo}
                          </span>
                        )}
                        {!ex.tempo && <span className="hidden sm:block w-20" />}

                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )
          })}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
            <Link
              href={`/my-programs/workouts/${slug}`}
              className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-950 transition-colors [font-family:var(--font-barlow)]"
            >
              ← Back to Program
            </Link>

            {dy < 4 ? (
              <Link
                href={`/my-programs/workouts/${slug}/week/${wk}/day/${dy + 1}`}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-950 [font-family:var(--font-barlow)] hover:gap-3 transition-all duration-200"
              >
                Next Day <ChevronRight className="size-3.5" />
              </Link>
            ) : wk < weeks.length ? (
              <Link
                href={`/my-programs/workouts/${slug}/week/${wk + 1}/day/1`}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-950 [font-family:var(--font-barlow)] hover:gap-3 transition-all duration-200"
              >
                Next Week <ChevronRight className="size-3.5" />
              </Link>
            ) : (
              <span className="text-xs font-black uppercase tracking-widest text-[#C9953A] [font-family:var(--font-barlow)]">
                Program Complete 🏆
              </span>
            )}
          </div>

        </div>
      </section>

    </main>
  )
}
