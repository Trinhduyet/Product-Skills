# Product-Skills

> **Product-Skills is a lightweight AI coding harness for Product Managers and Business Analysts to turn business ideas into deployable React POCs while preserving a codebase developers can continue toward production.**

Product-Skills adds just enough **product definition, UX/UI guidance, engineering conventions, context discipline, tools, and verification** around AI coding agents such as **ChatGPT, Claude Code, Codex, and Cursor**.

The goal is simple: **describe a business workflow, get a credible React experience online quickly, then keep building from the same repository.**

## 🧭 System overview

<p align="center">
  <img src="./docs/assets/architecture.svg" alt="Product-Skills architecture" width="100%" />
</p>

The main path is intentionally short:

**PM / BA intent → AI Coding Agent → React + Vite → Vercel preview**

Product-Skills sits around that path and supplies only the guidance and tools needed for the current task.

## 🎯 What it solves

### 🧭 Keep product intent visible
Goal, actors, business rules, and the acceptance path stay explicit so the agent does not silently invent important behavior.

### 🎨 Improve UX/UI output
The agent reasons about the main user journey, important states, responsive behavior, and accessibility basics instead of producing generic screens.

### 🧱 Preserve a production path
Generated React stays feature-oriented, typed, and separated from its data provider so developers can continue the same repository.

### ✅ Verify before sharing
A successful build is not treated as proof. The main user journey must actually work in the running application.

### ⚡ Stay fast
Extra review, subagents, data infrastructure, and hardening are conditional. Straightforward work should remain straightforward.

## ⚡ Default flow

**① Definition → ② UX/UI → ③ React → ④ Verify → ⑤ Delivery**

Use **Supabase only when persistence, authentication, storage, or realistic shared data is needed**.

Repository exploration, deeper review, debugging, and hardening are also activated only when they reduce real risk.

## 🧩 Six core skills

### 🧭 [`definition`](./skills/definition/)
Turns business intent into the minimum buildable definition: goal, actors, journey, rules, screens, and acceptance criteria.

### 🎨 [`ux-ui`](./skills/ux-ui/)
Defines flow, hierarchy, states, responsive behavior, and practical accessibility direction.

### ⚛️ [`react`](./skills/react/)
Builds maintainable React with simple feature boundaries and reusable UI primitives.

### 🗄️ [`supabase`](./skills/supabase/)
Adds persistence/auth/storage only when needed, with reproducible migrations and safe client boundaries.

### ✅ [`verify`](./skills/verify/)
Runs deterministic checks and proves the primary user journey in the running application.

### 🚀 [`delivery`](./skills/delivery/)
Publishes a verified preview to Vercel and later raises the same repository to developer-ready quality.

Skills are intentionally broad: **split by independent reuse, not conceptual purity.**

## 🔌 Tools & MCP

**Rule: local deterministic tools first; MCP for remote state and remote actions.**

- 📁 **Filesystem / shell** — native coding-agent tools
- 🌿 **Git** — local diff, status, commit, history
- 📦 **Node / npm** — install, typecheck, lint, test, build
- 🌐 **Browser verification** — Playwright CLI when available
- 🗃️ **Supabase CLI** — migrations and reproducible schema work
- 🐙 **GitHub MCP** — repository, PR, issue, and remote state
- ▲ **Vercel MCP** — projects, deployments, preview state, and logs
- 🟢 **Supabase MCP** — remote database/docs/debugging context, read-only by default

Project-scoped MCP configuration is committed for supported coding runtimes:

- **Claude Code:** [`.mcp.json`](./.mcp.json)
- **OpenAI Codex:** [`.codex/config.toml`](./.codex/config.toml)
- **Cursor:** [`.cursor/mcp.json`](./.cursor/mcp.json)
- **ChatGPT:** remote capabilities use Plugins/Connectors/Work rather than repository-local MCP files

Authentication uses OAuth where supported. **Tokens and privileged credentials must never be committed.**

See [`docs/TOOLS-AND-MCP.md`](./docs/TOOLS-AND-MCP.md).

## 🧱 Code developers can continue

For greenfield interfaces, use a small feature-based React structure:

- `src/app/` — app shell, routing, providers
- `src/components/ui/` — shared UI primitives
- `src/features/<feature>/` — feature UI, hooks, schemas, types, and data access
- `src/config/` — environment/application configuration
- `src/lib/` — shared infrastructure helpers
- `src/testing/` — test utilities and fixtures

Create only the folders a feature actually needs.

The important production seam is:

**Component → Feature Hook → Feature API → Provider**

The provider can evolve without rewriting the UI:

**Mock data → Supabase → dedicated HTTP API/backend**

This is the key reason a fast first version can remain useful to the developer team.

## 🎨 UX/UI baseline

Before implementation, make the **primary journey** clear and identify the states that materially affect it:

- loading
- empty
- validation
- error
- success
- permissions
- confirmation when needed

For a greenfield business interface, the default visual stack is:

**React · TypeScript · Vite · Tailwind CSS · shadcn/ui**

Use the existing stack and design language when working inside an established repository.

Responsive smoke targets: **375 · 768 · 1024 · 1440**.

## 🧠 How the harness stays fast

The harness is the repository behavior as a whole — **instructions, skills, context, memory, tools, guardrails, verification, and conditional subagents**. It is not a `harness/` directory.

### Small context
A normal task gets only what it needs: `AGENTS.md`, current product/UI notes, verified project facts, the relevant skill, and relevant feature files.

### Small memory
- `memory/PROJECT.md` — verified project facts and conventions
- `memory/DECISIONS.md` — durable technical/product decisions
- `memory/LESSONS.md` — verified mistakes worth preventing again

Memory is not a transcript archive.

### Conditional subagents
- 🔎 **explorer** — unfamiliar repository or pattern search
- 👀 **reviewer** — large, risky, or cross-feature change
- ✅ **verifier** — independent proof of the main acceptance journey
- 🛠️ **debugger** — observed failure with an unclear root cause

Small greenfield work should not become a multi-agent ceremony.

### One execution loop
**Implement → verify → continue when it passes; diagnose, fix, and verify again when it fails.**

## ✅ Quality path

### `PREVIEW_READY`
Ready for stakeholder feedback when the primary journey works, the interface is usable on desktop/mobile, the preview is reachable, and the acceptance path has been exercised.

### `DEV_READY`
The same repository reaches a higher engineering bar: clean feature boundaries, build/type/lint checks, proportionate tests, reproducible data setup, accurate environment documentation, and visible known debt.

### Production
The same frontend can continue while infrastructure evolves from mock data or Supabase toward dedicated backend services when the product needs them.

This separation keeps early feedback fast without hiding future engineering work.

## 🚀 Try it

Give the coding agent a **business request**, not an implementation blueprint:

> Build a purchase-request interface. Employees create and submit requests. Managers review, approve, or reject them. Start with the shortest credible workflow, use mock data unless persistence is necessary, and deploy a shareable preview to Vercel.

The agent should resolve only ambiguity that materially changes behavior, then move to implementation quickly.

## 🤖 Supported coding agents

- **ChatGPT** — repository context + canonical instructions/skills; remote tools through Plugins/Connectors/Work
- **Claude Code** — `CLAUDE.md` → `AGENTS.md`; project MCP via `.mcp.json`
- **OpenAI Codex** — `AGENTS.md`; project MCP and approval policy via `.codex/config.toml`
- **Cursor** — `AGENTS.md`; project MCP via `.cursor/mcp.json`

See [`docs/RUNTIME-COMPATIBILITY.md`](./docs/RUNTIME-COMPATIBILITY.md).

## 🗂 Repository map

- `README.md` — human entry point
- `AGENTS.md` — shared coding-agent map and invariants
- `skills/` — canonical reusable capabilities
- `workflows/` — short execution recipes
- `subagents/` — optional isolated role contracts
- `memory/` — small durable project context
- `rules/` — engineering, security, and delivery invariants
- `hooks/` — deterministic safety and ship checks
- `scripts/` — validation/setup utilities
- `templates/` — React starter contract
- `.mcp.json` — Claude Code project MCP servers
- `.codex/config.toml` — Codex MCP/project configuration
- `.cursor/mcp.json` — Cursor MCP configuration
- `docs/` — deeper architecture, runtime, and tool documentation

`skills/` is the canonical skill source. Runtime-specific directories must not become duplicated skill libraries.

## 📚 Deeper docs

- [`docs/HARNESS-ENGINEERING.md`](./docs/HARNESS-ENGINEERING.md) — model vs harness, context, memory, subagents, verification
- [`docs/TOOLS-AND-MCP.md`](./docs/TOOLS-AND-MCP.md) — GitHub/Vercel/Supabase MCP, OAuth, approvals, local-tool policy
- [`docs/RUNTIME-COMPATIBILITY.md`](./docs/RUNTIME-COMPATIBILITY.md) — runtime-specific discovery and configuration

## Principles

- **Speed is a feature.** Harness mechanisms must earn their latency.
- **Local tools first; MCP for remote state.**
- **Verified evidence beats agent confidence.**
- **Keep context small.** More context is not automatically better context.
- **Do not abstract before the problem requires it.**
- **The same repository should have a credible path from first preview to production.**

## License

MIT
