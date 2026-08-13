"use client";

import { useState, useTransition } from "react";
import { addBodyMetric } from "@/lib/actions/body-metrics";
import { bodyMetricSchema } from "@/lib/validation/body-metrics";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Props {
  path: string;
}

const fields = [
  { key: "weightKg", label: "Weight (kg)" },
  { key: "waistIn", label: "Waist (in)" },
  { key: "chestIn", label: "Chest (in)" },
  { key: "hipsIn", label: "Hips (in)" },
  { key: "armsIn", label: "Arms (in)" },
  { key: "thighsIn", label: "Thighs (in)" },
] as const;

export default function BodyMetricForm({ path }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleChange(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    setError(null);
    setSuccess(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const parsedValues: Record<string, number | undefined> = {};
    for (const f of fields) {
      const raw = values[f.key];
      parsedValues[f.key] = raw ? Number(raw) : undefined;
    }

    const payload = { ...parsedValues, path };

    const clientCheck = bodyMetricSchema.safeParse(payload);
    if (!clientCheck.success) {
      setError(clientCheck.error.issues[0].message);
      return;
    }

    startTransition(async () => {
      try {
        await addBodyMetric(payload);
        setValues({});
        setSuccess(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {fields.map((f) => (
          <div key={f.key} className="flex flex-col gap-1.5">
            <Label
              htmlFor={f.key}
              className="text-[10px] font-black uppercase tracking-widest text-zinc-500 [font-family:var(--font-barlow)]"
            >
              {f.label}
            </Label>
            <Input
              id={f.key}
              type="number"
              step="0.1"
              value={values[f.key] ?? ""}
              onChange={(e) => handleChange(f.key, e.target.value)}
              className="h-10 border-2 border-zinc-200 focus-visible:border-zinc-950 focus-visible:ring-0 rounded-lg px-3 text-sm font-semibold text-zinc-950 [font-family:var(--font-barlow)]"
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="text-xs font-semibold text-red-500 [font-family:var(--font-barlow)]">
          {error}
        </p>
      )}
      {success && (
        <p className="text-xs font-semibold text-[#C9953A] [font-family:var(--font-barlow)]">
          Entry saved.
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        size="lg"
        className="self-start h-auto text-zinc-950 text-sm font-black uppercase tracking-widest px-6 py-3 rounded-lg active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)] cursor-pointer hover:opacity-90"
        style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
      >
        {isPending ? "Saving..." : "Log Entry"}
      </Button>
    </form>
  );
}
