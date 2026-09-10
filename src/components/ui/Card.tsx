import { cn } from "@/lib/cn";

export type CardProps = {
  as?: "div" | "article";
} & React.HTMLAttributes<HTMLElement>;

export function Card({ as = "div", className, children, ...props }: CardProps) {
  const Component = as;

  return (
    <Component
      className={cn("rounded-lg border border-line bg-surface p-5 shadow-sm", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
