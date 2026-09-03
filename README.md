# Product-Skills

> **Product-Skills is a lightweight collection of product-delivery skills plus a repository harness for AI Coding Agents. It helps Product Managers and Business Analysts turn business intent into verified product work that developers can continue in the same repository.**

Describe the outcome. Your AI Coding Agent reads the repository, selects the relevant skills, performs the work, verifies the result, and keeps useful project context in source control.

## Overview

<p align="center">
  <img src="./docs/assets/architecture-v2.svg" alt="Product-Skills overview" width="560" />
</p>

Product-Skills adds three things around your AI Coding Agent:

- **Skills** — reusable product-delivery capabilities.
- **Harness** — repository instructions, context, memory, workflows, rules, and verification.
- **Tools** — external capabilities used when the task needs them.

The goal is simple: **business intent → verified product work → developer continuation in the same repository**.

## Core skills

The [`skills/`](./skills/) directory is the reusable capability library.

| Skill | Purpose |
| --- | --- |
| [`definition`](./skills/definition/) | Turn business intent into buildable scope |
| [`ux-ui`](./skills/ux-ui/) | Shape the user journey, states, hierarchy, and responsive behavior |
| [`react`](./skills/react/) | Build the React + TypeScript experience |
| [`supabase`](./skills/supabase/) | Add authentication, persistence, storage, or server behavior when useful |
| [`verify`](./skills/verify/) | Run quality checks and prove the primary journey works |
| [`delivery`](./skills/delivery/) | Publish a verified preview and prepare developer continuation |

A common path is:

<p align="center">
  <img src="./docs/assets/default-flow.svg" alt="Default Product-Skills delivery flow" width="560" />
</p>

**Definition → UX/UI → React → Verify → Delivery**

`supabase` joins the flow when backend behavior is needed. The agent selects only the skills relevant to the task.

---

# Install

Product-Skills is repository-based. Put it in the repository where your AI Coding Agent will work.

## New product

Start from Product-Skills:

```bash
git clone https://github.com/Trinhduyet/Product-Skills.git my-product
cd my-product
```

Point the project at your own remote:

```bash
git remote rename origin product-skills-source
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

You can also fork or copy the repository first and use that as your product repository.

## Existing product

Bring the Product-Skills layer into your existing repository:

```text
AGENTS.md
skills/
rules/
workflows/
templates/memory/
```

Optional harness pieces can be added when useful:

```text
subagents/
hooks/
scripts/
```

Then add the configuration for the AI Coding Agent you use.

Initialize project memory from [`templates/memory/`](./templates/memory/):

```text
memory/
├── PROJECT.md
├── FEATURES.md
└── DECISIONS.md
```

Keep the existing project's stack, package manager, and architecture unless the work explicitly calls for a migration.

## AI Coding Agent setup

| Runtime | Repository entry point | Start |
| --- | --- | --- |
| **Claude Code** | `CLAUDE.md`, `.claude/`, `.mcp.json` | run `claude` from the repo root |
| **OpenAI Codex** | `AGENTS.md`, `.codex/config.toml` | run `codex` or open the repo in Codex |
| **Cursor** | `AGENTS.md`, `.cursor/mcp.json` | open the repo and use Agent chat |
| **Other compatible agents** | `AGENTS.md` + `skills/` | use the runtime's native project instruction/tool mechanism |

Start a new agent session after adding Product-Skills so the runtime can read the project instructions cleanly.

See [`docs/RUNTIME-COMPATIBILITY.md`](./docs/RUNTIME-COMPATIBILITY.md) for runtime details.

---

# Use Product-Skills

You normally use Product-Skills by asking for a **product outcome**.

## First request

For example:

> Build a purchase-request application. Employees can create and submit requests. Managers can review, approve, or reject them. Make the main flow work on desktop and mobile. Use a backend if the workflow needs persistence, then deploy a shareable preview when the flow is verified.

Add useful context when you have it: business rules, acceptance criteria, API specs, screenshots, design references, or repository constraints.

## How skills are selected

The agent reads the task and chooses the smallest useful skill path.

```text
New business workflow
→ definition → ux-ui → react → verify → delivery

Existing UI change
→ ux-ui → react → verify

Backend behavior needed
→ definition/react → supabase → verify → delivery

Verification-only request
→ verify
```

You can name a skill explicitly when you want to constrain the task, but normal product work does not require manually invoking skills one by one.

## External capabilities

Before implementation, the agent determines whether the outcome needs additional access such as:

- an authoritative design or specification source;
- remote source control;
- preview deployment;
- backend or database access.

Only the capabilities needed for the current outcome should enter the workflow.

## Expected delivery

For a normal product request, the agent should:

1. read project instructions and relevant project memory;
2. select the relevant skills and source files;
3. resolve business ambiguity that materially changes behavior;
4. request any missing capability required to proceed;
5. implement the shortest credible experience;
6. run deterministic checks;
7. exercise the primary user journey;
8. report the result concisely.

A successful delivery should include:

- what was built;
- what was verified;
- one primary **Share URL** when a preview was requested;
- important blockers or deferred work;
- developer continuation notes when relevant.

If verification fails: **fix → verify again**.

## Continue an existing product

When `memory/FEATURES.md` exists, the agent uses it as the current capability map and classifies requested changes as:

- **ADD** — new capability;
- **CHANGE** — existing capability changes behavior;
- **REMOVE** — capability intentionally disappears;
- **NONE** — implementation or refactor only.

After verification, `FEATURES.md` should describe the new current truth. Git remains the detailed history.

## Project memory

```text
memory/
├── PROJECT.md    # verified project facts and conventions
├── FEATURES.md   # current product capabilities
└── DECISIONS.md  # durable product/technical decisions
```

Cross-project lessons belong in [`rules/lessons.md`](./rules/lessons.md).

## Delivery gates

### `PREVIEW_READY`

Ready for stakeholder feedback when the primary journey works and the relevant checks pass.

### `DEV_READY`

Ready for developer continuation with stable boundaries, proportionate tests, reproducible backend/data setup, accurate environment documentation, and visible known debt.

`PREVIEW_READY` and `DEV_READY` are intentionally different gates.

## Developer continuation

<p align="center">
  <img src="./docs/assets/production-path.svg" alt="React production continuation path" width="560" />
</p>

Product code, migrations, API/data contracts, environment requirements, and useful project knowledge stay in the same repository so developers can continue from the verified preview.

---

# Reference

- [`docs/HARNESS-ENGINEERING.md`](./docs/HARNESS-ENGINEERING.md) — harness behavior, context, memory, subagents, and verification
- [`docs/TOOLS-AND-MCP.md`](./docs/TOOLS-AND-MCP.md) — capability bootstrap, local tools, remote integrations, authentication, and approvals
- [`docs/RUNTIME-COMPATIBILITY.md`](./docs/RUNTIME-COMPATIBILITY.md) — runtime compatibility and repository-specific configuration
- [`skills/`](./skills/) — canonical reusable capability library
- [`rules/engineering.md`](./rules/engineering.md) — engineering invariants and quality expectations

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

## Principles

- Start from business intent.
- Let the agent select only the skills and tools the task needs.
- Keep project context small and durable.
- Verify before claiming success.
- Keep the same repository useful from first preview through developer continuation.

## License

MIT
