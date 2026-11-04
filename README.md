# EuroTender

EuroTender is an MVP for helping Bulgarian companies discover and evaluate public procurement opportunities published in [CAIS EPP](https://app.eop.bg/). It is designed for organizations that manage one or more participating companies, with company-specific profiles, saved searches, and bookmarks.

The product aims to bring tender discovery, source-backed analysis, company eligibility checks, and deadline reminders into one place. The interface and AI analysis are intended to be in Bulgarian.

## Product overview

- Import new tenders and documents from CAIS EPP, and track official changes.
- Search tenders, save searches, bookmark opportunities, and receive email summaries and deadline reminders.
- Review tender details and AI analysis with verifiable source quotations and links to original documents.
- Compare tender requirements with company profiles using deterministic eligibility rules.

The MVP is limited to Bulgarian public procurement published from launch onward. Online billing, an in-app notification center, and other data sources are out of scope. See the [requirements](./docs/Requirements.md) for the full scope and deferred features.

## Architecture and technology

The accepted direction is a modular monolith: a Next.js application with business capabilities kept separate from replaceable infrastructure integrations. Tender processing is intended to run as durable, event-driven workflows. AI extracts structured information and evidence; application rules verify evidence and determine eligibility.

| Area | Technology or direction |
|---|---|
| Workspace | Bun and Turborepo |
| Web application | Next.js, React, and TypeScript |
| UI | Tailwind CSS and shadcn/ui, with shared components in `packages/ui` |
| Deployment | Vercel |
| Identity | Clerk |
| Database and file storage | Supabase Postgres and Supabase Storage |
| Model integration | Vercel AI SDK |
| Eligibility | Deterministic application rules, not AI decisions |

This repository currently contains the web and shared-package scaffolding. The architecture describes the target design; the listed integrations and product workflows are not necessarily implemented. Workflow runtime, AI provider, document parsing/OCR, and email provider remain open choices. See [Architecture](./docs/Architecture.md) for decisions and open questions.

## Getting started

### Prerequisites

- Node.js 20.9 or later
- Bun 1.4.3

### Install and run

From the repository root:

```sh
bun install
bun run dev
```

The development server is provided by the `apps/web` workspace.

### Adding UI components

From the repository root, add shadcn/ui components to the shared UI package with:

```sh
bunx --bun shadcn@latest add button -c apps/web
```

Replace `button` with the component name. Components are added under `packages/ui`.

### AI agent setup

Project guidance for coding agents is in [`AGENTS.md`](./AGENTS.md). It sets project context and requires task-based skill routing: agents should check the available skills in [`.agents/skills/`](./.agents/skills/) and load the applicable `SKILL.md` before substantive work. The skills cover domain design and project technologies such as Clerk, Supabase, shadcn/ui, and Playwright. `AGENTS.md` also points agents to the requirements and architecture docs when changing relevant behavior.

The repository also includes [`.mcp.json`](./.mcp.json) with MCP connections for Supabase, Clerk, Vercel, and Playwright. Open the repository in a compatible coding agent and complete any provider authentication prompts. The Supabase connection is configured as read-only.

Use appropriately scoped credentials for external services, and never commit secrets or share them in prompts.

### Common commands

| Command | Description |
|---|---|
| `bun run build` | Build workspace applications and packages |
| `bun run lint` | Run workspace lint checks |
| `bun run typecheck` | Run TypeScript checks |
| `bun run format` | Format TypeScript and TSX files |

## Repository layout

```text
apps/
  web/                 Next.js application
packages/
  ui/                  Shared UI components and styles
  eslint-config/       Shared ESLint configuration
  typescript-config/   Shared TypeScript configuration
docs/                  Product, requirements, architecture, and domain documentation
```

## Project documentation

- [Project description](./docs/Project-Description.md) — goals, users, and MVP boundaries
- [Requirements](./docs/Requirements.md) — functional scope, acceptance criteria, and deferred work
- [Architecture](./docs/Architecture.md) — technology decisions, system boundaries, and open questions
- [Domain model](./docs/Domain-Model.md) — business scenarios, terminology, and proposed domain boundaries
