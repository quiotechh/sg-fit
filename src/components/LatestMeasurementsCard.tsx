interface MeasurementEntry {
  value: number;
  recordedAt: Date;
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
  weightKg: { label: "Weight", unit: "kg" },
  waistIn: { label: "Waist", unit: "in" },
  chestIn: { label: "Chest", unit: "in" },
  hipsIn: { label: "Hips", unit: "in" },
  armsIn: { label: "Arms", unit: "in" },
  thighsIn: { label: "Thighs", unit: "in" },
} as const;

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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {(Object.keys(fieldMeta) as (keyof typeof fieldMeta)[]).map((key) => {
        const entry = measurements[key];
        const meta = fieldMeta[key];
        return (
          <div key={key} className="flex flex-col gap-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 [font-family:var(--font-barlow)]">
              {meta.label}
            </p>
            <p
              className={`text-lg font-black [font-family:var(--font-barlow)] ${
                entry ? "text-[#F0CC72]" : "text-white"
              }`}
            >
              {entry ? `${entry.value} ${meta.unit}` : "—"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
