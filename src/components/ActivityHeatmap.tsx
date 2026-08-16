"use client";

import { useEffect, useRef, useState } from "react";

interface DayData {
  date: string;
  count: number;
}

interface Props {
  data: DayData[];
}

const CELL_SIZE = 12;
const CELL_GAP = 4;
const COLUMN_WIDTH = CELL_SIZE + CELL_GAP;

function getIntensityColor(count: number, max: number) {
  if (count === 0) return "#2c2c2a";
  const ratio = count / max;
  if (ratio <= 0.25) return "#5c4a1f";
  if (ratio <= 0.5) return "#8a6f2a";
  if (ratio <= 0.75) return "#C9953A";
  return "#F0CC72";
}

export default function ActivityHeatmap({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [weeksToShow, setWeeksToShow] = useState(12);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth;
      if (width > 0) {
        setWeeksToShow(Math.max(4, Math.floor(width / COLUMN_WIDTH)));
      }
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visibleData = data.slice(-weeksToShow * 7);
  const max = Math.max(...visibleData.map((d) => d.count), 1);

  // Pad the front so the grid starts on a Sunday (matches GitHub's layout).
  // new Date("YYYY-MM-DD") parses as UTC, so .getDay() can be off by one
  // in local time — parse the components directly instead.
  const todayKey = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD, local
  const [fy, fm, fd] = (visibleData[0]?.date ?? todayKey).split("-").map(Number);
  const firstDay = new Date(fy, fm - 1, fd).getDay();
  const padded = [...Array.from({ length: firstDay }, () => null), ...visibleData];

  const weeks: (DayData | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        <div className="flex flex-col gap-1 pr-1 shrink-0">
          {dayLabels.map((label, i) => (
            <div
              key={label}
              className="w-7 h-3 text-[9px] font-bold text-zinc-500 [font-family:var(--font-barlow)] leading-3"
            >
              {i % 2 === 1 ? label.slice(0, 3) : ""}
            </div>
          ))}
        </div>
        <div ref={containerRef} className="w-full">
          <div className="flex gap-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day, di) =>
                  day ? (
                    <div
                      key={di}
                      title={`${day.date}: ${day.count} ${day.count === 1 ? "workout" : "workouts"}`}
                      className="w-3 h-3 rounded-xs"
                      style={{ background: getIntensityColor(day.count, max) }}
                    />
                  ) : (
                    <div key={di} className="w-3 h-3" />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 [font-family:var(--font-barlow)]">
        <span>Less</span>
        {[0, 0.25, 0.5, 0.75, 1].map((r) => (
          <div
            key={r}
            className="w-2.5 h-2.5 rounded-xs"
            style={{
              background: getIntensityColor(
                r === 0 ? 0 : Math.ceil(r * max),
                max,
              ),
            }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
