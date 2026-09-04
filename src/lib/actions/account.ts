"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { disableSubscription } from "@/lib/paystack";
import { getUserCommunitySubscription } from "@/lib/data/subscriptions";
import { logEvent } from "@/lib/auditLog";
import { deleteAccountSchema } from "@/lib/validation/account";

// User-facing — cancels billing and logs the user out immediately, but does
// NOT touch their data. Logging back in within 30 days cancels this (see the
// auth.ts login hook). Actual purge happens later via purgeUserData
// (src/lib/account-purge.ts), run by the cron route once 30 days have passed.
export async function requestAccountDeletion(data: unknown) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const parsed = deleteAccountSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const userId = session.user.id;

  const sub = await getUserCommunitySubscription(userId);
  if (sub?.subscriptionCode && sub.emailToken && sub.currentPeriodEnd && sub.currentPeriodEnd > new Date()) {
    await disableSubscription(sub.subscriptionCode, sub.emailToken).catch((err) => {
      console.error("Failed to cancel subscription during account deletion request:", err);
    });
  }

  // Kill active sessions now — Account rows (login credentials) stay intact
  // so a login within the grace period can undo this.
  await prisma.$transaction([
    prisma.session.deleteMany({ where: { userId } }),
    prisma.user.update({ where: { id: userId }, data: { deletionRequestedAt: new Date() } }),
  ]);

  await logEvent({
    userId,
    userEmail: session.user.email,
    event: "account.deletion_requested",
    success: true,
    metadata: { message: `${session.user.email} requested account deletion. Scheduled for permanent purge in 30 days unless they log back in.` },
  });

  return { success: true };
}
