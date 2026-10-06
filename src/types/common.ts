import { HtmlHTMLAttributes } from "react";

export type IconProps = HtmlHTMLAttributes<SVGElement>;

export interface ErrorResponse {
  message: string;
}

export type NotificationType = "FOLLOW_UP_DUE" | "FOLLOW_UP_OVERDUE";

export interface Notification {
  id: string;
  userId: string;
  leadId: string | null;
  type: NotificationType | string;
  title: string;
  message: string;
  dedupeKey: string;
  read: boolean;
  readAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type UnreadCountResponse =
  | number
  | { count: number }
  | { unreadCount: number };

export type UserRoles = "DEVELOPER" | "DESIGNER";

export type LeadSource =
  | "INSTAGRAM"
  | "LINKEDIN"
  | "X"
  | "COLD_EMAIL"
  | "REFERRAL"
  | "FREELANCE_PLATFORM"
  | "NETWORKING"
  | "OTHER";

export interface SessionUser {
  id: string;
  name: string;
  image: string | null;
  isOnboarded: boolean;
  email: string;
  role: UserRoles;
  isEmailVerified: boolean;
  createdAt: string;
  defaultLeadSource?: LeadSource | null;
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
  nextFollowUpAt?: string | null;
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
  nextFollowUpAt: string | null;
  activities: LeadActivities[];
  createdAt: string;
  updatedAt: string;
}

export interface LeadActivities {
  id: string;
  leadId: string;
  type: ActivityType;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardRecentActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string | null;
  createdAt: string;
  lead: {
    id: string;
    name: string;
    company: string | null;
  };
}

export interface DashboardRecentActivitiesResponse {
  activities: DashboardRecentActivity[];
}

export type ActivityType =
  | "LEAD_CREATED"
  | "STATUS_CHANGED"
  | "FOLLOW_UP_SCHEDULED"
  | "FOLLOW_UP_UPDATED"
  | "FOLLOW_UP_CLEARED"
  | "NOTE"
  | "CALL"
  | "EMAIL"
  | "MEETING";

export interface GetLeadActivitiesResponse {
  activities: LeadActivities[];
}

export interface CreateActivityInput {
  type: ActivityType;
  title: string;
  description: string;
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

export interface DashboardOverview {
  totalLeads: number;
  activeLeads: number;
  followUpsDue: number;
  won: number;
}

export interface DashboardPipelineRow {
  status: LeadStatus;
  count: number;
}

export interface DashboardPipelineResponse {
  pipeline: DashboardPipelineRow[];
}

export interface DashboardNeedsAttentionLead {
  id: string;
  name: string;
  company: string;
  nextFollowUpAt: string;
}

export interface DashboardNeedsAttentionGroup {
  count: number;
  leads: DashboardNeedsAttentionLead[];
}

export interface DashboardNeedsAttentionResponse {
  overdue: DashboardNeedsAttentionGroup;
  dueToday: DashboardNeedsAttentionGroup;
  upcoming: DashboardNeedsAttentionGroup;
}

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "REPLIED"
  | "INTERESTED"
  | "PROPOSAL"
  | "WON"
  | "LOST";
