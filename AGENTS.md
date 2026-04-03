# AGENTS.md

## Mission
Build a multi-cloud IAM role intelligence starter app for security administrators and IAM engineers. The product should help teams inventory managed roles/policies and custom roles/policies across AWS, Azure, and GCP, analyze usage, and generate safer least-privilege custom roles.

## Project context
This repository is a starter for a **Multi-Cloud IAM Role Intelligence and Governance Platform** covering **AWS, Azure, and GCP**. The platform tracks built-in/provider-managed role usage, tracks custom role or policy usage, recommends least-privilege replacements, and helps generate new custom roles or policies safely.

The codebase should evolve toward a production-ready application that supports:
- Unified inventory of roles, policies, assignments, principals, scopes, and usage evidence
- Cross-cloud normalization for AWS, Azure, and GCP IAM concepts
- Least-privilege recommendation workflows
- Custom role / custom policy generation workflows
- Governance workflows such as approval, publication, rollback, and audit evidence

---

## Primary goals for agents
When making changes, optimize for these outcomes in order:

1. **Correctness and safety**
   - Never broaden permissions silently
   - Keep recommendation logic explainable
   - Prefer deterministic transforms for IAM data and policy generation

2. **Clarity and maintainability**
   - Use small, well-named modules
   - Prefer explicit types and schemas
   - Separate provider-specific logic from canonical platform logic

3. **Extensibility**
   - Assume the project will later integrate real cloud APIs, audit logs, persistence, and enterprise auth
   - Avoid hard-coding assumptions that only fit mock data

4. **Operator usability**
   - Security admins and IAM engineers must be able to understand why a recommendation was made
   - UI and API responses should be explainable, auditable, and easy to review

---

## Product boundaries
- Focus on IAM inventory, role analysis, recommendations, and custom role creation workflows.
- Treat AWS as policy-centric, while Azure and GCP are role-centric.
- Keep the starter safe by default: no live cloud mutations until explicit provider adapters are implemented.
- Prefer mocked adapters and deterministic local demos first.

## Expected architecture direction
Use a layered architecture.

### Backend
Prefer this structure:
- `src/routes` — HTTP route definitions only
- `src/controllers` — request/response orchestration
- `src/services` — business logic
- `src/providers` — AWS/Azure/GCP specific logic and adapters
- `src/domain` — canonical models, scoring logic, explainers
- `src/lib` — shared helpers
- `src/schemas` — request/response and domain validation
- `src/data` — mock seed data or fixtures

### Frontend
Prefer this structure:
- `app/` or `src/app/` — routing, layouts, server entrypoints if using Next.js
- `src/features/inventory` — role inventory views and related logic
- `src/features/principals` — principal explorer and effective access views
- `src/features/recommendations` — least-privilege findings and workflows
- `src/features/role-studio` — custom role / policy builder flows
- `src/features/governance` — approvals, publication, change review
- `src/components` — reusable presentational UI components
- `src/components/charts` — charts and visual summaries
- `src/components/tables` — shared table components and cell renderers
- `src/lib/api` — typed API client and query helpers
- `src/lib/auth` — auth wiring
- `src/lib/design-system` — design tokens, theme, and common patterns
- `src/state` — global UI state that truly must be shared
- `src/types` — frontend API and UI types

Keep feature modules cohesive. Prefer collocating feature-specific hooks, tests, and view models under each feature.

---

## Recommended web UI
The preferred UI is a **modern React + TypeScript operational console** optimized for security administrators and IAM engineers.

### Recommended stack
Use this unless there is a strong reason not to:
- **Framework:** Next.js (App Router) with TypeScript
- **UI:** Tailwind CSS + shadcn/ui
- **Data fetching:** TanStack Query
- **Tables:** TanStack Table
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **State:** local component state first, Zustand only for lightweight cross-page UI state
- **Auth later:** NextAuth or enterprise IdP integration layer

Why this stack:
- Fast iteration for operational dashboards
- Good server/client split for secure enterprise apps
- Easy typed integration with API routes
- Strong ecosystem for data-heavy admin interfaces

### UX principles
The UI should feel like a **security operations workbench**, not a marketing site.

Prioritize:
- Dense but readable data presentation
- Fast filtering and comparison
- Clear explanation panels for every finding
- Human review before any custom-role publication action
- Strong diff and audit visualization

Avoid:
- Excessive animation
- Hidden actions
- Ambiguous security language
- Overly decorative charts that reduce operator efficiency

---

## Core UI information architecture
The first production-quality UI should include these pages.

### 1. Dashboard
Purpose: give security admins an at-a-glance view of IAM sprawl and highest-risk issues.

Sections:
- Total roles/policies by provider and type
- High-risk assignments summary
- Top over-privileged principals
- Custom role sprawl summary
- Recent changes and drift alerts
- Recommendation queue snapshot

### 2. Role Inventory
Purpose: browse all provider-managed and custom roles/policies.

Capabilities:
- Filter by cloud, scope, type, risk, team, and resource class
- Search by role/policy name or permission/action
- Compare definitions side by side
- Open a detail drawer or page with usage, assignments, and risk notes

### 3. Principal Access Explorer
Purpose: answer “why does this principal have access?”

Capabilities:
- Show direct assignments, inherited scope, group nesting, attached policies, and effective permissions
- Display last-used evidence
- Highlight escalatory or dangerous permissions
- Surface recommendation candidates

### 4. Recommendations
Purpose: operationalize least-privilege improvements.

Capabilities:
- Queue of findings with confidence, blast radius, and rationale
- Bulk triage: accept, snooze, dismiss, assign owner
- Generate replacement custom role/policy drafts
- Show exact permissions removed and retained

### 5. Role Studio
Purpose: create and refine custom roles or policies.

Capabilities:
- Start from observed usage
- Start from built-in/provider-managed role reduction
- Start from workflow intent or template
- Visual permission picker + raw JSON/YAML editor
- Validation warnings and provider-specific constraints
- Side-by-side diff versus source role or policy

### 6. Governance / Change Review
Purpose: safely publish access changes.

Capabilities:
- Review changes before publish
- Approval chain and comments
- Scope validation
- Rollback plan
- Audit evidence bundle

---

## UI architecture guidance

### Routing model
Use top-level routes aligned to the operator workflow:
- `/dashboard`
- `/inventory`
- `/inventory/[id]`
- `/principals`
- `/principals/[id]`
- `/recommendations`
- `/role-studio`
- `/governance`
- `/settings`

Keep route-level data loading simple and typed. Feature modules should own their query keys, mappers, and view models.

### Layout model
Use a stable app shell:
- Left navigation for primary product areas
- Top bar for provider filter, environment switcher, search, and user context
- Main content area for tables, detail pages, and workflows
- Right-side contextual drawer for explanations, diffs, and drill-down details

This product benefits from a **three-context pattern**:
1. global navigation context
2. active worklist/table context
3. detail/explainer context

### Component hierarchy
Prefer these reusable building blocks:
- `AppShell`
- `PageHeader`
- `FilterBar`
- `KpiGrid`
- `DataTable`
- `RiskBadge`
- `ProviderBadge`
- `PermissionList`
- `PolicyDiffViewer`
- `EvidenceTimeline`
- `RecommendationCard`
- `ApprovalTimeline`
- `JsonYamlCodePanel`

Avoid creating one-off table implementations when shared table primitives will do.

### State management rules
Default to server state and local component state.

Use:
- **TanStack Query** for server state, caching, refetching, and mutation flows
- **URL query params** for filters, sort, selected provider, and table views
- **React Hook Form + Zod** for form state and validation
- **Zustand** only for lightweight cross-page UI state, such as persisted sidebar state or selected comparison set

Do not introduce Redux unless there is a proven need.

### API integration rules for the UI
- Every API response consumed by the UI should have a typed contract
- Prefer a small API client layer instead of direct `fetch` scattered across components
- Transform provider-specific payloads into canonical frontend view models in feature modules, not in generic components
- Show loading, empty, and error states explicitly on every page

### Canonical frontend models
The UI should work from normalized concepts such as:
- `RoleDefinition`
- `PolicyDefinition`
- `Principal`
- `Assignment`
- `Scope`
- `PermissionAction`
- `UsageEvidence`
- `Recommendation`
- `RoleDraft`
- `ChangeRequest`

Provider-specific details should remain available, but generic components should target canonical models whenever possible.

---

## UI-specific design guidance

### Visual style
Use a clean enterprise style:
- Neutral base palette
- Clear status colors for risk/severity
- Strong typography hierarchy
- Dense tables with sufficient whitespace
- Rounded corners and subtle elevation only where it improves scanability

### Accessibility
All new UI should be keyboard-friendly and accessible.

Minimum expectations:
- Visible focus states
- Semantic tables and forms
- Sufficient color contrast
- Badges and risk indicators must not rely on color alone
- Screen-reader-friendly labels for actionable controls

### Performance
This UI will likely become data heavy.

Design for:
- Pagination or virtualization for large tables
- Lazy loading secondary panels
- Debounced search
- Query caching by provider/scope/filter set
- Avoid rendering huge permission lists eagerly

---

## Suggested first UI milestones

### Milestone 1
Build a read-only operator console:
- app shell
- dashboard
- role inventory table
- principal explorer
- mock recommendation list

### Milestone 2
Add interactive least-privilege workflows:
- recommendation acceptance flow
- role diff view
- role-studio draft builder
- validation warnings

### Milestone 3
Add governance flows:
- approval workflow UI
- publish simulation view
- audit trail and change history

---

## Expectations for agent-generated UI code
When implementing or updating the UI:
- Use TypeScript everywhere
- Prefer server-safe patterns and avoid unnecessary client components
- Keep components small and composable
- Extract repeated business logic into feature hooks or view-model helpers
- Add loading, error, and empty states from the start
- Include basic tests for critical UI states where practical
- Keep mock data isolated from production-shaped interfaces

When implementing tables:
- support sorting
- support filtering
- support empty state
- allow row expansion or side-panel detail where useful
- ensure columns are typed and not ad hoc

When implementing forms:
- validate with Zod
- display provider-specific validation feedback
- preserve draft state during editing when reasonable

When implementing charts:
- prefer operational clarity over visual novelty
- pair charts with exact numeric summaries

---

## Do and do not

### Do
- Keep AWS, Azure, and GCP logic isolated behind provider modules
- Normalize data before presenting it broadly in the UI
- Make every recommendation explainable
- Design for future enterprise auth and multi-tenancy
- Preserve a clear audit trail in API and UI concepts

### Do not
- Hard-code provider assumptions into shared UI components
- Mix raw provider payload parsing into presentational components
- Hide permission-impact details behind opaque summaries
- Auto-apply security-sensitive changes without review
- Introduce overly complex state management early

---

## Good first tasks for agents
1. Add a Next.js frontend workspace using the UI architecture above
2. Implement the app shell and navigation
3. Build the dashboard with mock KPIs and findings
4. Build the role inventory table with filters and a detail drawer
5. Build the principal access explorer
6. Build the recommendation queue and diff panel
7. Build the first version of Role Studio
8. Add typed API client helpers and query hooks
9. Add basic component and route tests
10. Document frontend conventions in `docs/UI_ARCHITECTURE.md`

---

## Definition of done for UI work
A UI change is not done unless:
- Types are correct
- Empty/loading/error states exist
- The feature works with mock data
- The behavior is explainable to an IAM engineer
- The change fits the feature-based architecture
- The code is readable enough for future Codex iterations


## Technical guidance for Codex
- Keep the app runnable locally with `npm install` and `npm run dev`.
- Use TypeScript only.
- Keep server logic in `src/` and isolate cloud-specific code under `src/lib/providers/`.
- Use the OpenAI Node SDK via the Responses API.
- Validate all model outputs with `zod` before returning them.
- When adding provider integrations, use an adapter interface rather than provider-specific branching in route handlers.

## Quality bar
- Every new feature should include a sample prompt, mock data, and one testable endpoint.
- Avoid adding UI frameworks until the API contract is stable.
- Prefer small composable files over one large server file.

## Near-term backlog
1. Add provider adapters for real AWS IAM / Azure RBAC / GCP IAM reads.
2. Add a diff engine for managed-role-to-custom-role replacement suggestions.
3. Add Terraform export for generated custom roles and policies.
4. Add approval workflows and role simulation hooks.
5. Add a web frontend after the API stabilizes.
