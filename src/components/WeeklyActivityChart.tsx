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
// const CATEGORICAL_COLORS = [
//   "#C9953A", // brand gold
//   "#2a78d6", // blue
//   "#1baf7a", // aqua
//   "#eda100", // yellow
//   "#e87ba4", // magenta
//   "#008300", // green
//   "#4a3aa7", // violet
//   "#e34948", // red
// ];

// dark-surface variant (dashboard card ab black background use karta hai)
const CATEGORICAL_COLORS = [
  "#F0CC72", // brand gold — halka variant, dark background pe zyada contrast
  "#3987e5", // blue
  "#199e70", // aqua
  "#c98500", // yellow
  "#d55181", // magenta
  "#008300", // green
  "#9085e9", // violet
  "#e66767", // red
];

interface Props {
  data: Record<string, string | number>[];
}

export default function WeeklyActivityChart({ data }: Props) {
  const programNames = Array.from(
    new Set(
      data.flatMap((row) => Object.keys(row).filter((k) => k !== "label")),
    ),
  );

  const hasData =
    programNames.length > 0 &&
    data.some((row) =>
      programNames.some((name) => (row[name] as number) > 0),
    );

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center h-55 text-center gap-2">
        <p className="text-sm font-bold text-white/70 [font-family:var(--font-barlow)]">
          No workouts completed yet
        </p>
        <p className="text-xs font-medium text-white/40 [font-family:var(--font-barlow)]">
          Complete a workout day to see your activity here.
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        {/* <CartesianGrid vertical={false} stroke="#e4e4e7" /> */}
        <CartesianGrid vertical={false} stroke="#2c2c2a" />
        <XAxis
          dataKey="label"
          // tick={{ fontSize: 10, fontWeight: 700, fill: "#a1a1aa" }}
          tick={{ fontSize: 10, fontWeight: 700, fill: "#898781" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          // tick={{ fontSize: 10, fontWeight: 700, fill: "#a1a1aa" }}
          tick={{ fontSize: 10, fontWeight: 700, fill: "#898781" }}
          axisLine={false}
          tickLine={false}
          width={24}
        />
        <Tooltip
          // cursor={{ fill: "#f4f4f5" }}
          cursor={{ fill: "#2c2c2a" }}
          contentStyle={{
            borderRadius: 8,
            // border: "1px solid #e4e4e7",
            border: "1px solid #383835",
            background: "#1a1a19",
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "var(--font-barlow)",
            color: "#ffffff",
          }}
        />
        <Legend
          wrapperStyle={{
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "var(--font-barlow)",
            color: "#c3c2b7",
          }}
        />
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
