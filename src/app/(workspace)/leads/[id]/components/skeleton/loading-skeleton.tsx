export function LoadingSkeleton() {
  return (
    <div
      className="animate-pulse py-10 lg:py-14"
      aria-busy="true"
      aria-label="Loading lead details"
    >
      <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-800" />
      <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <div className="h-8 w-64 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-52 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="mt-2 h-9 w-32 rounded bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-20 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
        <div className="space-y-8">
          <div className="h-32 rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-900/50" />
          <div className="h-64 rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-900/50" />
        </div>
        <div className="space-y-8">
          <div className="h-44 rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-900/50" />
          <div className="h-36 rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-900/50" />
          <div className="h-36 rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-900/50" />
        </div>
      </div>
    </div>
  );
}
