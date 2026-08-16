import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { ChevronRight, Sparkles, Flame, Dumbbell, Scale, Target } from "lucide-react";
import { auth } from "@/lib/auth";
import {
  getActivityHeatmapData,
  getMostRecentProgramProgress,
} from "@/lib/data/progress";
import {
  getLatestMeasurements,
  getBodyMetricHistory,
  getLatestPhoto,
} from "@/lib/data/body-metrics";
import { getUserPurchasePrograms } from "@/lib/data/purchases";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import ProgramProgressCard from "@/components/ProgramProgressCard";
import WeightTrendChart from "@/components/WeightTrendChart";
import LatestMeasurementsCard from "@/components/LatestMeasurementsCard";
import CommunityCard from "@/components/CommunityCard";
import DashboardPhotoCard from "@/components/DashboardPhotoCard";
import WorkoutLibrarySlider from "@/components/WorkoutLibrarySlider";
import WorkoutCalendar from "@/components/WorkoutCalendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Dashboard — SG Fit",
};

const cardTitleCls =
  "text-xs font-black uppercase tracking-widest [font-family:var(--font-barlow)]";
const darkCardCls = "rounded-2xl bg-zinc-950 border-0 shadow-lg shadow-zinc-900/10";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const [activityData, latestMeasurements, currentProgram, weightHistory, latestPhoto, purchasedPrograms] =
    await Promise.all([
      getActivityHeatmapData(session.user.id, 364),
      getLatestMeasurements(session.user.id),
      getMostRecentProgramProgress(session.user.id),
      getBodyMetricHistory(session.user.id),
      getLatestPhoto(session.user.id),
      getUserPurchasePrograms(session.user.id, "workouts"),
    ]);

  const recentPrograms = purchasedPrograms
    .filter((p) => p.slug !== currentProgram?.slug)
    .slice(0, 3);

  let streak = 0;
  for (let i = activityData.length - 1; i >= 0; i--) {
    if (activityData[i].count > 0) streak++;
    else break;
  }
  const weekSessions = activityData
    .slice(-7)
    .reduce((sum, d) => sum + d.count, 0);

  const firstName = session.user.name?.split(" ")[0];

  const stats = [
    { icon: Flame, label: "Day Streak", value: String(streak) },
    { icon: Dumbbell, label: "This Week", value: String(weekSessions) },
    {
      icon: Scale,
      label: "Weight",
      value: latestMeasurements.weightKg ? `${latestMeasurements.weightKg.value} kg` : "—",
    },
    {
      icon: Target,
      label: "Program",
      value: currentProgram ? `${currentProgram.percent}%` : "—",
    },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-zinc-50">
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-10 xl:px-16 py-10 sm:py-14 xl:py-16">
        <div className="flex items-center gap-2.5 mb-6 sm:mb-8">
          <div className="w-9 h-9 rounded-lg bg-zinc-950 flex items-center justify-center shrink-0">
            <Sparkles className="size-4 text-[#F0CC72]" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
            Welcome back, {firstName}
          </h1>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 sm:mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border-2 border-zinc-100 bg-white hover:border-zinc-950 transition-colors p-4 sm:p-5 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center shrink-0">
                <s.icon className="size-4 text-[#F0CC72]" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-black text-zinc-950 leading-none [font-family:var(--font-barlow)]">
                  {s.value}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 [font-family:var(--font-barlow)] mt-1">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Program + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 sm:gap-8 items-start mb-10 sm:mb-14">
          <ProgramProgressCard program={currentProgram} />

          <Card className={darkCardCls}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className={`${cardTitleCls} text-white`}>
                Weekly Activity
              </CardTitle>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 [font-family:var(--font-barlow)]">
                Training Consistency
              </span>
            </CardHeader>
            <CardContent>
              <ActivityHeatmap data={activityData} />
            </CardContent>
          </Card>
        </div>

        {/* My Programs */}
        {recentPrograms.length > 0 && (
          <>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#C9953A] [font-family:var(--font-barlow)] mb-4 sm:mb-6">
              My Programs
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14">
              {recentPrograms.map((p) => (
                <Link
                  key={p.slug}
                  href={`/my-programs/${p.category}/${p.slug}`}
                  className="group rounded-2xl border-2 border-zinc-100 bg-white hover:border-zinc-950 transition-colors p-5 flex flex-col gap-4"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 [font-family:var(--font-barlow)]">
                    {p.category}
                  </span>
                  <p className="text-base font-black uppercase tracking-tight text-zinc-950 [font-family:var(--font-barlow)] leading-tight">
                    {p.title}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-zinc-950 [font-family:var(--font-barlow)] group-hover:gap-2.5 transition-all">
                    View Program
                    <ChevronRight className="size-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Body Metrics */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#C9953A] [font-family:var(--font-barlow)]">
            Body Metrics
          </p>
          <Link
            href="/measurements"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-zinc-950 hover:gap-2.5 transition-all [font-family:var(--font-barlow)]"
          >
            View Full History
            <ChevronRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch mb-10 sm:mb-14">
          <Card className={darkCardCls}>
            <CardHeader>
              <CardTitle className={`${cardTitleCls} text-white`}>
                Weight Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WeightTrendChart data={weightHistory} />
            </CardContent>
          </Card>

          <Card className={darkCardCls}>
            <CardHeader>
              <CardTitle className={`${cardTitleCls} text-white`}>
                Latest Measurements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LatestMeasurementsCard measurements={latestMeasurements} />
            </CardContent>
          </Card>
        </div>

        {/* Workout Library + Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 sm:gap-8 items-stretch mb-10 sm:mb-14">
          <WorkoutLibrarySlider />

          <Card className="rounded-2xl border border-zinc-100 bg-white">
            <CardHeader>
              <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 [font-family:var(--font-barlow)]">
                Workout Calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center pt-0">
              <WorkoutCalendar activityData={activityData} />
            </CardContent>
          </Card>
        </div>

        {/* Community */}
        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#C9953A] [font-family:var(--font-barlow)] mb-4 sm:mb-6">
          Community
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          <CommunityCard />

          <DashboardPhotoCard
            latestPhoto={
              latestPhoto?.photoUrl
                ? { photoUrl: latestPhoto.photoUrl, recordedAt: latestPhoto.recordedAt }
                : null
            }
          />
        </div>
      </section>
    </main>
  );
}
