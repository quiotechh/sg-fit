"use client";

import { Pie, PieChart, Cell, Label } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Props {
  slug: string;
  title: string;
  percent: number;
  nextDay: { weekNumber: number; dayNumber: number } | null;
}

const chartConfig = {
  completed: { label: "Completed", color: "#C9953A" },
  remaining: { label: "Remaining", color: "#e4e4e7" },
} satisfies ChartConfig;

export default function ProgramDonut({ slug, title, percent, nextDay }: Props) {
  const chartData = [
    { key: "completed", value: percent, fill: "url(#donutGradient)" },
    { key: "remaining", value: 100 - percent, fill: "#e4e4e7" },
  ];

  const href = nextDay
    ? `/my-programs/workouts/${slug}/week/${nextDay.weekNumber}/day/${nextDay.dayNumber}`
    : `/my-programs/workouts/${slug}`;

  return (
    <div className="flex flex-col items-center gap-5 p-4 sm:p-6">
      <div className="relative">
        <div className="absolute inset-0 m-auto w-40 h-40 rounded-full blur-3xl opacity-60 pointer-events-none bg-[radial-gradient(circle,#F0CC72_0%,transparent_70%)]" />
        <ChartContainer
          config={chartConfig}
          className="relative mx-auto aspect-square w-40 max-h-50 filter-[drop-shadow(0_8px_16px_rgba(201,149,58,0.35))]"
        >
          <PieChart>
            <defs>
              <linearGradient id="donutGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F8DFA0" />
                <stop offset="100%" stopColor="#C9953A" />
              </linearGradient>
            </defs>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="key"
              innerRadius={55}
              outerRadius={72}
              strokeWidth={0}
            >
              {chartData.map((entry) => (
                <Cell key={entry.key} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-zinc-950 text-3xl font-black [font-family:var(--font-barlow)]">
                          {percent}%
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="fill-zinc-400 text-[10px] font-bold uppercase tracking-widest [font-family:var(--font-barlow)]">
                          Complete
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      <p className="text-base font-black uppercase tracking-tight text-zinc-950 [font-family:var(--font-barlow)] text-center">
        {title}
      </p>

      <Link
        href={href}
        className="group w-full inline-flex items-center justify-center gap-2.5 text-sm font-black uppercase tracking-widest px-8 py-4 rounded-xl text-zinc-950 [font-family:var(--font-barlow)] active:scale-95 hover:scale-[1.03] hover:shadow-[0_8px_24px_-4px_rgba(240,204,114,0.5)] transition-all duration-200"
        style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
      >
        {nextDay ? "Continue Workout" : "Program Complete 🏆"}
        <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
      </Link>
    </div>
  );
}
