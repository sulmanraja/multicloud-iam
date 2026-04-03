import type { ReactNode } from "react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopBar } from "@/components/layout/top-bar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-grid">
      <div className="mx-auto flex min-h-screen max-w-[1680px] gap-4 px-3 py-3 md:px-4 lg:gap-6 lg:px-6">
        <SidebarNav />
        <div className="flex min-h-[calc(100vh-1.5rem)] flex-1 flex-col gap-4">
          <MobileNav />
          <TopBar />
          <main className="flex-1 rounded-[1.5rem] border border-line bg-panel/85 p-4 shadow-panel backdrop-blur md:p-5 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
