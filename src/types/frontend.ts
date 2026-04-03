import type { Cloud } from "@/lib/types";

export interface AppNavItem {
  title: string;
  href: string;
  description: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  tone?: "neutral" | "warning" | "danger" | "success";
  detail: string;
}

export interface QueueItem {
  id: string;
  title: string;
  provider: Cloud;
  severity: "low" | "medium" | "high";
  detail: string;
}

export interface RoleDefinitionView {
  id: string;
  name: string;
  provider: Cloud;
  definitionType: string;
  managedBy: string;
  usageCoveragePct: number;
  riskTags: string[];
  scopes: string[];
}

export interface PrincipalAccessView {
  id: string;
  displayName: string;
  cloud: Cloud;
  principalType: string;
  assignmentCount: number;
  usageEventCount: number;
  highRiskPermissions: string[];
}
