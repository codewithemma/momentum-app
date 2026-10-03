import { toast } from "@/components/ui/toast";
import { fmt } from "@/libs/date-fns";
import { useState } from "react";
import { ACTIVITY_TYPES, ActivityEntry, ActivityType } from "./extras";

export const ActivitySection = ({
  activities,
  onAddActivity,
}: {
  activities: ActivityEntry[];
  onAddActivity: (act: Omit<ActivityEntry, "id">) => void;
}) => {
  const [formOpen, setFormOpen] = useState(false);
  const [type, setType] = useState<ActivityType>("Note");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0] || "",
  );

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!description.trim()) {
      toast({
        variant: "error",
        message: "Please enter a description for the activity.",
      });
      return;
    }
    onAddActivity({
      type,
      title: type,
      description: description.trim(),
      date: date ? fmt(date) : "Today",
    });
    setDescription("");
    setFormOpen(false);
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="activity-date"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                Date
              </label>
              <input
                id="activity-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block min-h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:scheme-dark"
              />
            </div>
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
              onClick={() => setFormOpen(false)}
              className="inline-flex min-h-9 items-center justify-center rounded-md border border-gray-200 px-3 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex min-h-9 items-center justify-center rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white hover:border-blue-500 hover:bg-blue-500"
            >
              Add activity
            </button>
          </div>
        </form>
      )}

      {activities.length === 0 ? (
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
          {/* {activities.map((a) => (
            <ActivityItem
              key={a.id}
              title={a.title}
              description={a.description}
              when={a.date}
            />
          ))} */}
        </ol>
      )}
    </section>
  );
};
