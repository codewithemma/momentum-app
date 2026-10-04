import type {
  ActivityType,
  DashboardPipelineRow,
  DashboardRecentActivity,
  LeadStatus,
} from "@/types/common";

export type FollowUpState = "OVERDUE" | "TODAY" | "UPCOMING";

export interface DashboardData {
  userName: string;
  overview: {
    total: number;
    active: number;
    followUpsDue: number;
    won: number;
  };
  pipeline: DashboardPipelineRow[];
  followUps: {
    id: string;
    name: string;
    company: string | null;
    dueAt: string;
    state: FollowUpState;
  }[];
  activity: DashboardRecentActivity[];
}

export const STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  REPLIED: "Replied",
  INTERESTED: "Interested",
  PROPOSAL: "Proposal",
  WON: "Won",
  LOST: "Lost",
};

export const STATUS_BAR: Record<LeadStatus, string> = {
  NEW: "bg-gray-400 dark:bg-gray-500",
  CONTACTED: "bg-gray-600 dark:bg-gray-400",
  REPLIED: "bg-gray-600 dark:bg-gray-400",
  INTERESTED: "bg-amber-500",
  PROPOSAL: "bg-amber-500",
  WON: "bg-green-600 dark:bg-green-500",
  LOST: "bg-red-500",
};

export const ACTIVITY_LABELS: Record<ActivityType, string> = {
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

export const card =
  "border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950";
export const linkAction =
  "text-sm font-medium text-gray-600 transition-colors duration-150 hover:text-gray-950 focus-visible:outline-hidden focus-visible:underline dark:text-gray-400 dark:hover:text-gray-100";

export function relative(iso: string) {
  const hours = Math.round((Date.now() - new Date(iso).getTime()) / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? "Yesterday" : `${days}d ago`;
}

export function shortDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function greeting() {
  const hour = new Date().getHours();
  return hour < 12
    ? "Good morning"
    : hour < 18
      ? "Good afternoon"
      : "Good evening";
}

export function at(days: number, hours = 0) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(date.getHours() + hours);
  return date.toISOString();
}
