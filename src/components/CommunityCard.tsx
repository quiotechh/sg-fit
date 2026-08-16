import Link from "next/link";
import { Users, Lock, Trophy, MessageCircle, Flame } from "lucide-react";

const hasMembership = true; // same toggle as Navbar.tsx

const previewFeatures = [
  { icon: Trophy, text: "Monthly challenges & leaderboards" },
  { icon: MessageCircle, text: "Chat with fellow SGians" },
  { icon: Flame, text: "Celebrate streaks together" },
];

export default function CommunityCard() {
  if (!hasMembership) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-zinc-950 border-0 shadow-lg shadow-zinc-900/10 p-8 sm:p-10 text-center h-full min-h-80">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
          <Lock className="size-4 text-zinc-400" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-tight text-white [font-family:var(--font-barlow)]">
            SGians Community
          </p>
          <p className="text-xs font-medium text-zinc-400 [font-family:var(--font-barlow)] mt-1">
            Join thousands of women pushing each other to show up, every day.
          </p>
        </div>
        <Link
          href="/membership"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest px-6 py-3 rounded-lg text-zinc-950 [font-family:var(--font-barlow)] active:scale-95 transition-all bg-[linear-gradient(135deg,#C9953A,#F0CC72,#B8841F)]"
        >
          Join SGians
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-zinc-950 border-0 shadow-lg shadow-zinc-900/10 p-8 sm:p-10 flex flex-col gap-7 h-full min-h-80">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
          <Users className="size-5 text-[#F0CC72]" />
        </div>
        <div>
          <p className="text-base font-black uppercase tracking-tight text-white [font-family:var(--font-barlow)]">
            SGians Community
          </p>
          <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-500 [font-family:var(--font-barlow)]">
            Coming Soon
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {previewFeatures.map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-3 text-sm font-bold text-zinc-400 [font-family:var(--font-barlow)]"
          >
            <item.icon className="size-4 text-zinc-600 shrink-0" />
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
