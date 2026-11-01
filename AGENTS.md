# EuroTender agent instructions

## Project context

- Read [Requirements](docs/Requirements.md) for scope and [Architecture](docs/Architecture.md) for accepted decisions and open questions before changing relevant behavior or design.
- Preserve the distinction between an organization (paying customer) and a company (tender participant). Do not resolve documented open questions by assumption.
- Keep domain rules independent of frameworks and vendors. The accepted AI approach uses durable workflows, reusable tender analysis, and deterministic company eligibility checks.

## Required skill routing

Before substantive analysis, advice, planning, or edits, match the task against the installed skills in [.agents/skills](.agents/skills). Skill use is required when the task matches, even if the user does not name the skill.

1. Use the agent's skill-loading mechanism to load each applicable skill. If the host cannot load repository skills, read its `SKILL.md` directly and follow it; report any unavailable files or required capabilities rather than claiming the skill was used.
2. Read the relevant referenced guides when the skill calls for them. Load only skills relevant to the task, not the entire catalog.
3. Match both the prompt and the actual work discovered during investigation. Load additional skills before crossing into a new domain or technology.
4. Apply domain and technology skills together when both match. Skills guide the work; they do not authorize new scope, paid services, account changes, or resolution of open product decisions.
5. In the completion summary, briefly identify the skills applied and any verification or capability limitations.

### Domain design skills

| Task | Required skill |
|---|---|
| Architecture involving business boundaries, domain rules, entities/value objects, aggregates, domain events, or module responsibilities | [domain-driven-design](.agents/skills/domain-driven-design/SKILL.md) |
| Defining or changing domain terminology and relationships, maintaining a glossary, or recording architecture decisions | [domain-modeling](.agents/skills/domain-modeling/SKILL.md) |

Use both for domain architecture/modeling work. Routine UI styling, dependency maintenance, or spelling fixes do not require domain skills unless they change the model. Consult an existing glossary/context map when present; capture resolved vocabulary and qualifying decisions according to the skills, without inventing terminology or generating empty documentation.

### Technology skills

| Task | Required skill(s) |
|---|---|
| Clerk authentication or integration work | [clerk](.agents/skills/clerk/SKILL.md), then the applicable installed specialist below |
| Adding or migrating Clerk authentication | [clerk-setup](.agents/skills/clerk-setup/SKILL.md) |
| Clerk organization membership, invitations, roles, permissions, or tenant access | [clerk-orgs](.agents/skills/clerk-orgs/SKILL.md) |
| Clerk with Next.js middleware, server actions, server/client boundaries, or authenticated caching | [clerk-nextjs-patterns](.agents/skills/clerk-nextjs-patterns/SKILL.md) |
| Clerk subscriptions, payments, pricing, plans, or feature entitlements | [clerk-billing](.agents/skills/clerk-billing/SKILL.md) |
| Clerk webhook verification or user/organization/billing synchronization | [clerk-webhooks](.agents/skills/clerk-webhooks/SKILL.md) |
| Clerk CLI operations, instance configuration, impersonation, or ad-hoc API requests | [clerk-cli](.agents/skills/clerk-cli/SKILL.md) |
| Clerk Backend REST API exploration or execution | [clerk-backend-api](.agents/skills/clerk-backend-api/SKILL.md); prefer the CLI where its skill directs |
| Authenticated Clerk end-to-end testing | [clerk-testing](.agents/skills/clerk-testing/SKILL.md), plus the applicable browser-testing skill |
| Any Supabase design, implementation, troubleshooting, or operations | [supabase](.agents/skills/supabase/SKILL.md) |
| Postgres schema, SQL, migrations, RLS, indexes, query performance, or database-backed queues | [supabase-postgres-best-practices](.agents/skills/supabase-postgres-best-practices/SKILL.md), plus `supabase` when applicable |
| shadcn/ui components, forms, styling, composition, or design system work | [shadcn](.agents/skills/shadcn/SKILL.md) |
| Browser automation or Playwright testing | [playwright-cli](.agents/skills/playwright-cli/SKILL.md) |

This table is a routing aid, not a closed list. For newly installed skills, read their `SKILL.md` descriptions and apply matching skills even before the table is updated. Do not assume a skill exists just because a technology is in the architecture; use current official documentation when no matching skill is installed.

Next.js-specific work must also follow the installed version's documentation as described below. Skills do not replace version checks or current vendor documentation.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
