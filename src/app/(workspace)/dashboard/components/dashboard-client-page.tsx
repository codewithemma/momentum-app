"use client";

import { useTheme } from "@/hooks/use-theme";
import { useSession } from "next-auth/react";
import {
  useGetDashboardNeedsAttention,
  useGetDashboardPipeline,
  useGetDashboardOverview,
  useGetDashboardRecentActivities,
} from "@/hooks/query/use-dashboard";
import { NeedsAttention } from "./needs-attention";
import { PipelineOverview } from "./pipeline-overview";
import { QuickActions } from "./quick-actions";
import { RecentActivity } from "./recent-activity";
import { StatCard } from "./stat-card";
import { greeting } from "./extras";
import { Clock, Trophy, Users, Zap } from "lucide-react";

export function DashboardClientPage() {
  const { isDark } = useTheme();
  const { data: session } = useSession();
  const {
    data: overview,
    isLoading: isOverviewLoading,
    isError: isOverviewError,
  } = useGetDashboardOverview();
  const {
    data: needsAttention,
    isLoading: isNeedsAttentionLoading,
    isError: isNeedsAttentionError,
    refetch: refetchNeedsAttention,
  } = useGetDashboardNeedsAttention();
  const {
    data: pipeline,
    isLoading: isPipelineLoading,
    isError: isPipelineError,
    refetch: refetchPipeline,
  } = useGetDashboardPipeline();
  const {
    data: recentActivities,
    isLoading: isRecentActivitiesLoading,
    isError: isRecentActivitiesError,
    refetch: refetchRecentActivities,
  } = useGetDashboardRecentActivities();

  return (
    <main
      className={`${isDark ? "dark" : ""} min-h-screen bg-gray-100 text-gray-950 dark:bg-black dark:text-gray-100`}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-10 lg:py-10">
        <>
            <header className="flex flex-col gap-5 border-b border-gray-200 pb-6 dark:border-gray-800 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500">
                  Workspace overview
                </p>
                <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  {greeting()}, {session?.user?.name?.split(" ")[0] ?? "there"}
                </h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Here&apos;s what&apos;s happening with your leads.
                </p>
              </div>
              <QuickActions />
            </header>

            <section aria-label="Overview" className="mt-6 grid grid-cols-2 gap-px border border-gray-200 bg-gray-200 dark:border-gray-800 dark:bg-gray-800 lg:grid-cols-4">
              <StatCard label="Total leads" value={overview?.totalLeads} hint="Across your pipeline" Icon={Users} isLoading={isOverviewLoading} isError={isOverviewError} />
              <StatCard label="Active leads" value={overview?.activeLeads} hint="Currently being worked" Icon={Zap} isLoading={isOverviewLoading} isError={isOverviewError} />
              <StatCard label="Follow-ups due" value={overview?.followUpsDue} hint="Needs your attention" Icon={Clock} accent isLoading={isOverviewLoading} isError={isOverviewError} />
              <StatCard label="Won" value={overview?.won} hint="Successfully converted" Icon={Trophy} isLoading={isOverviewLoading} isError={isOverviewError} />
            </section>

            <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <NeedsAttention
                  data={needsAttention}
                  isLoading={isNeedsAttentionLoading}
                  isError={isNeedsAttentionError}
                  onRetry={() => void refetchNeedsAttention()}
                />
              </div>
              <div className="space-y-6 lg:col-span-2">
                <PipelineOverview
                  rows={pipeline?.pipeline ?? []}
                  isLoading={isPipelineLoading}
                  isError={isPipelineError}
                  onRetry={() => void refetchPipeline()}
                />
              </div>
            </div>

            <div className="mt-8">
              <RecentActivity
                items={recentActivities?.activities ?? []}
                isLoading={isRecentActivitiesLoading}
                isError={isRecentActivitiesError}
                onRetry={() => void refetchRecentActivities()}
              />
            </div>
        </>
      </div>
    </main>
  );
}
