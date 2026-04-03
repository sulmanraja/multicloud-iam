"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Shield, Waypoints } from "lucide-react";
import { appConfig } from "@/lib/config";
import { primaryNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[304px] shrink-0 rounded-[1.5rem] border border-line bg-slate-950/80 p-5 shadow-panel backdrop-blur xl:flex xl:flex-col">
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-accent/20 bg-accentSoft p-4">
        <div className="rounded-2xl bg-slate-950/80 p-3 text-accent">
          <Shield className="h-6 w-6" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-slate-400">RoleLens</div>
          <div className="mt-1 text-lg font-semibold text-slate-50">IAM Operations Console</div>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-line bg-slate-900/60 p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-100">
          <Building2 className="h-4 w-4 text-accent" />
          Enterprise Workbench
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Built for dense IAM workflows: inventory, explainability, recommendation triage, role drafting, and governance review.
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {primaryNavigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-2xl border px-4 py-3 transition",
                isActive
                  ? "border-accent/40 bg-accentSoft text-slate-50"
                  : "border-transparent bg-slate-900/50 text-slate-300 hover:border-line hover:bg-slate-900"
              )}
            >
              <div className="text-sm font-medium">{item.title}</div>
              <div className="mt-1 text-xs text-slate-400">{item.description}</div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-2xl border border-line bg-slate-900/70 p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-100">
          <Waypoints className="h-4 w-4 text-accent" />
          {appConfig.demoMode ? "Demo Mode" : "Live Mode"}
        </div>
        <p className="mt-2 text-sm text-slate-400">
          {appConfig.demoMode
            ? "Frontend pages are seeded from the mock IAM inventory so we can iterate safely before live provider adapters exist."
            : "The console is configured for live integrations once provider adapters and auth are enabled."}
        </p>
      </div>
    </aside>
  );
}
