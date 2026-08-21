"use client";

import { Calendar } from "@/components/ui/calendar";

interface Props {
  activityData: { date: string; count: number }[];
}

export default function WorkoutCalendar({ activityData }: Props) {
  const completedDates = activityData
    .filter((d) => d.count > 0)
    .map((d) => new Date(d.date));

  return (
    <Calendar
      modifiers={{ completed: completedDates }}
      modifiersClassNames={{
        completed: "bg-[#F0CC72]/25 text-[#8a6218] font-black rounded-full",
      }}
      className="w-full [--cell-size:--spacing(7)]"
    />
  );
}
