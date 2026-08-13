import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import Image from "next/image";

interface Entry {
  id: string;
  recordedAt: Date;
  weightKg: number | null;
  waistIn: number | null;
  chestIn: number | null;
  hipsIn: number | null;
  armsIn: number | null;
  thighsIn: number | null;
  photoUrl: string | null;
}

interface Props {
  entries: Entry[];
}

const columns = [
  { key: "weightKg", label: "Weight" },
  { key: "waistIn", label: "Waist" },
  { key: "chestIn", label: "Chest" },
  { key: "hipsIn", label: "Hips" },
  { key: "armsIn", label: "Arms" },
  { key: "thighsIn", label: "Thighs" },
] as const;

export default function BodyMetricHistoryTable({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <p className="text-sm font-bold text-zinc-400 [font-family:var(--font-barlow)] text-center py-8">
        No entries yet — log your first measurement above.
      </p>
    );
  }

  return (
    <Table className="[font-family:var(--font-barlow)]">
      <TableHeader>
        <TableRow className="border-zinc-800 hover:bg-transparent">
          <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Photo
          </TableHead>
          <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Date
          </TableHead>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className="text-[10px] font-black uppercase tracking-widest text-zinc-400"
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.id} className="border-zinc-800 hover:bg-white/5">
            <TableCell>
              {entry.photoUrl ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={entry.photoUrl}
                    alt="Progress photo"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <span className="text-zinc-600">—</span>
              )}
            </TableCell>
            <TableCell className="font-bold text-[#F0CC72]">
              {new Date(entry.recordedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </TableCell>
            {columns.map((col) => (
              <TableCell key={col.key} className="text-zinc-300">
                {entry[col.key] ?? "—"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
