import type { FilterOption } from "@/types/frontend";

export function FilterBar({
  hint,
  filters,
  searchPlaceholder = "Search within this workflow"
}: {
  hint: string;
  filters?: FilterOption[];
  searchPlaceholder?: string;
}) {
  const filterItems = filters || [
    { label: "Provider", value: "All" },
    { label: "Risk", value: "Any" },
    { label: "Scope", value: "All" },
    { label: "Sort", value: "Highest risk" }
  ];

  return (
    <div className="rounded-[1.25rem] border border-line bg-slate-950/35 p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-2 text-sm text-slate-300">
          {filterItems.map((filter) => (
            <span key={filter.label} className="rounded-full border border-line px-3 py-1.5">
              {filter.label}: {filter.value}
            </span>
          ))}
        </div>

        <div className="rounded-full border border-line bg-slate-950/60 px-4 py-2 text-sm text-slate-400">
          {searchPlaceholder}
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-500">{hint}</p>
    </div>
  );
}
