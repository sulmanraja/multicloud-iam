import { Search, SlidersHorizontal } from "lucide-react";
import { appConfig } from "@/lib/config";

export function TopBar() {
  return (
    <header className="flex flex-col gap-3 rounded-[1.5rem] border border-line bg-panel/75 px-5 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div>
        <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Operations Workbench</div>
        <h1 className="mt-1 text-2xl font-semibold text-slate-50">Multi-Cloud IAM Console</h1>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex items-center gap-2 rounded-full border border-line bg-slate-950/60 px-4 py-2 text-sm text-slate-300">
          <Search className="h-4 w-4 text-slate-500" />
          Search roles, permissions, or principals
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-accent/30 bg-accentSoft px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {appConfig.demoMode ? "Demo mode" : "Live mode"}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-line bg-slate-950/60 px-3 py-2 text-sm text-slate-300">
            <SlidersHorizontal className="h-4 w-4 text-slate-500" />
            AWS / Azure / GCP
          </div>
        </div>
      </div>
    </header>
  );
}
