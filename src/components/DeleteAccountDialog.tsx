"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { requestAccountDeletion } from "@/lib/actions/account";
import { authClient } from "@/lib/auth-client";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteAccountDialog({ open, onOpenChange }: Props) {
  const [confirmation, setConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setConfirmation("");
    setError(null);
    onOpenChange(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await requestAccountDeletion({ confirmation });
      await authClient.signOut();
      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-md rounded-2xl border-zinc-100">
        <DialogTitle className="text-sm font-black uppercase tracking-wide text-zinc-950 [font-family:var(--font-barlow)]">
          Delete Account
        </DialogTitle>

        <div className="flex flex-col gap-4 mt-2">
          <p className="text-sm text-zinc-500 [font-family:var(--font-barlow)]">
            Your subscription will be cancelled and you&apos;ll be signed out immediately.
            Your account and data will be permanently deleted in 30 days.
            Logging back in before then cancels the deletion.
          </p>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-zinc-500 [font-family:var(--font-barlow)]">
              Type <span className="text-red-500">DELETE</span> to confirm
            </label>
            <input
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 [font-family:var(--font-barlow)] focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs font-semibold text-red-500 [font-family:var(--font-barlow)]">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 text-zinc-500 text-xs font-black uppercase tracking-widest px-6 py-3 rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors [font-family:var(--font-barlow)]"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={confirmation !== "DELETE" || isDeleting}
              className="flex-1 text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed [font-family:var(--font-barlow)]"
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
