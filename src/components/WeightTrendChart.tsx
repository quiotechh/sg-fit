"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { recordedAt: Date; weightKg: number | null }[];
}

export default function WeightTrendChart({ data }: Props) {
  const chartData = data
    .filter((d) => d.weightKg !== null)
    .map((d) => ({
      date: new Date(d.recordedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
      weight: d.weightKg,
    }));

  if (chartData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-50 text-center gap-2">
        <p className="text-sm font-bold text-zinc-300 [font-family:var(--font-barlow)]">
          No entries yet
        </p>
        <p className="text-xs font-medium text-zinc-500 [font-family:var(--font-barlow)]">
          Log your first entry below to start tracking your progress.
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#2c2c2a" />
        <XAxis dataKey="date" tick={{ fontSize: 10, fontWeight: 700, fill: "#898781" }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fontSize: 10, fontWeight: 700, fill: "#898781" }}
          axisLine={false}
          tickLine={false}
          width={24}
          domain={["dataMin - 2", "dataMax + 2"]}
        />
        <Tooltip
          cursor={{ stroke: "#383835" }}
          contentStyle={{ borderRadius: 8, border: "1px solid #383835", background: "#1a1a19", fontSize: 12, fontWeight: 700, fontFamily: "var(--font-barlow)", color: "#ffffff" }}
          formatter={(value) => [`${value} kg`, "Weight"]}
        />
        <Line type="monotone" dataKey="weight" stroke="#F0CC72" strokeWidth={2} dot={{ r: 4, fill: "#F0CC72" }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
