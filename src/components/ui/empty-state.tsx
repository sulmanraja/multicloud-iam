export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[1.25rem] border border-dashed border-line bg-slate-950/25 px-6 py-10 text-center">
      <div className="text-lg font-medium text-slate-100">{title}</div>
      <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}
