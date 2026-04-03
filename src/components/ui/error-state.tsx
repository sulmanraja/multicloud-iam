"use client";

export function ErrorState({
  title = "Console view failed to load",
  description = "Try refreshing the route. Demo mode should keep the shell available even when a page-level fetch fails."
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-danger/30 bg-rose-950/20 px-6 py-10">
      <div className="text-xs uppercase tracking-[0.24em] text-danger">Route Error</div>
      <div className="mt-3 text-2xl font-semibold text-slate-50">{title}</div>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}
