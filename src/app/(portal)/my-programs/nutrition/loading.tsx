import { Skeleton } from "@/components/ui/skeleton"

// Matches page.tsx's breadcrumb + guide-card grid layout.
export default function Loading() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-10 xl:px-16 py-8 sm:py-14 xl:py-16">
        <Skeleton className="h-3 w-56 mb-10 sm:mb-14" />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="aspect-4/3 rounded-2xl w-full" />
          ))}
        </div>
      </section>
    </main>
  )
}
