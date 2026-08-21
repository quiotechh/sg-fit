import { prisma } from "@/lib/prisma";
import { getProgramWeeksGrouped } from "@/lib/data/day-templates";

export function findNextIncompleteDay(
  weeks: { weekNumber: number; days: { id: string; dayNumber: number }[] }[],
  completedDayIds: Set<string>,
) {
  for (const week of weeks) {
    for (const day of week.days) {
      if (!completedDayIds.has(day.id)) {
        return { weekNumber: week.weekNumber, dayNumber: day.dayNumber };
      }
    }
  }
  return null;
}

export async function getCompletedDayIds(purchaseId: string) {
  const rows = await prisma.dayProgress.findMany({
    where: { purchaseId },
    select: { dayId: true },
  });
  return new Set(rows.map((r) => r.dayId));
}

export async function isDayCompleted(purchaseId: string, dayId: string) {
  const row = await prisma.dayProgress.findUnique({
    where: { purchaseId_dayId: { purchaseId, dayId } },
    select: { id: true },
  });
  return !!row;
}

export async function getProgressCounts(
  programId: string,
  purchaseId: string,
) {
  const totalDays = await prisma.dayTemplate.count({
    where: { programId },
  });
  const completedCount = await prisma.dayProgress.count({
    where: { purchaseId },
  });
  return { totalDays, completedCount };
}

function toLocalDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// dashboard function
export async function getActivityHeatmapData(
  userId: string,
  daysBack: number = 56,
) {
  const now = new Date();
  const rangeStart = new Date(now);
  rangeStart.setDate(rangeStart.getDate() - daysBack);

  // Same underlying query as before — only the aggregation below changed
  // from week-buckets-per-program to a simple day-level count (for the
  // heatmap), so per-program breakdown (title) isn't needed anymore.
  const rows = await prisma.dayProgress.findMany({
    where: {
      purchase: { userId, program: { category: "workouts" } },
      completedAt: { gte: rangeStart },
    },
    select: { completedAt: true },
  });

  const counts = new Map<string, number>();
  for (const row of rows) {
    // Local date key, not toISOString() — UTC conversion silently shifts
    // the date by a day for timezones ahead of UTC.
    const dateKey = toLocalDateKey(row.completedAt);
    counts.set(dateKey, (counts.get(dateKey) ?? 0) + 1);
  }

  const days: { date: string; count: number }[] = [];
  for (let i = daysBack - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateKey = toLocalDateKey(d);
    days.push({ date: dateKey, count: counts.get(dateKey) ?? 0 });
  }

  return days;
}

// dashboard function
export async function getMostRecentProgramProgress(userId: string) {
  const purchase = await prisma.purchase.findFirst({
    where: { userId, program: { category: "workouts" } },
    orderBy: { purchasedAt: "desc" },
    select: {
      id: true,
      program: { select: { id: true, slug: true, title: true } },
    },
  });

  if (!purchase) return null;

  const [weeks, completedDayIds] = await Promise.all([
    getProgramWeeksGrouped(purchase.program.id),
    getCompletedDayIds(purchase.id),
  ]);

  const totalDays = weeks.reduce((sum, week) => sum + week.days.length, 0);
  const nextDay = findNextIncompleteDay(weeks, completedDayIds);

  return {
    slug: purchase.program.slug,
    title: purchase.program.title,
    percent:
      totalDays > 0
        ? Math.round((completedDayIds.size / totalDays) * 100)
        : 0,
    nextDay,
  };
}
