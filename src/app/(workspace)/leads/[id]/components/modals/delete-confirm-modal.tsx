import { useEffect } from "react";

export function DeleteConfirmModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm?: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-lead-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <h2
          id="delete-lead-title"
          className="text-lg font-semibold text-gray-900 dark:text-gray-100"
        >
          Delete this lead?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          This will permanently remove this lead and its information. This
          action cannot be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-gray-200 px-4 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-red-300 bg-red-50 px-4 text-sm font-medium text-red-600 transition-colors duration-150 hover:border-red-400 hover:bg-red-100 hover:text-red-700 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/60"
          >
            Delete lead
          </button>
        </div>
      </div>
    </div>
  );
}
