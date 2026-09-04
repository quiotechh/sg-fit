"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { deleteProgressPhoto } from "@/lib/actions/body-metrics";

interface Entry {
  id: string;
  recordedAt: Date;
  photoUrl: string | null;
}

interface Props {
  entries: Entry[];
  path: string;
}

export default function ProgressPhotoGallery({ entries, path }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const withPhotos = entries.filter((e) => e.photoUrl);

  const handleDelete = async (entryId: string) => {
    setDeletingId(entryId);
    try {
      await deleteProgressPhoto(entryId, path);
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  };

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
            <DialogTitle className="sr-only">Progress photo</DialogTitle>
            <div className="relative w-full aspect-square">
              <Image
                src={entry.photoUrl!}
                alt="Progress photo"
                fill
                sizes="(min-width: 640px) 448px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-between px-4 pb-4 pt-1">
              <p className="text-sm font-bold text-[#C9953A] [font-family:var(--font-barlow)]">
                {new Date(entry.recordedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <button
                onClick={() => handleDelete(entry.id)}
                disabled={deletingId === entry.id}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-red-500 hover:text-red-600 disabled:opacity-50 [font-family:var(--font-barlow)]"
              >
                <Trash2 className="size-3.5" />
                {deletingId === entry.id ? "Deleting..." : "Delete Photo"}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
