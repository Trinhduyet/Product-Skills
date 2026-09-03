# Product-Skills

> **Product-Skills is a lightweight AI coding harness for Product Managers and Business Analysts to turn business ideas into deployable React experiences while preserving a codebase developers can continue toward production.**

You describe the business outcome. Your AI Coding Agent does the implementation work. Product-Skills gives it reusable skills plus a lightweight repository harness for context, guardrails, tools, memory, and verification.

You do **not** need to understand MCP, Feature-Sliced Design, Supabase, Vercel, or agent internals before you start.

## What this repo is

Product-Skills is designed for a simple handoff:

```text
Business idea
    ↓
AI Coding Agent + Product-Skills
    ↓
Working React experience
    ↓
Verified preview
    ↓
Same repository continues toward production
```

It is:

- a small library of reusable product-delivery **skills**;
- a lightweight **coding harness** around an AI agent;
- a set of repository conventions for project context, safety, and verification;
- a starter path for new React products and an adoptable layer for existing repositories.

It is **not**:

- a React framework;
- a generic skills marketplace;
- an MCP server;
- a replacement for your coding agent;
- a requirement to migrate an existing project's architecture.

## Core skills

The [`skills/`](./skills/) directory contains reusable capabilities. Each skill has a focused job and can be used independently when relevant.

| Skill | Purpose | Typical output |
| --- | --- | --- |
| [`definition`](./skills/definition/) | Turn business intent into buildable scope | Goal, actors, journey, rules, screens, acceptance criteria |
| [`ux-ui`](./skills/ux-ui/) | Shape the user experience | Flow, hierarchy, states, responsive/accessibility direction |
| [`react`](./skills/react/) | Build the frontend | React + TypeScript implementation with a continuation-friendly structure |
| [`supabase`](./skills/supabase/) | Add a backend when useful | Auth, persistence, storage, RLS, migrations, data contracts |
| [`verify`](./skills/verify/) | Prove the product works | Deterministic checks + primary journey verification |
| [`delivery`](./skills/delivery/) | Share and hand off the result | Verified preview, one Share URL, continuation notes |

A common path is:

<p align="center">
  <img src="./docs/assets/default-flow.svg" alt="Default Product-Skills delivery flow" width="560" />
</p>

**Definition → UX/UI → React → Verify → Delivery**

`supabase` is optional. The agent should use only the skills the task actually needs.

## Skills, harness, tools, and runtime

These are related, but they are not the same thing.

| Layer | Role | In this repo |
| --- | --- | --- |
| **Skills** | Teach the agent how to perform a class of work | `skills/` |
| **Harness** | Controls context, workflow, memory, guardrails, and verification | `AGENTS.md`, `rules/`, `memory/`, `workflows/`, hooks/scripts |
| **Tools / MCP** | Give the agent access to external systems and actions | GitHub, Vercel, Supabase, Figma when required |
| **Runtime** | The coding agent that reads instructions and executes work | Claude Code, Codex, Cursor, or another compatible agent |

Skills define **how to work**. Tools provide **what the agent can act on**. The harness decides **how those capabilities are applied consistently inside the repository**.

---

# Installation

Product-Skills is currently **repository-based**, not a package or marketplace plugin. Install it by making the harness part of the repository where your coding agent works.

## New product — recommended

Clone Product-Skills as the starting workspace:

```bash
git clone https://github.com/Trinhduyet/Product-Skills.git my-product
cd my-product
```

Then point `origin` at your own product repository:

```bash
git remote rename origin product-skills-source
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

You can also fork/copy the repository first and clone your own copy.

## Existing product

Do **not** replace an established architecture just to adopt Product-Skills.

Bring the harness into the existing repository around the current codebase:

```text
AGENTS.md
skills/
rules/
workflows/
templates/memory/
subagents/    # optional
hooks/        # optional
scripts/      # optional
```

Add only the runtime-specific files for the coding agent you use.

Do not copy Product-Skills' root `memory/` into another product. Initialize that product's own memory from [`templates/memory/`](./templates/memory/):

```text
memory/
├── PROJECT.md
├── FEATURES.md
└── DECISIONS.md
```

The existing project's stack, package manager, and architecture remain authoritative unless you explicitly request a migration.

## Start your coding agent

Product-Skills currently includes thin repository configuration for these runtimes:

| Runtime | Entry point |
| --- | --- |
| **Claude Code** | `CLAUDE.md`, `.claude/`, `.mcp.json` |
| **OpenAI Codex** | `AGENTS.md`, `.codex/config.toml` |
| **Cursor** | `AGENTS.md`, `.cursor/mcp.json` |
| **Other compatible agents** | Use `AGENTS.md` + `skills/` through the runtime's native project/tool mechanism |

For CLI runtimes, start from the repository root as usual, for example:

```bash
claude
# or
codex
```

For Cursor, open the repository and use Agent chat.

See [`docs/RUNTIME-COMPATIBILITY.md`](./docs/RUNTIME-COMPATIBILITY.md) for the runtime contract.

---

# Using Product-Skills

You normally use Product-Skills by asking for a **product outcome**, not by manually invoking individual skills.

## Your first request

For example:

> Build a purchase-request application. Employees can create and submit requests. Managers can review, approve, or reject them. Make the main flow work on desktop and mobile. Use a backend only if it materially improves the experience, then deploy a shareable preview when the flow is verified.

That is enough to start.

Include existing context when it matters: Figma/design links, business rules, acceptance criteria, API specs, screenshots, or repository constraints.

## What the agent should do

Before implementation, the agent should determine which capabilities are actually required:

```text
Figma source required → request design access
GitHub push required  → request GitHub access
Vercel preview needed → request Vercel access
Real backend needed   → request Supabase access
```

PM/BA users should not need to inspect MCP settings or pre-connect unrelated services.

Then the agent should:

1. load only relevant project context and skills;
2. resolve blocking business ambiguity;
3. implement the shortest credible experience;
4. verify deterministic quality gates;
5. exercise the primary user journey;
6. deliver a concise result.

If verification fails: **fix → verify again**.

## What you should receive

A successful delivery should tell you:

- what was built;
- what was verified;
- one primary **Share URL** when preview deployment was requested;
- important blockers or deferred work;
- developer continuation notes when relevant.

A successful build command alone is not proof that the product journey works.

## Continuing an existing product

Ask for changes in normal business language:

> Add duplicate preset to Settings Presets.

> Change sign-up so only invited users can create an account.

> Remove public sign-up and keep existing sign-in behavior.

When `memory/FEATURES.md` exists, the agent should use it as the current capability map and classify the requested delta as:

- **ADD** — new capability;
- **CHANGE** — existing capability changes behavior;
- **REMOVE** — capability intentionally disappears;
- **NONE** — implementation/refactor only.

After verification, the inventory should reflect the new current truth. Git remains the detailed changelog.

## Project memory

Product memory stays intentionally small:

```text
memory/
├── PROJECT.md    # verified project facts and conventions
├── FEATURES.md   # current product capabilities
└── DECISIONS.md  # durable product/technical decisions
```

Cross-project lessons belong in [`rules/lessons.md`](./rules/lessons.md), not in generated product memory.

## Delivery gates

### `PREVIEW_READY`

Ready for stakeholder feedback when the primary journey works and the relevant deterministic checks pass. For greenfield React, this normally includes warning-free lint, typecheck, architecture validation, build, responsive smoke checks, and an exercised acceptance path.

### `DEV_READY`

A higher bar for developer continuation: stable boundaries, proportionate tests, reproducible backend/data setup, accurate environment documentation, and visible known debt.

`PREVIEW_READY` and `DEV_READY` are intentionally different.

## Developer continuation

<p align="center">
  <img src="./docs/assets/production-path.svg" alt="React production continuation path" width="560" />
</p>

The goal is not a disposable prototype. Product code, migrations, API/data contracts, environment requirements, and useful project knowledge stay in the same repository so a development team can continue from the verified preview.

---

# Technical reference

You do not need this section to get started. It explains the implementation contract behind the workflow above.

## Harness architecture

<p align="center">
  <img src="./docs/assets/architecture-v2.svg" alt="Product-Skills harness architecture" width="560" />
</p>

This diagram describes the **delivery context around the AI Coding Agent**, not a product-system architecture.

The harness is the repository behavior around the agent: instructions, selected skills, small context, project memory, tools, guardrails, optional subagents, execution loops, and verification.

## Greenfield engineering baseline

The default greenfield frontend target is React + TypeScript + Vite. Product-Skills uses strict TypeScript, warning-free lint, Feature-Sliced Design v2.1, Steiger architecture validation, and deterministic `typecheck`, `lint`, `architecture`, and `build` gates.

FSD follows **start simple, extract when needed**: begin with `app/`, `pages/`, and `shared/`; add `features/` or `entities/` only when real reuse justifies them.

Existing repositories keep their established stack and architecture unless migration is explicitly requested.

See:

- [`skills/react/SKILL.md`](./skills/react/SKILL.md) — React/FSD implementation contract;
- [`rules/engineering.md`](./rules/engineering.md) — engineering invariants;
- [Feature-Sliced Design v2.1 skill](https://www.skills.sh/feature-sliced/skills/feature-sliced-design) — architecture reference.

## Tools and MCP

Local deterministic tools come first. Remote integrations are selected from the requested outcome.

Product-Skills preconfigures GitHub, Vercel, and Supabase where supported, while task-specific capabilities such as Figma can be connected through the runtime's native mechanism.

Prefer OAuth where supported. Never commit access tokens, service-role keys, or privileged credentials.

See [`docs/TOOLS-AND-MCP.md`](./docs/TOOLS-AND-MCP.md).

## Repository map

```text
AGENTS.md           shared harness instructions
skills/             reusable capabilities
rules/              engineering/security/delivery invariants
workflows/          short execution recipes
subagents/          optional isolated roles
memory/             memory for this Product-Skills repository
templates/memory/   starter memory for product repositories
hooks/              deterministic safety/ship checks
scripts/            validation helpers
docs/               deeper reference documentation
```

Runtime-specific configuration stays thin. `skills/` remains the canonical capability source.

## Deeper docs

- [`docs/HARNESS-ENGINEERING.md`](./docs/HARNESS-ENGINEERING.md) — harness, context, memory, subagents, verification
- [`docs/TOOLS-AND-MCP.md`](./docs/TOOLS-AND-MCP.md) — capability bootstrap, tools, OAuth, approvals, MCP policy
- [`docs/RUNTIME-COMPATIBILITY.md`](./docs/RUNTIME-COMPATIBILITY.md) — compatible coding runtimes and repository configuration

## Principles

- Start from business intent, not implementation ceremony.
- Skills are reusable capabilities; the harness is the execution layer around them.
- Use only the context, skills, tools, and subagents the task needs.
- The coding agent owns capability setup for non-technical users.
- Verify evidence before claiming success.
- Start simple; add architecture only when complexity or reuse earns it.
- Keep the same repository useful from first preview through developer continuation.

## License

MIT
