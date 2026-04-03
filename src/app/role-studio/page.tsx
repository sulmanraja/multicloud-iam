import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { QueueList } from "@/components/ui/queue-list";
import { getRoleStudioSeed } from "@/lib/api/demo-client";

export default async function RoleStudioPage() {
  const studio = await getRoleStudioSeed();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Role Studio"
        title="Draft custom roles and policies safely"
        description={studio.narrative}
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title="Draft Candidates" description="Seeded starting points for usage-based or reduction-based drafting.">
          <QueueList items={studio.queue} />
        </Panel>

        <Panel title="Builder Workspace" description="Placeholder for visual permission picker, JSON/YAML editor, and validation surfaces.">
          <EmptyState
            title="Role Studio remains read-only in this scaffold"
            description="The next build step is a draft editor with permission diffing, provider validation, and preview/export controls backed by mock draft generation."
          />
        </Panel>
      </div>
    </div>
  );
}
