"use client";
import { signOut, useSession } from "next-auth/react";
import { Check, LogOut, Loader2, User } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useEffect } from "react";
import { toast } from "@/components/ui/toast";
import { useTheme, type ThemeChoice } from "@/hooks/use-theme";
import {
  SectionTitle,
  Field,
  Button,
  PreferenceRow,
  ToggleRow,
  InfoRow,
} from "./extras";
import {
  inputClass,
  SettingsTab,
  sourceOptions,
  themeOptions,
  selectClass,
  tabs,
} from "./data";
import {
  useUpdateCurrentUser,
  useUpdateDefaultLeadSource,
} from "@/hooks/mutate/use-users";
import type { LeadSource } from "@/types/common";

export default function SettingsClientPage() {
  const { data: session, update: updateSession } = useSession();
  const updateCurrentUser = useUpdateCurrentUser();
  const updateDefaultLeadSource = useUpdateDefaultLeadSource();
  const { theme, setTheme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [editingProfile, setEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    role: session?.user?.role ?? "",
  });
  const [draftProfile, setDraftProfile] = useState(profile);
  const [defaultSource, setDefaultSource] = useState<LeadSource | "">(
    session?.user?.defaultLeadSource ?? "",
  );
  // const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [notifications, setNotifications] = useState({
    followUpReminders: true,
    overdueAlerts: true,
    emailDigest: false,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDefaultSource(session?.user?.defaultLeadSource ?? "");
  }, [session?.user?.defaultLeadSource]);

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = draftProfile.name.trim();

    if (!name) {
      toast({ variant: "error", message: "Name cannot be empty" });
      return;
    }

    if (name === (session?.user?.name ?? profile.name).trim()) {
      setEditingProfile(false);
      return;
    }

    updateCurrentUser.mutate(
      { name },
      {
        onSuccess: async () => {
          try {
            const updatedSession = await updateSession({
              user: { name },
            });

            if (updatedSession?.user?.name !== name) {
              throw new Error("The authentication session was not updated.");
            }

            setProfile((current) => ({ ...current, name }));
            setDraftProfile((current) => ({ ...current, name }));
            setEditingProfile(false);
            toast({ variant: "success", message: "Profile updated" });
          } catch {
            toast({
              variant: "error",
              message:
                "Your name was updated, but the session could not be refreshed. Please reload the page.",
            });
          }
        },
        onError: (error) => {
          toast({
            variant: "error",
            message:
              error.response?.data?.message ?? "Failed to update profile",
          });
        },
      },
    );
  }

  function chooseTheme(value: ThemeChoice) {
    setTheme(value);
    toast({ variant: "info", message: `Theme set to ${value}` });
  }

  function saveDefaultSource(value: string) {
    const nextValue = (value || null) as LeadSource | null;
    const previousValue = defaultSource || null;

    if (nextValue === previousValue) return;

    updateDefaultLeadSource.mutate(nextValue, {
      onSuccess: async () => {
        try {
          const updatedSession = await updateSession({
            user: { defaultLeadSource: nextValue },
          });

          if (updatedSession?.user?.defaultLeadSource !== nextValue) {
            throw new Error("The authentication session was not updated.");
          }

          setDefaultSource(nextValue ?? "");
          toast({ message: "Default lead source updated" });
        } catch {
          setDefaultSource(defaultSource);
          toast({
            variant: "error",
            message:
              "The default source was updated, but the session could not be refreshed.",
          });
        }
      },
      onError: (error) => {
        setDefaultSource(defaultSource);
        toast({
          variant: "error",
          message:
            error.response?.data?.message ??
            "Failed to update default lead source",
        });
      },
    });
  }

  const displayName = session?.user?.name || profile.name || "Momentum user";
  const email = session?.user?.email || profile.email || "No email available";

  return (
    <main
      className={`${isDark ? "dark" : ""} min-h-screen bg-gray-100 text-gray-950 dark:bg-black dark:text-gray-100`}
    >
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
            <nav
              aria-label="Settings categories"
              className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:pb-0"
            >
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
                <SectionTitle
                  title="Profile"
                  description="Your identity within the Momentum workspace."
                />
                <div className="border-b border-gray-200 pb-8 dark:border-gray-800">
                  {editingProfile ? (
                    <form
                      onSubmit={saveProfile}
                      className="space-y-4 border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950"
                    >
                      <Field label="Full name">
                        <input
                          required
                          value={draftProfile.name}
                          onChange={(e) =>
                            setDraftProfile({
                              ...draftProfile,
                              name: e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Email address">
                        <input
                          type="email"
                          value={draftProfile.email}
                          onChange={(e) =>
                            setDraftProfile({
                              ...draftProfile,
                              email: e.target.value,
                            })
                          }
                          className={inputClass}
                          disabled
                        />
                      </Field>
                      <Field label="Role">
                        <input
                          value={draftProfile.role}
                          onChange={(e) =>
                            setDraftProfile({
                              ...draftProfile,
                              role: e.target.value,
                            })
                          }
                          placeholder="Independent consultant"
                          className={inputClass}
                          disabled
                        />
                      </Field>
                      <div className="flex justify-end gap-2 pt-2">
                        <Button
                          type="button"
                          onClick={() => setEditingProfile(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" primary>
                          {updateCurrentUser.isPending && (
                            <Loader2
                              className="size-3.5 animate-spin"
                              aria-hidden="true"
                            />
                          )}
                          {updateCurrentUser.isPending
                            ? "Saving..."
                            : "Save changes"}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-4">
                        <span className="flex size-12 shrink-0 items-center justify-center border border-gray-200 bg-gray-50 text-base font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">
                          {displayName.charAt(0).toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {displayName}
                          </p>
                          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                            {email}
                          </p>
                          {profile.role && (
                            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                              {profile.role}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        type="button"
                        onClick={() => {
                          setDraftProfile({
                            ...profile,
                            role: session?.user?.role ?? profile.role,
                            name: session?.user?.name ?? profile.name,
                            email: session?.user?.email ?? profile.email,
                          });
                          setEditingProfile(true);
                        }}
                      >
                        Edit profile
                      </Button>
                    </div>
                  )}
                </div>

                <div>
                  <SectionTitle
                    title="Workspace preferences"
                    description="Default values used when creating leads and scheduling follow-ups."
                  />
                  <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800">
                    <PreferenceRow
                      label="Default lead source"
                      description="Pre-selects this channel when adding new leads."
                    >
                      <select
                        value={defaultSource}
                        onChange={(e) => saveDefaultSource(e.target.value)}
                        disabled={updateDefaultLeadSource.isPending}
                        className={selectClass}
                      >
                        <option value="">No default</option>
                        {sourceOptions.map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </PreferenceRow>
                    {/* <PreferenceRow
                      label="Date format"
                      description="Standard date display across timelines and tables."
                    >
                      <select
                        value={dateFormat}
                        onChange={(e) => {
                          setDateFormat(e.target.value);
                          toast({ message: "Date format updated" });
                        }}
                        className={selectClass}
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </PreferenceRow> */}
                    <PreferenceRow
                      label="Timezone"
                      description="Used for follow-up dates and daily reminders."
                    >
                      <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
                        Local timezone
                      </span>
                    </PreferenceRow>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <SectionTitle
                  title="Reminders and alerts"
                  description="Stay on top of conversations without adding noise."
                />
                <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800">
                  <ToggleRow
                    label="Follow-up reminders"
                    description="In-app reminders on the day a follow-up is scheduled."
                    checked={notifications.followUpReminders}
                    onChange={(value) =>
                      setNotifications({
                        ...notifications,
                        followUpReminders: value,
                      })
                    }
                  />
                  <ToggleRow
                    label="Overdue alerts"
                    description="Keep missed follow-ups visible in your workspace."
                    checked={notifications.overdueAlerts}
                    onChange={(value) =>
                      setNotifications({
                        ...notifications,
                        overdueAlerts: value,
                      })
                    }
                  />
                  <ToggleRow
                    label="Email digest"
                    description="Receive a daily summary of your target outreach."
                    checked={notifications.emailDigest}
                    onChange={(value) =>
                      setNotifications({ ...notifications, emailDigest: value })
                    }
                  />
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div>
                <SectionTitle
                  title="Theme and display"
                  description="Choose how Momentum appears on your device."
                />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {themeOptions.map(({ value, title, description, Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => chooseTheme(value)}
                      className={`border p-4 text-left transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 ${theme === value ? "border-gray-950 bg-white dark:border-gray-100 dark:bg-gray-950" : "border-gray-200 bg-white hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-600"}`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon className="size-4 text-gray-500" />
                        {theme === value && <Check className="size-4" />}
                      </div>
                      <p className="mt-4 text-sm font-medium">{title}</p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="space-y-10">
                <div>
                  <SectionTitle
                    title="Account details"
                    description="Authentication and workspace access."
                  />
                  <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800">
                    <InfoRow label="Authentication">
                      <span className="inline-flex items-center gap-2 font-medium">
                        <User className="size-3.5 text-gray-500" /> Google OAuth
                      </span>
                    </InfoRow>
                    <InfoRow label="Connected account">
                      <span className="font-mono">{email}</span>
                    </InfoRow>
                    <InfoRow label="Plan">
                      <span className="font-medium">Momentum Solo</span>
                    </InfoRow>
                  </div>
                  <Button
                    type="button"
                    onClick={() => void signOut({ callbackUrl: "/login" })}
                    className="mt-5"
                  >
                    <LogOut className="size-3.5" /> Sign out
                  </Button>
                </div>
                <div className="border-t border-gray-200 pt-8 dark:border-gray-800">
                  <SectionTitle
                    title="Data and privacy"
                    description="Your lead data remains managed through your Momentum workspace."
                  />
                  <div className="border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
                    Account deletion is managed by the workspace administrator.
                    Contact support if you need help with your account.
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
