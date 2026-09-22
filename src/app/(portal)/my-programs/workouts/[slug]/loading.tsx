import { Skeleton } from "@/components/ui/skeleton"

// Matches page.tsx's split-hero (breadcrumb + visual panel + progress panel).
export default function Loading() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <section className="px-4 sm:px-10 xl:px-16 py-6 sm:py-12 xl:py-14">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-3 w-64 mb-6 sm:mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-start mb-10">
            <Skeleton className="rounded-2xl sm:rounded-3xl min-h-64 sm:min-h-96 w-full" />
            <Skeleton className="rounded-2xl min-h-64 sm:min-h-96 w-full" />
          </div>

          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
