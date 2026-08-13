"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { bodyMetricSchema } from "@/lib/validation/body-metrics";

export async function addBodyMetric(data: unknown) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const parsed = bodyMetricSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  const { path, ...metrics } = parsed.data;
  const fieldsToLog = Object.keys(metrics) as (keyof typeof metrics)[];

  for (const field of fieldsToLog) {
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

  await prisma.bodyMetric.create({
    data: { userId: session.user.id, ...metrics },
  });

  revalidatePath(path);
}
