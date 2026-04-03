import type { Metadata } from "next";
import "@/app/globals.css";
import { AppProviders } from "@/app/providers";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  title: "RoleLens IAM Console",
  description: "Operational console scaffold for multi-cloud IAM inventory, explainability, and least-privilege workflows."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
