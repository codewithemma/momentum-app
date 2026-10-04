import apis from "@/services/api-services";
import type {
  DashboardNeedsAttentionResponse,
  DashboardOverview,
  DashboardPipelineResponse,
  DashboardRecentActivitiesResponse,
} from "@/types/common";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardOverview = () => {
  return useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async (): Promise<DashboardOverview> => {
      const res = await apis.dashboard.getOverview();
      return res.data;
    },
  });
};

export const useGetDashboardRecentActivities = () => {
  return useQuery({
    queryKey: ["dashboard-recent-activities"],
    queryFn: async (): Promise<DashboardRecentActivitiesResponse> => {
      const res = await apis.dashboard.getRecentActivities();
      return res.data;
    },
  });
};

export const useGetDashboardPipeline = () => {
  return useQuery({
    queryKey: ["dashboard-pipeline"],
    queryFn: async (): Promise<DashboardPipelineResponse> => {
      const res = await apis.dashboard.getPipeline();
      return res.data;
    },
  });
};

export const useGetDashboardNeedsAttention = () => {
  return useQuery({
    queryKey: ["dashboard-needs-attention"],
    queryFn: async (): Promise<DashboardNeedsAttentionResponse> => {
      const res = await apis.dashboard.getNeedsAttention();
      return res.data;
    },
  });
};
