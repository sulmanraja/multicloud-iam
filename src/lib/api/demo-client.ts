import { appConfig } from "@/lib/config";
import {
  demoNarrative,
  getCloudCounts,
  getDashboardMetrics,
  getDefinitionById,
  getPrincipalById,
  getPrincipalViews,
  getRecommendationQueue,
  getRoleDefinitions,
  getSettingsSnapshot
} from "@/lib/demo-data";

export async function getConsoleOverview() {
  return {
    demoMode: appConfig.demoMode,
    metrics: getDashboardMetrics(),
    queue: getRecommendationQueue().slice(0, 4),
    cloudCounts: getCloudCounts(),
    narrative: demoNarrative.dashboard
  };
}

export async function listInventoryDefinitions() {
  return {
    demoMode: appConfig.demoMode,
    items: getRoleDefinitions(),
    narrative: demoNarrative.inventory
  };
}

export async function listPrincipalAccess() {
  return {
    demoMode: appConfig.demoMode,
    items: getPrincipalViews(),
    narrative: demoNarrative.principalExplorer
  };
}

export async function getPrincipalAccessDetail(id: string) {
  return getPrincipalById(id);
}

export async function getDefinitionDetail(id: string) {
  return getDefinitionById(id);
}

export async function listRecommendationQueue() {
  return {
    demoMode: appConfig.demoMode,
    items: getRecommendationQueue()
  };
}

export async function getRoleStudioSeed() {
  return {
    demoMode: appConfig.demoMode,
    queue: getRecommendationQueue().slice(0, 3),
    narrative: demoNarrative.roleStudio
  };
}

export async function getApprovalQueue() {
  return {
    demoMode: appConfig.demoMode,
    items: [
      {
        id: "cr-001",
        title: "Replace GCP Editor for CI service account",
        status: "awaiting-review",
        owner: "Platform Security",
        summary: "Swap broad provider-managed role for a draft deployment-focused custom role."
      },
      {
        id: "cr-002",
        title: "Constrain Azure backup operator scope",
        status: "draft",
        owner: "IAM Engineering",
        summary: "Validate resource-group-only access and attach evidence bundle before publication."
      }
    ],
    narrative: demoNarrative.approvals
  };
}

export async function getSettingsModel() {
  return getSettingsSnapshot();
}
