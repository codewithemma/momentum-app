import { useEffect, useRef, useState } from "react";
import { LEAD_STATUSES, LeadStatus, STATUS_DOT, STATUS_LABELS } from "./extras";
import { useUpdateLead } from "@/hooks/mutate/use-leads";
import { toast } from "@/components/ui/toast";
import { Check, ChevronDown } from "lucide-react";

export function StatusMenu({
  leadId,
  status,
}: {
  leadId: string;
  status: LeadStatus;
}) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { mutateAsync: updateLead, isPending } = useUpdateLead();

  useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function choose(next: LeadStatus) {
    setOpen(false);
    buttonRef.current?.focus();

    if (next === status) return;

    try {
      await updateLead({
        id: leadId,
        data: {
          status: next,
        },
      });

      toast({
        variant: "success",
        message: "Lead status updated successfully",
      });
    } catch (error) {
      toast({
        variant: "error",
        message:
          (error as { response?: { data?: { message?: string } } }).response
            ?.data?.message ?? "Failed to update lead status",
      });
    }
  }

  return (
    <div ref={ref} className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-busy={isPending}
        aria-label={`Status: ${STATUS_LABELS[status]}. Change status`}
        disabled={isPending}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-9 items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-900 transition-colors duration-150 hover:border-gray-400 hover:bg-gray-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 disabled:cursor-wait disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:bg-gray-900 motion-reduce:transition-none"
      >
        {isPending ? (
          <span
            aria-hidden="true"
            className="size-3 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-gray-100 motion-reduce:animate-none"
          />
        ) : (
          <span
            aria-hidden="true"
            className={`size-2 rounded-full ${STATUS_DOT[status]}`}
          />
        )}

        {STATUS_LABELS[status]}

        <ChevronDown
          aria-hidden="true"
          className={`size-4 text-gray-400 transition-transform duration-150 motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {isPending && (
        <span className="sr-only" role="status">
          Saving status…
        </span>
      )}

      {open && !isPending && (
        <ul
          role="listbox"
          aria-label="Lead status"
          className="absolute left-0 z-20 mt-2 w-48 border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-800 dark:bg-gray-950"
        >
          {LEAD_STATUSES.map((s) => (
            <li key={s} role="option" aria-selected={s === status}>
              <button
                type="button"
                autoFocus={s === status}
                onClick={() => choose(s)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors duration-150 focus-visible:bg-gray-100 focus-visible:outline-hidden dark:focus-visible:bg-gray-900 motion-reduce:transition-none ${
                  s === status
                    ? "bg-gray-100 font-medium text-gray-950 dark:bg-gray-900 dark:text-gray-100"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-950 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-100"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`size-2 rounded-full ${STATUS_DOT[s]}`}
                />

                <span className="flex-1">{STATUS_LABELS[s]}</span>

                {s === status && (
                  <Check
                    aria-hidden="true"
                    className="size-4 text-gray-700 dark:text-gray-300"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
