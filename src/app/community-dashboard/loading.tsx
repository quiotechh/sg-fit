import { Skeleton } from "@/components/ui/skeleton"

// Generic feed skeleton — CommunityDashboardClient renders its own chrome
// (sidebar/topbar), so this only needs to look like a loading feed column.
export default function Loading() {
  return (
    <main className="flex flex-col min-h-screen bg-zinc-50">
      <section className="max-w-3xl mx-auto w-full px-4 py-10 flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="rounded-2xl h-40 w-full" />
        ))}
      </section>
    </main>
  )
}
