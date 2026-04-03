import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { FilterBar } from "@/components/ui/filter-bar";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { ProviderBadge } from "@/components/ui/provider-badge";
import { listInventoryDefinitions } from "@/lib/api/demo-client";

export default async function InventoryPage() {
  const inventory = await listInventoryDefinitions();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Role Inventory"
        title="Unified role and policy inventory"
        description={inventory.narrative}
        tags={["Provider-managed", "Custom definitions", "Searchable"]}
      />

      <FilterBar
        hint="Planned filters: cloud, scope, type, risk, team, and resource class."
        searchPlaceholder="Search role, policy, permission, or action"
      />

      <Panel title="Definitions" description="Shared inventory table scaffolded for dense operator workflows.">
        <DataTable
          headers={["Definition", "Provider", "Type", "Managed By", "Coverage", "Risk", "Details"]}
          rows={inventory.items.map((item) => [
            <div key={`${item.id}-name`}>
              <div className="font-medium text-slate-50">{item.name}</div>
              <div className="mt-1 text-xs text-slate-500">{item.id}</div>
            </div>,
            <ProviderBadge key={`${item.id}-provider`} provider={item.provider} />,
            <span key={`${item.id}-type`} className="text-slate-300">{item.definitionType}</span>,
            <span key={`${item.id}-managed`} className="text-slate-300">{item.managedBy}</span>,
            <span key={`${item.id}-coverage`} className="text-slate-300">{item.usageCoveragePct}%</span>,
            <span key={`${item.id}-risk`} className="text-slate-300">{item.riskTags.join(", ") || "Nominal"}</span>,
            <Link key={`${item.id}-link`} href={`/inventory/${item.id}`} className="text-accent hover:text-sky-200">
              Open detail
            </Link>
          ])}
        />
      </Panel>
    </div>
  );
}
