import { Wordmark } from "@/components/ui/wordmark";
import Link from "next/link";
import { MAIN_NAV, SETTINGS_NAV } from "./extras";
import { useLocalTheme } from "@/hooks/use-theme";
import { NavLink } from "./navlink";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useSession } from "next-auth/react";
import { ChevronsUpDown } from "lucide-react";

export function SidebarContent({
  isActive,
  themeState,
}: {
  isActive: (to: string) => boolean;
  themeState: ReturnType<typeof useLocalTheme>;
}) {
  const { data: session } = useSession();
  return (
    <div className="flex h-full flex-col px-3 py-4">
      <Link
        href="/dashboard"
        className="mb-6 rounded-md px-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <Wordmark />
      </Link>

      <nav aria-label="Main" className="flex-1">
        <ul className="space-y-1">
          {MAIN_NAV.map((item) => (
            <li key={item.to}>
              <NavLink item={item} active={isActive(item.to)} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-3 border-t border-gray-200 pt-3 dark:border-gray-800">
        <NavLink item={SETTINGS_NAV} active={isActive(SETTINGS_NAV.to)} />
        <div className="px-2">
          <ThemeSwitcher
            theme={themeState.theme}
            onThemeChange={themeState.setTheme}
          />
        </div>
        <button
          type="button"
          aria-label={`Account: ${session?.user?.name}`}
          className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors duration-150 hover:bg-gray-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-gray-900 motion-reduce:transition-none"
        >
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            {session?.user?.name.charAt(0)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-gray-900 dark:text-gray-100">
              {session?.user?.name}
            </span>
            <span className="block truncate text-xs text-gray-500 dark:text-gray-400">
              {session?.user?.email}
            </span>
          </span>
          <ChevronsUpDown
            className="size-4 shrink-0 text-gray-400"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}
