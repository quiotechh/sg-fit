"use client"

import { useState } from "react"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

const topics = [
  { label: "Can't access my program", subject: "Program Access Issue" },
  { label: "Billing & payment",        subject: "Billing & Payment"    },
  { label: "Community access",         subject: "Community Access"     },
  { label: "Technical problem",        subject: "Technical Issue"      },
  { label: "Something else",           subject: "Other"                },
]

type Status = "idle" | "sending" | "sent" | "error"

const inputClass =
  "w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-sm font-semibold text-zinc-950 placeholder:text-zinc-400 outline-none focus:border-zinc-950 focus:bg-white transition-all duration-200 [font-family:var(--font-barlow)]"

export default function HelpForm() {
  const [subject, setSubject] = useState("")
  const [form, setForm]       = useState({ name: "", email: "", message: "" })
  const [status, setStatus]   = useState<Status>("idle")

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    if (!subject) return
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject }),
      })
      if (!res.ok) throw new Error()
      setStatus("sent")
      setForm({ name: "", email: "", message: "" })
      setSubject("")
    } catch {
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-950 flex items-center justify-center">
          <CheckCircle className="size-8 text-[#F0CC72]" />
        </div>
        <div>
          <h3 className="text-2xl font-black uppercase [font-family:var(--font-barlow)] text-zinc-950 mb-2">
            Message Sent!
          </h3>
          <p className="text-sm font-semibold text-zinc-500 [font-family:var(--font-barlow)]">
            We'll get back to you within 24 hours.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="text-xs font-black uppercase tracking-widest [font-family:var(--font-barlow)] underline underline-offset-4 text-zinc-400 hover:text-zinc-950 transition-colors"
        >
          Send Another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      {/* Quick topic chips */}
      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 [font-family:var(--font-barlow)]">
          What do you need help with? <span className="text-[#C9953A]">*</span>
        </p>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          {topics.map((t) => {
            const active = subject === t.subject
            return (
              <button
                key={t.subject}
                type="button"
                onClick={() => setSubject(active ? "" : t.subject)}
                className="px-3 sm:px-4 py-2.5 rounded-xl text-[11px] sm:text-sm font-black uppercase tracking-wide [font-family:var(--font-barlow)] border-2 transition-all duration-150 active:scale-95 text-center"
                style={
                  active
                    ? { background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", borderColor: "transparent", color: "#09090b" }
                    : { background: "transparent", borderColor: "#e4e4e7", color: "#52525b" }
                }
              >
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="h-px bg-zinc-100" />

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 [font-family:var(--font-barlow)]">
            Your Name <span className="text-[#C9953A]">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 [font-family:var(--font-barlow)]">
            Email Address <span className="text-[#C9953A]">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 [font-family:var(--font-barlow)]">
          Message <span className="text-[#C9953A]">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Describe your issue — the more detail, the faster we can help."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
          <AlertCircle className="size-4 text-red-500 shrink-0" />
          <p className="text-sm font-semibold text-red-600 [font-family:var(--font-barlow)]">
            Something went wrong. Please try again or email us directly.
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending" || !subject}
        className="flex items-center justify-center gap-3 w-full py-4 rounded-xl text-zinc-950 text-sm font-black uppercase tracking-widest [font-family:var(--font-barlow)] active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
      >
        {status === "sending" ? (
          <><Loader2 className="size-4 animate-spin" /> Sending…</>
        ) : (
          <><Send className="size-4" /> Send Message</>
        )}
      </button>

      <p className="text-center text-[11px] font-semibold text-zinc-400 [font-family:var(--font-barlow)]">
        We typically respond within 24 hours on business days.
      </p>

    </form>
  )
}
