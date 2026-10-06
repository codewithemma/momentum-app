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
  Notification,
  UnreadCountResponse,
  LeadSource,
} from "@/types/common";

const apis = {
  auth: {
    completeOnboarding: (data: OnboardingFormValues) =>
      server.post("/auth/complete-onboarding", data),
  },
  users: {
    updateMe: (data: { name: string }) => server.patch("/users/me", data),
    updateDefaultLeadSource: (defaultLeadSource: LeadSource | null) =>
      server.patch("/users/me/default-lead-source", { defaultLeadSource }),
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
  notifications: {
    getAll: () => server.get<Notification[]>("/notifications"),
    getUnreadCount: () =>
      server.get<UnreadCountResponse>("/notifications/unread-count"),
    markAsRead: (id: string) => server.patch(`/notifications/${id}/read`),
    markAllAsRead: () => server.patch("/notifications/read-all"),
  },
};

export default apis;
