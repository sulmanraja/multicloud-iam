export function LoadingState({
  title = "Loading console data",
  description = "Preparing the demo workspace and rendering the current route."
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-line bg-slate-950/35 p-6">
      <div className="h-3 w-28 animate-pulse rounded-full bg-slate-800" />
      <div className="mt-4 h-8 w-64 animate-pulse rounded-full bg-slate-800" />
      <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-slate-900" />
      <div className="mt-2 h-4 w-4/5 animate-pulse rounded-full bg-slate-900" />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-[1.25rem] border border-line bg-slate-950/50" />
        ))}
      </div>
      <div className="mt-6">
        <div className="text-lg font-medium text-slate-100">{title}</div>
        <p className="mt-2 text-sm text-slate-400">{description}</p>
      </div>
    </div>
  );
}
