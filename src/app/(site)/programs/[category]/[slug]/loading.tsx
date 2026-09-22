import { Skeleton } from "@/components/ui/skeleton"

// Matches the two-column product layout in page.tsx (visual panel + details).
export default function Loading() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 xl:px-16 py-6 sm:py-14 xl:py-16">
          <Skeleton className="h-3 w-56 mb-6 sm:mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 xl:gap-16 items-start">
            {/* Visual panel */}
            <Skeleton className="rounded-2xl sm:rounded-3xl min-h-64 sm:min-h-105 lg:min-h-150 xl:min-h-170 w-full" />

            {/* Details */}
            <div className="flex flex-col gap-5 sm:gap-8">
              <div className="flex flex-col gap-3">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-10 sm:h-14 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>

              <Skeleton className="h-10 w-32" />

              <div className="flex flex-wrap gap-2.5">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-28 rounded-full" />
              </div>

              <div className="h-px bg-zinc-100" />

              <Skeleton className="h-16 w-full" />

              <div className="flex flex-col gap-2.5">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              <div className="h-px bg-zinc-100" />

              <Skeleton className="h-14 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
