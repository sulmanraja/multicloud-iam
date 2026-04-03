import type { AppNavItem } from "@/types/frontend";

export const primaryNavigation: AppNavItem[] = [
  { title: "Dashboard", href: "/dashboard", description: "Risk posture and queue overview" },
  { title: "Role Inventory", href: "/inventory", description: "Browse roles and policies" },
  { title: "Principal Access", href: "/principals", description: "Explain who has access and why" },
  { title: "Recommendations", href: "/recommendations", description: "Least-privilege work queue" },
  { title: "Role Studio", href: "/role-studio", description: "Draft and refine custom access" },
  { title: "Approvals", href: "/approvals", description: "Review and govern changes" },
  { title: "Settings", href: "/settings", description: "Demo mode and platform configuration" }
];
