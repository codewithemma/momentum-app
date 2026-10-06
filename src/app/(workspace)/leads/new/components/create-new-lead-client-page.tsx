"use client";
import { routes } from "@/libs/routes";
import Link from "next/link";
import { Field, Section, TextField } from "./data-ui";
import {
  EMPTY,
  errBorder,
  inputClass,
  LEAD_SOURCES,
  NewLeadInput,
  okBorder,
} from "./extras";
import { useTheme } from "@/hooks/use-theme";
import { SubmitEvent, useRef, useState } from "react";
import { useCreateLead } from "@/hooks/mutate/use-leads";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const CreateNewLeadClientPage = () => {
  const { mutate, isPending } = useCreateLead();
  const router = useRouter();
  const { isDark } = useTheme();
  const { data: session } = useSession();
  const [values, setValues] = useState<NewLeadInput>(EMPTY);
  const [nameError, setNameError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const defaultLeadSource = session?.user?.defaultLeadSource;
    if (!defaultLeadSource || values.source) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues((current) => ({ ...current, source: defaultLeadSource }));
  }, [session?.user?.defaultLeadSource, values.source]);

  function update<K extends keyof NewLeadInput>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (key === "name" && nameError && value.trim()) setNameError(null);
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!values.name.trim()) {
      setNameError("Add a name so you can find this lead later.");
      nameRef.current?.focus();
      return;
    }
    mutate(values, {
      onSuccess: async (data) => {
        setValues(EMPTY);
        toast({
          variant: "success",
          message: "Lead added successfully.",
        });
        router.push(routes.leads.leadById(data.lead.id));
      },
      onError: (error) => {
        toast({
          variant: "error",
          message:
            error.response?.data?.message ??
            "Failed to add lead. Please try again.",
        });
      },
    });
  }
  return (
    <main
      className={`${isDark ? "dark" : ""} min-h-screen bg-gray-100 text-gray-950 transition-colors duration-200 dark:bg-black dark:text-gray-100 motion-reduce:transition-none`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-10 lg:py-10">
        <div className="py-8 lg:pb-14 lg:pt-5">
          <Link
            href="/leads"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors duration-150 hover:text-gray-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 dark:text-gray-400 dark:hover:text-gray-100 motion-reduce:transition-none"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Leads
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(13rem,0.4fr)_minmax(0,1fr)] lg:gap-16">
            <header className="lg:pt-1">
              <p className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500">
                New record
              </p>
              <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Add a lead
              </h1>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                Capture a potential client and keep the opportunity moving.
              </p>
              <div className="mt-8 border-t border-gray-200 pt-5 text-xs leading-relaxed text-gray-500 dark:border-gray-800 dark:text-gray-500">
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  A name is all you need to start.
                </p>
                <p className="mt-2">
                  Add more context now or fill in the details as the
                  relationship develops.
                </p>
              </div>
            </header>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Section
                title="Lead information"
                description="Only a name is required. Add the rest whenever you have it."
              >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Name" required error={nameError}>
                  {(p) => (
                    <input
                      {...p}
                      ref={nameRef}
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Ada Lovelace"
                      value={values.name}
                      onChange={(e) => update("name", e.target.value)}
                      className={`${inputClass} ${nameError ? errBorder : okBorder}`}
                    />
                  )}
                </Field>
                <TextField
                  label="Company"
                  value={values.company}
                  onChange={(v) => update("company", v)}
                  autoComplete="organization"
                  placeholder="Company name"
                />
                <TextField
                  label="Industry"
                  value={values.industry}
                  onChange={(v) => update("industry", v)}
                  placeholder="e.g. Hospitality"
                />
                <TextField
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={(v) => update("email", v)}
                  autoComplete="email"
                  placeholder="name@company.com"
                />
                <TextField
                  label="Phone"
                  type="tel"
                  value={values.phone}
                  onChange={(v) => update("phone", v)}
                  autoComplete="tel"
                  placeholder="+1 555 000 0000"
                />
                <TextField
                  label="Website"
                  type="url"
                  value={values.website}
                  onChange={(v) => update("website", v)}
                  autoComplete="url"
                  placeholder="https://"
                />
              </div>
              </Section>

              <Section
                title="Outreach"
                description="Where they came from and when to reach out next."
              >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Source">
                  {(p) => (
                    <select
                      {...p}
                      value={values.source}
                      onChange={(e) => update("source", e.target.value)}
                      className={`${inputClass} ${okBorder} ${
                        values.source ? "" : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      <option value="">Select a source</option>

                      {LEAD_SOURCES.map((source) => (
                        <option key={source.value} value={source.value}>
                          {source.label}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
                <TextField
                  label="Next follow-up"
                  type="date"
                  value={values.nextFollowUpAt}
                  onChange={(v) => update("nextFollowUpAt", v)}
                  className="dark:scheme-dark"
                />
              </div>
              </Section>

              <Section
                title="Notes"
                description="Context, ideas, or anything worth remembering."
              >
              <Field label="Notes" srOnlyLabel>
                {(p) => (
                  <textarea
                    {...p}
                    rows={5}
                    placeholder="How you met, what they need, what to mention next time…"
                    value={values.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    className={`${inputClass} ${okBorder} resize-y`}
                  />
                )}
              </Field>
              </Section>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 dark:border-gray-800 sm:flex-row sm:justify-end">
                <Link
                  href="/leads"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-600 transition-colors duration-150 hover:border-gray-400 hover:bg-gray-50 hover:text-gray-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-900 dark:hover:text-gray-100 dark:focus-visible:ring-offset-gray-950 motion-reduce:transition-none"
                >
                  Cancel
                </Link>
              <button
                type="submit"
                disabled={isPending}
                aria-busy={isPending}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-gray-950 bg-gray-950 px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-gray-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70 dark:border-gray-100 dark:bg-gray-100 dark:text-gray-950 dark:hover:bg-gray-300 dark:focus-visible:ring-offset-gray-950 motion-reduce:transition-none"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Adding lead
                  </span>
                ) : (
                  <>
                    Add lead
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </>
                )}
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateNewLeadClientPage;
