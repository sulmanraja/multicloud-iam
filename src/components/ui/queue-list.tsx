import type { QueueItem } from "@/types/frontend";
import { ProviderBadge } from "@/components/ui/provider-badge";
import { RiskBadge } from "@/components/ui/risk-badge";

export function QueueList({ items }: { items: QueueItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="rounded-[1.1rem] border border-line bg-slate-950/40 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-sm font-medium text-slate-50">{item.title}</div>
              <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
            </div>
            <div className="flex items-center gap-2">
              <ProviderBadge provider={item.provider} />
              <RiskBadge level={item.severity} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
