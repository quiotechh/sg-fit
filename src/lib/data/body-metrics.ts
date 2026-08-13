import { prisma } from "@/lib/prisma";

const measurementFields = [
  "weightKg",
  "waistIn",
  "chestIn",
  "hipsIn",
  "armsIn",
  "thighsIn",
] as const;

export async function getLatestMeasurements(userId: string) {
  const entries = await prisma.bodyMetric.findMany({
    where: { userId },
    orderBy: { recordedAt: "desc" },
    select: {
      weightKg: true,
      waistIn: true,
      chestIn: true,
      hipsIn: true,
      armsIn: true,
      thighsIn: true,
      recordedAt: true,
    },
  });

  const latest: Record<
    (typeof measurementFields)[number],
    { value: number; recordedAt: Date } | null
  > = {
    weightKg: null,
    waistIn: null,
    chestIn: null,
    hipsIn: null,
    armsIn: null,
    thighsIn: null,
  };

  for (const field of measurementFields) {
    const entry = entries.find((e) => e[field] !== null);
    if (entry) {
      latest[field] = { value: entry[field]!, recordedAt: entry.recordedAt };
    }
  }

  return latest;
}
export function getAllBodyMetrics(userId: string) {
  return prisma.bodyMetric.findMany({
    where: { userId },
    orderBy: { recordedAt: "desc" },
  });
}

export function getLatestBodyMetric(userId: string) {
  return prisma.bodyMetric.findFirst({
    where: { userId },
    orderBy: { recordedAt: "desc" },
  });
}

// for graph - give history for N number of weeks back, default 12 weeks
export function getBodyMetricHistory(userId: string, weeksBack = 12) {
  const rangeStart = new Date();
  rangeStart.setDate(rangeStart.getDate() - weeksBack * 7);

  return prisma.bodyMetric.findMany({
    where: {
      userId,
      recordedAt: {
        gte: rangeStart,
      },
    },
    orderBy: { recordedAt: "asc" },
  });
}
