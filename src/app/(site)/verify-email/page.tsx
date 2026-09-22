import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { MailWarning } from "lucide-react"
import { auth } from "@/lib/auth"
import VerifyEmailResend from "./VerifyEmailResend"

export const metadata = {
  title: "Verify Email — SG Fit",
}

// Only same-site relative paths — never redirect off-site from a query param.
function safeNext(next: string | undefined) {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return "/dashboard"
  return next
}

// Landing page for the link in the verification email. On success Better Auth
// has already verified the address and signed the user in (autoSignInAfterVerification)
// before redirecting here, so a live session means "verified — carry on".
// Without a session, Better Auth appends ?error=<CODE> (expired/invalid link).
export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>
}) {
  const { error, next } = await searchParams
  const target = safeNext(next)

  const session = await auth.api.getSession({ headers: await headers() })
  if (session && !error) redirect(target)

  const expired = error === "TOKEN_EXPIRED"

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <section className="flex-1 flex items-center justify-center px-6 py-16 sm:py-24">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-2 mb-8 text-center">
            <p
              className="text-[10px] font-black uppercase tracking-[0.25em] [font-family:var(--font-barlow)]"
              style={{
                background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Email Verification
            </p>
            <h1 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-3xl sm:text-4xl text-zinc-950">
              {error ? (expired ? "Link Expired" : "Invalid Link") : "Check Your Inbox"}
            </h1>
          </div>

          <div className="bg-white border-2 border-zinc-100 rounded-3xl p-7 xl:p-10 flex flex-col gap-6">
            {error ? (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
                <MailWarning className="size-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-red-600 [font-family:var(--font-barlow)]">
                  {expired
                    ? "This verification link has expired. Enter your email below and we'll send you a fresh one."
                    : "This verification link isn't valid — it may have already been used. Enter your email below to get a new one."}
                </p>
              </div>
            ) : (
              <p className="text-sm font-medium text-zinc-500 text-center [font-family:var(--font-barlow)]">
                We sent you a verification link. Click it to activate your account.
              </p>
            )}
            <VerifyEmailResend next={target} />
          </div>
        </div>
      </section>
    </main>
  )
}
