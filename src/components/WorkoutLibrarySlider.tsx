"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Play, ChevronRight, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type WorkoutCategory = "GYM" | "CHAIR" | "HOME";

interface LibraryVideo {
  id: string;
  title: string;
  duration: number; // seconds
  videoUrl: string;
  category: WorkoutCategory;
}

interface Props {
  videos: LibraryVideo[];
}

function formatDuration(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

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

export default function WorkoutLibrarySlider({ videos }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const current = useCarouselIndex(api);
  const [activeVideo, setActiveVideo] = useState<LibraryVideo | null>(null);

  return (
    <div className="rounded-2xl bg-zinc-950 border-0 shadow-lg shadow-zinc-900/10 p-6 sm:p-8 h-full min-h-80 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs font-black uppercase tracking-widest text-white [font-family:var(--font-barlow)]">
          Workout Library
        </p>
        <Link
          href="/workout-library"
          className="group inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors [font-family:var(--font-barlow)]"
        >
          View Library
          <ChevronRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {videos.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 min-h-48">
          <p className="text-xs font-bold uppercase tracking-wide text-zinc-500 [font-family:var(--font-barlow)]">
            Buy a workout plan to unlock the video library.
          </p>
        </div>
      ) : (
        <>
          <Carousel setApi={setApi} className="flex-1 flex flex-col">
            <CarouselContent className="flex-1 ml-0 h-full">
              {videos.map((video) => (
                <CarouselItem key={video.id} className="pl-0 h-full">
                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    className="group relative rounded-xl overflow-hidden h-full min-h-48 w-full bg-zinc-900 flex items-center justify-center"
                  >
                    {/* preload="metadata" pulls the video's first frame as a free
                        thumbnail — same trick as the full library page. */}
                    <video
                      src={video.videoUrl}
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                    <div className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all">
                      <Play className="size-6 text-[#F0CC72] ml-1" fill="#F0CC72" />
                    </div>
                    <span className="absolute bottom-5 left-6 text-lg font-black uppercase tracking-tight text-white [font-family:var(--font-barlow)]">
                      {video.title}
                    </span>
                    <span className="absolute bottom-5 right-5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white [font-family:var(--font-barlow)]">
                      {formatDuration(video.duration)}
                    </span>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-3 border-0 bg-black/40 hover:bg-black/60 text-white [&_svg]:size-4" />
            <CarouselNext className="right-3 border-0 bg-black/40 hover:bg-black/60 text-white [&_svg]:size-4" />
          </Carousel>

          <div className="flex items-center justify-center gap-1.5 mt-4">
            {videos.map((video, i) => (
              <button
                type="button"
                key={video.id}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to ${video.title}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? "w-6 bg-[#F0CC72]" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Full-screen player — same pattern as the full Workout Library page */}
      <Dialog open={!!activeVideo} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent
          showCloseButton={false}
          className="fixed inset-0 top-0 left-0 translate-x-0 translate-y-0 w-screen h-screen max-w-none max-h-screen sm:max-w-none rounded-none border-none bg-black/95 p-0 flex flex-col items-center justify-center gap-0"
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-5 right-5 sm:top-8 sm:right-8 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="size-5 text-white" />
          </button>

          <div className="w-full max-w-5xl px-4 sm:px-8">
            <DialogTitle className="text-center text-sm sm:text-base font-black uppercase tracking-widest text-white mb-4 sm:mb-6 [font-family:var(--font-barlow)]">
              {activeVideo?.title}
            </DialogTitle>
            <div className="flex items-center justify-center">
              {activeVideo && (
                <video
                  key={activeVideo.id}
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="max-w-full max-h-[80vh] rounded-lg"
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
