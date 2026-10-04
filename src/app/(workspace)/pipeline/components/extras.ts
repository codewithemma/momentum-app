import { startOfDay } from "date-fns";

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "REPLIED"
  | "INTERESTED"
  | "PROPOSAL"
  | "WON"
  | "LOST";

export const STAGES: { status: LeadStatus; label: string }[] = [
  { status: "NEW", label: "New" },
  { status: "CONTACTED", label: "Contacted" },
  { status: "REPLIED", label: "Replied" },
  { status: "INTERESTED", label: "Interested" },
  { status: "PROPOSAL", label: "Proposal" },
  { status: "WON", label: "Won" },
  { status: "LOST", label: "Lost" },
];

export const SOURCE_LABELS: Record<string, string> = {
  INSTAGRAM: "Instagram",
  LINKEDIN: "LinkedIn",
  X: "X",
  COLD_EMAIL: "Cold email",
  REFERRAL: "Referrals",
  FREELANCE_PLATFORM: "Freelance platforms",
  NETWORKING: "Networking",
  OTHER: "Other",
};

export type FollowUpFilter = "ALL" | "TODAY" | "OVERDUE" | "UPCOMING" | "NONE";
export const FOLLOW_UP_OPTIONS: { value: FollowUpFilter; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "TODAY", label: "Due today" },
  { value: "OVERDUE", label: "Overdue" },
  { value: "UPCOMING", label: "Upcoming" },
  { value: "NONE", label: "No follow-up" },
];

export const btnPrimary =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-gray-950 bg-gray-950 px-4 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:border-gray-700 hover:bg-gray-700 active:bg-black focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-950 dark:hover:border-gray-300 dark:hover:bg-gray-300 dark:focus-visible:ring-offset-gray-950 motion-reduce:transition-none";
export const btnGhost =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-gray-200 px-3 text-sm font-medium text-gray-600 transition-colors duration-150 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:bg-gray-900 dark:hover:text-gray-100 motion-reduce:transition-none";
export const selectClass =
  "block min-h-9 w-full rounded-md border border-gray-200 bg-white px-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100";

export function followUpState(
  iso?: string | null,
): "NONE" | "TODAY" | "OVERDUE" | "UPCOMING" {
  if (!iso) return "NONE";
  const due = startOfDay(new Date(iso));
  const today = startOfDay(new Date());
  if (due.getTime() === today.getTime()) return "TODAY";
  return due < today ? "OVERDUE" : "UPCOMING";
}

export function followUpPriority(iso?: string | null): number {
  switch (followUpState(iso)) {
    case "OVERDUE":
      return 0;
    case "TODAY":
      return 1;
    case "UPCOMING":
      return 2;
    default:
      return 3;
  }
}
