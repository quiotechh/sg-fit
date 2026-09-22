import { Skeleton } from "@/components/ui/skeleton"

// Matches page.tsx's breadcrumb + two-column chart/history layout.
export default function Loading() {
  return (
    <main className="flex flex-col min-h-screen bg-zinc-50">
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-10 xl:px-16 py-10 sm:py-16 xl:py-20">
        <Skeleton className="h-3 w-40 mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <Skeleton className="rounded-2xl h-72 w-full" />
          <Skeleton className="rounded-2xl h-72 w-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
          <Skeleton className="rounded-2xl h-64 w-full" />
          <Skeleton className="rounded-2xl h-64 w-full" />
        </div>
      </section>
    </main>
  )
}
