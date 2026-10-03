import Link from "next/link";

const NotFoundView = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-24 text-center">
      <h1 className="text-2xl font-semibold leading-tight">Lead not found</h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        This lead may have been deleted or you may no longer have access to it.
      </p>
      <Link
        href="/leads"
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md border border-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors duration-150 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:bg-gray-900 dark:hover:text-gray-100 dark:focus-visible:ring-offset-gray-950 motion-reduce:transition-none"
      >
        ← Back to leads
      </Link>
    </div>
  );
};

export default NotFoundView;
