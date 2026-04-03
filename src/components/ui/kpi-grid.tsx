import type { DashboardMetric } from "@/types/frontend";
import { cn } from "@/lib/utils";

const toneStyles: Record<NonNullable<DashboardMetric["tone"]>, string> = {
  neutral: "border-line",
  success: "border-success/30",
  warning: "border-warning/30",
  danger: "border-danger/30"
};

export function KpiGrid({ metrics }: { metrics: DashboardMetric[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={cn(
            "rounded-[1.25rem] border bg-slate-950/45 p-5",
            toneStyles[metric.tone || "neutral"]
          )}
        >
          <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{metric.label}</div>
          <div className="mt-4 text-3xl font-semibold text-slate-50">{metric.value}</div>
          <p className="mt-3 text-sm leading-6 text-slate-400">{metric.detail}</p>
        </div>
      ))}
    </div>
  );
}
