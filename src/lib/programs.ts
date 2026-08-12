import { prisma } from "@/lib/prisma";

export function getProgramsByCategory(category: string) {
  return prisma.program.findMany({ where: { category } });
}

export function getProgramBySlug(category: string, slug: string) {
  return prisma.program.findFirst({ where: { category, slug } });
}

export function getAllProgramSlugs() {
  return prisma.program.findMany({ select: { category: true, slug: true } });
}

export async function getUserPurchasePrograms(
  userId: string,
  category: string,
) {
  const purchases = await prisma.purchase.findMany({
    where: { userId, program: { category } },
    include: { program: true },
    orderBy: { purchasedAt: "desc" },
  });
  return purchases.map((p) => p.program);
}

export function getPurchase(userId: string, programId: string) {
  return prisma.purchase.findUnique({
    where: { userId_programId: { userId, programId } },
    select: { id: true },
  });
}

export async function getPurchasedProgram(
  userId: string,
  category: string,
  slug: string,
) {
  const program = await getProgramBySlug(category, slug);
  if (!program) return null;

  const purchase = await getPurchase(userId, program.id);
  if (!purchase) return null;

  return { ...program, purchaseId: purchase.id };
}

export function getDayTemplate(
  programId: string,
  weekNumber: number,
  dayNumber: number,
) {
  return prisma.dayTemplate.findUnique({
    where: {
      programId_weekNumber_dayNumber: { programId, weekNumber, dayNumber },
    },
  });
}

export async function getPurchasedDayTemplate(
  userId: string,
  category: string,
  slug: string,
  weekNumber: number,
  dayNumber: number,
) {
  const program = await getPurchasedProgram(userId, category, slug);
  if (!program) return null;

  const dayTemplate = await getDayTemplate(program.id, weekNumber, dayNumber);
  if (!dayTemplate) return null;

  return { program, dayTemplate };
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

export async function getProgressCounts(programId: string, purchaseId: string) {
  const totalDays = await prisma.dayTemplate.count({
    where: { programId },
  });
  const completedCount = await prisma.dayProgress.count({
    where: { purchaseId },
  });
  return { totalDays, completedCount };
}

export function getWeekDays(programId: string, weekNumber: number) {
  return prisma.dayTemplate.findMany({
    where: { programId, weekNumber },
    orderBy: { dayNumber: "asc" },
  });
}

export async function getProgramWeeksGrouped(programId: string) {
  const templates = await prisma.dayTemplate.findMany({
    where: { programId },
    orderBy: [{ weekNumber: "asc" }, { dayNumber: "asc" }],
  });

  const weeksMap = new Map<number, typeof templates>();
  for (const t of templates) {
    if (!weeksMap.has(t.weekNumber)) weeksMap.set(t.weekNumber, []);
    weeksMap.get(t.weekNumber)!.push(t);
  }

  return Array.from(weeksMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([weekNumber, days]) => ({ weekNumber, days }));
}

export async function getWeeklyActivity(userId: string, weeksBack: number = 8) {
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

