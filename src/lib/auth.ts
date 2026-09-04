import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthMiddleware } from "better-auth/api";
import { prisma } from "@/lib/prisma";
import { logEvent } from "@/lib/auditLog";
import { transporter } from "@/lib/mailer";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      // OAuth-only accounts (e.g. Google) have no "credential" account —
      // recovery for them belongs to the provider, not a password reset.
      const credentialAccount = await prisma.account.findFirst({
        where: { userId: user.id, providerId: "credential" },
      });
      if (!credentialAccount) return;

      void transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: user.email,
        subject: "Reset your password — SG Fit",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  hooks: {
    // Sign-out is logged client-side (Navbar.tsx) via /api/auth-log instead —
    // by the time this "after" hook fires, Better Auth has already destroyed
    // the session, so there's no reliable way to read it from here.
    after: createAuthMiddleware(async (ctx) => {
      const ipAddress = ctx.headers?.get("x-forwarded-for") ?? undefined;
      const userAgent = ctx.headers?.get("user-agent") ?? undefined;
      const newSession = ctx.context.newSession;

      if (
        (ctx.path.startsWith("/sign-in") || ctx.path.startsWith("/callback")) &&
        newSession
      ) {
        await logEvent({
          userId: newSession.user.id,
          userEmail: newSession.user.email,
          event: "auth.login_success",
          success: true,
          ipAddress,
          userAgent,
        });

        // Logging back in during the 30-day grace period undoes a pending
        // account deletion — no separate "cancel" button needed. Queried
        // fresh from the DB rather than trusting newSession.user, since
        // Better Auth's internal session object doesn't reliably carry
        // custom User fields at this point in the request lifecycle.
        const dbUser = await prisma.user.findUnique({
          where: { id: newSession.user.id },
          select: { deletionRequestedAt: true },
        });

        if (dbUser?.deletionRequestedAt) {
          await prisma.user.update({
            where: { id: newSession.user.id },
            data: { deletionRequestedAt: null },
          });
          await logEvent({
            userId: newSession.user.id,
            userEmail: newSession.user.email,
            event: "account.deletion_cancelled",
            success: true,
            ipAddress,
            userAgent,
            metadata: {
              message: `${newSession.user.email} logged back in during their 30-day deletion grace period — deletion cancelled.`,
            },
          });
        }
      }

      if (ctx.path === "/sign-up/email" && newSession) {
        await logEvent({
          userId: newSession.user.id,
          userEmail: newSession.user.email,
          event: "auth.signup",
          success: true,
          ipAddress,
          userAgent,
        });
      }

      if (ctx.path === "/request-password-reset") {
        await logEvent({
          userEmail: ctx.body?.email,
          event: "auth.password_reset_requested",
          success: true,
          ipAddress,
          userAgent,
          metadata: { email: ctx.body?.email },
        });
      }

      if (ctx.path === "/reset-password") {
        await logEvent({
          event: "auth.password_reset_completed",
          success: true,
          ipAddress,
          userAgent,
        });
      }
    }),
  },
});
