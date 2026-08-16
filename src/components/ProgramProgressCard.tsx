import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ProgramData {
  slug: string;
  title: string;
  percent: number;
  nextDay: { weekNumber: number; dayNumber: number } | null;
}

interface Props {
  program: ProgramData | null;
}

const RADIUS = 60;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ProgramProgressCard({ program }: Props) {
  if (!program) {
    return (
      <div className="rounded-2xl bg-zinc-950 border-0 shadow-lg shadow-zinc-900/10 p-6 sm:p-8 flex flex-col items-center text-center gap-4">
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 [font-family:var(--font-barlow)]">
          No active program
        </p>
        <p className="text-lg font-black uppercase tracking-tight text-white [font-family:var(--font-barlow)]">
          Start Your First Program
        </p>
        <Link
          href="/programs/workouts"
          className="group w-full inline-flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-xl text-zinc-950 [font-family:var(--font-barlow)] active:scale-95 hover:scale-[1.02] transition-all bg-[linear-gradient(135deg,#C9953A,#F0CC72,#B8841F)]"
        >
          Browse Programs
          <ChevronRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  const offset = CIRCUMFERENCE - (program.percent / 100) * CIRCUMFERENCE;
  const href = program.nextDay
    ? `/my-programs/workouts/${program.slug}/week/${program.nextDay.weekNumber}/day/${program.nextDay.dayNumber}`
    : `/my-programs/workouts/${program.slug}`;

  return (
    <div className="rounded-2xl bg-zinc-950 border-0 shadow-lg shadow-zinc-900/10 p-6 sm:p-8 flex flex-col items-center text-center gap-4 h-full">
      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 [font-family:var(--font-barlow)]">
        Current Program
      </p>

      <div className="relative">
        <svg width={144} height={144} viewBox="0 0 144 144">
          <defs>
            <linearGradient id="programCardGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F8DFA0" />
              <stop offset="100%" stopColor="#C9953A" />
            </linearGradient>
          </defs>
          <circle cx="72" cy="72" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="11" />
          <circle
            cx="72"
            cy="72"
            r={RADIUS}
            fill="none"
            stroke="url(#programCardGradient)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            transform="rotate(-90 72 72)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-black text-white [font-family:var(--font-barlow)]">
            {program.percent}%
          </span>
        </div>
      </div>

      <p className="text-base font-black uppercase tracking-tight text-white [font-family:var(--font-barlow)]">
        {program.title}
      </p>

      <Link
        href={href}
        className="group w-full inline-flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-xl text-zinc-950 [font-family:var(--font-barlow)] active:scale-95 hover:scale-[1.02] transition-all bg-[linear-gradient(135deg,#C9953A,#F0CC72,#B8841F)]"
      >
        {program.nextDay ? "Continue Workout" : "Program Complete 🏆"}
        <ChevronRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
