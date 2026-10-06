import { ThemeChoice } from "@/hooks/use-theme";
import { Bell, Laptop, Moon, Shield, Sliders, Sun } from "lucide-react";
import { ComponentType } from "react";

export type SettingsTab =
  | "general"
  | "notifications"
  | "appearance"
  | "account";

export const tabs: {
  id: SettingsTab;
  label: string;
  Icon: ComponentType<{ className?: string }>;
}[] = [
  { id: "general", label: "General", Icon: Sliders },
  // { id: "notifications", label: "Notifications", Icon: Bell },
  { id: "appearance", label: "Appearance", Icon: Moon },
  { id: "account", label: "Account", Icon: Shield },
];

export const sourceOptions = [
  ["INSTAGRAM", "Instagram"],
  ["LINKEDIN", "LinkedIn"],
  ["X", "X"],
  ["COLD_EMAIL", "Cold email"],
  ["REFERRAL", "Referrals"],
  ["FREELANCE_PLATFORM", "Freelance platforms"],
  ["NETWORKING", "Networking"],
  ["OTHER", "Other"],
];

export const themeOptions: {
  value: ThemeChoice;
  title: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
}[] = [
  {
    value: "dark",
    title: "Dark",
    description: "High-contrast dark mode",
    Icon: Moon,
  },
  {
    value: "light",
    title: "Light",
    description: "Clean paper-white mode",
    Icon: Sun,
  },
  {
    value: "system",
    title: "System",
    description: "Syncs with OS preference",
    Icon: Laptop,
  },
];
export const inputClass =
  "block min-h-10 w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors hover:border-gray-400 focus:border-gray-500 focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
export const selectClass =
  "min-h-9 border border-gray-300 bg-white px-3 text-xs font-medium text-gray-900 focus:border-gray-500 focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100";
