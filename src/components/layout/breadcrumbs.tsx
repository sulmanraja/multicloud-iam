"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getBreadcrumbs } from "@/lib/navigation";

export function Breadcrumbs({ pathname }: { pathname: string }) {
  const items = getBreadcrumbs(pathname);

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-slate-400">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={item.key} className="flex items-center gap-1">
            {isLast ? (
              <span className="text-slate-200">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-slate-200">
                {item.label}
              </Link>
            )}
            {!isLast ? <ChevronRight className="h-4 w-4 text-slate-600" /> : null}
          </div>
        );
      })}
    </nav>
  );
}
