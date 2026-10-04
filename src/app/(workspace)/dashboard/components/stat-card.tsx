import type { LucideIcon } from "lucide-react";
import { card } from "./extras";

export function StatCard({
  label,
  value,
  hint,
  Icon,
  accent,
  isLoading = false,
  isError = false,
}: {
  label: string;
  value?: number;
  hint: string;
  Icon: LucideIcon;
  accent?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}) {
  return (
    <div
      className={`${card} border-b-2 ${
        accent
          ? "border-b-amber-500"
          : "border-b-gray-900 dark:border-b-gray-100"
      } p-5`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">{label}</p>
        <div className="flex size-8 shrink-0 items-center justify-center border border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
          <Icon className="size-4" aria-hidden="true" />
        </div>
      </div>
      <p
        className={`mt-3 text-3xl font-semibold tracking-tight tabular-nums ${
          isLoading || isError ? "text-gray-400 dark:text-gray-600" : ""
        }`}
      >
        {isLoading ? "…" : isError ? "—" : value ?? "—"}
      </p>
      <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">{hint}</p>
    </div>
  );
}
