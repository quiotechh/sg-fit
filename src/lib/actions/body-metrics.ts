"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { bodyMetricSchema } from "@/lib/validation/body-metrics";
import { deleteObject } from "../r2";

export async function addBodyMetric(data: unknown) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const parsed = bodyMetricSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  const { path, photoKey, ...metrics } = parsed.data;

  if (photoKey && !photoKey.startsWith(`progress-photos/${session.user.id}/`)) {
    throw new Error("Invalid photo.");
  }

  const fieldsToLog = Object.keys(metrics) as (keyof typeof metrics)[];

  // Same calendar day → merge into that one row, don't fragment into
  // multiple rows just because entries were logged at different times.
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  const todayEntry = await prisma.bodyMetric.findFirst({
    where: {
      userId: session.user.id,
      recordedAt: { gte: startOfToday, lt: startOfTomorrow },
    },
  });

  for (const field of fieldsToLog) {
    // Editing a field already logged today is a same-day correction,
    // not a fresh log — skip the cooldown check for it.
    if (todayEntry && todayEntry[field] !== null) continue;

    const lastEntryForField = await prisma.bodyMetric.findFirst({
      where: { userId: session.user.id, [field]: { not: null } },
      orderBy: { recordedAt: "desc" },
      select: { recordedAt: true },
    });

    if (lastEntryForField) {
      const daysSinceLastEntry = Math.floor(
        (Date.now() - lastEntryForField.recordedAt.getTime()) /
          (1000 * 60 * 60 * 24),
      );
      if (daysSinceLastEntry < 7) {
        const daysRemaining = 7 - daysSinceLastEntry;
        throw new Error(
          `You already logged ${field} recently. You can update it again in ${daysRemaining} day(s).`,
        );
      }
    }
  }

  if (todayEntry) {
    if (photoKey && todayEntry.photoKey && todayEntry.photoKey !== photoKey) {
      await deleteObject(todayEntry.photoKey).catch((err) => {
        console.error("failed to delete R2 object:", todayEntry.photoKey, err);
      });
    }
    await prisma.bodyMetric.update({
      where: { id: todayEntry.id },
      data: { ...metrics, ...(photoKey ? { photoKey } : {}) },
    });
  } else {
    await prisma.bodyMetric.create({
      data: {
        userId: session.user.id,
        ...metrics,
        ...(photoKey ? { photoKey } : {}),
      },
    });
  }

  revalidatePath(path);
}

export async function deleteProgressPhoto(entryId: string, path: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const entry = await prisma.bodyMetric.findFirst({
    where: { id: entryId, userId: session.user.id },
    select: { photoKey: true },
  });
  if (!entry?.photoKey) return;

  await prisma.bodyMetric.update({
    where: { id: entryId },
    data: { photoKey: null },
  });

  // Row already updated either way — R2 cleanup failing shouldn't block the user,
  // it's just a storage-cost leak if it fails.
  await deleteObject(entry.photoKey).catch((err) => {
    console.error("Failed to delete R2 object:", entry.photoKey, err);
  });

  revalidatePath(path);
}
