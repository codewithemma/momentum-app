import { Kanban, LayoutDashboard, Settings, Users } from "lucide-react";
import { ComponentType } from "react";

export type NavItem = {
  label: string;
  to: "/dashboard" | "/leads" | "/pipeline" | "/settings";
  Icon: ComponentType<{ className?: string }>;
};

export const MAIN_NAV: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", Icon: LayoutDashboard },
  { label: "Leads", to: "/leads", Icon: Users },
  { label: "Pipeline", to: "/pipeline", Icon: Kanban },
];
export const SETTINGS_NAV: NavItem = {
  label: "Settings",
  to: "/settings",
  Icon: Settings,
};

/** Placeholder until sign-in is real. */
export const CURRENT_USER = { name: "Preview user", email: "you@momentum.app" };
