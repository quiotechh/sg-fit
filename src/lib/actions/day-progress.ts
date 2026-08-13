"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function markDayComplete(
  purchaseId: string,
  dayId: string,
  path: string,
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const purchase = await prisma.purchase.findUnique({
    where: { id: purchaseId },
    select: { userId: true },
  });

  if (!purchase || purchase.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  await prisma.dayProgress.upsert({
    where: { purchaseId_dayId: { purchaseId, dayId } },
    update: {},
    create: { purchaseId, dayId },
  });

  revalidatePath(path);
}

export async function unmarkDayComplete(
  purchaseId: string,
  dayId: string,
  path: string,
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const purchase = await prisma.purchase.findUnique({
    where: { id: purchaseId },
    select: { userId: true },
  });

  if (!purchase || purchase.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  await prisma.dayProgress.deleteMany({
    where: { purchaseId, dayId },
  });

  revalidatePath(path);
}
