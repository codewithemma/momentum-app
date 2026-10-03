import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface OptionButtonProps {
  label: string;
  Icon?: LucideIcon;
  selected: boolean;
  onToggle: () => void;
  multi: boolean;
}

export function OptionButton({
  label,
  Icon,
  selected,
  onToggle,
  multi,
}: OptionButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`group flex min-h-12 w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 motion-reduce:transition-none ${
        selected
          ? "border-blue-600 bg-blue-600/10 dark:bg-blue-500/10 text-gray-900 dark:text-gray-100"
          : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
      }`}
    >
      {Icon && (
        <Icon
          aria-hidden="true"
          className={`size-4 shrink-0 ${selected ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"}`}
        />
      )}
      <span className="flex-1">{label}</span>
      {multi || selected ? (
        <span
          aria-hidden="true"
          className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-150 ${
            selected
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-gray-200 dark:border-gray-800 bg-transparent text-transparent"
          }`}
        >
          <Check className="size-3" strokeWidth={3} />
        </span>
      ) : null}
    </button>
  );
}
