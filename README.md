# Product-Skills

> **Product-Skills is a lightweight AI coding harness for Product Managers and Business Analysts to turn business ideas into deployable React experiences while preserving a codebase developers can continue toward production.**

You describe the business outcome. Product-Skills gives an AI Coding Agent the skills, context, guardrails, tools, and verification needed to move from idea to a credible working product experience.

You do **not** need to understand MCP, Feature-Sliced Design, Supabase, Vercel, or agent internals before you start.

## 🧩 What Product-Skills gives your AI agent

Product-Skills is built around **six core skills**. Think of them as a small product-delivery team the coding agent can use when needed.

| Skill | What it helps with | Typical result |
| --- | --- | --- |
| 🧭 [`definition`](./skills/definition/) | Turn business intent into a buildable scope | Goal, actors, journey, rules, screens, acceptance criteria |
| 🎨 [`ux-ui`](./skills/ux-ui/) | Shape a usable product experience | Flow, hierarchy, states, responsive and accessibility direction |
| ⚛️ [`react`](./skills/react/) | Build the frontend | React + TypeScript implementation with clean architecture |
| 🗄️ [`supabase`](./skills/supabase/) | Add a real backend when it is useful | Auth, persistence, storage, RLS, migrations, data contracts |
| ✅ [`verify`](./skills/verify/) | Prove the product actually works | Type/lint/build/architecture checks + primary journey verification |
| 🚀 [`delivery`](./skills/delivery/) | Share and hand off the result | Verified preview, one Share URL, developer continuation notes |

The agent does not need to run every skill for every task. It selects the smallest useful path.

### How the skills work together

<p align="center">
  <img src="./docs/assets/default-flow.svg" alt="Default Product-Skills delivery flow" width="560" />
</p>

The default path is:

**Definition → UX/UI → React → Verify → Delivery**

**Supabase is optional.** It enters only when authentication, persistence, storage, shared data, or server-side behavior materially improves the requested experience.

For an existing product, the agent can also use `memory/FEATURES.md` to understand what already exists and classify requested changes as:

- **ADD** — a new capability;
- **CHANGE** — an existing capability changes behavior;
- **REMOVE** — a capability intentionally disappears;
- **NONE** — implementation/refactor only.

This helps prevent duplicate work and accidental restoration of intentionally removed product behavior.

## 🧭 System overview

<p align="center">
  <img src="./docs/assets/architecture-v2.svg" alt="Product-Skills architecture" width="560" />
</p>

- **PM / BA** provides business intent.
- **AI Coding Agent** performs the implementation work.
- **Product-Skills** supplies reusable skills, project context, guardrails, tools, and verification.
- **React + TypeScript + Vite** is the default greenfield frontend target.
- **Vercel** is the default preview/delivery target.
- **Supabase** is an optional backend accelerator.

The goal is not a throwaway prototype. The same repository should remain useful when developers take ownership and continue toward production.

## 🎯 What it helps you achieve

### Keep product intent visible

Goals, actors, rules, feature state, and acceptance criteria stay explicit so the agent does not silently invent important business behavior.

### Get better UX/UI than a generic generated screen

The agent reasons about the primary journey, loading/empty/error/success states, permissions, responsive behavior, and accessibility basics.

### Iterate without losing product context

Small project memory keeps verified facts, current capabilities, and durable decisions available across future changes without turning memory into a transcript archive.

### Verify before sharing

A successful build command is not treated as proof. Product-Skills checks both code quality and the primary user journey.

### Keep a path to production

The frontend, backend contracts, migrations, and project knowledge stay in the same repository so developers can continue rather than rebuild from scratch.

---

# 🚀 Getting started

You can start using Product-Skills without learning the internal harness first.

## What you need

At minimum:

- Git and a copy of this repository;
- an AI coding agent that can read repository instructions, edit files, and run project commands.

Product-Skills currently includes project configuration for **Claude Code, OpenAI Codex, and Cursor**. Other capable coding agents can use the same `AGENTS.md`, `skills/`, rules, and workflow conventions through their own project/tool mechanism.

Depending on your request, the agent may ask you to authorize:

- **Figma/design tools** — when a design is the source of truth;
- **GitHub** — when code must be pushed or a PR created;
- **Vercel** — when a shareable preview must be deployed;
- **Supabase** — when real backend behavior is required.

You do not need to connect unrelated services in advance.

## ⚡ Quick start

### 1. Create your working repository

Clone, fork, or use this repository as the starting point for your product work.

```bash
git clone https://github.com/Trinhduyet/Product-Skills.git
cd Product-Skills
```

If you use a fork or copied repository, replace the URL with your own project repository.

### 2. Open it in your AI coding agent

Open the repository root in Claude Code, Codex, Cursor, or another compatible coding agent.

The agent should read `AGENTS.md` first and load only the skill(s) relevant to the current task.

### 3. Describe the business outcome

Write a product request, not a technical implementation specification.

For example:

> Build a purchase-request application. Employees can create and submit requests. Managers can review, approve, or reject them. Make the main flow work on desktop and mobile. Use a backend only if it materially improves the experience, then deploy a shareable preview when the flow is verified.

If you have a Figma design, business rules, API specification, or existing repository constraints, include them in the request.

### 4. Approve only required connections

Before implementation, the agent determines which capabilities are required to complete the requested outcome.

```text
Figma URL in scope   → request design access first
GitHub push required → request GitHub access
Vercel preview       → request Vercel access
Real backend needed  → request Supabase access
```

The PM/BA should not need to inspect MCP settings manually.

### 5. Receive a verified result

A successful run should return:

- what was built;
- what was verified;
- one primary **Share URL** when a preview was requested;
- important blockers or deferred work;
- developer continuation notes when relevant.

## 🔄 What happens after your prompt

In practice, the agent moves through the skills as needed:

1. **Definition** — clarify goal, actors, primary journey, business rules, screens, and acceptance criteria.
2. **UX/UI** — establish hierarchy, important states, responsive behavior, and practical accessibility direction.
3. **React** — implement the shortest credible experience using the project engineering contract.
4. **Supabase, when needed** — add real backend behavior without making remote state the only source of truth.
5. **Verify** — run deterministic checks and exercise the primary user journey in the running app.
6. **Delivery** — publish a verified preview and report one stakeholder-facing Share URL.

If something fails, the loop is simply:

**Implement → Verify → Fix → Verify again**

## 🧠 Project context and memory

Product-Skills keeps memory intentionally small.

For a product project, the lightweight memory contract is:

```text
memory/
├── PROJECT.md    # verified project facts and local conventions
├── FEATURES.md   # current product capabilities, not a full changelog
└── DECISIONS.md  # durable product/technical decisions
```

Starter contracts live under [`templates/memory/`](./templates/memory/).

Cross-project mistakes and recoveries that should improve future Product-Skills runs belong in [`rules/lessons.md`](./rules/lessons.md), not in generated project memory.

## 🧱 Code developers can continue

<p align="center">
  <img src="./docs/assets/production-path.svg" alt="React production continuation path" width="560" />
</p>

For a simple greenfield screen, the continuation path is roughly:

**Page UI/model → shared API/auth infrastructure → Provider**

The provider can start with mock data, use Supabase, or later move to another backend without forcing a rewrite of route-level UI.

When Supabase is used, the repository should preserve durable backend assets such as migrations/SQL, RLS policies, database types, API/data contracts, server-side functions when used, and environment requirements.

This is what makes the output useful for developer continuation instead of a disposable POC.

## ✅ Quality gates

### `PREVIEW_READY`

Ready for stakeholder feedback when:

- the primary journey works;
- typecheck passes;
- lint passes with **0 warnings**;
- FSD architecture validation passes;
- build passes;
- desktop/mobile usage is credible;
- the preview is reachable when requested;
- the acceptance path has actually been exercised.

### `DEV_READY`

The same repository reaches a higher engineering bar with proportionate tests, reproducible backend/data setup, accurate environment documentation, stable FSD boundaries, and visible known debt.

`PREVIEW_READY` and `DEV_READY` are intentionally different gates.

---

# 🔧 Technical reference

The sections below explain the engineering contract behind the beginner workflow. You do not need to understand all of them before starting.

## 🧹 Engineering baseline

For a **greenfield React project**, Product-Skills uses:

- React;
- TypeScript strict mode;
- Vite;
- Tailwind CSS + shadcn/ui by default;
- ESLint with zero warnings;
- Feature-Sliced Design v2.1;
- Steiger architecture validation;
- deterministic scripts for `typecheck`, `lint`, `architecture`, and `build`;
- pnpm when no package manager has already been selected.

For an **existing repository**, preserve its established stack and architecture unless migration is explicitly requested or required for safe delivery.

## 🧱 Feature-Sliced Design, without folder ceremony

Product-Skills follows the FSD v2.1 principle: **start simple, extract when needed**.

A greenfield interface starts with:

```text
src/
├── app/       # providers, routing, initialization
├── pages/     # route-level composition + single-use product logic
└── shared/    # reusable infrastructure only
    ├── api/
    ├── auth/
    ├── config/
    ├── lib/
    └── ui/
```

Add only when current reuse justifies them:

```text
features/     # reusable user interactions
entities/     # reusable domain models
widgets/      # discouraged; not a default layer
```

Important rules:

- imports flow downward: **app → pages → widgets → features → entities → shared**;
- slices expose public APIs through `index.ts`;
- business logic does not belong in `shared/`;
- generic transport/CRUD infrastructure belongs in `shared/api`;
- auth/session infrastructure belongs in `shared/auth`;
- single-use product behavior stays in its page until real reuse exists;
- `processes/` is deprecated.

The normal architecture gate is:

```text
steiger src
```

Reference: [Feature-Sliced Design v2.1 skill](https://www.skills.sh/feature-sliced/skills/feature-sliced-design).

## 🛠 Tools & MCP

The human-facing rule is simple:

> **The coding agent owns capability setup. PM/BA users should not need to understand MCP configuration.**

Local deterministic tools are preferred for filesystem, shell, Git, package-manager commands, project checks, and browser verification.

Remote integrations are used when the requested outcome needs remote state or actions:

- **GitHub MCP** — repository, PR, issue, and remote source-control work;
- **Vercel MCP** — preview/deployment state and logs;
- **Supabase MCP** — optional backend/database context and supported actions;
- task-specific integrations such as Figma when required.

Project-scoped configuration currently exists for:

- **Claude Code:** [`.mcp.json`](./.mcp.json)
- **OpenAI Codex:** [`.codex/config.toml`](./.codex/config.toml)
- **Cursor:** [`.cursor/mcp.json`](./.cursor/mcp.json)

Prefer OAuth where supported. Never commit access tokens, service-role keys, or privileged credentials.

See [`docs/TOOLS-AND-MCP.md`](./docs/TOOLS-AND-MCP.md).

## 🤖 Runtime compatibility

The canonical harness is runtime-agnostic.

A coding agent can use Product-Skills when it can reasonably:

- read repository instructions and relevant skills;
- inspect and edit files;
- run project commands;
- use the tools required by the task;
- preserve project state in the repository.

**Preconfigured today:** Claude Code, OpenAI Codex, Cursor.  
**Also usable:** ChatGPT with repository context/connectors and other capable agents through their own native project/tool configuration.

See [`docs/RUNTIME-COMPATIBILITY.md`](./docs/RUNTIME-COMPATIBILITY.md).

## 📦 Package manager policy

Product-Skills does not force every project onto the same package manager.

1. Existing repository → respect `packageManager` metadata or existing lockfile.
2. Greenfield with no selected manager → prefer **pnpm**.
3. npm and yarn remain supported.

The harness should not migrate package managers during unrelated work.

## 🗂 Repository map

- `README.md` — human entry point
- `AGENTS.md` — coding-agent map, workflow, guardrails, and invariants
- `skills/` — canonical reusable capabilities
- `workflows/` — short execution recipes
- `subagents/` — optional isolated role contracts
- `memory/` — memory for this Product-Skills repository itself
- `templates/memory/` — starter memory contract for product projects
- `rules/` — engineering, security, delivery invariants, and cross-project lessons
- `hooks/` — deterministic safety and ship checks
- `scripts/` — validation/setup utilities
- `templates/` — reusable starter contracts
- `.mcp.json` — Claude Code project MCP configuration
- `.codex/config.toml` — Codex project/MCP configuration
- `.cursor/mcp.json` — Cursor MCP configuration
- `docs/` — deeper architecture, runtime, and tool documentation

`skills/` remains the canonical skill source. Runtime-specific configuration must stay thin and must not duplicate shared skill bodies.

## 📚 Deeper docs

- [`docs/HARNESS-ENGINEERING.md`](./docs/HARNESS-ENGINEERING.md) — model vs harness, context, memory, subagents, verification
- [`docs/TOOLS-AND-MCP.md`](./docs/TOOLS-AND-MCP.md) — capability bootstrap, tools, OAuth, approvals, MCP policy
- [`docs/RUNTIME-COMPATIBILITY.md`](./docs/RUNTIME-COMPATIBILITY.md) — compatible coding runtimes and repository configuration
- [Feature-Sliced Design v2.1 skill](https://www.skills.sh/feature-sliced/skills/feature-sliced-design) — frontend architecture reference

## Principles

- **Start from business intent, not implementation ceremony.**
- **Skills are selected by need, not run as mandatory ceremony.**
- **Speed is a feature.** Harness mechanisms must earn their latency.
- **The coding agent owns capability setup for non-technical users.**
- **Required capabilities are resolved before implementation.**
- **Feature-Sliced Design v2.1 is mandatory for greenfield React.**
- **Start simple, extract when needed.**
- **Verified evidence beats agent confidence.**
- **Keep context and memory small.**
- **Do not abstract before the problem requires it.**
- **The same repository should have a credible path from first preview to production.**

## License

MIT
