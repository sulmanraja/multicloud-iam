import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { ProviderBadge } from "@/components/ui/provider-badge";
import { getDefinitionDetail } from "@/lib/api/demo-client";

export default async function InventoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = await getDefinitionDetail(id);

  if (!detail) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Definition Detail"
        title={detail.definition.name}
        description="Placeholder drill-down for permissions, assignments, risk notes, and eventual role diff workflows."
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title="Overview" description="Canonical summary for the selected role or policy.">
          <div className="space-y-4 text-sm text-slate-300">
            <ProviderBadge provider={detail.definition.cloud} />
            <div>Type: {detail.definition.definitionType}</div>
            <div>Managed by: {detail.definition.managedBy}</div>
            <div>Usage coverage: {detail.definition.usageCoveragePct}%</div>
            <div>Scopes: {detail.definition.scopes.join(", ")}</div>
          </div>
        </Panel>

        <Panel title="Permissions & Attachments" description="Future view for usage evidence, diffing, and replacement suggestions.">
          <div className="space-y-2 text-sm text-slate-300">
            {detail.definition.permissions.map((permission) => (
              <div key={permission} className="rounded-xl border border-line bg-slate-950/35 px-3 py-2 font-mono text-xs">
                {permission}
              </div>
            ))}
            <div className="pt-4 text-slate-400">
              Assigned to {detail.principals.length} principals across {detail.assignments.length} bindings in demo mode.
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
