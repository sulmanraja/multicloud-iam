import type { ReactNode } from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopBar } from "@/components/layout/top-bar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-grid">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-4 lg:px-6">
        <SidebarNav />
        <div className="flex min-h-[calc(100vh-2rem)] flex-1 flex-col gap-4">
          <TopBar />
          <main className="flex-1 rounded-[1.5rem] border border-line bg-panel/85 p-5 shadow-panel backdrop-blur">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
