import { Skeleton } from "@/components/ui/skeleton"

// Matches page.tsx's breadcrumb + video-grid layout.
export default function Loading() {
  return (
    <main className="flex flex-col min-h-screen bg-zinc-50">
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-10 xl:px-16 py-10 sm:py-16 xl:py-20">
        <Skeleton className="h-3 w-40 mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-video rounded-2xl w-full" />
          ))}
        </div>
      </section>
    </main>
  )
}
