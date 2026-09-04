import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { purgeUserData } from "@/lib/account-purge";

const GRACE_PERIOD_DAYS = 30;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - GRACE_PERIOD_DAYS);

  const dueUsers = await prisma.user.findMany({
    where: { deletionRequestedAt: { lte: cutoff } },
    select: { id: true },
  });

  for (const user of dueUsers) {
    await purgeUserData(user.id).catch((err) => {
      console.error("Failed to purge user:", user.id, err);
    });
  }

  return NextResponse.json({ purged: dueUsers.length });
}
