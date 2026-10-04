import { Calendar, Clock, Mail, Phone } from "lucide-react";
import { card, ACTIVITY_LABELS, relative } from "./extras";
import { SectionHeader, EmptyRow } from "./section-header";
import type { DashboardRecentActivity } from "@/types/common";

export function RecentActivity({
  items,
  isLoading,
  isError,
  onRetry,
}: {
  items: DashboardRecentActivity[];
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}) {
  return (
    <section className={card}>
      <SectionHeader title="Recent activity" />
      {isLoading ? (
        <EmptyRow text="Loading recent activity..." />
      ) : isError ? (
        <div className="px-5 py-8 text-center">
          <EmptyRow text="Failed to load recent activity." />
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
        <EmptyRow text="Activity on your leads will show up here." />
      ) : (
        <ol className="divide-y divide-gray-200 dark:divide-gray-800">
          {items.map((item) => {
            const Icon =
              item.type === "CALL"
                ? Phone
                : item.type === "EMAIL"
                  ? Mail
                  : item.type === "MEETING"
                    ? Calendar
                    : Clock;
            return (
              <li
                key={item.id}
                className="flex items-start gap-3.5 px-5 py-3.5"
              >
                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800">
                  <Icon className="size-3.5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-gray-500">
                      {" "}
                      · {item.lead.name}
                      {item.lead.company ? ` (${item.lead.company})` : ""}
                    </span>
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {item.description || ACTIVITY_LABELS[item.type]}
                  </p>
                </div>
                <time
                  dateTime={item.createdAt}
                  className="shrink-0 text-xs text-gray-400"
                >
                  {relative(item.createdAt)}
                </time>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
