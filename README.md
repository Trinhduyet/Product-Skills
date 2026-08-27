# Product-Skills

> **Product-Skills is a lightweight AI coding harness for Product Managers and Business Analysts to turn business ideas into deployable React POCs while preserving a codebase developers can continue toward production.**

Product-Skills adds just enough **product definition, UX/UI guidance, engineering conventions, context discipline, tools, and verification** around AI coding agents such as **ChatGPT, Claude Code, Codex, and Cursor**.

The goal is simple: **describe a business workflow, get a credible React experience online quickly, then keep building from the same repository.**

## 🧭 System overview

The project is intentionally simple: PM/BA business intent goes into an AI coding agent; Product-Skills supplies the instructions, skills, context, memory, guardrails, and tool access needed to produce a verified React interface and deploy it to Vercel.

<p align="center">
  <img src="./docs/assets/architecture.svg" alt="Product-Skills system architecture" width="100%" />
</p>

## 🎯 What it solves

| | Without guidance | With Product-Skills |
|---|---|---|
| 🧭 **Product intent** | Agent guesses missing behavior | Goal, actors, rules, and acceptance path stay visible |
| 🎨 **UX/UI** | Generic screens and missing states | Flow, hierarchy, responsive states, and accessibility basics |
| 🧱 **Code quality** | Fast demo code becomes rewrite debt | Feature boundaries and replaceable data providers |
| ✅ **Confidence** | “Build passed” is treated as done | Main user journey is actually verified |
| ⚡ **Speed** | Too much ceremony or too much improvisation | Short happy path; extra machinery only when useful |

## ⚡ Default flow

For a new interface, the agent should normally follow one short path:

**① Definition → ② UX/UI → ③ React → ④ Verify → ⑤ Delivery**

**Supabase is conditional.** Add it only when the experience needs persistence, authentication, storage, or realistic shared data.

Repository exploration, deeper review, debugging, and hardening are also conditional. The harness should be mostly invisible when the task is straightforward.

## 🧩 Six core skills

| Skill | Purpose | Load when |
|---|---|---|
| 🧭 [`definition`](./skills/definition/) | Goal, actors, journey, business rules, screens, acceptance criteria | New or ambiguous work |
| 🎨 [`ux-ui`](./skills/ux-ui/) | User flow, hierarchy, states, responsive and accessibility direction | UI work |
| ⚛️ [`react`](./skills/react/) | Maintainable React implementation and feature boundaries | React implementation |
| 🗄️ [`supabase`](./skills/supabase/) | Reproducible data/auth/storage with safe client boundaries | Data is required |
| ✅ [`verify`](./skills/verify/) | Deterministic checks plus the primary user journey | Before sharing |
| 🚀 [`delivery`](./skills/delivery/) | Vercel preview, environment checks, developer-ready hardening | Share or hand off |

Skills are deliberately broad. **Split by independent reuse, not conceptual purity.**

## 🔌 Tools & MCP

The harness includes real project-scoped MCP wiring — not just documentation about tools.

**Rule:** local deterministic tools first; MCP for remote state/actions.

| Capability | Default |
|---|---|
| 📁 Files / shell | Native coding-agent tools |
| 🌿 Git / diff / commit | Local `git` |
| 📦 Build / typecheck / test | Node + npm project commands |
| 🌐 Browser acceptance | Playwright CLI when available |
| 🗃️ Schema changes | Supabase CLI + versioned migrations |
| 🐙 GitHub remote state | GitHub MCP |
| ▲ Vercel projects/deployments | Vercel MCP |
| 🟢 Supabase remote context | Supabase MCP — **read-only by default** |

Native project configs are committed:

| Runtime | MCP config |
|---|---|
| Claude Code | [`.mcp.json`](./.mcp.json) |
| OpenAI Codex | [`.codex/config.toml`](./.codex/config.toml) |
| Cursor | [`.cursor/mcp.json`](./.cursor/mcp.json) |
| ChatGPT web | Plugins/Connectors/Work integrations; web ChatGPT does not read local MCP files |

The shared endpoints use OAuth, so **no PAT/token is committed**. GitHub and Vercel can perform remote actions after authentication. Supabase starts read-only; schema writes stay reproducible through migrations unless a project-scoped write connection is deliberately enabled.

See [`docs/TOOLS-AND-MCP.md`](./docs/TOOLS-AND-MCP.md) for login commands, approval policy, and safe Supabase write setup.

## 🧱 Code developers can continue

For greenfield work, prefer a small feature-based React structure rather than a throw-away demo architecture.

| Area | Responsibility |
|---|---|
| `src/app/` | App shell, routing, providers |
| `src/components/ui/` | Shared UI primitives |
| `src/features/<feature>/` | Feature UI, hooks, schemas, types, and data access |
| `src/config/` | Environment and application configuration |
| `src/lib/` | Shared infrastructure helpers |
| `src/testing/` | Test utilities and fixtures |

Create only the folders a feature actually needs.

The important production seam is the data boundary:

<p align="center">
  <img src="./docs/assets/continuation.svg" alt="React feature data boundary" width="100%" />
</p>

A feature can start with mock data, move to Supabase, and later use a dedicated backend without forcing the UI to be rewritten.

## 🎨 UX/UI baseline

The UX/UI capability is practical, not ceremonial. Before implementation, make the **primary journey** clear and identify the states that matter: loading, empty, validation, error, success, permissions, and confirmation where relevant.

For a greenfield business interface, prefer mature primitives and a restrained visual system:

**React · TypeScript · Vite · Tailwind CSS · shadcn/ui**

Use the existing stack and design language when working inside an established repository.

Responsive smoke targets: **375 · 768 · 1024 · 1440**, with visible focus, understandable validation, readable contrast, and usable primary actions at each breakpoint.

## 🧠 How the harness stays fast

The harness is the behavior created by the repository as a whole — **instructions, skills, context, memory, tools, guardrails, verification, and conditional subagents**. It is not a `harness/` directory.

### Small context

A normal implementation task should receive only what it needs: `AGENTS.md`, current product/UI notes, verified project facts, one relevant skill, and the relevant feature files.

Do not load every skill, the entire repository, or the whole conversation by default.

### Small memory

| File | Stores |
|---|---|
| `memory/PROJECT.md` | Verified project facts and conventions |
| `memory/DECISIONS.md` | Durable technical/product decisions |
| `memory/LESSONS.md` | Verified mistakes worth preventing again |

Memory is not a transcript archive.

### Conditional subagents

- 🔎 **explorer** — unfamiliar repository or pattern search
- 👀 **reviewer** — large, risky, or cross-feature change
- ✅ **verifier** — independent evidence for the main acceptance journey
- 🛠️ **debugger** — observed failure with an unclear root cause

Small greenfield work should not become a multi-agent ceremony.

### One execution loop

Implementation has one simple control rule: **implement → verify → continue when it passes; diagnose, fix, and verify again when it fails.** No failure means no debugging loop.

## ✅ Quality path

| Gate | Purpose | Evidence |
|---|---|---|
| **PREVIEW_READY** | Stakeholder can evaluate the real journey | Main flow works, desktop/mobile usable, preview reachable |
| **DEV_READY** | Developer can safely continue the same repository | Build/type/lint, tests, reproducible setup/data, known debt visible |
| **Production** | Product operates on production infrastructure | Same frontend can evolve to dedicated backend/services when needed |

This separation keeps early feedback fast without hiding the work needed for production.

## 🚀 Try it

Give the coding agent a **business request**, not an implementation blueprint:

> Build a purchase-request interface. Employees create and submit requests. Managers review, approve, or reject them. Start with the shortest credible workflow, use mock data unless persistence is necessary, and deploy a shareable preview to Vercel.

The agent should resolve only ambiguity that materially changes behavior, then move to implementation quickly.

## 🤖 Supported coding agents

| Runtime | Project integration |
|---|---|
| **ChatGPT** | Repository context + canonical instructions/skills; remote tools through Plugins/Connectors/Work |
| **Claude Code** | `CLAUDE.md` → `AGENTS.md`; project MCP via `.mcp.json` |
| **OpenAI Codex** | `AGENTS.md`; project MCP and approval policy via `.codex/config.toml` |
| **Cursor** | `AGENTS.md`; project MCP via `.cursor/mcp.json` |

See [`docs/RUNTIME-COMPATIBILITY.md`](./docs/RUNTIME-COMPATIBILITY.md).

## 🗂 Repository map

| Path | Role |
|---|---|
| `README.md` | Human entry point |
| `AGENTS.md` | Shared coding-agent map and invariants |
| `.mcp.json` | Claude Code project MCP servers |
| `.codex/config.toml` | Codex MCP + project config |
| `.cursor/mcp.json` | Cursor MCP config |
| `skills/` | Canonical reusable capabilities |
| `workflows/` | Short execution recipes |
| `subagents/` | Optional isolated role contracts |
| `memory/` | Small durable project context |
| `rules/` | Engineering, security, delivery invariants |
| `hooks/` | Deterministic safety and ship checks |
| `scripts/` | Validation and setup utilities |
| `templates/` | React starter contract |
| `docs/` | Deeper architecture, runtime, and tool documentation |

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
