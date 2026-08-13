import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { getWeeklyActivity, getMostRecentProgramProgress } from "@/lib/data/progress";
import { getLatestMeasurements } from "@/lib/data/body-metrics";
import WeeklyActivityChart from "@/components/WeeklyActivityChart";
import CurrentProgramRing from "@/components/CurrentProgramRing";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Dashboard — SG Fit",
};

const cardTitleCls =
  "text-xs font-black uppercase tracking-widest [font-family:var(--font-barlow)]";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const weeklyActivity = await getWeeklyActivity(session.user.id);
  const latestMeasurements = await getLatestMeasurements(session.user.id);
  const currentProgram = await getMostRecentProgramProgress(session.user.id);

  const hasMeasurements = Object.values(latestMeasurements).some(
    (m) => m !== null,
  );

  return (
    <main className="flex flex-col min-h-screen bg-zinc-50">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <Card className="rounded-2xl bg-zinc-950 border-0 shadow-lg shadow-zinc-900/10">
            <CardHeader>
              <CardTitle className={`${cardTitleCls} text-white`}>Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <WeeklyActivityChart data={weeklyActivity} />
            </CardContent>
          </Card>

          {currentProgram ? (
            <CurrentProgramRing
              slug={currentProgram.slug}
              title={currentProgram.title}
              percent={currentProgram.percent}
              nextDay={currentProgram.nextDay}
            />
          ) : (
            <Card className="rounded-2xl border border-zinc-100 bg-white shadow-sm items-center justify-center">
              <CardContent className="flex flex-col items-center justify-center gap-4 text-center py-6">
                <p className="text-sm font-bold text-zinc-500 [font-family:var(--font-barlow)]">
                  No active programs yet
                </p>
                <Link
                  href="/programs/workouts"
                  className="inline-flex items-center gap-2 text-zinc-950 text-xs font-black uppercase tracking-widest px-6 py-3 rounded-lg active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
                  style={{
                    background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                  }}
                >
                  Browse Programs
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="rounded-2xl border border-zinc-100 bg-white shadow-sm mt-6 sm:mt-8">
          <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className={`${cardTitleCls} text-zinc-950 mb-1`}>Body Metrics</p>
              <p className="text-xs font-medium text-zinc-400 [font-family:var(--font-barlow)]">
                {hasMeasurements
                  ? `Weight: ${latestMeasurements.weightKg?.value ?? "—"} kg`
                  : "No measurements logged yet"}
              </p>
            </div>
            <Link
              href="/measurements"
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-zinc-950 hover:gap-2.5 transition-all [font-family:var(--font-barlow)]"
            >
              View Full History
              <ChevronRight className="size-3.5" />
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
