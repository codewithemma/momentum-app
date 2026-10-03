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
  CONTACTED: "bg-blue-500",
  REPLIED: "bg-blue-500",
  INTERESTED: "bg-amber-500",
  PROPOSAL: "bg-amber-500",
  WON: "bg-green-500",
  LOST: "bg-red-500",
};

export const ACTIVITY_TYPES = [
  "Note",
  "Contacted",
  "Replied",
  "Follow-up",
  "Meeting",
  "Proposal",
  "Status change",
] as const;

export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export interface ActivityEntry {
  id: string;
  type: ActivityType | "Lead created";
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
