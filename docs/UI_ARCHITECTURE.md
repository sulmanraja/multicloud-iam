# UI Architecture Recommendation

## Recommended web UI
Build the UI as a **React + TypeScript operational console** for security administrators and IAM engineers.

### Preferred stack
- **Next.js** with App Router
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **TanStack Query** for API/server state
- **TanStack Table** for data-heavy tables
- **React Hook Form + Zod** for form handling and validation
- **Recharts** for dashboard visualizations
- **Zustand** only for lightweight shared UI state

This stack works well because the product is not a content site; it is a data-dense enterprise console with filters, tables, detail panels, explainers, and review workflows.

## Recommended information architecture
Use these top-level sections:
- Dashboard
- Role Inventory
- Principal Explorer
- Recommendations
- Role Studio
- Governance
- Settings

## Recommended layout
Use a persistent app shell:
- Left sidebar navigation
- Top toolbar with provider filter, scope switcher, search, and user menu
- Main content area for lists and workflows
- Right contextual panel for details, diffs, and explanations

## Best first screens
1. **Dashboard**
   - role/policy counts by provider
   - high-risk findings
   - custom-role sprawl summary
   - recent drift/change events

2. **Role Inventory**
   - searchable/filterable table
   - provider badges
   - risk indicators
   - detail drawer with permissions, assignments, and usage

3. **Principal Explorer**
   - effective access breakdown
   - why-access explanation
   - last-used evidence
   - escalatory permission flags

4. **Recommendations**
   - least-privilege candidates
   - rationale and confidence
   - diff viewer
   - accept/dismiss workflow

5. **Role Studio**
   - create custom role/policy from usage or template
   - visual permission picker
   - raw JSON/YAML editor
   - provider validation feedback

## Suggested frontend folder structure
```text
src/
  app/
    dashboard/
    inventory/
    principals/
    recommendations/
    role-studio/
    governance/
  components/
    tables/
    charts/
    layout/
  features/
    inventory/
    principals/
    recommendations/
    role-studio/
    governance/
  lib/
    api/
    auth/
    design-system/
  state/
  types/
```

## Canonical frontend types
Build shared UI around normalized entities:
- RoleDefinition
- PolicyDefinition
- Principal
- Assignment
- Scope
- UsageEvidence
- Recommendation
- RoleDraft
- ChangeRequest

Provider-specific details should still be retained for deep drill-down views.

## UX guidance
Design for operators:
- dense but readable data presentation
- explicit explanations
- safe review before publish
- strong side-by-side diffs
- fast filtering and search

Avoid flashy visuals that reduce operational clarity.

## First implementation milestone
The first frontend milestone should deliver:
- App shell and navigation
- Dashboard page
- Role Inventory page
- Principal Explorer page
- Recommendation list page

Keep it read-only first. Add Role Studio and governance flows after the browsing and explainability experience is strong.
