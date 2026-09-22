"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, AlertCircle, Eye, EyeOff, MailWarning } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import ResendVerification from "@/components/ResendVerification";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);

  const inputClass =
    "w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-sm font-semibold text-zinc-950 placeholder:text-zinc-400 outline-none focus:border-zinc-950 focus:bg-white transition-all duration-200 [font-family:var(--font-barlow)]";

  async function handleGoogleLogin() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirect,
    });
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setNeedsVerification(false);
    await authClient.signIn.email(
      { email, password, callbackURL: redirect },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          window.location.href = redirect;
        },
        onError: (ctx) => {
          setLoading(false);
          // 403 = correct password, but the email isn't verified yet. Better
          // Auth has already emailed a fresh link (sendOnSignIn) — not a
          // failed login, so it isn't logged as auth.login_failed either.
          if (ctx.error.status === 403) {
            setNeedsVerification(true);
            return;
          }
          setError(ctx.error.message);
          fetch("/api/auth-log", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              event: "auth.login_failed",
              metadata: { email },
            }),
          });
        },
      },
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <button
        onClick={handleGoogleLogin}
        type="button"
        className="flex items-center justify-center gap-3 w-full py-4 rounded-xl border-2 border-zinc-200 text-zinc-950 text-sm font-black uppercase tracking-widest [font-family:var(--font-barlow)] hover:border-zinc-950 active:scale-95 transition-all duration-150"
      >
        Continue with Google
      </button>

      <div className="flex items-center gap-4">
        <div className="h-px bg-zinc-100 flex-1" />
        <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400 [font-family:var(--font-barlow)]">
          or
        </span>
        <div className="h-px bg-zinc-100 flex-1" />
      </div>

      <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`${inputClass} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-950 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>

        <a
          href="/forgot-password"
          className="self-end text-xs font-bold text-zinc-400 hover:text-zinc-950 transition-colors [font-family:var(--font-barlow)]"
        >
          Forgot password?
        </a>

        {needsVerification && (
          <div className="flex flex-col gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
            <div className="flex items-start gap-3">
              <MailWarning className="size-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-amber-800 [font-family:var(--font-barlow)]">
                Please verify your email first. We&apos;ve just sent a new verification link to{" "}
                <span className="font-black">{email}</span> — check your inbox and spam/junk folder.
              </p>
            </div>
            <ResendVerification
              email={email}
              callbackURL={`/verify-email?next=${encodeURIComponent(redirect)}`}
            />
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
            <AlertCircle className="size-4 text-red-500 shrink-0" />
            <p className="text-sm font-semibold text-red-600 [font-family:var(--font-barlow)]">
              {error}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-3 w-full py-4 rounded-xl text-zinc-950 text-sm font-black uppercase tracking-widest [font-family:var(--font-barlow)] active:scale-95 transition-all duration-150 disabled:opacity-60"
          style={{
            background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
          }}
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Login"}
        </button>
      </form>

      <p className="text-center text-sm font-semibold text-zinc-500 [font-family:var(--font-barlow)]">
        Don&apos;t have an account?{" "}
        <a
          href="/signup"
          className="text-zinc-950 underline underline-offset-2"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}
