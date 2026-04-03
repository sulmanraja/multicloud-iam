import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="text-xs uppercase tracking-[0.24em] text-slate-400">{eyebrow}</div>
        <h2 className="mt-2 text-3xl font-semibold text-slate-50">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{description}</p>
      </div>
      {actions ? <div>{actions}</div> : null}
    </div>
  );
}
