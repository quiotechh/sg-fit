"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/uploadImage";
import { addBodyMetric } from "@/lib/actions/body-metrics";

interface Props {
  path: string;
}

export default function PhotoUploadCard({ path }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);
    try {
      const photoKey = await uploadImage(file, "progress-photo");
      await addBodyMetric({ photoKey, path });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed, please try again.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-zinc-100 bg-white shadow-sm p-8 sm:p-10 text-center min-h-64">
      <p className="text-xs font-black uppercase tracking-widest text-zinc-950 [font-family:var(--font-barlow)]">
        Progress Photo
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,.heic,.heif"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
        className="group flex flex-col items-center justify-center gap-3 w-full max-w-70 aspect-4/3 rounded-2xl border-2 border-dashed border-zinc-200 hover:border-[#C9953A] bg-zinc-50/50 hover:bg-[#C9953A]/5 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
          }}
        >
          {isUploading ? (
            <Loader2 className="size-6 text-zinc-950 animate-spin" />
          ) : (
            <Camera className="size-6 text-zinc-950" />
          )}
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-zinc-950 [font-family:var(--font-barlow)]">
            {isUploading ? "Uploading..." : "Upload Photo"}
          </p>
          <p className="text-xs font-medium text-zinc-400 [font-family:var(--font-barlow)] mt-0.5">
            One photo at a time.
          </p>
        </div>
      </button>

      {error && (
        <p className="text-xs font-semibold text-red-500 [font-family:var(--font-barlow)]">
          {error}
        </p>
      )}
    </div>
  );
}
