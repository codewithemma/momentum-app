import { useState } from "react";
import { SideSection } from "./sections";
import { useUpdateLead } from "@/hooks/mutate/use-leads";
import { toast } from "@/components/ui/toast";

export function NotesSection({
  notes,
  leadId,
}: {
  notes: string;
  leadId: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(notes);
  const { mutateAsync: updateLead, isPending } = useUpdateLead();

  function handleSave() {
    updateLead(
      {
        id: leadId,
        data: {
          notes: draft,
        },
      },
      {
        onSuccess: () => {
          setEditing(false);
          toast({
            variant: "success",
            message: "Notes updated successfully",
          });
        },
        onError: (error) => {
          toast({
            variant: "error",
            message: error.response?.data?.message ?? "Failed to update notes",
          });
        },
      },
    );
  }

  return (
    <SideSection title="Notes">
      {!editing ? (
        <div>
          {notes ? (
            <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {notes}
            </p>
          ) : (
            <p className="text-sm text-gray-400 dark:text-gray-500">
              No notes added yet.
            </p>
          )}
          <button
            type="button"
            onClick={() => {
              setDraft(notes);
              setEditing(true);
            }}
            className="mt-3 inline-flex items-center text-xs font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Edit notes
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <textarea
            rows={5}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add notes about this lead…"
            className="block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isPending}
              className="inline-flex min-h-8 items-center justify-center rounded-md border border-blue-600 bg-blue-600 px-3 text-xs font-medium text-white hover:border-blue-500 hover:bg-blue-500"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="inline-flex min-h-8 items-center justify-center rounded-md border border-gray-200 px-3 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </SideSection>
  );
}
