"use client";

import { Camera } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

interface Entry {
  id: string;
  recordedAt: Date;
  photoUrl: string | null;
}

interface Props {
  entries: Entry[];
}

export default function ProgressPhotoGallery({ entries }: Props) {
  const withPhotos = entries.filter((e) => e.photoUrl);

  if (withPhotos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 text-center py-6">
        <Camera className="size-8 text-zinc-600" />
        <p className="text-sm font-bold text-zinc-300 [font-family:var(--font-barlow)]">
          No progress photos yet
        </p>
        <p className="text-xs font-medium text-zinc-400 [font-family:var(--font-barlow)]">
          Photos you upload will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {withPhotos.map((entry) => (
        <Dialog key={entry.id}>
          <DialogTrigger asChild>
            <button className="flex flex-col gap-1.5 cursor-pointer group">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                <Image
                  src={entry.photoUrl!}
                  alt="Progress photo"
                  fill
                  sizes="(min-width: 640px) 25vw, 33vw"
                  className="object-cover group-hover:opacity-80 transition-opacity"
                />
              </div>
              <span className="text-[10px] font-bold text-[#F0CC72] [font-family:var(--font-barlow)] text-center">
                {new Date(entry.recordedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white">
            <div className="relative w-full aspect-square">
              <Image
                src={entry.photoUrl!}
                alt="Progress photo"
                fill
                sizes="(min-width: 640px) 448px, 100vw"
                className="object-cover"
              />
            </div>
            <p className="px-4 pb-4 pt-1 text-sm font-bold text-[#C9953A] [font-family:var(--font-barlow)]">
              {new Date(entry.recordedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
