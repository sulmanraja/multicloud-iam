import { KpiGrid } from "@/components/ui/kpi-grid";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { QueueList } from "@/components/ui/queue-list";
import { getConsoleOverview } from "@/lib/api/demo-client";

export default async function DashboardPage() {
  const overview = await getConsoleOverview();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dashboard"
        title="IAM sprawl, risk posture, and operator queue"
        description={overview.narrative}
        tags={["Read-only", "Demo-backed", "Cross-cloud"]}
      />

      <KpiGrid metrics={overview.metrics} />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Recommendation Queue Snapshot" description="High-signal work items derived from the demo inventory.">
          <QueueList items={overview.queue} />
        </Panel>

        <Panel title="Provider Footprint" description="Current seeded principal counts by provider.">
          <div className="space-y-3">
            {Object.entries(overview.cloudCounts).map(([provider, count]) => (
              <div key={provider} className="flex items-center justify-between rounded-2xl border border-line bg-slate-950/35 px-4 py-3">
                <div className="text-sm uppercase tracking-[0.18em] text-slate-400">{provider}</div>
                <div className="text-2xl font-semibold text-slate-50">{count}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
