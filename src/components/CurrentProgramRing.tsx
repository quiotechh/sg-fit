import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Props {
  slug: string;
  title: string;
  percent: number;
  nextDay: { weekNumber: number; dayNumber: number } | null;
}

export default function CurrentProgramRing({
  slug,
  title,
  percent,
  nextDay,
}: Props) {
  const href = nextDay
    ? `/my-programs/workouts/${slug}/week/${nextDay.weekNumber}/day/${nextDay.dayNumber}`
    : `/my-programs/workouts/${slug}`;

  // <div className="flex flex-col items-center gap-5 rounded-2xl border border-zinc-200 p-8 sm:p-10">
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-zinc-100 bg-white shadow-sm p-8 sm:p-10">
      <div className="relative w-36 h-36 sm:w-40 sm:h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="#e4e4e7"
            strokeWidth="5"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="#2a78d6"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 28}
            strokeDashoffset={2 * Math.PI * 28 * (1 - percent / 100)}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-3xl font-black text-zinc-950 [font-family:var(--font-barlow)]">
          {percent}%
        </span>
      </div>

      <p className="text-base font-black uppercase tracking-tight text-zinc-950 [font-family:var(--font-barlow)] text-center">
        {title}
      </p>

      <Link
        href={href}
        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest px-6 py-3 rounded-lg text-zinc-950 [font-family:var(--font-barlow)] active:scale-95 transition-all"
        style={{
          background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
        }}
      >
        {nextDay ? "Resume Workout" : "Program Complete 🏆"}
        <ChevronRight className="size-3.5" />
      </Link>
    </div>
  );
}
