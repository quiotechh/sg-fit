import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { getBodyMetricHistory, getLatestMeasurements, getAllBodyMetrics } from "@/lib/data/body-metrics";
import WeightTrendChart from "@/components/WeightTrendChart";
import LatestMeasurementsCard from "@/components/LatestMeasurementsCard";
import BodyMetricForm from "@/components/BodyMetricForm";
import BodyMetricHistoryTable from "@/components/BodyMetricHistoryTable";
import ProgressPhotoGallery from "@/components/ProgressPhotoGallery";
import PhotoUploadCard from "@/components/PhotoUploadCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Measurements — SG Fit",
};

const cardCls = "rounded-2xl border border-zinc-100 bg-white shadow-sm ring-0";
const cardTitleCls = "text-xs font-black uppercase tracking-widest text-zinc-950 [font-family:var(--font-barlow)]";

export default async function MeasurementsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const weightHistory = await getBodyMetricHistory(session.user.id);
  const latestMeasurements = await getLatestMeasurements(session.user.id);
  const allMetrics = await getAllBodyMetrics(session.user.id);

  return (
    <main className="flex flex-col min-h-screen bg-zinc-50">
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-10 xl:px-16 py-10 sm:py-16 xl:py-20">
        <div className="flex flex-wrap items-center gap-1.5 text-zinc-400 text-xs font-bold uppercase tracking-wide [font-family:var(--font-barlow)] mb-8">
          <Link href="/dashboard" className="hover:text-zinc-950 transition-colors">Dashboard</Link>
          <ChevronRight className="size-3 shrink-0" />
          <span className="text-zinc-950">Measurements</span>
        </div>

        <div className="mb-10 sm:mb-14">
          <p
            className="text-[10px] sm:text-xs font-black uppercase tracking-[0.28em] mb-2 [font-family:var(--font-barlow)]"
            style={{
              background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Progress
          </p>
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black uppercase leading-none tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
            Measurements
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <Card className="rounded-2xl bg-zinc-950 border-0 shadow-lg shadow-zinc-900/10">
            <CardHeader>
              <CardTitle className={`${cardTitleCls} text-white`}>Weight Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <WeightTrendChart data={weightHistory} />
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-zinc-950 border-0 shadow-lg shadow-zinc-900/10">
            <CardHeader>
              <CardTitle className={`${cardTitleCls} text-white`}>Latest Measurements</CardTitle>
            </CardHeader>
            <CardContent>
              <LatestMeasurementsCard measurements={latestMeasurements} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
          <Card className={cardCls}>
            <CardHeader>
              <CardTitle className={cardTitleCls}>Log New Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <BodyMetricForm path="/measurements" />
            </CardContent>
          </Card>

          <PhotoUploadCard path = "/measurements" />
        </div>

        <Card className="rounded-2xl bg-zinc-950 border-0 shadow-lg shadow-zinc-900/10 mt-6 sm:mt-8">
          <CardHeader>
            <CardTitle className={`${cardTitleCls} text-white`}>History</CardTitle>
          </CardHeader>
          <CardContent>
            <BodyMetricHistoryTable entries={allMetrics} />
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-zinc-950 border-0 shadow-lg shadow-zinc-900/10 mt-6 sm:mt-8">
          <CardHeader>
            <CardTitle className={`${cardTitleCls} text-white`}>Progress Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressPhotoGallery entries={allMetrics} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
