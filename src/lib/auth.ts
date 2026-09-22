import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthMiddleware } from "better-auth/api";
import { prisma } from "@/lib/prisma";
import { logEvent } from "@/lib/auditLog";
import { transporter } from "@/lib/mailer";
import { buildVerificationEmail } from "@/lib/verificationEmail";

const VERIFICATION_LINK_EXPIRES_IN_SECONDS = 60 * 60; // 1 hour

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailVerification: {
    // Email/password users can't log in until they click the link. Google
    // users are unaffected — Google itself vouches for the address, and
    // Better Auth marks them verified straight from the provider.
    sendOnSignUp: true,
    // Correct password + unverified email → 403 AND a fresh link is emailed,
    // so someone who lost the first email isn't locked out. (Only fires after
    // the password checks out, so it can't be used to spam arbitrary inboxes.)
    sendOnSignIn: true,
    // Clicking the link both verifies and signs them in — no second login step.
    autoSignInAfterVerification: true,
    expiresIn: VERIFICATION_LINK_EXPIRES_IN_SECONDS,
    sendVerificationEmail: async ({ user, url }) => {
      const { html, text } = buildVerificationEmail({
        name: user.name,
        url,
        expiresInMinutes: VERIFICATION_LINK_EXPIRES_IN_SECONDS / 60,
      });

      // Deliberately NOT awaited (per Better Auth's own guidance): awaiting
      // the SMTP round-trip makes response time reveal whether an email
      // exists. The outcome is still audit-logged either way, from the callbacks.
      transporter
        .sendMail({
          from: process.env.GMAIL_USER,
          to: user.email,
          subject: "Verify your email — SG Fit",
          text,
          html,
        })
        .then(() =>
          logEvent({
            userId: user.id,
            userEmail: user.email,
            event: "email.verification_sent",
            success: true,
            metadata: {
              message: `Verification email sent to ${user.email}. They must click the link before they can log in.`,
            },
          }),
        )
        .catch((err) =>
          logEvent({
            userId: user.id,
            userEmail: user.email,
            event: "email.verification_send_failed",
            success: false,
            metadata: {
              message: `Failed to send the verification email to ${user.email} — they cannot log in until it's resent.`,
              error: String(err),
            },
          }),
        );
    },
    afterEmailVerification: async (user) => {
      await logEvent({
        userId: user.id,
        userEmail: user.email,
        event: "auth.email_verified",
        success: true,
        metadata: {
          message: `${user.email} verified their email address by clicking the link.`,
        },
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
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

  databaseHooks: {
    user: {
      create: {
        // Signup is logged here rather than in `hooks.after`: with email
        // verification required, /sign-up/email creates no session (so
        // `newSession` is never set), and it returns the same 200 for an
        // already-registered email (anti-enumeration) — so the path alone
        // can't tell a real signup from a duplicate. A created user row can.
        after: async (user, ctx) => {
          if (ctx?.path !== "/sign-up/email") return;
          await logEvent({
            userId: user.id,
            userEmail: user.email,
            event: "auth.signup",
            success: true,
            ipAddress: ctx.headers?.get("x-forwarded-for") ?? undefined,
            userAgent: ctx.headers?.get("user-agent") ?? undefined,
            metadata: {
              message: `${user.email} created an account with email + password. They can't log in until they verify their email.`,
            },
          });
        },
      },
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
        (ctx.path.startsWith("/sign-in") ||
          ctx.path.startsWith("/callback") ||
          // autoSignInAfterVerification creates the session on this path
          ctx.path === "/verify-email") &&
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
