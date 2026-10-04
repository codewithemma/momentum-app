import { dynamicQueryEndpoint } from "@/libs/utils";
import apis from "@/services/api-services";
import {
  GetAllLeadsResponse,
  GetLeadActivitiesResponse,
  GetLeadResponse,
  QueryParams,
} from "@/types/common";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export const useGetAllLeads = () => {
  const [query, setQuery] = useState<QueryParams>({
    page: 1,
  });

  const updateQuery = useCallback(
    (field: keyof QueryParams, value: QueryParams[keyof QueryParams]) => {
      setQuery((prevQuery) => {
        if (Object.is(prevQuery[field], value)) {
          return prevQuery;
        }

        return {
          ...prevQuery,
          [field]: value,
        };
      });
    },
    [],
  );

  const { ...rest } = useQuery({
    queryKey: ["leads", query],
    queryFn: async () => {
      const res = await apis.leads.getAllLeads(
        // @ts-expect-error typescript is not smart enough to infer the type of query
        dynamicQueryEndpoint(query),
      );
      return res.data as GetAllLeadsResponse;
    },
    enabled: true,
  });

  return {
    ...rest,
    updateQuery,
    query,
  };
};

export const useSearchLeads = (search: string) => {
  return useQuery({
    queryKey: ["lead-search", search],
    queryFn: async () => {
      const res = await apis.leads.getAllLeads(
        dynamicQueryEndpoint({ page: 1, limit: 5, search }),
      );
      return res.data as GetAllLeadsResponse;
    },
    enabled: Boolean(search.trim()),
  });
};

export const useGetInfiniteLeads = ({
  search,
  source,
}: {
  search?: string;
  source?: string;
}) => {
  return useInfiniteQuery({
    queryKey: ["pipeline-leads", search, source],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const res = await apis.leads.getAllLeads(
        dynamicQueryEndpoint({
          page: pageParam,
          search,
          source,
        }),
      );

      return res.data as GetAllLeadsResponse;
    },
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined,
  });
};

export const useGetLeadById = (leadId: string) => {
  return useQuery({
    queryKey: ["get-lead-by-id", leadId],
    queryFn: async () => {
      const res = await apis.leads.getLeadById(leadId);

      return res.data as GetLeadResponse;
    },
    enabled: !!leadId,
  });
};

export const useGetLeadActivities = (leadId: string) => {
  return useQuery({
    queryKey: ["lead-activities", leadId],
    queryFn: async () => {
      const res = await apis.leads.getActivities(leadId);
      return res.data as GetLeadActivitiesResponse;
    },
    enabled: !!leadId,
  });
};
