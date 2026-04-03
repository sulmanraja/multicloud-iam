import { cn } from "@/lib/utils";

const severityStyles = {
  low: "border-slate-600 text-slate-300",
  medium: "border-warning/40 text-warning",
  high: "border-danger/40 text-danger"
} as const;

export function RiskBadge({ level }: { level: keyof typeof severityStyles }) {
  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em]", severityStyles[level])}>
      {level}
    </span>
  );
}
