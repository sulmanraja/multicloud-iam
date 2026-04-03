import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { getSettingsModel } from "@/lib/api/demo-client";

export default async function SettingsPage() {
  const settings = await getSettingsModel();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Environment, providers, and demo controls"
        description="This scaffold keeps demo mode on by default so the operational console can be exercised safely before provider adapters, auth, and persistence arrive."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Environment" description="Current operating mode for the frontend scaffold.">
          <div className="space-y-3 text-sm text-slate-300">
            <div>Demo mode: {settings.demoMode ? "Enabled" : "Disabled"}</div>
            <div>Seeded principals: {settings.seededPrincipals}</div>
            <div>Seeded definitions: {settings.seededDefinitions}</div>
          </div>
        </Panel>

        <Panel title="Providers" description="Provider connectivity will move here once real adapters are added.">
          <div className="space-y-3 text-sm text-slate-300">
            {settings.providers.map((provider) => (
              <div key={provider} className="rounded-xl border border-line bg-slate-950/35 px-4 py-3 uppercase tracking-[0.18em] text-slate-300">
                {provider}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
