import Link from "next/link";
import { NavItem } from "./extras";

export function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const { Icon } = item;
  return (
    <Link
      href={item.to}
      aria-current={active ? "page" : undefined}
      className={`flex       min-h-9 items-center gap-3 rounded-md border border-transparent px-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 motion-reduce:transition-none ${
        active
          ? "border-gray-200 bg-gray-100 text-gray-950 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-50"
          : "text-gray-600 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-950 dark:text-gray-400 dark:hover:border-gray-800 dark:hover:bg-gray-900 dark:hover:text-gray-100"
      }`}
    >
      <Icon
        className={`size-4 shrink-0 ${active ? "text-gray-950 dark:text-gray-100" : ""}`}
      />
      {item.label}
    </Link>
  );
}
