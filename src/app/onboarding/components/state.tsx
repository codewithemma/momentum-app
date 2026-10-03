import { routes } from "@/libs/routes";
import Link from "next/link";

export function CompletionState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-16 text-center animate-step-in">
      <div className="w-full max-w-md">
        <div className="mb-9 flex justify-center">
          <span
            aria-hidden="true"
            className="flex size-12 items-center justify-center rounded-full border border-blue-600/40 dark:border-blue-500/40 bg-blue-600/10 dark:bg-blue-500/10"
          >
            <span className="block h-2 w-4 -translate-y-px -rotate-45 border-b-2 border-l-2 border-blue-600" />
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
            className="inline-flex min-h-12 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none border-blue-600 bg-blue-600 text-white hover:border-blue-500 hover:bg-blue-500 active:bg-blue-700 w-full sm:w-auto"
          >
            Add your first lead <span aria-hidden="true">&rarr;</span>
          </Link>
          <button
            type="button"
            className="inline-flex min-h-12 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none border-gray-200 bg-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:bg-gray-900 dark:hover:text-gray-100 w-full sm:w-auto"
          >
            I’ll do this later
          </button>
        </div>
      </div>
    </div>
  );
}
