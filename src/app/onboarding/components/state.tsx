import { routes } from "@/libs/routes";
import Link from "next/link";

export function CompletionState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-16 text-center animate-step-in">
      <div className="w-full max-w-md">
        <div className="mb-9 flex justify-center">
          <span
            aria-hidden="true"
            className="flex size-12 items-center justify-center rounded-full border border-emerald-700 bg-emerald-950"
          >
            <span className="block h-2 w-4 -translate-y-px -rotate-45 border-b-2 border-l-2 border-emerald-400" />
          </span>
        </div>
        <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
          You’re all set.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          Let’s get your first opportunity into Momentum.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3">
          <Link
            href={routes.leads.new}
            type="button"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-gray-950 bg-gray-950 px-4 text-sm font-medium text-white transition-colors duration-150 hover:bg-gray-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-950 dark:hover:bg-gray-300 dark:focus-visible:ring-offset-gray-950 sm:w-auto"
          >
            Add your first lead <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            href={routes.dashboard.home}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-gray-300 bg-transparent px-4 text-sm font-medium text-gray-600 transition-colors duration-150 hover:border-gray-400 hover:bg-gray-50 hover:text-gray-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-900 dark:hover:text-gray-100 dark:focus-visible:ring-offset-gray-950 sm:w-auto"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
