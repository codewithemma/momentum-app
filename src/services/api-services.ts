import { server } from "@/libs/axios-util";
import {
  CreateLeadFormValues,
  GetAllLeadsResponse,
  GetLeadResponse,
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
    updateLead: (id: string, data: object) =>
      server.patch(`/leads/${id}`, data),
    getAllLeads: (query: string) =>
      server.get<GetAllLeadsResponse>(`/leads${query}`),
    getLeadById: (id: string) => server.get<GetLeadResponse>(`leads/${id}`),
  },
};

export default apis;
