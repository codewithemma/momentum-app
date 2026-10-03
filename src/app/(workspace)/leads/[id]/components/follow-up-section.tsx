import { toast } from "@/components/ui/toast";
import { useUpdateLead } from "@/hooks/mutate/use-leads";
import { fmt } from "@/libs/date-fns";
import { useState } from "react";

export function FollowUpSection({
  followUp,
  leadId,
}: {
  followUp: string;
  leadId: string;
}) {
  const [editing, setEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(followUp || "");
  const { mutateAsync: updateLead, isPending } = useUpdateLead();

  function handleSave() {
    updateLead(
      {
        id: leadId,
        data: {
          nextFollowUpAt: selectedDate,
        },
      },
      {
        onSuccess: () => {
          setEditing(false);
          toast({
            variant: "success",
            message: "Follow-up date updated successfully",
          });
        },
        onError: (error) => {
          toast({
            variant: "error",
            message:
              error.response?.data?.message ??
              "Failed to update follow-up date",
          });
        },
      },
    );
  }

  function handleClear() {
    updateLead(
      {
        id: leadId,
        data: {
          nextFollowUpAt: null,
        },
      },
      {
        onSuccess: () => {
          setSelectedDate("");
          setEditing(false);

          toast({
            variant: "success",
            message: "Follow-up date cleared successfully",
          });
        },
        onError: (error) => {
          toast({
            variant: "error",
            message:
              error.response?.data?.message ?? "Failed to clear follow-up date",
          });
        },
      },
    );
  }

  return (
    <section
      aria-labelledby="followup-heading"
      className="rounded-lg border border-gray-200 p-5 dark:border-gray-800 sm:p-6"
    >
      <div className="flex items-center justify-between">
        <h2
          id="followup-heading"
          className="text-sm font-semibold text-gray-900 dark:text-gray-100"
        >
          Follow-up
        </h2>
        {!editing && (
          <button
            type="button"
            onClick={() => {
              setSelectedDate(followUp || "");
              setEditing(true);
            }}
            className="inline-flex min-h-8 items-center rounded-md px-2 text-xs font-medium text-blue-600 transition-colors duration-150 hover:text-blue-500 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
          >
            {followUp ? "Edit follow-up" : "Schedule follow-up"}
          </button>
        )}
      </div>

      {!editing ? (
        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            {followUp ? "Next follow-up" : "Status"}
          </p>
          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">
            {followUp ? (
              fmt(followUp)
            ) : (
              <span className="text-gray-500 dark:text-gray-400">
                No follow-up scheduled
              </span>
            )}
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="followup-date-input"
              className="block text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              Select date
            </label>
            <input
              id="followup-date-input"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1 block min-h-10 w-full max-w-xs rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 transition-colors duration-150 hover:border-gray-300 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-gray-700 dark:scheme-dark"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isPending}
              className="inline-flex min-h-9 items-center justify-center rounded-md border border-blue-600 bg-blue-600 px-3 text-xs font-medium text-white transition-colors duration-150 hover:border-blue-500 hover:bg-blue-500"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="inline-flex min-h-9 items-center justify-center rounded-md border border-gray-200 px-3 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            {followUp && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex min-h-9 items-center justify-center rounded-md px-2 text-xs font-medium text-red-600 hover:underline dark:text-red-400"
              >
                Clear follow-up
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
