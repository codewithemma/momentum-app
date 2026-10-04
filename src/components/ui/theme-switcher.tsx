import { Monitor, Moon, Sun } from "lucide-react";

import type { ThemeChoice } from "@/hooks/use-theme";

interface ThemeSwitcherProps {
  theme: ThemeChoice;
  onThemeChange: (theme: ThemeChoice) => void;
}

export function ThemeSwitcher({ theme, onThemeChange }: ThemeSwitcherProps) {
  return (
    <div
      role="group"
      aria-label="Color theme"
      className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-100 p-1 dark:border-gray-800 dark:bg-gray-900"
    >
      {(
        [
          { value: "dark", label: "Dark theme", Icon: Moon },
          { value: "light", label: "Light theme", Icon: Sun },
          { value: "system", label: "System theme", Icon: Monitor },
        ] as const
      ).map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          aria-pressed={theme === value}
          title={label}
          onClick={() => onThemeChange(value)}
          className={`inline-flex size-8 items-center justify-center rounded-md transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 motion-reduce:transition-none ${theme === value ? "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-gray-100" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"}`}
        >
          <Icon className="size-4" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
