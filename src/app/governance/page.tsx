import { DataTable } from "@/components/ui/data-table";
import { FilterBar } from "@/components/ui/filter-bar";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { getApprovalQueue } from "@/lib/api/demo-client";

export default async function GovernancePage() {
  const approvals = await getApprovalQueue();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Governance"
        title="Change review, approvals, and audit readiness"
        description={approvals.narrative}
        tags={["Approval chain", "Rollback planning", "Audit evidence"]}
      />

      <FilterBar
        hint="Governance will centralize review state, approver comments, publication readiness, and evidence packaging."
        searchPlaceholder="Search change request, owner, or review status"
        filters={[
          { label: "Status", value: "Awaiting review" },
          { label: "Owner", value: "All" },
          { label: "Cloud", value: "All" },
          { label: "Sort", value: "Newest first" }
        ]}
      />

      <Panel title="Approval Queue" description="Foundation for review, comment, rollback planning, and evidence export.">
        <DataTable
          headers={["Change Request", "Status", "Owner", "Summary"]}
          rows={approvals.items.map((item) => [
            <span key={`${item.id}-title`} className="font-medium text-slate-50">{item.title}</span>,
            <span key={`${item.id}-status`} className="text-slate-300">{item.status}</span>,
            <span key={`${item.id}-owner`} className="text-slate-300">{item.owner}</span>,
            <span key={`${item.id}-summary`} className="text-slate-400">{item.summary}</span>
          ])}
        />
      </Panel>
    </div>
  );
}
