export function FilterBar({ hint }: { hint: string }) {
  return (
    <div className="flex flex-wrap gap-3 rounded-[1.25rem] border border-line bg-slate-950/35 p-4 text-sm text-slate-300">
      <span className="rounded-full border border-line px-3 py-1.5">Provider: All</span>
      <span className="rounded-full border border-line px-3 py-1.5">Risk: Any</span>
      <span className="rounded-full border border-line px-3 py-1.5">Scope: All</span>
      <span className="rounded-full border border-line px-3 py-1.5">Sort: Highest risk</span>
      <span className="text-slate-500">{hint}</span>
    </div>
  );
}
