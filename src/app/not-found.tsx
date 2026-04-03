import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";

export default function NotFound() {
  return (
    <EmptyState
      title="This console view does not exist"
      description="The requested route or demo object could not be found. Use the primary navigation to return to a supported workflow."
      action={
        <Link href="/dashboard" className="rounded-full border border-line px-4 py-2 text-sm text-slate-200 hover:bg-slate-900/60">
          Return to dashboard
        </Link>
      }
    />
  );
}
