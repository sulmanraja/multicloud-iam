# Product Requirements Document

## Product name
RoleLens Multi-Cloud IAM Workbench

## Summary
RoleLens is a multi-cloud IAM engineering and governance platform for security administrators and IAM engineers. It inventories built-in or provider-managed roles and policies, tracks custom role and policy usage, recommends least-privilege replacements, and helps teams create custom roles across AWS, Azure, and GCP.

## Problem statement
Security and IAM teams struggle with three recurring problems:
1. Broad built-in or managed roles are used as shortcuts and remain over-privileged.
2. Custom roles and policies sprawl over time and are hard to maintain.
3. Each cloud models access differently, making least-privilege governance inconsistent.

## Users
- Cloud IAM Security Administrators
- IAM Engineers
- Cloud Security Architects
- Platform Security Engineers
- Compliance and Audit teams

## Goals
- Provide a unified inventory of built-in/managed and custom access definitions across AWS, Azure, and GCP.
- Show where roles and policies are assigned and whether they are actually used.
- Generate safer custom roles/policies based on observed usage.
- Reduce standing privilege and simplify access review.

## Non-goals for MVP
- Full entitlement graph across all SaaS apps
- Human identity lifecycle management
- Real-time enforcement in production clouds
- Full policy simulation parity with each cloud provider

## Cloud abstraction model
### Canonical objects
- Principal
- AccessDefinition
- Assignment
- Scope
- Permission
- UsageEvent
- RiskFinding
- Recommendation

### Provider mapping
#### GCP
- Predefined role => provider-managed role
- Custom role => customer-managed role

#### Azure
- Built-in role => provider-managed role
- Custom role => customer-managed role

#### AWS
- AWS managed policy => provider-managed policy
- Customer managed policy => customer-managed policy
- Inline policy => embedded policy

## Core user stories
### Inventory
- As an IAM admin, I want to see all provider-managed and custom access definitions across clouds so I can understand current sprawl.
- As a security architect, I want to know which principals and scopes are using each definition.

### Usage analytics
- As an IAM engineer, I want to know which granted permissions are actually used so I can reduce over-privilege.
- As a reviewer, I want to see last-used and never-used patterns by principal and role/policy.

### Custom role creation
- As an IAM engineer, I want to generate a draft custom role/policy from observed activity.
- As a security admin, I want to start from an existing built-in role and remove unused permissions.

### Governance
- As an approver, I want to review a proposed custom role before publication.
- As an auditor, I want exported evidence for why a role exists and how it was derived.

## MVP feature set
### 1. Unified inventory
- ingest mock or live role/policy metadata
- classify provider-managed vs custom
- display assignments and scope

### 2. Usage insights
- percentage of permissions exercised
- unused permissions
- high-risk permissions
- stale custom roles/policies

### 3. Recommendation engine
- flag over-privileged assignments
- suggest narrower managed roles where possible
- suggest custom role/policy drafts when needed

### 4. Custom role studio
- start from observed usage
- start from existing built-in/managed role
- edit included permissions
- validate schema before publish

### 5. Export and publish
- export JSON/YAML/Terraform-ready definitions
- in MVP, dry-run only

## Functional requirements
### Inventory
- The system shall support AWS, Azure, and GCP inventory records.
- The system shall normalize definition type, scope, permissions, assignments, and usage.
- The system shall support provider-specific metadata retention.

### Analysis
- The system shall compute a least-privilege score for each assignment.
- The system shall identify duplicate or near-duplicate custom definitions.
- The system shall highlight wildcard, admin, impersonation, and destructive permissions.

### Draft generation
- The system shall generate a proposed custom definition from usage events.
- The system shall include rationale and confidence notes.
- The system shall separate provider-specific output formats.

## Non-functional requirements
- API-first design
- Type-safe domain model
- Model outputs validated against schemas
- Local developer experience runnable in under 5 minutes
- Clear separation between provider adapters and business logic

## Data model overview
### Principal
- id
- displayName
- principalType
- cloud

### AccessDefinition
- id
- name
- cloud
- definitionType
- managedBy
- permissions[]
- riskTags[]
- scopes[]

### Assignment
- id
- principalId
- accessDefinitionId
- scope
- inherited

### UsageEvent
- principalId
- permission
- resource
- timestamp
- cloud

### Recommendation
- targetPrincipalId
- currentAccessDefinitionId
- proposedDefinition
- riskReductionSummary
- confidence

## API proposal
- `GET /health`
- `GET /api/inventory`
- `GET /api/recommendations`
- `POST /api/custom-role-draft`
- `GET /api/principals/:id`
- `POST /api/export/terraform`

## UX outline
### Dashboard
- total definitions by cloud
- custom vs managed split
- top over-privileged assignments
- stale custom roles/policies

### Inventory explorer
- filter by cloud, scope, definition type, risk, owner

### Role/policy detail
- permissions list
- assignments
- usage coverage
- risk findings
- replacement options

### Custom role studio
- generate draft
- edit permissions
- validate
- export

## Success metrics
- reduction in broad built-in/managed assignments
- reduction in unused granted permissions
- time to draft least-privilege custom role
- percent of custom roles with owner and rationale

## Future roadmap
### Phase 2
- real provider integrations
- Terraform export
- approval workflows
- simulation hooks

### Phase 3
- change drift detection
- access review campaigns
- anomaly detection
- separation-of-duties checks
