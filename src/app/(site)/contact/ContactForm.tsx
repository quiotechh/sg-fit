"use client";

import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle, AlertCircle, Loader2, ChevronDown } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

const subjects = [
  "General Inquiry",
  "Program Support",
  "Order & Billing",
  "Partnership / Affiliates",
  "Media & Press",
  "Retreat Enquiry",
  "Other",
];

function SubjectDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between gap-3 bg-zinc-50 border rounded-xl px-5 py-4 text-sm font-semibold outline-none transition-all duration-200 [font-family:var(--font-barlow)] ${
          open
            ? "border-zinc-950 bg-white"
            : "border-zinc-200 hover:border-zinc-400"
        } ${value ? "text-zinc-950" : "text-zinc-400"}`}
      >
        <span>{value || "Select a topic…"}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-zinc-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white border border-zinc-200 rounded-xl shadow-xl shadow-black/8 overflow-hidden">
          {subjects.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                onChange(s);
                setOpen(false);
              }}
              className={`w-full text-left px-5 py-3.5 text-sm font-semibold transition-colors duration-100 [font-family:var(--font-barlow)] ${
                value === s
                  ? "text-zinc-950 bg-zinc-100"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.subject) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16 sm:py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-950 flex items-center justify-center">
          <CheckCircle className="size-8 text-[#F0CC72]" />
        </div>
        <div>
          <h3 className="text-2xl font-black uppercase [font-family:var(--font-barlow)] text-zinc-950 mb-2">
            Message Sent!
          </h3>
          <p className="text-sm font-semibold text-zinc-500 [font-family:var(--font-barlow)]">
            We&apos;ll get back to you within 24–48 hours.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="text-xs font-black uppercase tracking-widest [font-family:var(--font-barlow)] underline underline-offset-4 text-zinc-400 hover:text-zinc-950 transition-colors"
        >
          Send Another
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-sm font-semibold text-zinc-950 placeholder:text-zinc-400 outline-none focus:border-zinc-950 focus:bg-white transition-all duration-200 [font-family:var(--font-barlow)]";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 [font-family:var(--font-barlow)]">
            Full Name <span className="text-[#C9953A]">*</span>
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

      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 [font-family:var(--font-barlow)]">
          Subject <span className="text-[#C9953A]">*</span>
        </label>
        <SubjectDropdown
          value={form.subject}
          onChange={(v) => setForm((prev) => ({ ...prev, subject: v }))}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 [font-family:var(--font-barlow)]">
          Message <span className="text-[#C9953A]">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us how we can help you…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
          <AlertCircle className="size-4 text-red-500 shrink-0" />
          <p className="text-sm font-semibold text-red-600 [font-family:var(--font-barlow)]">
            Something went wrong. Please try again or email us directly.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending" || !form.subject}
        className="flex items-center justify-center gap-3 w-full py-4 rounded-xl text-zinc-950 text-sm font-black uppercase tracking-widest [font-family:var(--font-barlow)] active:scale-95 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-4" />
            Send Message
          </>
        )}
      </button>

      <p className="text-center text-[11px] font-semibold text-zinc-400 [font-family:var(--font-barlow)]">
        We typically respond within 24–48 hours on business days.
      </p>
    </form>
  );
}
