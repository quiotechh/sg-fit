import Link from "next/link";
import Image from "next/image";
// import { Calendar, Users } from "lucide-react";

const retreatPhotos = [
  { src: "/sgfit-retreat.webp", alt: "Lyonesse House Villa" },
  { src: "/sgfit-retreat-1.webp", alt: "Infinity Pool View" },
  { src: "/sgfit-retreat-3.webp", alt: "Mountain Garden View" },
  { src: "/sgfit-retreat-2.webp", alt: "Luxury Bedroom" },
  { src: "/sgfit-retreat-4.webp", alt: "Living Lounge" },
];

// 5 photos arranged in a circle: positions as % from center of collage
const positions = [
  { top: "0%", left: "50%", size: 140 }, // top
  { top: "28%", left: "90%", size: 120 }, // right top
  { top: "82%", left: "80%", size: 130 }, // right bottom
  { top: "82%", left: "20%", size: 130 }, // left bottom
  { top: "28%", left: "10%", size: 120 }, // left top
];

export default function RetreatBanner() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 xl:px-16 py-10">
        <div className="relative w-full bg-zinc-950 rounded-2xl sm:rounded-3xl overflow-hidden min-h-145 sm:min-h-160">
          {/* Subtle texture overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Content grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-145 sm:min-h-160 items-center">
            {/* ── Left: Copy ── */}
            <div className="flex flex-col gap-7 px-7 py-12 sm:px-10 lg:px-14 lg:py-20">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] [font-family:var(--font-barlow)]" style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                SG FIT · Luxury Retreat
              </p>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[0.9] tracking-tight [font-family:var(--font-barlow)]">
                <span className="sm:hidden text-transparent italic" style={{ WebkitTextStroke: "1px #fff" }}>Escape.</span>
                <span className="hidden sm:inline text-transparent italic" style={{ WebkitTextStroke: "2px #fff" }}>Escape.</span>
                <br />
                <span className="text-white">Train.</span>
                <br />
                <span className="sm:hidden text-transparent italic" style={{ WebkitTextStroke: "1px #fff" }}>Transform.</span>
                <span className="hidden sm:inline text-transparent italic" style={{ WebkitTextStroke: "2px #fff" }}>Transform.</span>
              </h2>

              <p className="text-sm font-semibold text-zinc-400 leading-relaxed max-w-sm [font-family:var(--font-barlow)]">
                Join Sharon for an intimate luxury retreat — designed to help
                you feel strong, confident, and fully aligned.
              </p>

              {/* Details */}
              {/* <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-4 py-2">
                  <Calendar className="size-3.5 text-white/50 shrink-0" />
                  <span className="text-xs font-black uppercase tracking-wide text-white/70 [font-family:var(--font-barlow)]">10–13 Sept 2026</span>
                </div>
                <div className="flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-4 py-2">
                  <Users className="size-3.5 text-white/50 shrink-0" />
                  <span className="text-xs font-black uppercase tracking-wide text-white/70 [font-family:var(--font-barlow)]">14 Guests Only</span>
                </div>
              </div> 

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="/retreats"
                  className="inline-flex items-center justify-center whitespace-nowrap bg-white text-zinc-950 text-xs sm:text-sm font-black uppercase tracking-widest px-8 py-3 rounded-full hover:bg-zinc-200 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
                >
                  Reserve Your Spot
                </Link>
                <Link
                  href="/retreats"
                  className="inline-flex items-center justify-center whitespace-nowrap border border-white/20 text-white text-xs sm:text-sm font-black uppercase tracking-widest px-8 py-3 rounded-full hover:border-white/50 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
                >
                  View Itinerary
                </Link>
              </div>
            </div>

            {/* ── Right: Circular collage — desktop only ── */}
            <div className="hidden lg:flex items-center justify-center py-16 pr-10">
              <div className="relative w-105 h-105">
                {/* Orbit ring — subtle */}
                <div className="absolute inset-0 rounded-full border border-white/8" />
                <div className="absolute inset-6 rounded-full border border-white/5" />

                {/* 5 orbit photos */}
                {retreatPhotos.map((photo, i) => {
                  const pos = positions[i];
                  return (
                    <div
                      key={photo.src}
                      className="absolute rounded-2xl overflow-hidden border-2 border-white/15 shadow-xl"
                      style={{
                        width: pos.size,
                        height: pos.size,
                        top: pos.top,
                        left: pos.left,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  );
                })}

                {/* Center: Sharon */}
                <div
                  className="absolute rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
                  style={{
                    width: 160,
                    height: 160,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  <Image
                    src="/sharon-retreat.jpg"
                    alt="Sharon Gambu"
                    fill
                    className="object-cover object-top"
                  />
                  {/* Subtle glow behind Sharon */}
                  <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.15)]" />
                </div>

                {/* "Your Host" label below center */}
                <div
                  className="absolute text-center"
                  style={{
                    top: "calc(50% + 90px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 10,
                  }}
                >
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 whitespace-nowrap [font-family:var(--font-barlow)]">
                    Your Host
                  </p>
                  <p className="text-xs font-black uppercase text-white/70 whitespace-nowrap [font-family:var(--font-barlow)]">
                    Sharon Gambu
                  </p>
                </div>
              </div>
            </div>

            {/* ── Mobile: single full-width image ── */}
            <div className="lg:hidden relative w-full aspect-video">
              <Image
                src="/sgfit-retreat.webp"
                alt="SG FIT Retreat"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
