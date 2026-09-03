# Product-Skills

> **Product-Skills is a lightweight AI coding harness for Product Managers and Business Analysts to turn business ideas into deployable React experiences while preserving a codebase developers can continue toward production.**

You describe the business outcome. Product-Skills gives an AI Coding Agent reusable **skills** plus a lightweight **harness** that helps it choose the right context, tools, guardrails, and verification for the task.

You do **not** need to understand MCP, Feature-Sliced Design, Supabase, Vercel, or agent internals before you start.

## Contents

- [Core skills](#-core-skills)
- [What the harness adds](#-what-the-harness-adds)
- [What Product-Skills helps you achieve](#-what-product-skills-helps-you-achieve)
- [Installation](#-installation)
  - [New product](#new-product--recommended)
  - [Existing product](#existing-product)
  - [Claude Code](#claude-code)
  - [OpenAI Codex](#openai-codex)
  - [Cursor](#cursor)
  - [Other coding agents](#other-coding-agents)
- [Using Product-Skills](#-using-product-skills)
- [Project context and memory](#-project-context-and-memory)
- [Quality gates](#-quality-gates)
- [Technical reference](#-technical-reference)

## 🧩 Core skills

The `skills/` directory is the reusable capability library. Each skill has a focused job and can be used independently when the task needs it.

| Skill | What it helps with | Typical result |
| --- | --- | --- |
| 🧭 [`definition`](./skills/definition/) | Turn business intent into buildable scope | Goal, actors, journey, rules, screens, acceptance criteria |
| 🎨 [`ux-ui`](./skills/ux-ui/) | Shape a usable product experience | Flow, hierarchy, states, responsive and accessibility direction |
| ⚛️ [`react`](./skills/react/) | Build the frontend | React + TypeScript implementation with clean architecture |
| 🗄️ [`supabase`](./skills/supabase/) | Add a real backend when useful | Auth, persistence, storage, RLS, migrations, data contracts |
| ✅ [`verify`](./skills/verify/) | Prove the product actually works | Type/lint/build/architecture checks + primary journey verification |
| 🚀 [`delivery`](./skills/delivery/) | Share and hand off the result | Verified preview, one Share URL, developer continuation notes |

The agent does not need to run every skill for every task.

A common delivery path is:

<p align="center">
  <img src="./docs/assets/default-flow.svg" alt="Default Product-Skills delivery flow" width="560" />
</p>

**Definition → UX/UI → React → Verify → Delivery**

**Supabase is optional.** It enters only when authentication, persistence, storage, shared data, or server-side behavior materially improves the requested experience.

For an existing product, the agent can also use `memory/FEATURES.md` to classify requested behavior changes as:

- **ADD** — new capability;
- **CHANGE** — existing capability changes behavior;
- **REMOVE** — capability intentionally disappears;
- **NONE** — implementation/refactor only.

This helps prevent duplicate work and accidental restoration of intentionally removed behavior.

## 🧰 What the harness adds

Skills are the reusable capabilities. The **harness is the surrounding execution layer** that helps an AI Coding Agent apply those capabilities consistently inside a real repository.

The harness includes:

- `AGENTS.md` — shared instructions and task-routing rules;
- `rules/` — engineering, security, and delivery invariants;
- `memory/` — small verified project context;
- `workflows/` — short execution recipes;
- `subagents/` — optional isolated roles when they add value;
- tool/MCP configuration — only for capabilities required by the task;
- hooks/scripts — deterministic checks;
- verification — evidence before claiming success.

A useful mental model is:

```text
AI Coding Agent
      │
      ├── selects relevant skills
      ├── loads small project context
      ├── uses required tools
      ├── follows guardrails
      └── verifies the result
```

The harness is **not** a separate product architecture and it is not a `harness/` folder. It is the repository behavior around the agent.

## 🎯 What Product-Skills helps you achieve

### Keep product intent visible

Goals, actors, rules, feature state, and acceptance criteria stay explicit so the agent does not silently invent important business behavior.

### Get better UX/UI than a generic generated screen

The agent reasons about the primary journey, important states, responsive behavior, permissions, and accessibility basics.

### Iterate without losing product context

Small project memory keeps verified facts, current capabilities, and durable decisions available across future changes without becoming a transcript archive.

### Verify before sharing

A successful build command is not treated as proof. Product-Skills checks code quality and the primary user journey.

### Keep a path to production

Frontend code, backend contracts, migrations, and product knowledge stay in the same repository so developers can continue instead of rebuilding from scratch.

---

# 📦 Installation

Product-Skills is currently a **repository-based coding harness**, not a package or marketplace plugin. Installation means putting the harness files in the repository where your AI coding agent will work.

## New product — recommended

Start from Product-Skills, then use that checkout as the product workspace:

```bash
git clone https://github.com/Trinhduyet/Product-Skills.git my-product
cd my-product
```

Point the Git remote at your own product repository before shipping product code:

```bash
git remote rename origin product-skills-source
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

This keeps Product-Skills available as an optional upstream reference while your own repository becomes the product source of truth.

If you prefer GitHub UI, you can fork/copy the repository first and then clone your own copy.

## Existing product

If you already have a codebase, **do not replace its architecture just to install Product-Skills**.

Adopt the harness around the existing project. Bring in the reusable areas you need:

```text
AGENTS.md
skills/
rules/
workflows/
subagents/        # optional
templates/memory/
hooks/            # optional deterministic harness checks
scripts/          # optional validation helpers
```

Then add only the runtime-specific configuration for the coding agent you use, for example `.cursor/`, `.codex/`, `.mcp.json`, or `CLAUDE.md`.

Do **not** blindly copy Product-Skills' root `memory/` into another product. That memory describes this repository. Initialize the target project's own memory from [`templates/memory/`](./templates/memory/):

```text
memory/
├── PROJECT.md
├── FEATURES.md
└── DECISIONS.md
```

The existing project's stack, package manager, and architecture remain authoritative unless you explicitly request a migration.

## Claude Code

Product-Skills includes `CLAUDE.md`, `.claude/`, and root [`.mcp.json`](./.mcp.json).

From the repository root:

```bash
claude
```

Then describe the business outcome. Claude Code should follow the shared contract in `AGENTS.md` and load relevant files from `skills/`.

If the task needs GitHub, Vercel, Supabase, Figma, or another remote capability, authorize it when the agent requests it. You do not need to connect unrelated services first.

## OpenAI Codex

Product-Skills includes `AGENTS.md` and [`.codex/config.toml`](./.codex/config.toml).

Open the repository in Codex or start Codex CLI from the repository root:

```bash
codex
```

Give Codex the product request directly. `AGENTS.md` is the shared harness contract; Codex should load only the relevant skill files for the task.

## Cursor

Product-Skills includes `AGENTS.md` and [`.cursor/mcp.json`](./.cursor/mcp.json).

1. Open the repository folder in Cursor.
2. Open **Agent** chat.
3. Give it the product request.
4. Approve only the external connections required by that request.

Cursor should follow `AGENTS.md` and use `skills/` as the canonical skill source.

## Other coding agents

A runtime can use Product-Skills when it can reasonably:

- read repository instructions and Markdown skill files;
- inspect and edit project files;
- run project commands;
- access tools required by the task;
- preserve changes in the repository.

Use `AGENTS.md` as the main entry point and `/skills` as the canonical capability library. Add only thin runtime-specific configuration; do not duplicate the skill bodies.

See [`docs/RUNTIME-COMPATIBILITY.md`](./docs/RUNTIME-COMPATIBILITY.md).

---

# 🚀 Using Product-Skills

After installation, use Product-Skills by **asking for a product outcome**, not by manually calling individual skills.

## Your first request

For example:

> Build a purchase-request application. Employees can create and submit requests. Managers can review, approve, or reject them. Make the main flow work on desktop and mobile. Use a backend only if it materially improves the experience, then deploy a shareable preview when the flow is verified.

That is enough to start.

If useful context already exists, attach or mention it:

- Figma/design URL;
- business rules;
- acceptance criteria;
- API/OpenAPI specification;
- existing repository constraints;
- screenshots or reference products.

Do not write an implementation blueprint unless you actually want to constrain the implementation.

## What the agent should do

Before coding, the agent should determine which capabilities are required by the requested outcome:

```text
Figma URL in scope   → request design access first
GitHub push required → request GitHub access
Vercel preview       → request Vercel access
Real backend needed  → request Supabase access
```

You should not need to inspect MCP configuration manually.

The agent then selects the relevant skills, loads only useful context, builds the shortest credible experience, verifies it, and reports the result.

## What you should receive

A successful delivery should include:

- what was built;
- what was verified;
- one primary **Share URL** when preview deployment was requested;
- important blockers or deferred work;
- developer continuation notes when relevant.

A successful build command alone is not enough to claim the product is ready for feedback.

## Continuing an existing product

You can ask for product changes in normal business language:

> Add duplicate preset to Settings Presets.

> Change sign-up so only invited users can create an account.

> Remove public sign-up and keep existing sign-in behavior.

When `memory/FEATURES.md` exists, the agent should read the current capability inventory first, determine whether the request is `ADD`, `CHANGE`, `REMOVE`, or `NONE`, implement it, verify it, and update the inventory to the new current truth.

Git remains the detailed history; `FEATURES.md` is the current capability map, not a changelog.

## 🔄 Typical execution flow

In practice, the agent selects the skills it needs:

1. **Definition** — clarify goal, actors, primary journey, business rules, screens, and acceptance criteria.
2. **UX/UI** — establish hierarchy, important states, responsive behavior, and practical accessibility direction.
3. **React** — implement the shortest credible experience.
4. **Supabase, when needed** — add real backend behavior while preserving reproducible source-controlled artifacts.
5. **Verify** — run deterministic checks and exercise the primary journey.
6. **Delivery** — publish a verified preview and report one stakeholder-facing Share URL.

If something fails:

**Implement → Verify → Fix → Verify again**

## 🧠 Project context and memory

Product-Skills keeps project memory intentionally small:

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

When Supabase is used, preserve durable backend assets such as migrations/SQL, RLS policies, database types, API/data contracts, server-side functions when used, and environment requirements.

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

The sections below explain the implementation contract behind the beginner workflow. You do not need to understand all of them before starting.

## 🧭 Harness architecture

<p align="center">
  <img src="./docs/assets/architecture-v2.svg" alt="Product-Skills harness architecture" width="560" />
</p>

This diagram describes the **delivery context around the AI Coding Agent**, not a product system architecture.

- PM/BA supplies business intent.
- The AI Coding Agent performs the implementation work.
- Product-Skills provides reusable skills plus harness instructions, context, guardrails, tools, and verification.
- React + TypeScript + Vite is the default greenfield frontend target.
- Vercel is the default preview/delivery target.
- Supabase is an optional backend accelerator.

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

Remote integrations are used only when the requested outcome needs remote state or actions:

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

The canonical skills and harness rules are runtime-agnostic.

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
- `AGENTS.md` — shared harness instructions, workflow, guardrails, and invariants
- `skills/` — canonical reusable capabilities
- `workflows/` — short execution recipes
- `subagents/` — optional isolated role contracts
- `memory/` — memory for this Product-Skills repository itself
- `templates/memory/` — starter memory contract for product projects
- `rules/` — engineering, security, delivery invariants, and cross-project lessons
- `hooks/` — deterministic safety and ship checks
- `scripts/` — validation/setup utilities
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

- **Skills are reusable capabilities; the harness is the execution layer around the agent.**
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
