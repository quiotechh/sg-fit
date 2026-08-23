import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ArrowRight, Dumbbell, Utensils } from "lucide-react";
import { auth } from "@/lib/auth";
import { getUserPurchasePrograms } from "@/lib/data/purchases";

export const metadata = {
  title: "My Programs — SG Fit",
};

const categories = [
  {
    label: "Workout",
    sublabel: "Programs",
    href: "/my-programs/workouts",
    ctaLabel: "View My Workouts",
    icon: Dumbbell,
    decorative: "TRAIN",
    gradient: "from-zinc-800 via-zinc-900 to-zinc-950",
    accentFrom: "#C9953A",
    accentTo: "#F0CC72",
  },
  {
    label: "Nutrition",
    sublabel: "Guides",
    href: "/my-programs/nutrition",
    ctaLabel: "Browse Guides",
    icon: Utensils,
    decorative: "FUEL",
    gradient: "from-zinc-700 via-zinc-800 to-zinc-950",
    accentFrom: "#C9953A",
    accentTo: "#F0CC72",
  },
];

export default async function MyProgramsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const [workoutPurchases, nutritionPurchases] = await Promise.all([
    getUserPurchasePrograms(session.user.id, "workouts"),
    getUserPurchasePrograms(session.user.id, "nutrition"),
  ]);

  const purchasedCounts: Record<string, number> = {
    "/my-programs/workouts": workoutPurchases.length,
    "/my-programs/nutrition": nutritionPurchases.length,
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-10 xl:px-16 py-10 sm:py-16 xl:py-20">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <p
            className="text-[10px] sm:text-xs font-black uppercase tracking-[0.28em] mb-2 [font-family:var(--font-barlow)]"
            style={{
              background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Account
          </p>
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black uppercase leading-none tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
            My Programs
          </h1>
          <p className="mt-2 text-sm sm:text-base font-medium text-zinc-400 [font-family:var(--font-barlow)]">
            Your purchased programs and guides, all in one place.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 xl:gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const purchased = purchasedCounts[cat.href];
            const hasPurchased = purchased > 0;

            return (
              <Link
                key={cat.href}
                href={cat.href}
                className={`group relative rounded-3xl overflow-hidden bg-linear-to-br ${cat.gradient}
                  flex flex-col justify-between
                  min-h-72 sm:min-h-96 xl:min-h-105
                  p-7 sm:p-10 xl:p-12
                  transition-transform duration-300 hover:scale-[1.015]`}
              >
                {/* Decorative ghost word — bottom right */}
                <span
                  className="absolute bottom-0 right-0 translate-x-4 translate-y-5 text-[100px] sm:text-[130px] xl:text-[160px] font-black uppercase leading-none select-none pointer-events-none [font-family:var(--font-barlow)] text-transparent"
                  style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.06)" }}
                >
                  {cat.decorative}
                </span>

                {/* Top: icon badge + purchased count */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${cat.accentFrom}22, ${cat.accentTo}11)`,
                      border: `1px solid ${cat.accentFrom}33`,
                    }}
                  >
                    <Icon
                      className="size-5 sm:size-6"
                      style={{ color: cat.accentFrom }}
                    />
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span
                      className="text-4xl sm:text-5xl xl:text-6xl font-black leading-none [font-family:var(--font-barlow)]"
                      style={{
                        background: `linear-gradient(135deg, ${cat.accentFrom}, ${cat.accentTo})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {purchased}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 [font-family:var(--font-barlow)]">
                      {purchased === 1 ? "program" : "programs"}
                    </span>
                  </div>
                </div>

                {/* Bottom: title + CTA */}
                <div className="flex flex-col gap-5 sm:gap-6 relative z-10">
                  <div>
                    <p className="text-white/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] [font-family:var(--font-barlow)] mb-1">
                      {hasPurchased ? "Purchased" : "No purchases yet"}
                    </p>
                    <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black uppercase leading-none tracking-tight text-white [font-family:var(--font-barlow)]">
                      {cat.label}
                      <br />
                      {cat.sublabel}
                    </h2>
                  </div>

                  <div
                    className="self-start inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-zinc-950 text-xs sm:text-sm font-black uppercase tracking-widest [font-family:var(--font-barlow)] group-hover:gap-4 transition-all duration-200"
                    style={{
                      background: `linear-gradient(135deg, ${cat.accentFrom}, ${cat.accentTo}, #B8841F)`,
                    }}
                  >
                    {cat.ctaLabel}
                    <ArrowRight className="size-3.5 sm:size-4 shrink-0" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
