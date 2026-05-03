import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { programs } from "@/data/programs"
import MyProgramCard from "@/components/MyProgramCard"

// Mock: slugs the logged-in user has purchased
// Replace with real DB/auth query later
const purchasedSlugs = ["6-week-shred", "hiit-ignite"]

const myPrograms = programs.filter(
  (p) => p.category === "workouts" && purchasedSlugs.includes(p.slug)
)

export const metadata = {
  title: "My Workout Programs — SG Fit",
}

export default function MyWorkoutProgramsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-10 xl:px-16 py-8 sm:py-14 xl:py-16">

        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-1.5 text-zinc-400 text-xs font-bold uppercase tracking-wide [font-family:var(--font-barlow)] mb-10 sm:mb-14">
          <Link href="/my-programs" className="hover:text-zinc-950 transition-colors">
            My Programs
          </Link>
          <ChevronRight className="size-3 shrink-0" />
          <span className="text-zinc-950">My Workout Programs</span>
        </div>

        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <p
            className="text-xs sm:text-sm font-black uppercase tracking-[0.28em] mb-2 [font-family:var(--font-barlow)]"
            style={{
              background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            My Programs
          </p>
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black uppercase leading-none tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
            My Workout Programs
          </h1>
          <p className="mt-2 text-zinc-500 text-sm sm:text-base font-medium [font-family:var(--font-barlow)]">
            {myPrograms.length} program{myPrograms.length !== 1 ? "s" : ""} purchased
          </p>
        </div>

        {myPrograms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {myPrograms.map((program) => (
              <MyProgramCard key={program.slug} program={program} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 sm:py-32 text-center">
            <p className="text-xs font-black uppercase tracking-[0.28em] mb-4 [font-family:var(--font-barlow)] text-zinc-400">
              No Programs Yet
            </p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 [font-family:var(--font-barlow)] mb-3">
              You haven&apos;t purchased<br />any programs yet.
            </h2>
            <p className="text-zinc-500 text-sm font-medium [font-family:var(--font-barlow)] mb-8 max-w-sm">
              Browse our workout programs and start your transformation today.
            </p>
            <Link
              href="/programs/workouts"
              className="inline-flex items-center gap-2 text-zinc-950 text-sm font-black uppercase tracking-widest px-8 py-4 rounded-lg active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
              style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
            >
              Browse Programs
            </Link>
          </div>
        )}

        {/* Browse more */}
        {myPrograms.length > 0 && (
          <div className="mt-16 pt-12 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-zinc-500 [font-family:var(--font-barlow)]">
                Looking for more?
              </p>
              <p className="text-xs text-zinc-400 font-medium [font-family:var(--font-barlow)] mt-0.5">
                Browse all available workout programs.
              </p>
            </div>
            <Link
              href="/programs/workouts"
              className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors [font-family:var(--font-barlow)]"
            >
              Browse Programs →
            </Link>
          </div>
        )}

      </section>
    </main>
  )
}
