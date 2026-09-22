import { Skeleton } from "@/components/ui/skeleton"

// Matches page.tsx's stat-row + two-col + three-card layout.
export default function Loading() {
  return (
    <main className="flex flex-col min-h-screen bg-zinc-50">
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-10 xl:px-16 py-10 sm:py-14 xl:py-16">
        <Skeleton className="h-8 w-56 mb-6 sm:mb-8" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 sm:mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="rounded-2xl h-20" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 sm:gap-8 items-start mb-10 sm:mb-14">
          <Skeleton className="rounded-2xl h-80" />
          <Skeleton className="rounded-2xl h-80" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="rounded-2xl h-40" />
          ))}
        </div>
      </section>
    </main>
  )
}
