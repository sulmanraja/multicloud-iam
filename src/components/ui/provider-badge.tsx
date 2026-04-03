import { getProviderBadgeLabel } from "@/lib/demo-data";
import type { Cloud } from "@/lib/types";
import { cn } from "@/lib/utils";

const providerStyles: Record<Cloud, string> = {
  aws: "bg-amber-500/15 text-amber-200 border-amber-500/30",
  azure: "bg-sky-500/15 text-sky-200 border-sky-500/30",
  gcp: "bg-emerald-500/15 text-emerald-200 border-emerald-500/30"
};

export function ProviderBadge({ provider }: { provider: Cloud }) {
  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-medium uppercase tracking-[0.16em]", providerStyles[provider])}>
      {getProviderBadgeLabel(provider)}
    </span>
  );
}
