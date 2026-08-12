import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getWeeklyActivity } from "@/lib/programs";
import WeeklyActivityChart from "@/components/WeeklyActivityChart";

export const metadata = {
  title: "Dashboard — SG Fit",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const weeklyActivity = await getWeeklyActivity(session.user.id);

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-10 xl:px-16 py-10 sm:py-16 xl:py-20">
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
            Dashboard
          </h1>
        </div>

        <div className="rounded-2xl border border-zinc-200 p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-widest text-zinc-950 [font-family:var(--font-barlow)] mb-6">
            Weekly Activity
          </p>
          <WeeklyActivityChart data={weeklyActivity} />
        </div>
      </section>
    </main>
  );
}
