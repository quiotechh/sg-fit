import { Camera } from "lucide-react";

// Placeholder-only for now — no upload wiring until R2 storage is connected.
// Real upload flow will replace this dropzone's click handler.
export default function PhotoUploadCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-zinc-100 bg-white shadow-sm p-8 sm:p-10 text-center min-h-64">
      <p className="text-xs font-black uppercase tracking-widest text-zinc-950 [font-family:var(--font-barlow)]">
        Progress Photo
      </p>

      <button
        type="button"
        className="group flex flex-col items-center justify-center gap-3 w-full max-w-70 aspect-4/3 rounded-2xl border-2 border-dashed border-zinc-200 hover:border-[#C9953A] bg-zinc-50/50 hover:bg-[#C9953A]/5 transition-all duration-200 cursor-pointer"
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
          }}
        >
          <Camera className="size-6 text-zinc-950" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-zinc-950 [font-family:var(--font-barlow)]">
            Upload Photo
          </p>
          <p className="text-xs font-medium text-zinc-400 [font-family:var(--font-barlow)] mt-0.5">
            One photo at a time.
          </p>
        </div>
      </button>

      {/* <p className="text-[11px] font-medium text-zinc-400 [font-family:var(--font-barlow)]">
        Uploads open once photo storage is connected
      </p> */}
    </div>
  );
}
