import { toast } from "@/components/ui/toast";
import { useUpdateLead } from "@/hooks/mutate/use-leads";
import { Lead } from "@/types/common";
import { LEAD_SOURCES } from "../../../new/components/extras";
import { useState, type FormEvent } from "react";
import { Check, X } from "lucide-react";

type LeadFormData = Pick<
  Lead,
  "name" | "company" | "industry" | "source" | "email" | "phone" | "website"
>;

export function EditLeadModal({
  lead,
  onCancel,
}: {
  lead: Lead;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: lead.name,
    company: lead.company,
    industry: lead.industry,
    source: lead.source,
    email: lead.email,
    phone: lead.phone,
    website: lead.website,
  });
  const { mutateAsync: updateLead, isPending } = useUpdateLead();

  function updateField(field: keyof LeadFormData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast({ variant: "error", message: "Name cannot be empty." });
      return;
    }

    updateLead(
      {
        id: lead.id,
        data: formData,
      },
      {
        onSuccess: () => {
          toast({
            variant: "success",
            message: "Lead updated successfully",
          });
          onCancel();
        },
        onError: (error) => {
          toast({
            variant: "error",
            message:
              error.response?.data?.message ?? "Failed to update lead",
          });
        },
      },
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-lead-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-lg border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-950 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
        <h2
          id="edit-lead-title"
          className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100"
        >
          Edit lead
        </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update the details for this lead.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            aria-label="Close edit lead dialog"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="mt-1 block min-h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-500 focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateField("company", e.target.value)}
                className="mt-1 block min-h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors hover:border-gray-400 focus:border-gray-500 focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Industry
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => updateField("industry", e.target.value)}
                className="mt-1 block min-h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors hover:border-gray-400 focus:border-gray-500 focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Source
              </label>
              <select
                value={formData.source}
                onChange={(e) => updateField("source", e.target.value)}
                className="mt-1 block min-h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors hover:border-gray-400 focus:border-gray-500 focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              >
                <option value="">Select a source</option>
                {LEAD_SOURCES.map((source) => (
                  <option key={source.value} value={source.value}>
                    {source.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="mt-1 block min-h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors hover:border-gray-400 focus:border-gray-500 focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="mt-1 block min-h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors hover:border-gray-400 focus:border-gray-500 focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => updateField("website", e.target.value)}
                className="mt-1 block min-h-10 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2 border-t border-gray-200 pt-4 dark:border-gray-800">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-900 dark:hover:text-gray-100"
            >
              <X className="size-3.5" aria-hidden="true" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-gray-950 bg-gray-950 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-100 dark:bg-gray-100 dark:text-gray-950 dark:hover:bg-gray-300"
            >
              {isPending ? "Saving..." : <><Check className="size-3.5" aria-hidden="true" /> Save changes</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
