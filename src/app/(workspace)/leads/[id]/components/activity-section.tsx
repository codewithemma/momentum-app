import { toast } from "@/components/ui/toast";
import { useCreateLeadActivity } from "@/hooks/mutate/use-leads";
import { useGetLeadActivities } from "@/hooks/query/use-leads";
import { fmt } from "@/libs/date-fns";
import { useState, type FormEvent } from "react";
import { ACTIVITY_TYPE_LABELS, ACTIVITY_TYPES } from "./extras";
import type { ActivityType } from "@/types/common";

export const ActivitySection = ({ leadId }: { leadId: string }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [type, setType] = useState<ActivityType>("NOTE");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { data, isLoading, isError, refetch } = useGetLeadActivities(leadId);
  const { mutate: createActivity, isPending } = useCreateLeadActivity(leadId);

  function resetForm() {
    setType("NOTE");
    setTitle("");
    setDescription("");
    setFormOpen(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast({
        variant: "error",
        message: "Please enter a title and description for the activity.",
      });
      return;
    }

    createActivity(
      {
        type,
        title: title.trim(),
        description: description.trim(),
      },
      {
        onSuccess: () => {
          resetForm();
          toast({
            variant: "success",
            message: "Activity added successfully",
          });
        },
        onError: (error) => {
          toast({
            variant: "error",
            message: error.response?.data?.message ?? "Failed to add activity",
          });
        },
      },
    );
  }

  return (
    <section aria-labelledby="activity-heading">
      <div className="flex items-center justify-between">
        <h2
          id="activity-heading"
          className="text-sm font-semibold text-gray-900 dark:text-gray-100"
        >
          Activity
        </h2>
        {!formOpen && (
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="inline-flex min-h-9 items-center rounded-md px-2 text-sm font-medium text-blue-600 transition-colors duration-150 hover:text-blue-500 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-500 dark:hover:text-blue-400 motion-reduce:transition-none"
          >
            + Add activity
          </button>
        )}
      </div>

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800 sm:p-5"
        >
          <div>
            <label
              htmlFor="activity-type"
              className="block text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              Activity type
            </label>
            <select
              id="activity-type"
              value={type}
              onChange={(e) => setType(e.target.value as ActivityType)}
              className="mt-1 block min-h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
            >
              {ACTIVITY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {ACTIVITY_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label
              htmlFor="activity-title"
              className="block text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              id="activity-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Activity title"
              className="mt-1 block min-h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="activity-desc"
              className="block text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              Description / note
            </label>
            <textarea
              id="activity-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What happened or what was discussed…"
              className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
            />
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={resetForm}
              disabled={isPending}
              className="inline-flex min-h-9 items-center justify-center rounded-md border border-gray-200 px-3 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex min-h-9 items-center justify-center rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white hover:border-blue-500 hover:bg-blue-500"
            >
              {isPending ? "Adding..." : "Add activity"}
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="mt-6 rounded-lg border border-gray-200 p-8 text-center dark:border-gray-800">
          <span
            aria-label="Loading activities"
            className="inline-block size-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-500 motion-reduce:animate-none"
          />
        </div>
      ) : isError ? (
        <div className="mt-6 rounded-lg border border-red-200 p-8 text-center dark:border-red-900">
          <p className="text-sm text-red-600 dark:text-red-400">
            Failed to load activities.
          </p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-3 text-xs font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Try again
          </button>
        </div>
      ) : !data?.activities.length ? (
        <div className="mt-6 rounded-lg border border-dashed border-gray-200 p-8 text-center dark:border-gray-800">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            No activity yet
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Add your first activity to start tracking this lead.
          </p>
        </div>
      ) : (
        <ol className="mt-6 space-y-0 border-l border-gray-200 dark:border-gray-800">
          {data.activities.map((a) => (
            <ActivityItem
              key={a.id}
              title={a.title}
              description={a.description ?? ""}
              when={fmt(a.createdAt)}
            />
          ))}
        </ol>
      )}
    </section>
  );
};

function ActivityItem({
  title,
  description,
  when,
}: {
  title: string;
  description: string;
  when: string | null;
}) {
  return (
    <li className="relative pb-8 pl-6 last:pb-0">
      <span
        aria-hidden="true"
        className="absolute -left-1.5 top-1.5 size-3 rounded-full border-2 border-blue-600 bg-white dark:border-blue-500 dark:bg-gray-950"
      />
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
        {title}
      </p>
      <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{when}</p>
    </li>
  );
}
