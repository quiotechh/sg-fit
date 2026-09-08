import { Loader2 } from "lucide-react";

export default function PortalLoading() {
  return (
    <main className="flex flex-col min-h-screen bg-zinc-50">
      <div className="flex-1 flex items-center justify-center">
        <Loader2
          className="size-8 animate-spin"
          style={{ color: "#C9953A" }}
          strokeWidth={2.5}
        />
      </div>
    </main>
  );
}
