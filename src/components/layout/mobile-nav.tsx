"use client";

import Link from "next/link";
import { Menu, Shield, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <div className="flex items-center justify-between rounded-[1.5rem] border border-line bg-slate-950/80 px-4 py-3 shadow-panel">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-accentSoft p-2 text-accent">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-slate-400">RoleLens</div>
            <div className="text-sm font-semibold text-slate-50">IAM Operations Console</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="rounded-xl border border-line bg-slate-900/60 p-2 text-slate-200"
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="mt-3 rounded-[1.5rem] border border-line bg-slate-950/92 p-3 shadow-panel backdrop-blur">
          <nav className="flex flex-col gap-2">
            {primaryNavigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
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
        </div>
      ) : null}
    </div>
  );
}
