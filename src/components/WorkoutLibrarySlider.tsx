"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Play, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

const videos = [
  "Full Body HIIT",
  "Core Strength",
  "Lower Body Burn",
  "Upper Body Sculpt",
  "Mobility & Stretch",
];

function useCarouselIndex(api: CarouselApi) {
  return useSyncExternalStore(
    (onChange) => {
      if (!api) return () => {};
      api.on("select", onChange);
      api.on("reInit", onChange);
      return () => {
        api.off("select", onChange);
        api.off("reInit", onChange);
      };
    },
    () => api?.selectedScrollSnap() ?? 0,
    () => 0,
  );
}

export default function WorkoutLibrarySlider() {
  const [api, setApi] = useState<CarouselApi>();
  const current = useCarouselIndex(api);

  return (
    <div className="rounded-2xl bg-zinc-950 border-0 shadow-lg shadow-zinc-900/10 p-6 sm:p-8 h-full min-h-80 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-white [font-family:var(--font-barlow)]">
            Workout Library
          </p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 [font-family:var(--font-barlow)] mt-0.5">
            Coming Soon
          </p>
        </div>
        <Link
          href="/programs/workouts"
          className="group inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors [font-family:var(--font-barlow)]"
        >
          View Library
          <ChevronRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <Carousel setApi={setApi} className="flex-1 flex flex-col">
        <CarouselContent className="flex-1 ml-0 h-full">
          {videos.map((title) => (
            <CarouselItem key={title} className="pl-0 h-full">
              <div className="relative rounded-xl overflow-hidden h-full min-h-48 bg-[linear-gradient(135deg,#1a1a19,#2c2c2a)] flex items-center justify-center">
                <button
                  type="button"
                  aria-label="Play preview"
                  className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all"
                >
                  <Play className="size-6 text-[#F0CC72] ml-1" fill="#F0CC72" />
                </button>
                <span className="absolute bottom-5 left-6 text-lg font-black uppercase tracking-tight text-white [font-family:var(--font-barlow)]">
                  {title}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-3 border-0 bg-black/40 hover:bg-black/60 text-white [&_svg]:size-4" />
        <CarouselNext className="right-3 border-0 bg-black/40 hover:bg-black/60 text-white [&_svg]:size-4" />
      </Carousel>

      <div className="flex items-center justify-center gap-1.5 mt-4">
        {videos.map((title, i) => (
          <button
            type="button"
            key={title}
            onClick={() => api?.scrollTo(i)}
            aria-label={`Go to ${title}`}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? "w-6 bg-[#F0CC72]" : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
