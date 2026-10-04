import { Kanban, Plus, Users } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  const ghost = "inline-flex min-h-10 items-center gap-2 rounded-md border border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 transition-colors duration-150 hover:border-gray-400 hover:bg-gray-50 hover:text-gray-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-900 dark:hover:text-gray-100";
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Link href="/leads" className={ghost}><Users className="size-4 text-gray-400" aria-hidden="true" />All leads</Link>
      <Link href="/pipeline" className={ghost}><Kanban className="size-4 text-gray-400" aria-hidden="true" />Pipeline</Link>
      <Link href="/leads/new" className="inline-flex min-h-10 items-center gap-2 rounded-md border border-gray-950 bg-gray-950 px-4 text-sm font-medium text-white hover:border-gray-700 hover:bg-gray-700 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 dark:border-gray-100 dark:bg-gray-100 dark:text-gray-950 dark:hover:border-gray-300 dark:hover:bg-gray-300"><Plus className="size-4" aria-hidden="true" />Add lead</Link>
    </div>
  );
}
