import { inventory } from "@/lib/mock-data";
import type { AccessDefinition, Principal } from "@/lib/types";
import type { DashboardMetric, PrincipalAccessView, QueueItem, RoleDefinitionView } from "@/types/frontend";

function hasRisk(definition: AccessDefinition) {
  return definition.riskTags.length > 0 || definition.usageCoveragePct < 30;
}

function highRiskPermissionsForPrincipal(principalId: string) {
  const definitionIds = inventory.assignments
    .filter((assignment) => assignment.principalId === principalId)
    .map((assignment) => assignment.accessDefinitionId);

  return inventory.definitions
    .filter((definition) => definitionIds.includes(definition.id))
    .flatMap((definition) => definition.permissions.filter((permission) => permission.includes("*") || permission.includes("PassRole") || permission.includes("actAs")));
}

export function getDashboardMetrics(): DashboardMetric[] {
  const highRiskDefinitions = inventory.definitions.filter(hasRisk);
  const customDefinitions = inventory.definitions.filter((definition) => definition.managedBy === "customer");

  return [
    {
      label: "Definitions",
      value: String(inventory.definitions.length),
      detail: "Normalized roles and policies across AWS, Azure, and GCP"
    },
    {
      label: "High-Risk Assignments",
      value: String(inventory.assignments.filter((assignment) => highRiskDefinitions.some((definition) => definition.id === assignment.accessDefinitionId)).length),
      tone: "danger",
      detail: "Assignments backed by broad, wildcard, or under-used access"
    },
    {
      label: "Custom Footprint",
      value: `${customDefinitions.length}/${inventory.definitions.length}`,
      tone: "warning",
      detail: "Customer-managed definitions that may need lifecycle governance"
    },
    {
      label: "Observed Coverage",
      value: `${Math.round(inventory.definitions.reduce((sum, definition) => sum + definition.usageCoveragePct, 0) / inventory.definitions.length)}%`,
      tone: "success",
      detail: "Average exercised permission coverage in demo mode"
    }
  ];
}

export function getRoleDefinitions(): RoleDefinitionView[] {
  return inventory.definitions.map((definition) => ({
    id: definition.id,
    name: definition.name,
    provider: definition.cloud,
    definitionType: definition.definitionType,
    managedBy: definition.managedBy,
    usageCoveragePct: definition.usageCoveragePct,
    riskTags: definition.riskTags,
    scopes: definition.scopes
  }));
}

export function getPrincipalViews(): PrincipalAccessView[] {
  return inventory.principals.map((principal) => ({
    id: principal.id,
    displayName: principal.displayName,
    cloud: principal.cloud,
    principalType: principal.principalType,
    assignmentCount: inventory.assignments.filter((assignment) => assignment.principalId === principal.id).length,
    usageEventCount: inventory.usageEvents.filter((event) => event.principalId === principal.id).length,
    highRiskPermissions: highRiskPermissionsForPrincipal(principal.id).slice(0, 4)
  }));
}

export function getRecommendationQueue(): QueueItem[] {
  return inventory.assignments.flatMap((assignment) => {
    const principal = inventory.principals.find((candidate) => candidate.id === assignment.principalId);
    const definition = inventory.definitions.find((candidate) => candidate.id === assignment.accessDefinitionId);

    if (!principal || !definition || !hasRisk(definition)) {
      return [];
    }

    return [
      {
        id: assignment.id,
        title: `${principal.displayName} -> ${definition.name}`,
        provider: definition.cloud,
        severity: definition.riskTags.length > 0 ? "high" : "medium",
        detail: definition.riskTags.length > 0
          ? `Review ${definition.riskTags.join(", ")} and tighten unused access.`
          : `Coverage is ${definition.usageCoveragePct}%, which suggests over-granting.`
      }
    ] satisfies QueueItem[];
  });
}

export function getPrincipalById(id: string) {
  const principal = inventory.principals.find((candidate) => candidate.id === id);
  if (!principal) {
    return null;
  }

  const assignments = inventory.assignments.filter((assignment) => assignment.principalId === id);
  const definitions = inventory.definitions.filter((definition) => assignments.some((assignment) => assignment.accessDefinitionId === definition.id));
  const usageEvents = inventory.usageEvents.filter((event) => event.principalId === id);

  return { principal, assignments, definitions, usageEvents };
}

export function getDefinitionById(id: string) {
  const definition = inventory.definitions.find((candidate) => candidate.id === id);
  if (!definition) {
    return null;
  }

  const assignments = inventory.assignments.filter((assignment) => assignment.accessDefinitionId === id);
  const principals = inventory.principals.filter((principal) => assignments.some((assignment) => assignment.principalId === principal.id));

  return { definition, assignments, principals };
}

export function getCloudCounts() {
  return inventory.principals.reduce<Record<string, number>>((accumulator, principal) => {
    accumulator[principal.cloud] = (accumulator[principal.cloud] || 0) + 1;
    return accumulator;
  }, {});
}

export function getSettingsSnapshot() {
  return {
    demoMode: true,
    providers: ["aws", "azure", "gcp"],
    seededPrincipals: inventory.principals.length,
    seededDefinitions: inventory.definitions.length
  };
}

export const demoNarrative = {
  dashboard: "Demo mode summarizes the local mock inventory and highlights where broad managed access should become custom least-privilege definitions.",
  inventory: "Inventory compares provider-managed and customer-managed definitions through a canonical model so operators can review sprawl consistently.",
  principalExplorer: "Principal Access Explorer is the 'why does this identity have access?' investigation surface.",
  roleStudio: "Role Studio stays safe in demo mode: draft and review only, no publish actions.",
  approvals: "Approvals placeholders show the eventual governance workflow: review, comment, approve, and export evidence."
};

export function getProviderBadgeLabel(value: Principal["cloud"]) {
  return value.toUpperCase();
}
