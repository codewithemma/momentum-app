import { toast } from "@/components/ui/toast";
import { useDeleteLead } from "@/hooks/mutate/use-leads";
import { routes } from "@/libs/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

export function DeleteConfirmModal({
  leadId,
  onCancel,
}: {
  leadId: string;
  onCancel: () => void;
}) {
  const router = useRouter();
  const { mutate: deleteLead, isPending } = useDeleteLead();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  function handleConfirm() {
    deleteLead(leadId, {
      onSuccess: () => {
        toast({
          variant: "success",
          message: "Lead deleted successfully",
        });
        router.push(routes.leads.main);
      },
      onError: (error) => {
        toast({
          variant: "error",
          message: error.response?.data?.message ?? "Failed to delete lead",
        });
      },
    });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-lead-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-950 sm:p-7">
        <div className="flex items-start gap-4">
          <span className="flex size-9 shrink-0 items-center justify-center border border-red-200 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
            <AlertTriangle className="size-4" aria-hidden="true" />
          </span>
          <div>
            <h2
              id="delete-lead-title"
              className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100"
            >
              Delete this lead?
            </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          This will permanently remove this lead and its information. This
          action cannot be undone.
        </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-600 transition-colors duration-150 hover:border-gray-400 hover:bg-gray-50 hover:text-gray-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-900 dark:hover:text-gray-100"
          >
            <X className="size-3.5" aria-hidden="true" />
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isPending}
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-red-300 bg-red-50 px-4 text-sm font-medium text-red-700 transition-colors duration-150 hover:border-red-400 hover:bg-red-100 hover:text-red-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/60"
          >
            {isPending ? "Deleting..." : "Delete lead"}
          </button>
        </div>
      </div>
    </div>
  );
}
