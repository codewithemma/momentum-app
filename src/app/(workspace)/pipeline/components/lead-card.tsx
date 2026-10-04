import { Lead } from "@/types/common";
import { followUpState, SOURCE_LABELS } from "./extras";
import Link from "next/link";
import { routes } from "@/libs/routes";

export const LeadCard = ({
  lead,
  dragging,
  onDragStart,
  onDragEnd,
}: {
  lead: Lead;
  dragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
}) => {
  const state = followUpState(lead.nextFollowUpAt);
  const meta = [
    lead.source ? (SOURCE_LABELS[lead.source] ?? lead.source) : null,
    lead.industry,
  ]
    .filter(Boolean)
    .join(" · ");
  const date = lead.nextFollowUpAt
    ? new Date(lead.nextFollowUpAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <Link
      href={routes.leads.leadById(lead.id)}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", lead.id);
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      className={`block cursor-grab border bg-white p-3 transition-colors duration-150 hover:border-gray-400 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 active:cursor-grabbing dark:bg-gray-950 dark:hover:border-gray-600 motion-reduce:transition-none ${
        dragging
          ? "border-gray-500 opacity-50 dark:border-gray-500"
          : "border-gray-200 dark:border-gray-800"
      }`}
    >
      <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
        {lead.name}
      </p>
      {lead.company && (
        <p className="truncate text-sm text-gray-600 dark:text-gray-400">
          {lead.company}
        </p>
      )}
      {meta && (
        <p className="mt-1.5 truncate text-xs text-gray-500 dark:text-gray-400">
          {meta}
        </p>
      )}
      {date && (
        <p
          className={`mt-2 flex items-center gap-1.5 text-xs ${
            state === "TODAY"
              ? "font-medium text-gray-900 dark:text-gray-100"
              : state === "OVERDUE"
                ? "font-medium text-amber-600 dark:text-amber-500"
                : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <span
            aria-hidden="true"
            className={`size-1.5 rounded-full ${state === "TODAY" ? "bg-gray-900 dark:bg-gray-100" : state === "OVERDUE" ? "bg-amber-500" : "bg-gray-300 dark:bg-gray-600"}`}
          />
          Follow up{" "}
          {state === "TODAY"
            ? "today"
            : state === "OVERDUE"
              ? `· overdue ${date}`
              : date}
        </p>
      )}
    </Link>
  );
};
