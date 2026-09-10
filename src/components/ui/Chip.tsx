import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export type ChipProps = {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "aria-pressed" | "className">;

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { pressed, onPressedChange, className, children, ...props },
  ref
) {
  return (
    <button
      type="button"
      ref={ref}
      aria-pressed={pressed}
      onClick={() => onPressedChange(!pressed)}
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        pressed
          ? "border-teal bg-teal text-white"
          : "border-line bg-surface text-ink hover:bg-tint",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
