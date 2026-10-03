import { routes } from "@/libs/routes";
import { Lead } from "@/types/common";
import { SideField, SideSection } from "./sections";
import { fmt } from "@/libs/date-fns";
import Link from "next/link";
import { FollowUpSection } from "./follow-up-section";
import { NotesSection } from "./notes-section";
import { StatusMenu } from "./status-menu";
import { useState } from "react";
import { DeleteConfirmModal } from "./modals/delete-confirm-modal";
import { EditLeadModal } from "./modals/edit-lead-modal";
import { leadSourceLabels } from "./extras";
import { MoreActionsMenu } from "./more-actions-menu";

const LeadView = ({ lead }: { lead: Lead }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <div className="py-10 lg:py-14">
      {/* Header */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <Link
            href={routes.leads.main}
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors duration-150 hover:text-gray-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-400 dark:hover:text-gray-100 motion-reduce:transition-none"
          >
            <span aria-hidden="true">←</span> Leads
          </Link>
          <h1 className="mt-4 truncate text-2xl font-semibold leading-tight sm:text-3xl">
            {lead?.name ?? "Untitled lead"}
          </h1>
          {lead?.company && (
            <p className="mt-1 text-base text-gray-600 dark:text-gray-300">
              {lead.company}
            </p>
          )}
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {[
              lead?.source ? leadSourceLabels[lead.source] : null,
              lead?.industry,
            ]
              .filter(Boolean)
              .join(" · ") || "No source or industry yet"}
          </p>
          <div className="mt-4">
            <StatusMenu leadId={lead.id} status={lead.status} />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setEditModalOpen(true)}
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors duration-150 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:bg-gray-900 dark:hover:text-gray-100 dark:focus-visible:ring-offset-gray-950 motion-reduce:transition-none"
          >
            Edit
          </button>
          <MoreActionsMenu onDeleteClick={() => setDeleteModalOpen(true)} />
        </div>
      </div>
      {/* Two-column body */}
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
        {/* Left column */}
        <div className="min-w-0 space-y-10">
          {/* Follow-up Section */}
          <FollowUpSection followUp={lead.nextFollowUpAt} leadId={lead.id} />
          {/* Activity Section */}
          {/* <ActivitySection
            activities={lead.activities}
            onAddActivity={handleAddActivity}
          /> */}
        </div>

        {/* Right column */}
        <aside className="min-w-0 space-y-8">
          {/* Contact */}
          <SideSection title="Contact">
            <SideField label="Email">
              {lead?.email ? (
                <a
                  href={`mailto:${lead.email}`}
                  className="break-all text-sm font-medium text-blue-600 transition-colors duration-150 hover:text-blue-500 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-500 dark:hover:text-blue-400 motion-reduce:transition-none"
                >
                  {lead?.email}
                </a>
              ) : (
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  Not provided
                </span>
              )}
            </SideField>

            <SideField label="Phone">
              {lead?.phone ? (
                <a
                  href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                  className="text-sm text-gray-900 transition-colors duration-150 hover:text-blue-600 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-100 dark:hover:text-blue-500 motion-reduce:transition-none"
                >
                  {lead.phone}
                </a>
              ) : (
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  Not provided
                </span>
              )}
            </SideField>

            <SideField label="Website">
              {lead?.website ? (
                <a
                  href={lead?.website}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="break-all text-sm font-medium text-blue-600 transition-colors duration-150 hover:text-blue-500 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-500 dark:hover:text-blue-400 motion-reduce:transition-none"
                >
                  {lead?.website.replace(/^https?:\/\//, "")}{" "}
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  Not provided
                </span>
              )}
            </SideField>
          </SideSection>

          {/* Details */}
          <SideSection title="Details">
            <SideField label="Industry">
              <p className="text-sm text-gray-900 dark:text-gray-100">
                {lead?.industry || "—"}
              </p>
            </SideField>
            <SideField label="Source">
              <p className="text-sm text-gray-900 dark:text-gray-100">
                {lead?.source ? leadSourceLabels[lead.source] : "—"}
              </p>
            </SideField>
            <SideField label="Created">
              <p className="text-sm text-gray-900 dark:text-gray-100">
                {fmt(lead?.createdAt)}
              </p>
            </SideField>
          </SideSection>

          {/* Notes */}
          <NotesSection notes={lead.notes} leadId={lead.id} />
        </aside>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <DeleteConfirmModal onCancel={() => setDeleteModalOpen(false)} />
      )}

      {/* Edit Lead Modal */}
      {editModalOpen && (
        <EditLeadModal lead={lead} onCancel={() => setEditModalOpen(false)} />
      )}
    </div>
  );
};

export default LeadView;
