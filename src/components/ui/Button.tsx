import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsButton = ButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = ButtonOwnProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-teal text-white hover:bg-deep",
  secondary: "border border-line bg-tint text-deep hover:bg-line",
  ghost: "bg-transparent text-teal hover:bg-tint",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-base",
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = "primary", size = "md", className, href, children, ...props }, ref) {
    const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

    if (href !== undefined) {
      return (
        <a
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        type="button"
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
      >
        {children}
      </button>
    );
  }
);
