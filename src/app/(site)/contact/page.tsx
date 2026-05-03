import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaTiktok,
} from "react-icons/fa6";
import { Mail, Clock, MessageCircle, ArrowRight } from "lucide-react";
import ContactForm from "./ContactForm";

const socials = [
  {
    label: "Instagram",
    handle: "@sharon_gambu",
    href: "https://www.instagram.com/sharon_gambu/",
    Icon: FaInstagram,
    color: "#E1306C",
  },
  {
    label: "YouTube",
    handle: "@Sharon_ngambu",
    href: "https://www.youtube.com/@Sharon_ngambu",
    Icon: FaYoutube,
    color: "#FF0000",
  },
  {
    label: "Facebook",
    handle: "sharon.memela.73",
    href: "https://www.facebook.com/sharon.memela.73/",
    Icon: FaFacebookF,
    color: "#1877F2",
  },
  {
    label: "TikTok",
    handle: "@sharongambu",
    href: "https://www.tiktok.com/@sharongambu",
    Icon: FaTiktok,
    color: "#09090b",
  },
];

const faqs = [
  {
    q: "How do I access my programs?",
    href: "/support/faq",
  },
  {
    q: "What is your refund policy?",
    href: "/support/refund-policy",
  },
  {
    q: "How do I cancel my subscription?",
    href: "/support/faq",
  },
];

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative h-[60vh] md:h-[65vh] xl:h-[70vh] w-full overflow-hidden bg-zinc-950 -mt-19 xl:-mt-21">
        <Image
          src="/sg-fit-about-2.jpg"
          alt="Contact SG FIT"
          fill
          className="object-cover object-[center_30%] opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-zinc-950/60 via-zinc-950/30 to-zinc-950/90" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-zinc-950 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-10 sm:pb-18 xl:px-16 xl:pb-16">
          <div className="max-w-7xl mx-auto">
            <p
              className="text-[11px] sm:text-xs font-black uppercase tracking-[0.22em] mb-4 [font-family:var(--font-barlow)]"
              style={{
                background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Get In Touch
            </p>
            <h1 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-4xl sm:text-5xl xl:text-6xl mb-5">
              <span
                style={{
                  background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                We&apos;re Here
              </span>
              <br />
              <span className="text-white/85">to Help You.</span>
            </h1>
            <p className="text-white/55 text-sm sm:text-base xl:text-lg font-medium max-w-xl [font-family:var(--font-barlow)] leading-relaxed">
              Whether it&apos;s a question about your program, an order, or a partnership — our team is ready to help.
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT: INFO + FORM ────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 xl:py-24 px-6 sm:px-10 xl:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-12 xl:gap-20">

          {/* ── LEFT: Contact Info ───────────────────────────────────── */}
          <div className="flex flex-col gap-10">

            {/* Email card */}
            <div className="flex flex-col gap-4">
              <p
                className="text-[10px] font-black uppercase tracking-[0.25em] [font-family:var(--font-barlow)]"
                style={{
                  background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Direct Contact
              </p>
              <a
                href="mailto:sgfitza@gmail.com"
                className="group flex items-center gap-5 border-2 border-zinc-100 rounded-2xl p-6 hover:border-zinc-950 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-950 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="size-5" style={{ color: "#F0CC72" }} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 [font-family:var(--font-barlow)]">
                    Email Us
                  </span>
                  <span className="text-base font-black text-zinc-950 [font-family:var(--font-barlow)] group-hover:underline underline-offset-2">
                    sgfitza@gmail.com
                  </span>
                </div>
              </a>
            </div>

            {/* Response time */}
            <div className="flex items-start gap-4 border-l-2 pl-5" style={{ borderColor: "#C9953A" }}>
              <Clock className="size-5 text-zinc-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-zinc-950 [font-family:var(--font-barlow)] mb-1">
                  Response Time
                </p>
                <p className="text-sm font-semibold text-zinc-500 leading-relaxed [font-family:var(--font-barlow)]">
                  We aim to reply within <strong className="text-zinc-950">24–48 hours</strong> on business days (Mon–Fri). For urgent program issues, include your order number.
                </p>
              </div>
            </div>

            {/* Community support */}
            <div className="flex items-start gap-4 border-l-2 pl-5" style={{ borderColor: "#C9953A" }}>
              <MessageCircle className="size-5 text-zinc-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-zinc-950 [font-family:var(--font-barlow)] mb-1">
                  Community Support
                </p>
                <p className="text-sm font-semibold text-zinc-500 leading-relaxed [font-family:var(--font-barlow)]">
                  Need fitness advice or peer support? Join the <Link href="/community" className="text-zinc-950 underline underline-offset-2 hover:opacity-70 transition-opacity">SGians Community</Link> — thousands of women ready to help.
                </p>
              </div>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-5">
              <p
                className="text-[10px] font-black uppercase tracking-[0.25em] [font-family:var(--font-barlow)]"
                style={{
                  background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Find Us Online
              </p>
              <div className="flex flex-col gap-3">
                {socials.map(({ label, handle, href, Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-3 px-4 rounded-xl border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50 transition-all duration-200"
                  >
                    <Icon style={{ color }} className="size-5 shrink-0" />
                    <div className="flex flex-col gap-0">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 [font-family:var(--font-barlow)]">
                        {label}
                      </span>
                      <span className="text-sm font-bold text-zinc-700 [font-family:var(--font-barlow)] group-hover:text-zinc-950 transition-colors">
                        {handle}
                      </span>
                    </div>
                    <ArrowRight className="size-3.5 text-zinc-300 ml-auto group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all duration-200" />
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ quick links */}
            <div className="flex flex-col gap-4 border-t border-zinc-100 pt-8">
              <p
                className="text-[10px] font-black uppercase tracking-[0.25em] [font-family:var(--font-barlow)]"
                style={{
                  background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Common Questions
              </p>
              <div className="flex flex-col gap-2">
                {faqs.map(({ q, href }) => (
                  <Link
                    key={q}
                    href={href}
                    className="group flex items-center justify-between gap-4 py-3 px-4 rounded-xl border border-zinc-100 hover:border-zinc-950 transition-all duration-200"
                  >
                    <span className="text-sm font-semibold text-zinc-600 [font-family:var(--font-barlow)] group-hover:text-zinc-950 transition-colors">
                      {q}
                    </span>
                    <ArrowRight className="size-3.5 text-zinc-300 shrink-0 group-hover:text-zinc-950 group-hover:translate-x-0.5 transition-all duration-200" />
                  </Link>
                ))}
              </div>
              <Link
                href="/support/faq"
                className="text-xs font-black uppercase tracking-widest [font-family:var(--font-barlow)] text-zinc-400 hover:text-zinc-950 transition-colors underline underline-offset-4 mt-1"
              >
                View All FAQs →
              </Link>
            </div>

          </div>

          {/* ── RIGHT: Contact Form ──────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            <div>
              <p
                className="text-[10px] font-black uppercase tracking-[0.25em] mb-3 [font-family:var(--font-barlow)]"
                style={{
                  background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Send a Message
              </p>
              <h2 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-3xl sm:text-4xl xl:text-5xl text-zinc-950">
                <span className="text-transparent" style={{ WebkitTextStroke: "2px #09090b" }}>
                  Drop Us
                </span>
                <br />
                <span className="text-zinc-950">a Line.</span>
              </h2>
            </div>

            <div className="bg-white border-2 border-zinc-100 rounded-3xl p-7 xl:p-10">
              <ContactForm />
            </div>
          </div>

        </div>
      </section>

      {/* ── DARK BOTTOM CTA ─────────────────────────────────────────── */}
      <section className="bg-zinc-950 py-16 sm:py-20 xl:py-24 px-6 sm:px-10 xl:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <p
              className="text-[10px] font-black uppercase tracking-[0.28em] [font-family:var(--font-barlow)]"
              style={{
                background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Not sure where to start?
            </p>
            <h2 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-4xl sm:text-5xl xl:text-6xl text-white">
              <span className="text-transparent" style={{ WebkitTextStroke: "2px #fff" }}>
                Browse Our
              </span>
              <br />
              <span className="text-white">Programs.</span>
            </h2>
            <p className="text-sm sm:text-base font-semibold text-zinc-400 max-w-md [font-family:var(--font-barlow)] leading-relaxed">
              From strength training to nutrition guides, find the right program for your goals and level.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 text-zinc-950 text-sm font-black uppercase tracking-widest px-10 py-4 rounded-full active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)] whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
            >
              Browse Programs
            </Link>
            <Link
              href="/support/faq"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white text-sm font-black uppercase tracking-widest px-10 py-4 rounded-full hover:border-white/60 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)] whitespace-nowrap"
            >
              Visit FAQ
            </Link>
          </div>
        </div>

        <div
          className="mt-14 sm:mt-16 xl:mt-20 h-0.5 w-4/5 sm:w-2/3 xl:w-1/2 mx-auto"
          style={{ background: "linear-gradient(to right, transparent, #52525b, transparent)" }}
        />
      </section>

    </main>
  );
}
