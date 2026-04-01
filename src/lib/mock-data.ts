import { Inventory } from "./types.js";

export const inventory: Inventory = {
  principals: [
    { id: "aws-deployer-prod", displayName: "AWS Prod Deployer", principalType: "role-consumer", cloud: "aws" },
    { id: "azure-backup-ops", displayName: "Azure Backup Ops", principalType: "group", cloud: "azure" },
    { id: "svc-ci-gcp-prod", displayName: "GCP CI Service Account", principalType: "service-account", cloud: "gcp" }
  ],
  definitions: [
    {
      id: "aws-policy-readonly",
      name: "ReadOnlyAccess",
      cloud: "aws",
      definitionType: "provider-managed-policy",
      managedBy: "provider",
      permissions: ["ec2:Describe*", "s3:Get*", "iam:Get*", "iam:List*"],
      riskTags: [],
      scopes: ["account"],
      usageCoveragePct: 38
    },
    {
      id: "aws-policy-deploy-custom",
      name: "CustomerManagedDeployPolicy",
      cloud: "aws",
      definitionType: "customer-managed-policy",
      managedBy: "customer",
      permissions: ["cloudformation:CreateStack", "cloudformation:UpdateStack", "iam:PassRole", "lambda:UpdateFunctionCode"],
      riskTags: ["privilege-escalation", "deployment"],
      scopes: ["account"],
      usageCoveragePct: 74
    },
    {
      id: "azure-role-contributor",
      name: "Contributor",
      cloud: "azure",
      definitionType: "provider-managed-role",
      managedBy: "provider",
      permissions: ["Microsoft.Compute/*", "Microsoft.Storage/*", "Microsoft.Network/*", "Microsoft.Authorization/*/read"],
      riskTags: ["broad-write"],
      scopes: ["subscription", "resource-group"],
      usageCoveragePct: 22
    },
    {
      id: "azure-role-backup-custom",
      name: "BackupOperatorCustom",
      cloud: "azure",
      definitionType: "custom-role",
      managedBy: "customer",
      permissions: ["Microsoft.RecoveryServices/*/read", "Microsoft.RecoveryServices/backupJobs/*", "Microsoft.Compute/virtualMachines/read"],
      riskTags: [],
      scopes: ["resource-group"],
      usageCoveragePct: 81
    },
    {
      id: "gcp-role-editor",
      name: "roles/editor",
      cloud: "gcp",
      definitionType: "provider-managed-role",
      managedBy: "provider",
      permissions: ["resourcemanager.projects.get", "compute.instances.*", "storage.objects.*", "iam.serviceAccounts.actAs"],
      riskTags: ["broad-write", "service-account-impersonation"],
      scopes: ["project"],
      usageCoveragePct: 17
    },
    {
      id: "gcp-role-ci-custom",
      name: "ciPipelineDeployer",
      cloud: "gcp",
      definitionType: "custom-role",
      managedBy: "customer",
      permissions: ["cloudbuild.builds.create", "artifactregistry.repositories.downloadArtifacts", "run.services.get", "run.services.update"],
      riskTags: ["deployment"],
      scopes: ["project"],
      usageCoveragePct: 88
    }
  ],
  assignments: [
    { id: "a1", principalId: "aws-deployer-prod", accessDefinitionId: "aws-policy-readonly", scope: "arn:aws:iam::123456789012:role/prod-deployer", inherited: false },
    { id: "a2", principalId: "aws-deployer-prod", accessDefinitionId: "aws-policy-deploy-custom", scope: "arn:aws:iam::123456789012:role/prod-deployer", inherited: false },
    { id: "a3", principalId: "azure-backup-ops", accessDefinitionId: "azure-role-contributor", scope: "/subscriptions/123/resourceGroups/rg-backup", inherited: false },
    { id: "a4", principalId: "azure-backup-ops", accessDefinitionId: "azure-role-backup-custom", scope: "/subscriptions/123/resourceGroups/rg-backup", inherited: false },
    { id: "a5", principalId: "svc-ci-gcp-prod", accessDefinitionId: "gcp-role-editor", scope: "projects/prod-app", inherited: false },
    { id: "a6", principalId: "svc-ci-gcp-prod", accessDefinitionId: "gcp-role-ci-custom", scope: "projects/prod-app", inherited: false }
  ],
  usageEvents: [
    { principalId: "aws-deployer-prod", permission: "cloudformation:UpdateStack", resource: "prod-api-stack", timestamp: "2026-03-29T08:10:00Z", cloud: "aws" },
    { principalId: "aws-deployer-prod", permission: "lambda:UpdateFunctionCode", resource: "prod-sync-job", timestamp: "2026-03-29T08:12:00Z", cloud: "aws" },
    { principalId: "azure-backup-ops", permission: "Microsoft.RecoveryServices/backupJobs/read", resource: "rg-backup/vault-1", timestamp: "2026-03-30T10:00:00Z", cloud: "azure" },
    { principalId: "azure-backup-ops", permission: "Microsoft.Compute/virtualMachines/read", resource: "rg-backup/vm-01", timestamp: "2026-03-30T10:05:00Z", cloud: "azure" },
    { principalId: "svc-ci-gcp-prod", permission: "cloudbuild.builds.create", resource: "projects/prod-app", timestamp: "2026-03-31T12:00:00Z", cloud: "gcp" },
    { principalId: "svc-ci-gcp-prod", permission: "run.services.update", resource: "projects/prod-app/services/api", timestamp: "2026-03-31T12:05:00Z", cloud: "gcp" }
  ]
};
