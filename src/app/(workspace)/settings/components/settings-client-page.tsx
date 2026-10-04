"use client";

import { signOut, useSession } from "next-auth/react";
import {
  Bell,
  Check,
  Laptop,
  LogOut,
  Moon,
  Shield,
  Sliders,
  Sun,
  User,
} from "lucide-react";
import { useState, type ComponentType, type FormEvent } from "react";
import { toast } from "@/components/ui/toast";
import { useTheme, type ThemeChoice } from "@/hooks/use-theme";

type SettingsTab = "general" | "notifications" | "appearance" | "account";

const tabs: {
  id: SettingsTab;
  label: string;
  Icon: ComponentType<{ className?: string }>;
}[] = [
  { id: "general", label: "General", Icon: Sliders },
  { id: "notifications", label: "Notifications", Icon: Bell },
  { id: "appearance", label: "Appearance", Icon: Moon },
  { id: "account", label: "Account", Icon: Shield },
];

const sourceOptions = [
  ["INSTAGRAM", "Instagram"],
  ["LINKEDIN", "LinkedIn"],
  ["X", "X"],
  ["COLD_EMAIL", "Cold email"],
  ["REFERRAL", "Referrals"],
  ["FREELANCE_PLATFORM", "Freelance platforms"],
  ["NETWORKING", "Networking"],
  ["OTHER", "Other"],
];

const themeOptions: {
  value: ThemeChoice;
  title: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
}[] = [
  { value: "dark", title: "Dark", description: "High-contrast dark mode", Icon: Moon },
  { value: "light", title: "Light", description: "Clean paper-white mode", Icon: Sun },
  { value: "system", title: "System", description: "Syncs with OS preference", Icon: Laptop },
];

export default function SettingsClientPage() {
  const { data: session } = useSession();
  const { theme, setTheme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [editingProfile, setEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    role: "",
  });
  const [draftProfile, setDraftProfile] = useState(profile);
  const [defaultSource, setDefaultSource] = useState("LINKEDIN");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [notifications, setNotifications] = useState({
    followUpReminders: true,
    overdueAlerts: true,
    emailDigest: false,
  });

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProfile(draftProfile);
    setEditingProfile(false);
    toast({ variant: "success", message: "Profile updated" });
  }

  function chooseTheme(value: ThemeChoice) {
    setTheme(value);
    toast({ variant: "info", message: `Theme set to ${value}` });
  }

  const displayName = session?.user?.name || profile.name || "Momentum user";
  const email = session?.user?.email || profile.email || "No email available";

  return (
    <main className={`${isDark ? "dark" : ""} min-h-screen bg-gray-100 text-gray-950 dark:bg-black dark:text-gray-100`}>
      <div className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-10 lg:py-10">
        <header className="border-b border-gray-200 pb-6 dark:border-gray-800">
          <p className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500">
            Workspace
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Settings
          </h1>
          <p className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
            Manage your profile, preferences, notifications, and account access.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-3">
            <nav aria-label="Settings categories" className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:pb-0">
              {tabs.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  aria-current={activeTab === id ? "page" : undefined}
                  className={`flex items-center gap-2.5 whitespace-nowrap rounded-md border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 ${
                    activeTab === id
                      ? "border-gray-200 bg-white text-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                      : "border-transparent text-gray-600 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-950 dark:text-gray-400 dark:hover:border-gray-800 dark:hover:bg-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  <Icon className="size-4 shrink-0 text-gray-500 dark:text-gray-400" />
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          <section className="min-w-0 lg:col-span-9">
            {activeTab === "general" && (
              <div className="space-y-10">
                <SectionTitle title="Profile" description="Your identity within the Momentum workspace." />
                <div className="border-b border-gray-200 pb-8 dark:border-gray-800">
                  {editingProfile ? (
                    <form onSubmit={saveProfile} className="space-y-4 border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
                      <Field label="Full name">
                        <input required value={draftProfile.name} onChange={(e) => setDraftProfile({ ...draftProfile, name: e.target.value })} className={inputClass} />
                      </Field>
                      <Field label="Email address">
                        <input type="email" value={draftProfile.email} onChange={(e) => setDraftProfile({ ...draftProfile, email: e.target.value })} className={inputClass} />
                      </Field>
                      <Field label="Role">
                        <input value={draftProfile.role} onChange={(e) => setDraftProfile({ ...draftProfile, role: e.target.value })} placeholder="Independent consultant" className={inputClass} />
                      </Field>
                      <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" onClick={() => setEditingProfile(false)}>Cancel</Button>
                        <Button type="submit" primary>Save changes</Button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-4">
                        <span className="flex size-12 shrink-0 items-center justify-center border border-gray-200 bg-gray-50 text-base font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">
                          {displayName.charAt(0).toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{displayName}</p>
                          <p className="truncate text-xs text-gray-500 dark:text-gray-400">{email}</p>
                          {profile.role && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{profile.role}</p>}
                        </div>
                      </div>
                      <Button type="button" onClick={() => { setDraftProfile({ ...profile, name: session?.user?.name ?? profile.name, email: session?.user?.email ?? profile.email }); setEditingProfile(true); }}>
                        Edit profile
                      </Button>
                    </div>
                  )}
                </div>

                <div>
                  <SectionTitle title="Workspace preferences" description="Default values used when creating leads and scheduling follow-ups." />
                  <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800">
                    <PreferenceRow label="Default lead source" description="Pre-selects this channel when adding new leads.">
                      <select value={defaultSource} onChange={(e) => { setDefaultSource(e.target.value); toast({ message: "Default source updated" }); }} className={selectClass}>
                        {sourceOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                      </select>
                    </PreferenceRow>
                    <PreferenceRow label="Date format" description="Standard date display across timelines and tables.">
                      <select value={dateFormat} onChange={(e) => { setDateFormat(e.target.value); toast({ message: "Date format updated" }); }} className={selectClass}>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </PreferenceRow>
                    <PreferenceRow label="Timezone" description="Used for follow-up dates and daily reminders.">
                      <span className="text-xs font-mono text-gray-600 dark:text-gray-400">Local timezone</span>
                    </PreferenceRow>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <SectionTitle title="Reminders and alerts" description="Stay on top of conversations without adding noise." />
                <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800">
                  <ToggleRow label="Follow-up reminders" description="In-app reminders on the day a follow-up is scheduled." checked={notifications.followUpReminders} onChange={(value) => setNotifications({ ...notifications, followUpReminders: value })} />
                  <ToggleRow label="Overdue alerts" description="Keep missed follow-ups visible in your workspace." checked={notifications.overdueAlerts} onChange={(value) => setNotifications({ ...notifications, overdueAlerts: value })} />
                  <ToggleRow label="Email digest" description="Receive a daily summary of your target outreach." checked={notifications.emailDigest} onChange={(value) => setNotifications({ ...notifications, emailDigest: value })} />
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div>
                <SectionTitle title="Theme and display" description="Choose how Momentum appears on your device." />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {themeOptions.map(({ value, title, description, Icon }) => (
                    <button key={value} type="button" onClick={() => chooseTheme(value)} className={`border p-4 text-left transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 ${theme === value ? "border-gray-950 bg-white dark:border-gray-100 dark:bg-gray-950" : "border-gray-200 bg-white hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-600"}`}>
                      <div className="flex items-center justify-between">
                        <Icon className="size-4 text-gray-500" />
                        {theme === value && <Check className="size-4" />}
                      </div>
                      <p className="mt-4 text-sm font-medium">{title}</p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="space-y-10">
                <div>
                  <SectionTitle title="Account details" description="Authentication and workspace access." />
                  <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800">
                    <InfoRow label="Authentication"><span className="inline-flex items-center gap-2 font-medium"><User className="size-3.5 text-gray-500" /> Google OAuth</span></InfoRow>
                    <InfoRow label="Connected account"><span className="font-mono">{email}</span></InfoRow>
                    <InfoRow label="Plan"><span className="font-medium">Momentum Solo</span></InfoRow>
                  </div>
                  <Button type="button" onClick={() => void signOut({ callbackUrl: "/login" })} className="mt-5">
                    <LogOut className="size-3.5" /> Sign out
                  </Button>
                </div>
                <div className="border-t border-gray-200 pt-8 dark:border-gray-800">
                  <SectionTitle title="Data and privacy" description="Your lead data remains managed through your Momentum workspace." />
                  <div className="border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
                    Account deletion is managed by the workspace administrator. Contact support if you need help with your account.
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

const inputClass = "block min-h-10 w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors hover:border-gray-400 focus:border-gray-500 focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
const selectClass = "min-h-9 border border-gray-300 bg-white px-3 text-xs font-medium text-gray-900 focus:border-gray-500 focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100";

function SectionTitle({ title, description }: { title: string; description: string }) {
  return <div className="mb-5"><h2 className="text-base font-semibold tracking-tight">{title}</h2><p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p></div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">{label}{children}</label>;
}

function Button({ children, primary = false, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { primary?: boolean }) {
  return <button {...props} className={`inline-flex min-h-9 items-center justify-center gap-2 rounded-md border px-3 text-xs font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 ${primary ? "border-gray-950 bg-gray-950 text-white hover:bg-gray-800 dark:border-gray-100 dark:bg-gray-100 dark:text-gray-950 dark:hover:bg-gray-300" : "border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50 hover:text-gray-950 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-900 dark:hover:text-gray-100"} ${props.className ?? ""}`}>{children}</button>;
}

function PreferenceRow({ label, description, children }: { label: string; description: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-medium">{label}</p><p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p></div>{children}</div>;
}

function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <div className="flex items-center justify-between gap-4 py-4"><div><p className="text-sm font-medium">{label}</p><p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p></div><button type="button" role="switch" aria-checked={checked} aria-label={`Toggle ${label}`} onClick={() => onChange(!checked)} className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 ${checked ? "bg-gray-900 dark:bg-white" : "bg-gray-300 dark:bg-gray-800"}`}><span aria-hidden="true" className={`size-4 translate-y-0.5 rounded-full bg-white shadow-sm transition-transform dark:bg-black ${checked ? "translate-x-4" : "translate-x-0.5"}`} /></button></div>;
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-2 py-3 text-xs sm:flex-row sm:items-center sm:justify-between"><span className="text-gray-500 dark:text-gray-400">{label}</span><span className="text-gray-900 dark:text-gray-200">{children}</span></div>;
}
