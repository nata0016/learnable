import { useId } from "react";
import { cn } from "@/lib/cn";

export type ProgressBarProps = {
  value: number;
  min?: number;
  max?: number;
  className?: string;
  children: React.ReactNode;
};

export function ProgressBar({ value, min = 0, max = 100, className, children }: ProgressBarProps) {
  const labelId = useId();
  const percent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div id={labelId} className="text-sm font-medium text-ink">
        {children}
      </div>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-labelledby={labelId}
        className="h-3 w-full overflow-hidden rounded-full bg-tint"
      >
        <div
          className="h-full rounded-full bg-teal transition-[width]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
