import { useEffect } from "react";
import { LogOut, X } from "lucide-react";

export function SignOutDialog({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Cancel"
        onClick={onCancel}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sign-out-title"
        className="relative w-full max-w-md border border-stone-200 bg-white shadow-2xl"
      >
        <div className="flex items-start gap-3 border-b border-stone-200 px-5 py-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-stone-100 text-stone-700 ring-1 ring-stone-200">
            <LogOut size={16} />
          </span>
          <div className="min-w-0">
            <h2
              id="sign-out-title"
              className="font-[Poppins] text-base font-semibold tracking-tight text-stone-900"
            >
              Log out of Onengs Empire?
            </h2>
            <p className="mt-0.5 text-sm text-stone-500">
              {`You'll`} need to sign in again to continue.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="ml-auto p-1 text-stone-400 hover:text-stone-700"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-stone-200 bg-stone-50 px-5 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 border border-stone-300 bg-white px-4 font-[Poppins] text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-10 bg-stone-900 px-4 font-[Poppins] text-sm font-medium text-stone-50 transition-colors hover:bg-stone-700"
          >
            Yes, log out
          </button>
        </div>
      </div>
    </div>
  );
}
