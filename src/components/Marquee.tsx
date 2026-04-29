"use client"

const items = [
  "Science-Backed Training",
  "Real Results. No Shortcuts.",
  "Strength & Conditioning",
  "Train Harder",
  "Recover Smarter",
  "Holistic Fitness",
  "Built for Champions",
  "Mind. Body. Discipline.",
]

const repeated = [...items, ...items]

export default function Marquee() {
  return (
    <div className="w-full overflow-hidden bg-zinc-950 py-4 sm:py-5 xl:py-6">
      <style>{`
        @keyframes sgfit-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .sgfit-marquee-track {
          animation: sgfit-marquee 30s linear infinite;
          will-change: transform;
        }
        .sgfit-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="flex min-w-max sgfit-marquee-track">
        {repeated.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="text-white font-black uppercase tracking-wide [font-family:var(--font-barlow)] text-sm sm:text-base xl:text-lg px-6 sm:px-8 xl:px-12 whitespace-nowrap">
              {item}
            </span>
            <span
              className="font-thin select-none text-base sm:text-lg xl:text-xl"
              style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              |
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
