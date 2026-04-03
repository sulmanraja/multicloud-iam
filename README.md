# Multi-Cloud IAM Codex Starter

A Codex-friendly starter for a **multi-cloud IAM operations console** covering **AWS, Azure, and GCP**.

This repo is evolving toward a product that helps security admins and IAM engineers:
- inventory managed and custom roles/policies across clouds
- explain who has access and why
- surface least-privilege recommendations
- draft safer custom roles and policies
- support future governance workflows such as approvals, publication, rollback, and audit evidence

## What is implemented today

The project now includes both:
- a **Next.js frontend foundation** for the IAM operations console
- an **Express + TypeScript API** backed by mock data and OpenAI-powered analysis endpoints

### Frontend foundation

The UI is scaffolded using the stack recommended in `AGENTS.md` and `docs/UI_ARCHITECTURE.md`:
- Next.js App Router
- TypeScript
- Tailwind CSS
- TanStack Query
- reusable shared layout/components
- demo-mode data adapters backed by local mock IAM inventory

Implemented frontend pages:
- `/dashboard`
- `/inventory`
- `/inventory/[id]`
- `/principals`
- `/principals/[id]`
- `/recommendations`
- `/role-studio`
- `/approvals`
- `/settings`

These pages are currently **read-only placeholders** designed to establish:
- app shell and navigation
- layout and design tokens
- feature-oriented route structure
- shared UI primitives for tables, badges, panels, and queue views
- demo-mode workflows using the seeded mock inventory

### Backend

The backend still provides the original mock-backed API:
- `GET /health`
- `GET /api/inventory`
- `GET /api/recommendations`
- `POST /api/custom-role-draft`
- `GET /api/principals/:id`

The OpenAI integration uses the Responses API plus `zod` schema validation to return structured JSON for:
- inventory-wide recommendations
- principal-specific custom role draft generation

## Current architecture

### Frontend
- `src/app` - Next.js App Router pages and layouts
- `src/components/layout` - app shell, sidebar nav, top bar
- `src/components/ui` - shared UI building blocks
- `src/lib/api/demo-client.ts` - demo-aware frontend data layer
- `src/lib/demo-data.ts` - view-model helpers built from mock inventory
- `src/lib/design-system/tokens.ts` - design tokens and theme foundation
- `src/types/frontend.ts` - frontend view model types

### Backend
- `src/server.ts` - Express server and API routes
- `src/lib/mock-data.ts` - sample role/policy inventory and usage data
- `src/lib/analysis.ts` - OpenAI-powered reasoning with schema validation
- `src/lib/types.ts` - shared canonical IAM domain model
- `scripts/seed.ts` - prints the seeded mock inventory

### Product/docs/config
- `docs/PRD.md` - product requirements document
- `docs/UI_ARCHITECTURE.md` - frontend architecture guidance
- `AGENTS.md` - project implementation guidance
- `.codex/config.toml` - Codex project configuration

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

## Running the project

### Frontend only

The frontend defaults to **demo mode**, so it can run without the API.

```bash
npm run dev:web
```

Open `http://localhost:3000/dashboard`

### API only

```bash
npm run dev:api
```

Useful endpoints:
- `http://localhost:3000/health`
- `http://localhost:3000/api/inventory`
- `http://localhost:3000/api/recommendations`

### Running both together

Because both the frontend and API default to port `3000`, run one of them on a different port.

Example:

```bash
PORT=4000 npm run dev:api
```

Then, if you later switch the frontend out of demo mode, point it at the API with:

```bash
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

## Available scripts

- `npm run dev` - starts the frontend dev server
- `npm run dev:web` - starts the Next.js frontend
- `npm run dev:api` - starts the Express API
- `npm run build` - builds API and frontend
- `npm run build:api` - builds the backend only
- `npm run build:web` - builds the frontend only
- `npm run lint` - typechecks backend and frontend
- `npm run seed` - prints the mock inventory JSON

## Demo mode

Demo mode is enabled by default in the frontend. In this mode:
- pages render from the seeded mock inventory
- the app shell and workflows can be explored without cloud credentials
- Role Studio and Approvals stay read-only
- no live provider integrations or mutations are performed

This keeps the console usable while the production architecture is still being built out.

## Example API usage

### `GET /api/inventory`

Returns all mock IAM definitions, principals, assignments, and usage events.

### `GET /api/recommendations`

Calls OpenAI to produce least-privilege recommendations from the mock inventory.

### `POST /api/custom-role-draft`

Accepts a JSON body with `principalId` and returns a draft least-privilege custom role/policy suggestion.

Example body:

```json
{
  "principalId": "svc-ci-gcp-prod"
}
```

## What is still missing

This is still a starter scaffold, not a production-ready console. Notable gaps:
- no real AWS, Azure, or GCP provider adapters yet
- no persistence layer or ingestion pipeline
- no auth or tenancy
- no approval workflow backend
- no Terraform/export pipeline
- no deterministic risk scoring engine yet
- no frontend mutations or publish flows
- no test suite yet

## Suggested next steps

- wire the frontend demo client to typed backend contracts
- add route-level data fetching with real API integration
- introduce provider adapters and persistence
- compute deterministic least-privilege findings before AI summarization
- build Role Studio draft editing and diffing
- build governance workflows, approvals, and export
