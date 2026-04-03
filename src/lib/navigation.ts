import type { AppNavItem } from "@/types/frontend";

export const primaryNavigation: AppNavItem[] = [
  { title: "Dashboard", href: "/dashboard", description: "Risk posture and queue overview", shortTitle: "Dashboard" },
  { title: "Role Inventory", href: "/inventory", description: "Browse roles and policies", shortTitle: "Inventory" },
  { title: "Principal Access Explorer", href: "/principals", description: "Explain who has access and why", shortTitle: "Principals" },
  { title: "Recommendations", href: "/recommendations", description: "Least-privilege work queue", shortTitle: "Recommendations" },
  { title: "Role Studio", href: "/role-studio", description: "Draft and refine custom access", shortTitle: "Role Studio" },
  { title: "Governance", href: "/governance", description: "Review, approve, and export changes", shortTitle: "Governance" },
  { title: "Settings", href: "/settings", description: "Demo mode and platform configuration", shortTitle: "Settings" }
];

const routeTitleMap = new Map<string, string>([
  ["/dashboard", "Dashboard"],
  ["/inventory", "Role Inventory"],
  ["/principals", "Principal Access Explorer"],
  ["/recommendations", "Recommendations"],
  ["/role-studio", "Role Studio"],
  ["/governance", "Governance"],
  ["/settings", "Settings"]
]);

export function getRouteTitle(pathname: string) {
  const matched = primaryNavigation.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
  if (matched) {
    return matched.title;
  }

  return routeTitleMap.get(pathname) || "Console";
}

export function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = [{ label: "RoleLens", href: "/dashboard", key: "root" }];
  let currentPath = "";

  for (const segment of segments) {
    currentPath += `/${segment}`;
    const knownLabel = routeTitleMap.get(currentPath);
    const label = knownLabel || segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

    if (currentPath === "/dashboard") {
      breadcrumbs[0] = { label: "Dashboard", href: "/dashboard", key: "dashboard" };
      continue;
    }

    breadcrumbs.push({ label, href: currentPath, key: currentPath });
  }

  return breadcrumbs;
}
