"use client";
import { useTheme } from "@/hooks/use-theme";
import { routes } from "@/libs/routes";
import Link from "next/link";
import { btnPrimary } from "./extras";
import { LEAD_SOURCES } from "../new/components/extras";
import { fmt } from "@/libs/date-fns";
import { useGetAllLeads } from "@/hooks/query/use-leads";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";
import { Pagination } from "@/components/ui/pagination";

const LeadsClientPage = () => {
  const { isDark } = useTheme();
  const { data, isLoading, updateQuery } = useGetAllLeads();
  const [search, setSearch] = useQueryState("search");
  const [debouncedSearchValue] = useDebounce(search?.trim(), 1000);
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [source, setSource] = useQueryState("source");
  const hasActiveFilters = Boolean(search?.trim() || source);

  const current = page ?? 1;
  const totalPages = data?.pagination.totalPages ?? 1;

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage);
  };

  useEffect(() => {
    updateQuery("page", current);
  }, [current, updateQuery]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises, react-hooks/set-state-in-effect
    setPage(1);
    updateQuery("source", source ?? undefined);

    if (debouncedSearchValue) {
      updateQuery("search", debouncedSearchValue);
    } else {
      updateQuery("search", undefined);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue, source]);

  const isEmpty = !isLoading && data && data.leads.length === 0;

  const reset = async () => {
    await Promise.all([setPage(1), setSearch(null), setSource(null)]);
  };

  return (
    <main
      className={`${isDark ? "dark" : ""} min-h-screen bg-white text-gray-900 transition-colors duration-200 dark:bg-gray-950 dark:text-gray-100 motion-reduce:transition-none`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-10 lg:py-10">
        <div className="py-10 lg:py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
                Leads
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                Keep track of your potential clients and where every opportunity
                stands.
              </p>
            </div>
            <Link href={routes.leads.new} className={`${btnPrimary} shrink-0`}>
              <span aria-hidden="true">+</span> Add lead
            </Link>
          </div>

          {/* Search & Source filter bar */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full max-w-sm">
              <label htmlFor="lead-search" className="sr-only">
                Search leads
              </label>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              >
                <circle
                  cx="9"
                  cy="9"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="m14 14 3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                id="lead-search"
                type="search"
                value={search ?? ""}
                onChange={(e) => setSearch(e.currentTarget.value)}
                placeholder="Search leads..."
                className="block min-h-10 w-full rounded-md border border-gray-200 bg-transparent py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors duration-150 hover:border-gray-300 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:border-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:hover:border-gray-700 motion-reduce:transition-none"
              />
            </div>

            <div className="w-full sm:w-48">
              <label htmlFor="lead-source-filter" className="sr-only">
                Filter by source
              </label>
              <select
                id="lead-source-filter"
                value={source ?? "all"}
                onChange={(e) =>
                  setSource(e.target.value === "all" ? null : e.target.value)
                }
                className="block min-h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 transition-colors duration-150 hover:border-gray-300 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-gray-700 motion-reduce:transition-none"
              >
                <option value="">All sources</option>
                {LEAD_SOURCES.map((s) => (
                  <option key={s.label} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  reset();
                }}
                className="inline-flex items-center text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="mt-6" aria-busy={isLoading}>
            {isLoading && !data ? (
              <div className="flex justify-center rounded-lg border border-gray-200 py-20 dark:border-gray-800">
                <span
                  aria-label="Loading leads"
                  className="size-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-500 motion-reduce:animate-none"
                />
              </div>
            ) : isEmpty ? (
              hasActiveFilters ? (
                <div className="rounded-lg border border-gray-200 px-6 py-16 text-center dark:border-gray-800">
                  <p className="text-sm font-medium">
                    No leads match your active filters
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Try adjusting your search term or choosing a different
                    source.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                    }}
                    className="mt-4 text-xs font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-gray-300 px-6 py-20 text-center dark:border-gray-800">
                  <h2 className="text-base font-semibold">No leads yet</h2>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                    Start building your pipeline by adding your first potential
                    client.
                  </p>
                  <Link
                    href={routes.leads.new}
                    className={`${btnPrimary} mt-6`}
                  >
                    Add your first lead <span aria-hidden="true">→</span>
                  </Link>
                </div>
              )
            ) : data ? (
              <div
                className={`transition-opacity duration-150 motion-reduce:transition-none ${isLoading ? "opacity-60" : ""}`}
              >
                {/* Desktop table */}
                <div className="hidden overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-gray-200 bg-gray-50 text-xs font-medium uppercase tracking-wide text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
                      <tr>
                        {[
                          "Name",
                          "Company",
                          "Source",
                          "Industry",
                          "Next follow-up",
                          "Created",
                          "Action",
                        ].map((h) => (
                          <th
                            key={h}
                            scope="col"
                            className="px-4 py-3 font-medium"
                          >
                            {h}
                          </th>
                        ))}
                        <th
                          scope="col"
                          className="px-4 py-3 text-right font-medium"
                        >
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {data.leads.map((l) => (
                        <tr
                          key={l.id}
                          className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-900 motion-reduce:transition-none"
                        >
                          <td className="px-4 py-3">
                            <Link
                              href={routes.leads.leadById(l.id)}
                              // params={{ id: l.id }}
                              className="font-medium text-gray-900 hover:text-blue-600 focus-visible:outline-hidden focus-visible:underline dark:text-gray-100 dark:hover:text-blue-500"
                            >
                              {l.name}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                            {l.company ?? "—"}
                          </td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                            {l.source}
                          </td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                            {l.industry}
                          </td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                            {fmt(l.nextFollowUpAt) ?? "—"}
                          </td>
                          <td className="px-4 py-3 text-gray-500 dark:text-gray-500">
                            {fmt(l.createdAt)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Link
                              href={routes.leads.leadById(l.id)}
                              className="inline-flex min-h-8 items-center gap-1 rounded-md border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors duration-150 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-800 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-100 motion-reduce:transition-none"
                            >
                              View <span aria-hidden="true">→</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile stacked cards */}
                <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-800 dark:border-gray-800 md:hidden">
                  {data.leads.map((l) => (
                    <li
                      key={l.id}
                      className="p-4 transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-900 motion-reduce:transition-none"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <Link
                          href={routes.leads.leadById(l.id)}
                          className="truncate font-medium text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-500"
                        >
                          {l.name}
                        </Link>
                        <span className="shrink-0 text-xs text-gray-500">
                          {fmt(l.createdAt)}
                        </span>
                      </div>
                      {l.company && (
                        <p className="mt-0.5 truncate text-sm text-gray-600 dark:text-gray-400">
                          {l.company}
                        </p>
                      )}
                      <div className="mt-2 flex items-end justify-between gap-2">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          <p>
                            {l.source} · {l.industry}
                          </p>
                          <p className="mt-0.5">
                            {l.nextFollowUpAt
                              ? `Follow-up: ${fmt(l.nextFollowUpAt)}`
                              : "None scheduled"}
                          </p>
                        </div>
                        <Link
                          href={routes.leads.leadById(l.id)}
                          className="inline-flex min-h-8 shrink-0 items-center gap-1 rounded-md border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                        >
                          View <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
                <Pagination
                  currentPage={current}
                  totalPages={totalPages}
                  isLoading={isLoading}
                  onPageChange={handlePageChange}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LeadsClientPage;
