export function DashboardSkeleton() {
  const bar = "animate-pulse rounded bg-gray-100 dark:bg-gray-900 motion-reduce:animate-none";
  return (
    <div aria-busy="true" aria-label="Loading dashboard">
      <div className={`${bar} h-7 w-64`} />
      <div className={`${bar} mt-2 h-4 w-56`} />
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((item) => <div key={item} className={`${bar} h-28`} />)}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className={`${bar} h-80 lg:col-span-3`} />
        <div className={`${bar} h-80 lg:col-span-2`} />
      </div>
    </div>
  );
}
