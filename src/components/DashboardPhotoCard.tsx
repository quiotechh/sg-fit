import Link from "next/link";
import Image from "next/image";
import { Camera, ChevronRight } from "lucide-react";

interface Props {
  latestPhoto: { photoUrl: string; recordedAt: Date } | null;
}

export default function DashboardPhotoCard({ latestPhoto }: Props) {
  if (!latestPhoto) {
    return (
      <Link
        href="/measurements"
        className="group flex flex-col items-center justify-center gap-4 rounded-2xl bg-zinc-950 border-0 shadow-lg shadow-zinc-900/10 p-8 sm:p-10 text-center transition-colors h-full min-h-80"
      >
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Camera className="size-5 text-[#F0CC72]" />
        </div>
        <div>
          <p className="text-base font-black uppercase tracking-tight text-white [font-family:var(--font-barlow)]">
            Capture Your Progress
          </p>
          <p className="text-xs font-medium text-zinc-400 [font-family:var(--font-barlow)] mt-1">
            Your future self will thank you. Add your first photo today.
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/measurements"
      className="group relative flex flex-col justify-end rounded-2xl overflow-hidden border-0 shadow-lg shadow-zinc-900/10 h-full min-h-80"
    >
      <Image
        src={latestPhoto.photoUrl}
        alt="Latest progress photo"
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="relative p-6 sm:p-7 flex items-center justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-white [font-family:var(--font-barlow)]">
            Latest Photo
          </p>
          <p className="text-xs font-medium text-white/60 [font-family:var(--font-barlow)] mt-0.5">
            {new Date(latestPhoto.recordedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          </p>
        </div>
        <ChevronRight className="size-5 text-white/70 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
