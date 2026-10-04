export function PipelineSkeleton() {
  const bar =
    "animate-pulse rounded bg-gray-100 dark:bg-gray-900 motion-reduce:animate-none";
  return (
    <div aria-busy="true" aria-label="Loading pipeline">
      <div className={`${bar} h-8 w-40`} />
      <div className={`${bar} mt-3 h-4 w-72`} />
      <div className="mt-8 flex gap-3">
        <div className={`${bar} h-10 w-64`} />
        <div className={`${bar} h-10 w-24`} />
      </div>
      <div className="mt-8 flex gap-3 overflow-hidden">
        {[3, 2, 1, 2, 1].map((n, i) => (
          <div
            key={i}
            className="w-72 shrink-0 space-y-2 rounded-lg bg-gray-50 p-2 dark:bg-gray-900"
          >
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800 motion-reduce:animate-none" />
            {Array.from({ length: n }).map((_, j) => (
              <div
                key={j}
                className="h-20 animate-pulse rounded-md bg-white dark:bg-gray-950 motion-reduce:animate-none"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
