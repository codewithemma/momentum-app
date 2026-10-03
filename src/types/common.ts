import { HtmlHTMLAttributes } from "react";

export type IconProps = HtmlHTMLAttributes<SVGElement>;

export interface ErrorResponse {
  message: string;
}

export type UserRoles = "DEVELOPER" | "DESIGNER";

export interface SessionUser {
  id: string;
  name: string;
  image: string | null;
  isOnboarded: boolean;
  email: string;
  role: UserRoles;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface QueryParams {
  page: number;
  limit?: number;
  search?: string;
  source?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface OnboardingFormValues {
  role: string;
  clientSources: string[];
  referralSource: string;
}

export interface CreateLeadFormValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  source: string;
  notes: string;
  nextFollowUp: string;
}

export interface Lead {
  id: string;
  userId: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  source: string;
  status: LeadStatus;
  notes: string;
  nextFollowUpAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadResponse {
  message: string;
  lead: Lead;
}

export interface GetAllLeadsResponse {
  leads: Lead[];
  pagination: Pagination;
}

export interface GetLeadResponse {
  lead: Lead;
}

enum LeadStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  REPLIED = "REPLIED",
  INTERESTED = "INTERESTED",
  PROPOSAL = "PROPOSAL",
  WON = "WON",
  LOST = "LOST",
}
