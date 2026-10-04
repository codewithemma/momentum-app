"use client";

import { toast } from "@/components/ui/toast";
import { useUpdateLead } from "@/hooks/mutate/use-leads";
import { useGetInfiniteLeads } from "@/hooks/query/use-leads";
import { useTheme } from "@/hooks/use-theme";
import { useQueryState } from "nuqs";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  FollowUpFilter,
  followUpPriority,
  followUpState,
  LeadStatus,
} from "./extras";
import { PipelineHeader } from "./pipeline-header";
import { PipelineSkeleton } from "./skeleton/pipeline-skeleton";
import { EmptyPipeline, ErrorState } from "./states";
import { PipelineBoard } from "./pipeline-board";

const PipelineClientPage = () => {
  const { isDark } = useTheme();
  const [search, setSearch] = useQueryState("search");
  const [debouncedSearchValue] = useDebounce(search?.trim(), 1000);
  const [source, setSource] = useQueryState("source");
  const [followUp, setFollowUp] = useState<FollowUpFilter>("ALL");
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteLeads({
    search: debouncedSearchValue || undefined,
    source: source ?? undefined,
  });
  const { mutate: updateLead } = useUpdateLead();
  const leads = useMemo(
    () => data?.pages.flatMap((page) => page.leads) ?? [],
    [data],
  );

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    updateLead(
      {
        id: leadId,
        data: { status: newStatus },
      },
      {
        onError: (error) => {
          toast({
            variant: "error",
            message:
              error.response?.data?.message ?? "Failed to update lead status",
          });
        },
      },
    );
  };

  const visible = useMemo(() => {
    return leads
      .filter(
        (lead) =>
          followUp === "ALL" ||
          followUpState(lead.nextFollowUpAt) === followUp,
      )
      .sort((a, b) => {
        const priorityDifference =
          followUpPriority(a.nextFollowUpAt) -
          followUpPriority(b.nextFollowUpAt);

        if (priorityDifference !== 0) return priorityDifference;
        if (!a.nextFollowUpAt || !b.nextFollowUpAt) return 0;

        return (
          new Date(a.nextFollowUpAt).getTime() -
          new Date(b.nextFollowUpAt).getTime()
        );
      });
  }, [leads, followUp]);

  const filtering =
    Boolean(search?.trim()) || Boolean(source) || followUp !== "ALL";
  return (
    <main
      className={`${isDark ? "dark" : ""} min-h-screen min-w-0 bg-gray-100 text-gray-950 dark:bg-black dark:text-gray-100`}
    >
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col px-6 py-8 sm:px-10 lg:py-10">
        {isLoading ? (
          <PipelineSkeleton />
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : (
          <>
            <PipelineHeader
              search={search ?? ""}
              onSearch={setSearch}
              source={source ?? "ALL"}
              onSource={(value) => setSource(value === "ALL" ? null : value)}
              followUp={followUp}
              onFollowUp={setFollowUp}
              showControls={Boolean(leads.length)}
            />
            <div className="mt-8">
              {leads.length === 0 && !filtering ? (
                <EmptyPipeline />
              ) : filtering && visible.length === 0 ? (
                <div className="border border-gray-200 bg-white px-6 py-16 text-center dark:border-gray-800 dark:bg-gray-950">
                  <p className="text-sm font-medium">No leads found</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Try a different search or clear your filters.
                  </p>
                </div>
              ) : (
                <PipelineBoard
                  leads={visible}
                  onStatusChange={handleStatusChange}
                />
              )}
              {hasNextPage && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => void fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="inline-flex min-h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50 disabled:cursor-wait disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-900"
                  >
                    {isFetchingNextPage ? "Loading..." : "Load more leads"}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default PipelineClientPage;
