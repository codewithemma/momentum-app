import { Lead } from "@/types/common";
import { LeadStatus } from "./extras";
import { LeadCard } from "./lead-card";

export function PipelineColumn(props: {
  status: LeadStatus;
  label: string;
  leads: Lead[];
  draggingId: string | null;
  isOver: boolean;
  onDragOver: () => void;
  onDragLeave: () => void;
  onDrop: () => void;
  onCardDragStart: (id: string) => void;
  onCardDragEnd: () => void;
}) {
  const lost = props.status === "LOST";
  return (
    <section
      aria-label={`${props.label}, ${props.leads.length} leads`}
      role="region"
      onDragOver={(e) => {
        e.preventDefault();
        props.onDragOver();
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node))
          props.onDragLeave();
      }}
      onDrop={(e) => {
        e.preventDefault();
        props.onDrop();
      }}
      className={`flex w-72 shrink-0 flex-col border p-2 transition-colors duration-150 motion-reduce:transition-none ${
        lost ? "ml-3 opacity-80" : ""
      } ${
        props.isOver
          ? "border-gray-500 bg-gray-100 dark:border-gray-500 dark:bg-gray-900"
          : lost
            ? "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950"
            : "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950"
      }`}
    >
      <header className="flex items-center justify-between px-2 py-2">
        <h2
          className={`text-sm font-semibold ${lost ? "text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-gray-200"}`}
        >
          {props.label}
        </h2>
        <span className="text-xs tabular-nums text-gray-400 dark:text-gray-500">
          {props.leads.length}
        </span>
      </header>
      <ul className="mt-1 flex flex-col gap-2">
        {props.leads.length === 0 ? (
          <li className="border border-dashed border-gray-300 px-3 py-4 text-center text-xs text-gray-400 dark:border-gray-700 dark:text-gray-500">
            No leads in this stage
          </li>
        ) : (
          props.leads.map((lead) => (
            <li key={lead.id}>
              <LeadCard
                lead={lead}
                dragging={props.draggingId === lead.id}
                onDragStart={() => props.onCardDragStart(lead.id)}
                onDragEnd={props.onCardDragEnd}
              />
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
