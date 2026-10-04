import { Lead } from "@/types/common";
import { LeadStatus, STAGES } from "./extras";
import { useState } from "react";
import { PipelineColumn } from "./pipeline-column";

export const PipelineBoard = ({
  leads,
  onStatusChange,
}: {
  leads: Lead[];
  onStatusChange: (id: string, s: LeadStatus) => void;
}) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overStatus, setOverStatus] = useState<LeadStatus | null>(null);

  const draggingLead = leads.find((l) => l.id === draggingId);

  const handleDrop = (status: LeadStatus) => {
    if (draggingLead && draggingLead.status !== status)
      onStatusChange(draggingLead.id, status);
    setDraggingId(null);
    setOverStatus(null);
  };

  return (
    <div className="-mx-6 overflow-x-auto px-6 pb-4 sm:-mx-10 sm:px-10">
      <div className="flex gap-3">
        {STAGES.map((stage) => (
          <PipelineColumn
            key={stage.status}
            {...stage}
            leads={leads.filter((l) => l.status === stage.status)}
            draggingId={draggingId}
            isOver={
              overStatus === stage.status &&
              draggingLead?.status !== stage.status
            }
            onDragOver={() => setOverStatus(stage.status)}
            onDragLeave={() =>
              setOverStatus((s) => (s === stage.status ? null : s))
            }
            onDrop={() => handleDrop(stage.status)}
            onCardDragStart={setDraggingId}
            onCardDragEnd={() => {
              setDraggingId(null);
              setOverStatus(null);
            }}
          />
        ))}
      </div>
    </div>
  );
};
