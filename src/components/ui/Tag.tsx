import { cn } from "@/lib/cn";

export type TagProps = {
  variant?: "default" | "ok";
} & React.HTMLAttributes<HTMLSpanElement>;

export function Tag({ variant = "default", className, children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variant === "ok" ? "bg-success text-white" : "bg-tint text-deep",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
