import { Scale, Ruler, Expand, Shrink, Dumbbell, Footprints, TrendingUp, TrendingDown } from "lucide-react";

interface MeasurementEntry {
  value: number;
  recordedAt: Date;
  delta: number | null;
}

interface Props {
  measurements: {
    weightKg: MeasurementEntry | null;
    waistIn: MeasurementEntry | null;
    chestIn: MeasurementEntry | null;
    hipsIn: MeasurementEntry | null;
    armsIn: MeasurementEntry | null;
    thighsIn: MeasurementEntry | null;
  };
}

const fieldMeta = {
  weightKg: { label: "Weight", unit: "kg", icon: Scale },
  waistIn: { label: "Waist", unit: "in", icon: Ruler },
  chestIn: { label: "Chest", unit: "in", icon: Expand },
  hipsIn: { label: "Hips", unit: "in", icon: Shrink },
  armsIn: { label: "Arms", unit: "in", icon: Dumbbell },
  thighsIn: { label: "Thighs", unit: "in", icon: Footprints },
} as const;

const keys = Object.keys(fieldMeta) as (keyof typeof fieldMeta)[];

export default function LatestMeasurementsCard({ measurements }: Props) {
  const hasAny = Object.values(measurements).some((m) => m !== null);

  if (!hasAny) {
    return (
      <p className="text-sm font-bold text-zinc-300 [font-family:var(--font-barlow)] text-center py-6">
        No measurements logged yet
      </p>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 overflow-hidden">
      <table className="w-full border-collapse">
        <tbody>
          {keys.map((key, i) => {
            const entry = measurements[key];
            const meta = fieldMeta[key];
            const Icon = meta.icon;
            const isLast = i === keys.length - 1;
            const borderCls = isLast ? "" : "border-b border-white/10";
            return (
              <tr key={key}>
                <td className={`py-2.5 pl-4 pr-6 border-r border-white/10 ${borderCls}`}>
                  <div className="flex items-center gap-2">
                    <Icon className="size-3.5 text-zinc-500 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wide text-zinc-400 whitespace-nowrap [font-family:var(--font-barlow)]">
                      {meta.label}
                    </span>
                  </div>
                </td>
                <td className={`py-2.5 pl-6 pr-4 ${borderCls}`}>
                  <div className="flex items-center justify-end gap-2">
                    {entry?.delta != null && entry.delta !== 0 && (
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-zinc-500 [font-family:var(--font-barlow)]">
                        {entry.delta > 0 ? (
                          <TrendingUp className="size-3" />
                        ) : (
                          <TrendingDown className="size-3" />
                        )}
                        {Math.abs(entry.delta)}
                      </span>
                    )}
                    <span
                      className={`text-sm font-black tabular-nums whitespace-nowrap [font-family:var(--font-barlow)] ${
                        entry ? "text-[#F0CC72]" : "text-zinc-600"
                      }`}
                    >
                      {entry ? `${entry.value} ${meta.unit}` : "—"}
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
