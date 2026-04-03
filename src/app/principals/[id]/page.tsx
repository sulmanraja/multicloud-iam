import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { ProviderBadge } from "@/components/ui/provider-badge";
import { getPrincipalAccessDetail } from "@/lib/api/demo-client";

export default async function PrincipalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = await getPrincipalAccessDetail(id);

  if (!detail) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Principal Detail"
        title={detail.principal.displayName}
        description="Placeholder investigation view for direct assignments, effective access, evidence timeline, and recommendation context."
        tags={[detail.principal.cloud, detail.principal.principalType, `${detail.assignments.length} assignments`]}
      />

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Panel title="Identity Context" description="Canonical identity and scope metadata.">
          <div className="space-y-4 text-sm text-slate-300">
            <ProviderBadge provider={detail.principal.cloud} />
            <div>Principal type: {detail.principal.principalType}</div>
            <div>Assignments: {detail.assignments.length}</div>
            <div>Usage events: {detail.usageEvents.length}</div>
          </div>
        </Panel>

        <Panel title="Access Evidence" description="Future workspace for why-access and least-privilege explainers.">
          <div className="space-y-4">
            {detail.definitions.map((definition) => (
              <div key={definition.id} className="rounded-[1rem] border border-line bg-slate-950/35 p-4">
                <div className="text-sm font-medium text-slate-50">{definition.name}</div>
                <div className="mt-1 text-sm text-slate-400">
                  {definition.definitionType} · coverage {definition.usageCoveragePct}% · {definition.riskTags.join(", ") || "Nominal"}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
