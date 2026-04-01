export type Cloud = "aws" | "azure" | "gcp";
export type DefinitionType =
  | "provider-managed-role"
  | "provider-managed-policy"
  | "custom-role"
  | "customer-managed-policy"
  | "inline-policy";

export interface Principal {
  id: string;
  displayName: string;
  principalType: "user" | "group" | "service-principal" | "service-account" | "role-consumer";
  cloud: Cloud;
}

export interface AccessDefinition {
  id: string;
  name: string;
  cloud: Cloud;
  definitionType: DefinitionType;
  managedBy: "provider" | "customer";
  permissions: string[];
  riskTags: string[];
  scopes: string[];
  usageCoveragePct: number;
}

export interface Assignment {
  id: string;
  principalId: string;
  accessDefinitionId: string;
  scope: string;
  inherited: boolean;
}

export interface UsageEvent {
  principalId: string;
  permission: string;
  resource: string;
  timestamp: string;
  cloud: Cloud;
}

export interface Inventory {
  principals: Principal[];
  definitions: AccessDefinition[];
  assignments: Assignment[];
  usageEvents: UsageEvent[];
}
