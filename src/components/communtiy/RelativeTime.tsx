"use client";

import { formatDistanceToNowStrict } from "date-fns";

type Props = {
  date: Date;
  className?: string;
};

export default function RelativeTime({ date, className }: Props) {
  return (
    <span className={className} suppressHydrationWarning>
      {formatDistanceToNowStrict(date, { addSuffix: true })}
    </span>
  );
}
