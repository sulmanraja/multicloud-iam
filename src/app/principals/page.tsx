import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { FilterBar } from "@/components/ui/filter-bar";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { ProviderBadge } from "@/components/ui/provider-badge";
import { listPrincipalAccess } from "@/lib/api/demo-client";

export default async function PrincipalsPage() {
  const principals = await listPrincipalAccess();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Principal Access Explorer"
        title="Explain who has access and why"
        description={principals.narrative}
      />

      <FilterBar hint="Future drill-downs will include inheritance, group nesting, last-used, and dangerous permission pivots." />

      <Panel title="Principals" description="Effective access overview seeded from the demo inventory.">
        <DataTable
          headers={["Principal", "Provider", "Type", "Assignments", "Usage", "High-Risk Permissions", "Details"]}
          rows={principals.items.map((item) => [
            <div key={`${item.id}-name`}>
              <div className="font-medium text-slate-50">{item.displayName}</div>
              <div className="mt-1 text-xs text-slate-500">{item.id}</div>
            </div>,
            <ProviderBadge key={`${item.id}-provider`} provider={item.cloud} />,
            <span key={`${item.id}-type`}>{item.principalType}</span>,
            <span key={`${item.id}-assignments`}>{item.assignmentCount}</span>,
            <span key={`${item.id}-usage`}>{item.usageEventCount}</span>,
            <span key={`${item.id}-risk`} className="text-slate-300">{item.highRiskPermissions.join(", ") || "Nominal"}</span>,
            <Link key={`${item.id}-link`} href={`/principals/${item.id}`} className="text-accent hover:text-sky-200">
              Explain access
            </Link>
          ])}
        />
      </Panel>
    </div>
  );
}
