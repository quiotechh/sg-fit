import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { auth } from "@/lib/auth";
import WorkoutLibraryClient from "@/components/WorkoutLibraryClient";

export const metadata = {
  title: "Workout Library — SG Fit",
};

export default async function WorkoutLibraryPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return (
    <main className="flex flex-col min-h-screen bg-zinc-50">
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-10 xl:px-16 py-10 sm:py-16 xl:py-20">
        <div className="flex flex-wrap items-center gap-1.5 text-zinc-400 text-xs font-bold uppercase tracking-wide [font-family:var(--font-barlow)] mb-8">
          <Link href="/dashboard" className="hover:text-zinc-950 transition-colors">Dashboard</Link>
          <ChevronRight className="size-3 shrink-0" />
          <span className="text-zinc-950">Workout Library</span>
        </div>

        <div className="mb-10 sm:mb-12">
          <p
            className="text-xs sm:text-sm font-black uppercase tracking-[0.28em] mb-2 [font-family:var(--font-barlow)]"
            style={{
              background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Exercise Library
          </p>
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black uppercase leading-none tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
            Workout{" "}
            <span className="sm:hidden" style={{ WebkitTextStroke: "1px #09090b", color: "transparent" }}>Library</span>
            <span className="hidden sm:inline" style={{ WebkitTextStroke: "2px #09090b", color: "transparent" }}>Library</span>
          </h1>
          <p className="mt-2 text-zinc-500 text-sm sm:text-base font-medium [font-family:var(--font-barlow)]">
            Short-form demo videos for every move in your programs.
          </p>
        </div>

        <WorkoutLibraryClient />
      </section>
    </main>
  );
}
