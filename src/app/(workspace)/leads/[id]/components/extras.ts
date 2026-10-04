import type { ActivityType } from "@/types/common";

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "REPLIED",
  "INTERESTED",
  "PROPOSAL",
  "WON",
  "LOST",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  REPLIED: "Replied",
  INTERESTED: "Interested",
  PROPOSAL: "Proposal",
  WON: "Won",
  LOST: "Lost",
};

export const STATUS_DOT: Record<LeadStatus, string> = {
  NEW: "bg-gray-400",
  CONTACTED: "bg-gray-500",
  REPLIED: "bg-gray-500",
  INTERESTED: "bg-amber-500",
  PROPOSAL: "bg-amber-500",
  WON: "bg-green-500",
  LOST: "bg-red-500",
};

export const ACTIVITY_TYPES: ActivityType[] = [
  "LEAD_CREATED",
  "STATUS_CHANGED",
  "FOLLOW_UP_SCHEDULED",
  "FOLLOW_UP_UPDATED",
  "FOLLOW_UP_CLEARED",
  "NOTE",
  "CALL",
  "EMAIL",
  "MEETING",
];

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  LEAD_CREATED: "Lead created",
  STATUS_CHANGED: "Status changed",
  FOLLOW_UP_SCHEDULED: "Follow-up scheduled",
  FOLLOW_UP_UPDATED: "Follow-up updated",
  FOLLOW_UP_CLEARED: "Follow-up cleared",
  NOTE: "Note",
  CALL: "Call",
  EMAIL: "Email",
  MEETING: "Meeting",
};

export interface ActivityEntry {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  date: string;
}

export const leadSourceLabels: Record<string, string> = {
  INSTAGRAM: "Instagram",
  LINKEDIN: "LinkedIn",
  X: "X",
  COLD_EMAIL: "Cold email",
  REFERRAL: "Referral",
  FREELANCE_PLATFORM: "Freelance platform",
  NETWORKING: "Networking",
  OTHER: "Other",
};
