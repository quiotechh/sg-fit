"use client";

import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import CommunityAvatar from "./CommunityAvatar";
import { uploadImage } from "@/lib/uploadImage";

type CurrentUser = { id: string; name: string; image: string | null };

type Props = {
  open: boolean;
  currentUser: CurrentUser;
  onClose: () => void;
  onSubmit: (text: string, imageKey?: string) => void | Promise<void>;
};

export default function CreatePostModal({
  open,
  currentUser,
  onClose,
  onSubmit,
}: Props) {
  const [text, setText] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setText("");
    setPhotoFile(null);
    setError(null);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhotoFile(file);
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setError(null);
    setIsSubmitting(true);
    try {
      const imageKey = photoFile
        ? await uploadImage(photoFile, "community-post")
        : undefined;
      await onSubmit(text.trim(), imageKey);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-140 lg:max-w-180 rounded-[24px] p-0 bg-white border-0 shadow-[0_24px_64px_rgba(0,0,0,0.12)] gap-0 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eeece8]">
          <DialogTitle className="text-[15px] font-black uppercase tracking-[0.08em] text-[#0a0a0a] [font-family:var(--font-barlow)]">
            Create Post
          </DialogTitle>
          <DialogClose className="w-8 h-8 rounded-full border-0 bg-[#f8f7f5] flex items-center justify-center text-[#9e9a90] text-base cursor-pointer hover:bg-[#eeece8] hover:text-[#0a0a0a] transition-all duration-200">
            ✕
          </DialogClose>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex items-start gap-3.5">
          <CommunityAvatar
            userId={currentUser.id}
            name={currentUser.name}
            image={currentUser.image}
            className="size-10 text-[14px] shrink-0"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
            }}
            placeholder="Share your progress, thoughts, or wins today..."
            rows={5}
            autoFocus
            className="flex-1 border-none outline-none bg-[#f8f7f5] rounded-[14px] px-4 py-3 text-[14px] text-[#0a0a0a] font-medium resize-none transition-all duration-200 [font-family:var(--font-barlow)] placeholder:text-[#9e9a90] focus:bg-[#f5f5f5]"
          />
        </div>

        {error && (
          <p className="px-6 text-xs font-semibold text-red-500 [font-family:var(--font-barlow)] -mt-2 mb-2">
            {error}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-6 pb-6 pt-3 border-t border-[#eeece8]">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,.heic,.heif"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] border border-[#eeece8] bg-transparent text-[12px] font-semibold uppercase tracking-[0.04em] [font-family:var(--font-barlow)] cursor-pointer text-[#6e6b63] hover:border-[#C9953A] transition-all duration-200"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            {photoFile ? "Photo Added" : "Add Photo"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-[12px] border-none text-[12px] font-black text-[#0a0a0a] uppercase tracking-widest cursor-pointer transition-all duration-200 shadow-[0_4px_14px_rgba(201,149,58,0.3)] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(201,149,58,0.4)] active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed [font-family:var(--font-barlow)] bg-[linear-gradient(135deg,#C9953A,#F0CC72,#B8841F)]"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
