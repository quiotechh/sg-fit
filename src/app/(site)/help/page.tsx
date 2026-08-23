import Link from "next/link"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { Mail, Clock, FileText, RotateCcw, ShieldCheck } from "lucide-react"
import HelpForm from "./HelpForm"
import { auth } from "@/lib/auth"

export const metadata = {
  title: "Help & Support — SG Fit",
}

const quickLinks = [
  { label: "FAQ",             subtitle: "Common questions answered",  href: "/support/faq",            icon: FileText   },
  { label: "Refund Policy",   subtitle: "How refunds work",           href: "/support/refund-policy",   icon: RotateCcw  },
  { label: "Terms of Use",    subtitle: "Legal stuff",                href: "/support/terms",           icon: ShieldCheck },
]

export default async function HelpPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/login")

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-10 xl:px-16 py-10 sm:py-16 xl:py-20">

        {/* ── PAGE HEADER ────────────────────────────────────────────── */}
        <div className="mb-12 sm:mb-16">
          <p
            className="text-[10px] sm:text-xs font-black uppercase tracking-[0.28em] mb-2 [font-family:var(--font-barlow)]"
            style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Account · Help
          </p>
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black uppercase leading-none tracking-tight text-zinc-950 [font-family:var(--font-barlow)] mb-2">
            How Can We Help?
          </h1>
          <p className="text-sm sm:text-base font-medium text-zinc-400 [font-family:var(--font-barlow)] max-w-lg">
            Having trouble with your programs, billing, or anything else? Send us a message — we'll sort it out.
          </p>
        </div>

        {/* ── TWO COLUMN LAYOUT ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] gap-10 xl:gap-16 items-start">

          {/* ── LEFT: Info panel ──────────────────────────────────────── */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-8">

            {/* Personalized greeting card */}
            <div className="relative rounded-2xl overflow-hidden bg-zinc-950 p-7 sm:p-8 flex flex-col gap-4">
              {/* Subtle decorative */}
              <span
                className="absolute -bottom-4 -right-4 text-[90px] font-black uppercase leading-none select-none pointer-events-none text-transparent [font-family:var(--font-barlow)]"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.04)" }}
              >
                HELP
              </span>

              <div className="flex flex-col gap-1 relative z-10">
                <p
                  className="text-[10px] font-black uppercase tracking-[0.25em] [font-family:var(--font-barlow)]"
                  style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  We've Got You
                </p>
                <p className="text-xl sm:text-2xl font-black uppercase leading-tight tracking-tight text-white [font-family:var(--font-barlow)]">
                  Real support,<br />real fast.
                </p>
              </div>

              <p className="text-sm font-medium text-white/50 [font-family:var(--font-barlow)] leading-relaxed relative z-10">
                Every message lands directly with our team. No bots, no ticket queues — just a real reply.
              </p>

              {/* Response time badge */}
              <div className="flex items-center gap-2.5 relative z-10">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <p className="text-xs font-bold text-white/50 [font-family:var(--font-barlow)] uppercase tracking-widest">
                  Typically replies within 24 hours
                </p>
              </div>
            </div>

            {/* Direct email */}
            <a
              href="mailto:sgfitza@gmail.com"
              className="group flex items-center gap-4 rounded-2xl border-2 border-zinc-100 hover:border-zinc-950 p-5 sm:p-6 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-zinc-950 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                <Mail className="size-5 text-[#F0CC72]" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 [font-family:var(--font-barlow)]">
                  Or email directly
                </span>
                <span className="text-sm sm:text-base font-black text-zinc-950 [font-family:var(--font-barlow)] group-hover:underline underline-offset-2 truncate">
                  sgfitza@gmail.com
                </span>
              </div>
              <Clock className="size-4 text-zinc-300 ml-auto shrink-0" />
            </a>

            {/* Quick links */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 [font-family:var(--font-barlow)]">
                Quick Links
              </p>
              <div className="flex flex-col gap-2">
                {quickLinks.map(({ label, subtitle, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex items-center gap-4 rounded-xl border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50 px-4 py-3.5 transition-all duration-150"
                  >
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 group-hover:bg-zinc-200 flex items-center justify-center shrink-0 transition-colors duration-150">
                      <Icon className="size-3.5 text-zinc-500" />
                    </div>
                    <div className="flex flex-col gap-0 flex-1 min-w-0">
                      <span className="text-sm font-black uppercase tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">{label}</span>
                      <span className="text-xs font-medium text-zinc-400 [font-family:var(--font-barlow)]">{subtitle}</span>
                    </div>
                    <span className="text-xs font-bold text-zinc-300 group-hover:text-zinc-950 transition-colors [font-family:var(--font-barlow)] shrink-0">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT: Form card ───────────────────────────────────────── */}
          <div className="flex flex-col gap-4">

            {/* Form header */}
            <div className="mb-2">
              <p
                className="text-[10px] font-black uppercase tracking-[0.25em] mb-1.5 [font-family:var(--font-barlow)]"
                style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                Send a Message
              </p>
              <h2 className="text-2xl sm:text-3xl xl:text-4xl font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)]">
                <span className="text-transparent" style={{ WebkitTextStroke: "1px #09090b" }}>Tell Us</span>
                {" "}
                <span className="text-zinc-950">What's Up.</span>
              </h2>
            </div>

            {/* Form in styled card */}
            <div className="rounded-3xl border-2 border-zinc-100 bg-white p-6 sm:p-8 xl:p-10">
              <HelpForm />
            </div>

          </div>

        </div>

      </section>
    </main>
  )
}
