import { prisma } from "@/lib/prisma";
import { getSignedViewUrl } from "@/lib/r2";

const measurementFields = [
  "weightKg",
  "waistIn",
  "chestIn",
  "hipsIn",
  "armsIn",
  "thighsIn",
] as const;

// dashboard function
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
    { value: number; recordedAt: Date; delta: number | null } | null
  > = {
    weightKg: null,
    waistIn: null,
    chestIn: null,
    hipsIn: null,
    armsIn: null,
    thighsIn: null,
  };

  for (const field of measurementFields) {
    const matches = entries.filter((e) => e[field] !== null);
    if (matches.length > 0) {
      const current = matches[0];
      const previous = matches[1];
      const delta = previous ? current[field]! - previous[field]! : null;
      latest[field] = {
        value: current[field]!,
        recordedAt: current.recordedAt,
        delta,
      };
    }
  }

  return latest;
}

export async function getAllBodyMetrics(userId: string) {
  const entries = await prisma.bodyMetric.findMany({
    where: { userId },
    orderBy: { recordedAt: "desc" },
  });

  return Promise.all(
    entries.map(async ({ photoKey, ...rest }) => ({
      ...rest,
      photoUrl: photoKey ? await getSignedViewUrl(photoKey) : null,
    })),
  );
}

export function getLatestBodyMetric(userId: string) {
  return prisma.bodyMetric.findFirst({
    where: { userId },
    orderBy: { recordedAt: "desc" },
  });
}

// dashboard function
export async function getLatestPhoto(userId: string) {
  const entry = await prisma.bodyMetric.findFirst({
    where: { userId, photoKey: { not: null } },
    orderBy: { recordedAt: "desc" },
    select: { photoKey: true, recordedAt: true },
  });

  if (!entry?.photoKey) return null;
  return { photoUrl: await getSignedViewUrl(entry.photoKey), recordedAt: entry.recordedAt };
}

// for graph - give history for N number of weeks back, default 12 weeks
// Also used by dashboard
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
