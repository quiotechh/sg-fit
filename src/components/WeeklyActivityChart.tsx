"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// dataviz skill ka validated categorical palette — fixed order, eyeball nahi kiya
const CATEGORICAL_COLORS = [
  "#C9953A", // brand gold
  "#2a78d6", // blue
  "#1baf7a", // aqua
  "#eda100", // yellow
  "#e87ba4", // magenta
  "#008300", // green
  "#4a3aa7", // violet
  "#e34948", // red
];

interface Props {
  data: Record<string, string | number>[];
}

export default function WeeklyActivityChart({ data }: Props) {
  const programNames = Array.from(
    new Set(data.flatMap((row) => Object.keys(row).filter((k) => k !== "label"))),
  );

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#e4e4e7" />
        <XAxis dataKey="label" tick={{ fontSize: 10, fontWeight: 700, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
        <YAxis allowDecimals={false} tick={{ fontSize: 10, fontWeight: 700, fill: "#a1a1aa" }} axisLine={false} tickLine={false} width={24} />
        <Tooltip
          cursor={{ fill: "#f4f4f5" }}
          contentStyle={{ borderRadius: 8, border: "1px solid #e4e4e7", fontSize: 12, fontWeight: 700 }}
        />
        <Legend wrapperStyle={{ fontSize: 11, fontWeight: 700, fontFamily: "var(--font-barlow)" }} />
        {programNames.map((name, i) => (
          <Bar
            key={name}
            dataKey={name}
            fill={CATEGORICAL_COLORS[i % CATEGORICAL_COLORS.length]}
            radius={[4, 4, 0, 0]}
            maxBarSize={20}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
