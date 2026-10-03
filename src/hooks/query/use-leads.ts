import { dynamicQueryEndpoint } from "@/libs/utils";
import apis from "@/services/api-services";
import {
  GetAllLeadsResponse,
  GetLeadResponse,
  QueryParams,
} from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export const useGetAllLeads = () => {
  const [query, setQuery] = useState<QueryParams>({
    page: 1,
  });

  const updateQuery = useCallback(
    <K extends keyof QueryParams>(field: K, value: QueryParams[K]) => {
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
