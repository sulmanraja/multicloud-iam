import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { QueueList } from "@/components/ui/queue-list";
import { listRecommendationQueue } from "@/lib/api/demo-client";

export default async function RecommendationsPage() {
  const queue = await listRecommendationQueue();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Recommendations"
        title="Least-privilege work queue"
        description="This page is structured around the future review workflow: rationale, confidence, blast radius, diff, and disposition state."
      />

      <Panel title="Open Findings" description="Demo findings based on seeded mock assignments and risk signals.">
        <QueueList items={queue.items} />
      </Panel>
    </div>
  );
}
