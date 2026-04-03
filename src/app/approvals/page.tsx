import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { getApprovalQueue } from "@/lib/api/demo-client";

export default async function ApprovalsPage() {
  const approvals = await getApprovalQueue();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Approvals"
        title="Governance and change review"
        description={approvals.narrative}
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
