"use client";

import { Search, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { appConfig } from "@/lib/config";
import { getRouteTitle } from "@/lib/navigation";

export function TopBar() {
  const pathname = usePathname();
  const routeTitle = getRouteTitle(pathname);

  return (
    <header className="rounded-[1.5rem] border border-line bg-panel/75 px-4 py-4 backdrop-blur md:px-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-3">
          <Breadcrumbs pathname={pathname} />
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Operations Workbench</div>
            <h1 className="mt-1 text-2xl font-semibold text-slate-50">{routeTitle}</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-line bg-slate-950/60 px-4 py-2 text-sm text-slate-300">
            <Search className="h-4 w-4 text-slate-500" />
            Search roles, permissions, or principals
          </div>
          <div className="flex items-center gap-2 rounded-full border border-line bg-slate-950/60 px-3 py-2 text-sm text-slate-300">
            <SlidersHorizontal className="h-4 w-4 text-slate-500" />
            AWS / Azure / GCP
          </div>
          <div className="flex items-center gap-2 rounded-full border border-accent/30 bg-accentSoft px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">
            <ShieldCheck className="h-4 w-4" />
            {appConfig.demoMode ? "Demo mode" : "Live mode"}
          </div>
        </div>
      </div>
    </header>
  );
}
