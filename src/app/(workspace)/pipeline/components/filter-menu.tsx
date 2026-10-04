import { useEffect, useRef, useState } from "react";
import {
  btnGhost,
  FOLLOW_UP_OPTIONS,
  FollowUpFilter,
  selectClass,
  SOURCE_LABELS,
} from "./extras";

export const FilterMenu = ({
  source,
  onSource,
  followUp,
  onFollowUp,
}: {
  source: string;
  onSource: (v: string) => void;
  followUp: FollowUpFilter;
  onFollowUp: (v: FollowUpFilter) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = (source !== "ALL" ? 1 : 0) + (followUp !== "ALL" ? 1 : 0);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) =>
      ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
        className={`${btnGhost} w-full sm:w-auto`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="size-4"
        >
          <path
            d="M3 5h14M6 10h8M9 15h2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        Filter
        {active > 0 && (
          <span className="rounded-full bg-blue-600 px-1.5 text-xs font-semibold text-white">
            {active}
          </span>
        )}
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Filter leads"
          className="absolute right-0 z-20 mt-2 w-64 space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950"
        >
          <div>
            <label
              htmlFor="filter-source"
              className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400"
            >
              Source
            </label>
            <select
              id="filter-source"
              value={source}
              onChange={(e) => onSource(e.target.value)}
              className={`${selectClass} mt-1.5`}
            >
              <option value="ALL">All sources</option>
              {Object.entries(SOURCE_LABELS).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="filter-follow"
              className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400"
            >
              Follow-up
            </label>
            <select
              id="filter-follow"
              value={followUp}
              onChange={(e) => onFollowUp(e.target.value as FollowUpFilter)}
              className={`${selectClass} mt-1.5`}
            >
              {FOLLOW_UP_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          {active > 0 && (
            <button
              type="button"
              onClick={() => {
                onSource("ALL");
                onFollowUp("ALL");
              }}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 focus-visible:outline-hidden focus-visible:underline dark:text-blue-500"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};
