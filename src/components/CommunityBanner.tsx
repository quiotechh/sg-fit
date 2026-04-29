import Link from "next/link";
import Image from "next/image";

export default function CommunityBanner() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 xl:px-16 py-10">
        <div className="relative w-full bg-zinc-950 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            {/* Left: Text Content */}
            <div className="flex flex-col gap-5 sm:gap-6 px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-400 [font-family:var(--font-barlow)]">
                Private Community
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black lg:font-black leading-tight text-white uppercase [font-family:var(--font-barlow)]">
                <span
                  className="text-outline-white italic"
                >
                  The SGians
                </span>
                <br />
                <span className="text-white">Community</span>
              </h2>

              <p className="text-sm font-semibold text-zinc-400 leading-relaxed max-w-md [font-family:var(--font-barlow)]">
                Connect with thousands of women pushing each other to show up,
                stay consistent, and crush their fitness goals together.
              </p>

              <div className="flex flex-row flex-wrap gap-3 pt-1">
                <Link
                  href="/community"
                  className="inline-flex items-center justify-center whitespace-nowrap bg-white text-zinc-950 text-xs sm:text-sm font-black uppercase tracking-widest px-6 sm:px-8 py-3 rounded-full hover:bg-zinc-200 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
                >
                  Join SGians
                </Link>
                <Link
                  href="/community"
                  className="inline-flex items-center justify-center whitespace-nowrap border border-white/20 text-white text-xs sm:text-sm font-black uppercase tracking-widest px-6 sm:px-8 py-3 rounded-full hover:border-white/50 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Desktop image — right column */}
            <div className="relative w-full h-105 hidden lg:block">
              <Image
                src="/community-banner.png"
                alt="SGians Community"
                fill
                className="object-cover object-right"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
            </div>

            {/* Mobile + Tablet image — below text */}
            <div className="relative w-full h-52 sm:h-72 lg:hidden">
              <Image
                src="/community-banner-mobile.png"
                alt="SGians Community"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-b from-zinc-950/80 via-transparent to-zinc-950/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
