import { Skeleton } from "@/components/ui/skeleton"

// Matches page.tsx's header + two-card grid layout.
export default function Loading() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-10 xl:px-16 py-10 sm:py-16 xl:py-20">
        <div className="mb-10 sm:mb-14">
          <Skeleton className="h-3 w-20 mb-2" />
          <Skeleton className="h-10 sm:h-12 w-56" />
          <Skeleton className="h-4 w-72 mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 xl:gap-8">
          <Skeleton className="rounded-2xl h-72 sm:h-96 w-full" />
          <Skeleton className="rounded-2xl h-72 sm:h-96 w-full" />
        </div>
      </section>
    </main>
  )
}
