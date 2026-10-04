"use client";
import LeadView from "./lead-view";
import { useParams } from "next/navigation";
import { useTheme } from "@/hooks/use-theme";
import { LoadingSkeleton } from "./skeleton/loading-skeleton";
import NotFoundView from "./not-found-view";
import { useGetLeadById } from "@/hooks/query/use-leads";

const GetLeadByIdClientPage = () => {
  const params = useParams();
  const leadId = params?.id as string;
  const { data, isLoading, isError, refetch } = useGetLeadById(leadId);
  const { isDark } = useTheme();

  return (
    <main
      className={`${isDark ? "dark" : ""} min-h-screen bg-gray-100 text-gray-950 transition-colors duration-200 dark:bg-black dark:text-gray-100 motion-reduce:transition-none`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-6 sm:px-10 lg:py-10">
        {isLoading ? (
          <LoadingSkeleton />
        ) : isError ? (
          <div className="flex flex-1 flex-col items-center justify-center py-24 text-center">
            <h1 className="text-2xl font-semibold leading-tight">
              We couldn&apos;t load this lead
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Check your connection and try again.
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-900"
            >
              Try again
            </button>
          </div>
        ) : data?.lead ? (
          <LeadView lead={data.lead} />
        ) : (
          <NotFoundView />
        )}
      </div>
    </main>
  );
};

export default GetLeadByIdClientPage;
