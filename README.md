# Multi-Cloud IAM Codex Starter

A Codex-friendly starter scaffold for a **multi-cloud IAM role intelligence tool** covering **AWS, Azure, and GCP**.

This starter is built for two use cases:
1. You want a concrete local project that Codex can extend.
2. You want a starting point for a product that tracks built-in/managed role usage, tracks custom role usage, and helps generate custom roles.

## Why this scaffold is Codex-oriented
OpenAI documents Codex as a coding agent available in the IDE extension, CLI, and app, and notes that project-level configuration can live in `.codex/config.toml`. The CLI can read, edit, and run code in your selected directory, which makes a repo with clear tasks and guardrails ideal for Codex workflows. citeturn627326search0turn627326search2turn627326search8

This repo includes:
- `.codex/config.toml` for project-scoped Codex defaults
- `AGENTS.md` with implementation guidance for Codex
- a small TypeScript API that Codex can inspect and extend
- a PRD in `docs/PRD.md`
- mock cloud IAM data so you can run the product locally without real cloud credentials

## What the starter does today
- lists managed and custom roles/policies across AWS, Azure, and GCP from mock data
- summarizes risk and usage patterns
- generates a least-privilege recommendation using the OpenAI API
- creates a draft custom role/policy suggestion from observed usage

## Current architecture
- `src/server.ts` – Express server and API routes
- `src/lib/mock-data.ts` – sample role/policy inventory and usage data
- `src/lib/analysis.ts` – OpenAI-powered reasoning with schema validation
- `src/lib/types.ts` – shared domain model
- `docs/PRD.md` – product requirements document
- `.codex/config.toml` – Codex project configuration
- `AGENTS.md` – agent instructions and future enhancements

## Local setup
1. Install Node.js 20+
2. Copy the env file:
   ```bash
   cp .env.example .env
   ```
3. Add your OpenAI API key to `.env`
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the dev server:
   ```bash
   npm run dev
   ```
6. Open:
   - `http://localhost:3000/health`
   - `http://localhost:3000/api/inventory`
   - `http://localhost:3000/api/recommendations`

## Suggested Codex prompts
Run Codex in this repo and try prompts like:
- `Explain this codebase and propose the next 5 highest-impact improvements.`
- `Add a Terraform export endpoint for generated custom roles.`
- `Add a provider adapter interface and move mock providers behind it.`
- `Create a simple frontend dashboard for the inventory API.`
- `Add tests for the recommendation output schema.`

## Notes about current OpenAI/Codex docs
OpenAI’s official Codex docs currently describe:
- Codex CLI for local terminal workflows
- IDE extension quickstart
- project-level `.codex/config.toml`
- Codex app and cloud workflows
These are the patterns this scaffold is designed around. citeturn627326search0turn627326search2turn627326search7turn627326search8

## Example endpoints
### `GET /api/inventory`
Returns all mock IAM definitions and assignments.

### `GET /api/recommendations`
Calls OpenAI to produce recommendations from the inventory.

### `POST /api/custom-role-draft`
Accepts a JSON body with `principalId` and returns a draft least-privilege custom role/policy suggestion.

Example body:
```json
{
  "principalId": "svc-ci-gcp-prod"
}
```

## Next steps
- wire in real AWS IAM / Access Analyzer / CloudTrail reads
- wire in Azure RBAC role definitions and assignments
- wire in GCP IAM role and binding inventory
- add auth, approvals, simulation, and exports
