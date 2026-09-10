import { cn } from "@/lib/cn";

export type ToggleProps = {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  description?: string;
  disabled?: boolean;
  className?: string;
};

export function Toggle({
  id,
  label,
  checked,
  onCheckedChange,
  description,
  disabled,
  className,
}: ToggleProps) {
  const labelId = `${id}-label`;
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <span id={labelId} className="text-sm font-semibold text-ink">
          {label}
        </span>
        {description ? (
          <p id={descriptionId} className="text-sm text-muted">
            {description}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "border-teal bg-teal" : "border-line bg-line",
          className
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}
