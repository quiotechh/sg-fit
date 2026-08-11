"use client";

import { useState, useTransition } from "react";
import { CheckCircle, RotateCcw } from "lucide-react";
import { markDayComplete, unmarkDayComplete } from "@/lib/actions";

interface Props {
  purchaseId: string;
  dayId: string;
  path: string;
  initialCompleted: boolean;
}

export default function MarkCompleteButton({
  purchaseId,
  dayId,
  path,
  initialCompleted,
}: Props) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    setError(null);
    startTransition(async () => {
      try {
        await markDayComplete(purchaseId, dayId, path);
        setCompleted(true);
      } catch {
        setError("Kuch galat ho gaya, dobara try karo.");
      }
    });
  }

  function handleUndo() {
    setError(null);
    startTransition(async () => {
      try {
        await unmarkDayComplete(purchaseId, dayId, path);
        setCompleted(false);
      } catch {
        setError("Kuch galat ho gaya, dobara try karo.");
      }
    });
  }

  if (completed) {
    return (
      <div className="flex flex-col items-center gap-1.5 md:gap-2">
        <div className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#C9953A] [font-family:var(--font-barlow)]">
          <CheckCircle className="size-4" />
          Completed
          <button
            onClick={handleUndo}
            disabled={isPending}
            aria-label="Undo completion"
            title="Undo"
            className="ml-1 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw className="size-4" />
          </button>
        </div>
        {error && (
          <p className="text-xs font-semibold text-red-500 [font-family:var(--font-barlow)]">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        disabled={isPending}
        className="inline-flex items-center cursor-pointer disabled:cursor-not-allowed justify-center gap-2 text-zinc-950 text-sm font-black uppercase tracking-widest px-6 py-3 rounded-lg active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)] disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
        }}
      >
        {isPending ? "Marking..." : "Mark as Complete"}
      </button>
      {error && (
        <p className="text-xs font-semibold text-red-500 [font-family:var(--font-barlow)]">
          {error}
        </p>
      )}
    </div>
  );
}
