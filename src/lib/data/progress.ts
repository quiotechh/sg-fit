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

export async function getWeeklyActivity(
  userId: string,
  weeksBack: number = 8,
) {
  const now = new Date();
  const rangeStart = new Date(now);
  rangeStart.setDate(rangeStart.getDate() - weeksBack * 7);

  const rows = await prisma.dayProgress.findMany({
    where: {
      purchase: { userId, program: { category: "workouts" } },
      completedAt: { gte: rangeStart },
    },
    select: {
      completedAt: true,
      purchase: { select: { program: { select: { title: true } } } },
    },
  });

  const buckets: Record<string, string | number>[] = Array.from(
    { length: weeksBack },
    (_, i) => ({
      label: i === weeksBack - 1 ? "This week" : `${weeksBack - 1 - i}w ago`,
    }),
  );

  for (const row of rows) {
    const daysAgo = Math.floor(
      (now.getTime() - row.completedAt.getTime()) / (1000 * 60 * 60 * 24),
    );
    const weeksAgo = Math.floor(daysAgo / 7);
    const bucketIndex = weeksBack - 1 - weeksAgo;
    if (bucketIndex < 0 || bucketIndex >= weeksBack) continue;

    const title = row.purchase.program.title;
    const bucket = buckets[bucketIndex];
    bucket[title] = ((bucket[title] as number) ?? 0) + 1;
  }

  return buckets;
}

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
