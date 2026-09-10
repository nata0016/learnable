import { cn } from "@/lib/cn";

type FieldBaseProps = {
  id: string;
  label: string;
  description?: string;
  error?: string;
  className?: string;
  wrapperClassName?: string;
};

type FieldInputProps = FieldBaseProps & {
  as?: "input";
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "className">;

type FieldTextareaProps = FieldBaseProps & {
  as: "textarea";
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className">;

type FieldSelectProps = FieldBaseProps & {
  as: "select";
  children: React.ReactNode;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "id" | "className">;

export type FieldProps = FieldInputProps | FieldTextareaProps | FieldSelectProps;

const controlBaseStyles =
  "w-full rounded-md border bg-surface px-3 py-2 text-ink placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-50";

export function Field(props: FieldProps) {
  const { label, id, description, error, className, wrapperClassName, as, ...rest } = props;

  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  const controlClassName = cn(
    controlBaseStyles,
    error ? "border-error" : "border-line",
    className
  );

  const commonProps = {
    id,
    "aria-describedby": describedBy,
    "aria-invalid": error ? (true as const) : undefined,
    className: controlClassName,
  };

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>

      {as === "textarea" ? (
        <textarea
          {...commonProps}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : as === "select" ? (
        <select {...commonProps} {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)} />
      ) : (
        <input {...commonProps} {...(rest as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}

      {description ? (
        <p id={descriptionId} className="text-sm text-muted">
          {description}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="text-sm text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
