"use client";

import { useMemo, useState } from "react";
import { Search, Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface LibraryVideo {
  id: string;
  title: string;
  duration: number; // seconds
  videoUrl: string;
}

interface Props {
  videos: LibraryVideo[];
}

function formatDuration(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function WorkoutLibraryClient({ videos }: Props) {
  const [query, setQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState<LibraryVideo | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return videos.filter((v) => v.title.toLowerCase().includes(q));
  }, [videos, query]);

  return (
    <>
      {/* Search */}
      <div className="relative max-w-md mb-8 sm:mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search exercises..."
          className="w-full rounded-lg border border-zinc-200 bg-white pl-11 pr-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 [font-family:var(--font-barlow)] focus:outline-none focus:ring-2 focus:ring-[#C9953A]/30 focus:border-[#C9953A] transition-colors"
        />
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((video) => (
            <button
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="group flex flex-col rounded-2xl border border-zinc-100 bg-white shadow-sm overflow-hidden text-left hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="relative aspect-video bg-zinc-950 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-[#C9953A] transition-colors duration-200">
                  <Play className="size-5 text-white fill-white ml-0.5" />
                </div>
                <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white [font-family:var(--font-barlow)]">
                  {formatDuration(video.duration)}
                </span>
              </div>
              <div className="px-4 py-3.5">
                <p className="text-[13px] font-bold uppercase tracking-wide text-zinc-950 [font-family:var(--font-barlow)] leading-tight truncate">
                  {video.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] mb-3 [font-family:var(--font-barlow)] text-zinc-400">
            {videos.length === 0 ? "No Videos Yet" : "No Results"}
          </p>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
            {videos.length === 0 ? "The library is empty for now." : "No exercises match your search."}
          </h2>
        </div>
      )}

      {/* Full-screen player */}
      <Dialog open={!!activeVideo} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent
          showCloseButton={false}
          className="fixed inset-0 top-0 left-0 translate-x-0 translate-y-0 w-screen h-screen max-w-none sm:max-w-none rounded-none border-none bg-black/95 p-0 flex flex-col items-center justify-center gap-0"
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-5 right-5 sm:top-8 sm:right-8 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="size-5 text-white" />
          </button>

          <div className="w-full max-w-5xl px-4 sm:px-8">
            <p className="text-center text-sm sm:text-base font-black uppercase tracking-widest text-white mb-4 sm:mb-6 [font-family:var(--font-barlow)]">
              {activeVideo?.title}
            </p>
            <div className="flex items-center justify-center">
              {activeVideo && (
                <video
                  key={activeVideo.id}
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="max-h-[75vh] max-w-full rounded-lg"
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
