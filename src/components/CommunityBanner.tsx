import Link from "next/link";
import Image from "next/image";

export default function CommunityBanner() {
  return (
    <section className="bg-white overflow-hidden py-14 sm:py-16 xl:py-20">
      {/* Desktop / Tablet: full background image */}
      <div className="relative w-full bg-zinc-950 overflow-hidden hidden md:block md:min-h-[60vh] xl:min-h-screen">
        <Image
          src="/sg-fit-community-banner-homepage.png"
          alt="SGians Community"
          fill
          className="object-cover object-center"
          priority
        />
        {/* gradient overlay so text stays readable */}
        <div className="absolute inset-0 bg-linear-to-r from-zinc-950/75 via-zinc-950/30 to-transparent" />
        <div className="relative z-10 flex flex-col gap-6 px-10 py-14 lg:px-16 lg:py-20 justify-center h-full md:min-h-[60vh] xl:min-h-screen md:max-w-2xl lg:max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] [font-family:var(--font-barlow)]" style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Private Community
          </p>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-white uppercase [font-family:var(--font-barlow)]">
            <span className="hidden md:inline lg:hidden italic text-transparent" style={{ WebkitTextStroke: "2px #fff" }}>The SGians</span>
            <span className="hidden lg:inline italic text-transparent" style={{ WebkitTextStroke: "2px #fff" }}>The SGians</span>
            <br />
            <span className="text-white">Community</span>
          </h2>

          <p className="text-base font-semibold text-zinc-300 leading-relaxed max-w-lg [font-family:var(--font-barlow)]">
            Connect with thousands of women pushing each other to show up,
            stay consistent, and crush their fitness goals together.
          </p>

          <div className="flex flex-row gap-4 pt-1">
            <Link
              href="/community"
              className="inline-flex items-center justify-center whitespace-nowrap bg-white text-zinc-950 text-sm font-black uppercase tracking-widest px-8 lg:px-10 py-4 rounded-full hover:bg-zinc-200 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
            >
              Join SGians
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center justify-center whitespace-nowrap border border-white/30 text-white text-sm font-black uppercase tracking-widest px-8 lg:px-10 py-4 rounded-full hover:border-white/60 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile: full background image */}
      <div className="relative w-full bg-zinc-950 overflow-hidden md:hidden min-h-[80vh] sm:min-h-screen">
        <Image
          src="/sg-fit-community-banner-homepage.png"
          alt="SGians Community"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-zinc-950/75 via-zinc-950/40 to-transparent" />
        <div className="relative z-10 flex flex-col gap-5 px-6 py-10 sm:px-8 sm:py-12 justify-end h-full min-h-[80vh] sm:min-h-screen">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] [font-family:var(--font-barlow)]" style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Private Community
          </p>

          <h2 className="text-3xl sm:text-4xl font-black leading-tight text-white uppercase [font-family:var(--font-barlow)]">
            <span className="sm:hidden italic text-transparent" style={{ WebkitTextStroke: "1px #fff" }}>The SGians</span>
            <span className="hidden sm:inline italic text-transparent" style={{ WebkitTextStroke: "2px #fff" }}>The SGians</span>
            <br />
            <span className="text-white">Community</span>
          </h2>

          <p className="text-sm font-semibold text-zinc-300 leading-relaxed max-w-md [font-family:var(--font-barlow)]">
            Connect with thousands of women pushing each other to show up,
            stay consistent, and crush their fitness goals together.
          </p>

          <div className="flex flex-row gap-3 pt-1 pb-4">
            <Link
              href="/community"
              className="inline-flex items-center justify-center whitespace-nowrap bg-white text-zinc-950 text-xs font-black uppercase tracking-widest px-5 py-3 rounded-full hover:bg-zinc-200 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
            >
              Join SGians
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center justify-center whitespace-nowrap border border-white/30 text-white text-xs font-black uppercase tracking-widest px-5 py-3 rounded-full hover:border-white/60 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
