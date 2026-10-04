import { server } from "@/libs/axios-util";
import {
  CreateLeadFormValues,
  GetAllLeadsResponse,
  CreateActivityInput,
  GetLeadActivitiesResponse,
  GetLeadResponse,
  DashboardOverview,
  DashboardNeedsAttentionResponse,
  DashboardPipelineResponse,
  DashboardRecentActivitiesResponse,
  OnboardingFormValues,
} from "@/types/common";

const apis = {
  auth: {
    completeOnboarding: (data: OnboardingFormValues) =>
      server.post("/auth/complete-onboarding", data),
  },
  leads: {
    createLead: (data: CreateLeadFormValues) =>
      server.post("/leads/create", data),
    deleteLead: (id: string) => server.delete(`/leads/${id}`),
    updateLead: (id: string, data: object) =>
      server.patch(`/leads/${id}`, data),
    getAllLeads: (query: string) =>
      server.get<GetAllLeadsResponse>(`/leads${query}`),
    getLeadById: (id: string) => server.get<GetLeadResponse>(`leads/${id}`),
    getActivities: (leadId: string) =>
      server.get<GetLeadActivitiesResponse>(`/leads/${leadId}/activities`),
    createActivity: (leadId: string, data: CreateActivityInput) =>
      server.post(`/leads/${leadId}/activities`, data),
  },
  dashboard: {
    getOverview: () => server.get<DashboardOverview>("/dashboard/overview"),
    getPipeline: () =>
      server.get<DashboardPipelineResponse>("/dashboard/pipeline"),
    getNeedsAttention: () =>
      server.get<DashboardNeedsAttentionResponse>(
        "/dashboard/needs-attention",
      ),
    getRecentActivities: () =>
      server.get<DashboardRecentActivitiesResponse>(
        "/dashboard/recent-activities",
      ),
  },
};

export default apis;
