import { ReactNode, useId } from "react";
import { inputClass, okBorder } from "./extras";

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950 sm:p-6">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

interface ControlProps {
  id: string;
  name: string;
  "aria-invalid"?: boolean | undefined;
  "aria-describedby"?: string | undefined;
  "aria-required"?: boolean | undefined;
}

export function Field({
  label,
  required,
  error,
  className = "",
  srOnlyLabel,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string | null;
  className?: string;
  srOnlyLabel?: boolean;
  children: (p: ControlProps) => ReactNode;
}) {
  const id = useId();
  const errId = `${id}-error`;
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={
          srOnlyLabel
            ? "sr-only"
            : "mb-2 flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300"
        }
      >
        {label}
        {required && (
          <>
            <span
              aria-hidden="true"
              className="text-gray-500 dark:text-gray-400"
            >
              *
            </span>
            <span className="sr-only">(required)</span>
          </>
        )}
      </label>
      {children({
        id,
        name: label.toLowerCase().replace(/\s+/g, "-"),
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errId : undefined,
        "aria-required": required || undefined,
      })}
      {error && (
        <p
          id={errId}
          role="alert"
          className="mt-2 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}) {
  const colSpan = className.includes("sm:col-span-2") ? "sm:col-span-2" : "";
  const inputExtra = className.replace("sm:col-span-2", "").trim();
  return (
    <Field label={label} className={colSpan}>
      {(p) => (
        <input
          {...p}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} ${okBorder} ${inputExtra}`}
        />
      )}
    </Field>
  );
}
