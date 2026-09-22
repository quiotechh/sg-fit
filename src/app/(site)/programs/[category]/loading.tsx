import { Skeleton } from "@/components/ui/skeleton"

// Matches the shape of PageHero + the program grid in page.tsx, so there's
// no layout jump when the real content swaps in.
export default function Loading() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero placeholder — same height as PageHero */}
      <section className="relative h-screen md:h-[75vh] lg:h-[78vh] xl:h-screen w-full overflow-hidden bg-zinc-900 -mt-19 xl:-mt-21" />

      {/* Program grid */}
      <section className="bg-white py-16 sm:py-20 xl:py-24 px-6 sm:px-10 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-12">
            <Skeleton className="h-3 w-32 mb-3" />
            <Skeleton className="h-10 sm:h-12 w-64 sm:w-80" />
            <Skeleton className="h-4 w-40 mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-4/3 rounded-2xl w-full" />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
