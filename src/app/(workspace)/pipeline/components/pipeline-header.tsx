import Link from "next/link";
import { btnPrimary, FollowUpFilter } from "./extras";
import { FilterMenu } from "./filter-menu";
import { routes } from "@/libs/routes";
import { Plus, Search } from "lucide-react";

export const PipelineHeader = (props: {
  search: string;
  onSearch: (v: string) => void;
  source: string;
  onSource: (v: string) => void;
  followUp: FollowUpFilter;
  onFollowUp: (v: FollowUpFilter) => void;
  showControls: boolean;
}) => {
  return (
    <div className="flex flex-col gap-6 border-b border-gray-200 pb-6 dark:border-gray-800 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500">
          Workspace
        </p>
        <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
          Pipeline
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          Track every opportunity from first contact to closed.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {props.showControls && (
          <>
            <div className="relative sm:w-64">
              <label htmlFor="pipeline-search" className="sr-only">
                Search leads
              </label>
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                id="pipeline-search"
                type="search"
                value={props.search}
                onChange={(e) => props.onSearch(e.target.value)}
                placeholder="Search leads..."
                className="block min-h-10 w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors duration-150 hover:border-gray-400 focus:border-gray-500 focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500 dark:hover:border-gray-600 motion-reduce:transition-none"
              />
            </div>
            <FilterMenu {...props} />
          </>
        )}
        <Link href={routes.leads.new} className={`${btnPrimary} shrink-0`}>
          <Plus aria-hidden="true" className="size-4" /> Add lead
        </Link>
      </div>
    </div>
  );
};
