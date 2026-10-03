"use client";
import LeadView from "./lead-view";
import { useParams } from "next/navigation";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import { Lead } from "@/types/common";
import { LoadingSkeleton } from "./skeleton/loading-skeleton";
import NotFoundView from "./not-found-view";
import { useGetLeadById } from "@/hooks/query/use-leads";

const GetLeadByIdClientPage = () => {
  const params = useParams();
  const leadId = params?.id as string;
  const { data, isLoading } = useGetLeadById(leadId);
  const { isDark } = useTheme();

  console.log(data, "lead data");

  return (
    <main
      className={`${isDark ? "dark" : ""} min-h-screen bg-white text-gray-900 transition-colors duration-200 dark:bg-gray-950 dark:text-gray-100 motion-reduce:transition-none`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-6 sm:px-10 lg:py-10">
        {isLoading && <LoadingSkeleton />}
        {(!data || !data.lead) && <NotFoundView />}
        {data && data.lead && <LeadView lead={data.lead} />}
      </div>
    </main>
  );
};

export default GetLeadByIdClientPage;
