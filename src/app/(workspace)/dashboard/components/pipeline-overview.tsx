import Link from "next/link";
import {
  card,
  linkAction,
  STATUS_BAR,
  STATUS_LABELS,
  type DashboardData,
} from "./extras";
import { EmptyRow, SectionHeader } from "./section-header";

export function PipelineOverview({
  rows,
  isLoading,
  isError,
  onRetry,
}: {
  rows: DashboardData["pipeline"];
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}) {
  const max = Math.max(1, ...rows.map((row) => row.count));
  const total = rows.reduce((sum, row) => sum + row.count, 0);
  return (
    <section className={card}>
      <SectionHeader
        title="Pipeline"
        action={
          <Link href="/pipeline" className={linkAction}>
            View board →
          </Link>
        }
      />
      {isLoading ? (
        <EmptyRow text="Loading pipeline..." />
      ) : isError ? (
        <div className="px-5 py-8 text-center">
          <EmptyRow text="Failed to load pipeline." />
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
      ) : total === 0 ? (
        <EmptyRow text="No leads in your pipeline yet." />
      ) : (
        <ul className="space-y-4 px-5 py-5">
          {rows.map((row) => (
            <li key={row.status}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {STATUS_LABELS[row.status]}
                </span>
                <span className="text-xs font-medium tabular-nums text-gray-500">
                  {row.count} {row.count === 1 ? "lead" : "leads"}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                <div
                  className={`h-full ${STATUS_BAR[row.status]}`}
                  style={{ width: `${(row.count / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
