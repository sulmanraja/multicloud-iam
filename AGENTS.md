# AGENTS.md

## Mission
Build a multi-cloud IAM role intelligence starter app for security administrators and IAM engineers. The product should help teams inventory managed roles/policies and custom roles/policies across AWS, Azure, and GCP, analyze usage, and generate safer least-privilege custom roles.

## Product boundaries
- Focus on IAM inventory, role analysis, recommendations, and custom role creation workflows.
- Treat AWS as policy-centric, while Azure and GCP are role-centric.
- Keep the starter safe by default: no live cloud mutations until explicit provider adapters are implemented.
- Prefer mocked adapters and deterministic local demos first.

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
