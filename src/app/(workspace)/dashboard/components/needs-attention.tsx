import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { DashboardNeedsAttentionResponse } from "@/types/common";
import { card, linkAction, shortDate, type FollowUpState } from "./extras";
import { EmptyRow, SectionHeader } from "./section-header";

const groups: {
  state: FollowUpState;
  label: string;
  dot: string;
  text: string;
  badge: string;
}[] = [
  {
    state: "OVERDUE",
    label: "Overdue",
    dot: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
    badge:
      "bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300",
  },
  {
    state: "TODAY",
    label: "Due today",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
    badge:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  },
  {
    state: "UPCOMING",
    label: "Upcoming",
    dot: "bg-gray-400 dark:bg-gray-500",
    text: "text-gray-600 dark:text-gray-400",
    badge:
      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
];

export function NeedsAttention({
  data,
  isLoading,
  isError,
  onRetry,
}: {
  data?: DashboardNeedsAttentionResponse;
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}) {
  const items = [
    ...(data?.overdue.leads ?? []).map((lead) => ({
      ...lead,
      dueAt: lead.nextFollowUpAt,
      state: "OVERDUE" as const,
    })),
    ...(data?.dueToday.leads ?? []).map((lead) => ({
      ...lead,
      dueAt: lead.nextFollowUpAt,
      state: "TODAY" as const,
    })),
    ...(data?.upcoming.leads ?? []).map((lead) => ({
      ...lead,
      dueAt: lead.nextFollowUpAt,
      state: "UPCOMING" as const,
    })),
  ];

  return (
    <section className={`${card} overflow-hidden`}>
      <SectionHeader
        title="Needs attention"
        action={
          <Link href="/leads" className={linkAction}>
            View all leads →
          </Link>
        }
      />
      {isLoading ? (
        <EmptyRow text="Loading follow-ups..." />
      ) : isError ? (
        <div className="px-5 py-8 text-center">
          <EmptyRow text="Failed to load follow-ups." />
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 text-xs font-medium text-gray-700 underline-offset-4 hover:text-gray-950 hover:underline dark:text-gray-300 dark:hover:text-white"
            >
              Try again
            </button>
          )}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center px-5 py-14 text-center">
          <CheckCircle2
            className="size-6 text-emerald-600"
            aria-hidden="true"
          />
          <p className="mt-2 text-sm font-medium">You&apos;re all caught up</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            No follow-ups need your attention right now.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {groups.map((group) => {
            const rows = items.filter((item) => item.state === group.state);
            if (!rows.length) return null;
            return (
              <div key={group.state} className="py-2">
                <div className="flex items-center justify-between px-5 py-2">
                  <span
                    className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${group.text}`}
                  >
                    <span className={`size-2 rounded-full ${group.dot}`} />
                    {group.label}
                  </span>
                  <span className="text-xs text-gray-400">
                    {rows.length} {rows.length === 1 ? "lead" : "leads"}
                  </span>
                </div>
                <ul className="divide-y divide-gray-100 dark:divide-gray-900">
                  {rows.map((row) => (
                    <li key={row.id}>
                      <Link
                        href={`/leads/${row.id}`}
                        className={`flex items-center justify-between gap-4 border-l-2 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-900 ${
                          group.state === "OVERDUE"
                            ? "border-red-500"
                            : "border-transparent"
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {row.name}
                          </p>
                          <p className="truncate text-xs text-gray-500">
                            {row.company || "No company"}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${group.badge}`}
                        >
                          {group.state === "TODAY"
                            ? "Today"
                            : shortDate(row.dueAt)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
