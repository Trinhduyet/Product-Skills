# Product-Skills

> **Product-Skills is a lightweight collection of product-delivery skills plus a repository harness for AI Coding Agents. It helps Product Managers and Business Analysts turn business intent into verified product work that developers can continue in the same repository.**

You describe the outcome. Your AI Coding Agent does the implementation work. Product-Skills gives the agent reusable skills, project context, guardrails, memory, workflows, and verification.

You do **not** need to understand MCP, Feature-Sliced Design, Supabase, Vercel, or agent internals before you start.

## Repo overview

<p align="center">
  <img src="./docs/assets/architecture-v2.svg" alt="How Product-Skills fits into an AI coding workflow" width="560" />
</p>

The diagram is a **human overview of this repository**, not an application architecture.

- **You provide business intent** — goal, users, rules, constraints, and useful references.
- **Your AI Coding Agent performs the work**.
- **Skills** teach the agent how to handle product-delivery tasks.
- **The harness** keeps context, workflow, memory, guardrails, and verification consistent.
- **Optional tools** are connected only when the requested outcome requires them.
- The result should be **verified product work in the same repository**, ready for feedback and developer continuation.

## Core skills

The [`skills/`](./skills/) directory is the reusable capability library.

| Skill | Purpose | Typical output |
| --- | --- | --- |
| [`definition`](./skills/definition/) | Turn business intent into buildable scope | Goal, actors, journey, rules, screens, acceptance criteria |
| [`ux-ui`](./skills/ux-ui/) | Shape a usable product experience | Flow, hierarchy, states, responsive/accessibility direction |
| [`react`](./skills/react/) | Build the frontend | React + TypeScript implementation with continuation-friendly structure |
| [`supabase`](./skills/supabase/) | Add a backend when useful | Auth, persistence, storage, RLS, migrations, data contracts |
| [`verify`](./skills/verify/) | Prove the product works | Deterministic checks + primary journey verification |
| [`delivery`](./skills/delivery/) | Share and hand off the result | Verified preview, one Share URL, continuation notes |

A common delivery path is:

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
| **Harness** | Keeps execution consistent through instructions, context, memory, rules, workflows, and verification | `AGENTS.md`, `rules/`, `memory/`, `workflows/`, hooks/scripts |
| **Tools / MCP** | Give the agent access to external systems and actions | Selected only when the requested outcome needs them |
| **Runtime** | The coding agent that reads the repo and executes work | Claude Code, Codex, Cursor, or another compatible agent |

Skills define **how to work**. Tools provide **what the agent can act on**. The harness helps the runtime apply both consistently inside the repository.

---

# Install Product-Skills

Product-Skills is currently **repository-based**, not a package or marketplace plugin. You install it into the repository where your AI Coding Agent will work.

The goal is similar to other agent skill systems: **install once into the project, then let the coding agent discover and use the relevant skills during normal work.**

## New product — recommended

Start from Product-Skills as the project workspace:

```bash
git clone https://github.com/Trinhduyet/Product-Skills.git my-product
cd my-product
```

Point `origin` at your own product repository before shipping product code:

```bash
git remote rename origin product-skills-source
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

This keeps the original Product-Skills repository available as an optional upstream reference while your repository becomes the source of truth for the product.

You can also fork/copy Product-Skills first and clone your own copy.

## Existing product

Do **not** replace an established architecture just to adopt Product-Skills.

Bring the reusable Product-Skills layer into the existing repository:

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

Then add only the runtime-specific files for the AI Coding Agent you use.

Do not copy Product-Skills' root `memory/` into another product. Initialize that product's own project memory from [`templates/memory/`](./templates/memory/):

```text
memory/
├── PROJECT.md
├── FEATURES.md
└── DECISIONS.md
```

The existing project's stack, package manager, and architecture remain authoritative unless you explicitly request a migration.

## Activate it in your AI Coding Agent

Product-Skills includes thin runtime-specific configuration while keeping `skills/` canonical.

| Runtime | Project entry point | Start |
| --- | --- | --- |
| **Claude Code** | `CLAUDE.md`, `.claude/`, `.mcp.json` | run `claude` from the repo root |
| **OpenAI Codex** | `AGENTS.md`, `.codex/config.toml` | run `codex` or open the repo in Codex |
| **Cursor** | `AGENTS.md`, `.cursor/mcp.json` | open the repo and use Agent chat |
| **Other compatible agents** | `AGENTS.md` + `skills/` | use the runtime's native project instruction/tool mechanism |

After installing or copying Product-Skills into a repository, start a **new agent session** so the runtime can read the project instructions cleanly.

### Verify the installation

Before asking the agent to build anything, you can use this lightweight check:

> Read the repository instructions and Product-Skills capability library. Tell me which Product-Skills skills are available, what project memory is present, and which runtime-specific configuration you detected. Do not modify files.

A healthy response should recognize the six skills and the repository instructions without requiring you to manually paste each `SKILL.md` file.

See [`docs/RUNTIME-COMPATIBILITY.md`](./docs/RUNTIME-COMPATIBILITY.md) for runtime-specific expectations.

---

# Use Product-Skills

You normally use Product-Skills by asking for a **product outcome**, not by manually invoking individual skills.

## Your first request

For example:

> Build a purchase-request application. Employees can create and submit requests. Managers can review, approve, or reject them. Make the main flow work on desktop and mobile. Use a backend only if it materially improves the experience, then deploy a shareable preview when the flow is verified.

That is enough to start.

Include existing context only when it matters: business rules, acceptance criteria, API specs, screenshots, repository constraints, or an authoritative source/design link.

## How skills are used

The agent should inspect the task and select the smallest useful skill path.

Examples:

```text
New business workflow
→ definition → ux-ui → react → verify → delivery

Existing UI change
→ ux-ui → react → verify

Backend persistence needed
→ definition/react → supabase → verify → delivery

Verification-only request
→ verify
```

You should not need to type commands such as “run the react skill” for normal product work. Explicitly naming a skill is still fine when you want to constrain the task.

## Capability bootstrap

Before implementation, the agent should determine which **external capabilities** are actually required by the requested outcome.

Examples:

```text
Authoritative source is required → request access before coding
Remote source-control action     → request repository access
Shareable deployment requested   → request deployment access
Real backend required            → request backend access
```

A Figma link is only one possible authoritative design source. It is **not** a Product-Skills requirement.

PM/BA users should not need to inspect MCP settings or pre-connect unrelated services.

## What the agent should do

For a normal request, the agent should:

1. read the project instructions and nearest project memory;
2. select only relevant skills and source files;
3. resolve business ambiguity that materially changes behavior;
4. request any missing required capability;
5. implement the shortest credible experience;
6. run deterministic verification;
7. exercise the primary user journey;
8. report the result concisely.

If verification fails: **fix → verify again**.

## What you should receive

A successful delivery should tell you:

- what was built;
- what was verified;
- one primary **Share URL** when preview deployment was requested;
- important blockers or deferred work;
- developer continuation notes when relevant.

A successful build command alone is not proof that the product journey works.

## Continue an existing product

Ask for changes in normal business language:

> Add duplicate preset to Settings Presets.

> Change sign-up so only invited users can create an account.

> Remove public sign-up and keep existing sign-in behavior.

When `memory/FEATURES.md` exists, the agent should read the current capability map first and classify the requested delta as:

- **ADD** — new capability;
- **CHANGE** — existing capability changes behavior;
- **REMOVE** — capability intentionally disappears;
- **NONE** — implementation/refactor only.

After verification, `FEATURES.md` should reflect the new current truth. Git remains the detailed changelog.

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

Ready for stakeholder feedback when the primary journey works and relevant deterministic checks pass. For greenfield React, this normally includes warning-free lint, typecheck, architecture validation, build, responsive smoke checks, and an exercised acceptance path.

### `DEV_READY`

A higher bar for developer continuation: stable boundaries, proportionate tests, reproducible backend/data setup, accurate environment documentation, and visible known debt.

`PREVIEW_READY` and `DEV_READY` are intentionally different.

## Developer continuation

<p align="center">
  <img src="./docs/assets/production-path.svg" alt="React production continuation path" width="560" />
</p>

The goal is not a disposable prototype. Product code, migrations, API/data contracts, environment requirements, and useful project knowledge stay in the same repository so a development team can continue from the verified preview.

---

# Reference

The README is the human entry point. Detailed implementation contracts live in the repository docs, rules, and skill files.

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

Runtime-specific configuration stays thin. `skills/` remains the canonical capability source.

## Principles

- Start from business intent, not implementation ceremony.
- Skills are reusable capabilities; the harness is the execution layer around them.
- Install Product-Skills into the project, then let the agent select relevant skills automatically.
- Use only the context, skills, tools, and subagents the task needs.
- The coding agent owns capability setup for non-technical users.
- Verify evidence before claiming success.
- Start simple; add architecture only when complexity or reuse earns it.
- Keep the same repository useful from first preview through developer continuation.

## License

MIT
