export const LEAD_SOURCES = [
  { label: "Instagram", value: "INSTAGRAM" },
  { label: "LinkedIn", value: "LINKEDIN" },
  { label: "X", value: "X" },
  { label: "Cold email", value: "COLD_EMAIL" },
  { label: "Referrals", value: "REFERRAL" },
  { label: "Freelance platforms", value: "FREELANCE_PLATFORM" },
  { label: "Networking", value: "NETWORKING" },
  { label: "Other", value: "OTHER" },
] as const;

/** Shape of the captured lead. Ready to hand to a future API. */
export interface NewLeadInput {
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  source: string;
  nextFollowUpAt: string;
  notes: string;
}

export const EMPTY: NewLeadInput = {
  name: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  industry: "",
  source: "",
  nextFollowUpAt: "",
  notes: "",
};

export const inputClass =
  "block w-full min-h-11 rounded-md border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors duration-150 focus:outline-hidden focus:ring-2 focus:ring-gray-400 focus:border-gray-500 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 motion-reduce:transition-none";
export const okBorder =
  "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700";
export const errBorder = "border-red-500 dark:border-red-500";
