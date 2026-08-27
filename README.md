# Product-Skills

> **Product-Skills is a lightweight AI coding harness for Product Managers and Business Analysts to turn business ideas into deployable React POCs while preserving a codebase developers can continue toward production.**

Product-Skills adds a small, reusable layer of **product definition, UX/UI guidance, engineering conventions, verification, and delivery rules** around AI coding agents such as **ChatGPT, Claude Code, Codex, and Cursor**.

It is designed for a practical outcome: **describe a business workflow, get a credible React experience online quickly, then keep building from the same repository instead of throwing the demo away.**

<p align="center">
  <img src="./docs/assets/architecture.svg" alt="Product-Skills architecture: PM and BA intent flows through an AI coding agent guided by Product-Skills into a React preview that developers continue toward production." width="100%" />
</p>

## Why Product-Skills

AI coding agents are already good at producing components. They are less reliable at keeping the *right* product scope, following an existing codebase, remembering important decisions, and proving that the result actually works.

Product-Skills focuses on those gaps without introducing a heavyweight delivery process.

- **Business-first** — capture the goal, actors, workflow, rules, and acceptance path before UI generation.
- **Fast by default** — use the shortest useful path; extra review and subagents are conditional.
- **Good UI, not generic AI UI** — clear flows, states, responsive behavior, accessibility basics, and a consistent visual direction.
- **Developer-continuable React** — feature-based structure, typed seams, no provider calls scattered through page components.
- **Evidence before confidence** — build success is not treated as proof that the user journey works.
- **Low context overhead** — load only the skill, project facts, and files relevant to the current task.

## The default path

For a new interface, the agent should normally do only this:

```text
business intent
    → definition
    → ux-ui
    → react
    → verify
    → delivery
```

`supabase` is added only when the experience needs persistence, authentication, storage, or realistic shared data.

Failure handling, repository exploration, additional review, and deeper hardening are activated only when they reduce risk.

## Six core skills

| Skill | What it gives the coding agent | Load when |
|---|---|---|
| [`definition`](./skills/definition/) | Goal, actors, primary journey, business rules, screens, acceptance criteria | New or ambiguous work |
| [`ux-ui`](./skills/ux-ui/) | User flow, screen hierarchy, states, responsive and accessibility direction | UI work |
| [`react`](./skills/react/) | Maintainable React implementation and feature boundaries | React implementation |
| [`supabase`](./skills/supabase/) | Reproducible data/auth/storage setup with safe client boundaries | Data is required |
| [`verify`](./skills/verify/) | Deterministic checks plus the primary user journey | Before sharing |
| [`delivery`](./skills/delivery/) | Vercel preview, environment checks, and developer-ready hardening | Share / hand off |

Skills are deliberately broad. **Split by independent reuse, not conceptual purity.**

## What the generated React should look like

For greenfield work, the default is a simple feature-based structure inspired by Bulletproof React:

```text
src/
├── app/
├── components/
│   └── ui/
├── features/
│   ├── requests/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   └── types/
│   └── approvals/
├── config/
├── lib/
├── testing/
└── types/
```

Do not create every folder mechanically. Create only what the feature needs.

The important seam is simple:

```text
component → feature hook → feature API → provider
```

The provider can start as mock data or Supabase. If the product later needs a dedicated backend, the feature API can move to HTTP without forcing a frontend rewrite.

## UX/UI baseline

The UI skill is intentionally practical. It borrows the useful ideas from UI/UX Pro Max without turning design into a separate ceremony.

Before implementation, make the primary journey clear and identify the states that matter: loading, empty, validation, error, success, permissions, and confirmation where relevant.

For a greenfield business interface, prefer mature primitives and a restrained design system:

```text
React + TypeScript + Vite + Tailwind CSS + shadcn/ui
```

Use the existing stack and design language when working inside an established repository.

Responsive smoke targets are **375 / 768 / 1024 / 1440**, with visible focus, clear validation, readable contrast, and primary actions that remain usable at each breakpoint.

## How the harness stays fast

The harness is the behavior created by the repository as a whole — instructions, skills, context, memory, tools, guardrails, verification, and conditional subagents. It is **not** a `harness/` directory.

### Context is selective

Do not load the entire repository, every skill, or the whole conversation into each task. A normal implementation context should be closer to:

```text
AGENTS.md
+ current definition / UI notes
+ memory/PROJECT.md
+ one relevant skill
+ relevant feature files
```

### Memory is small

```text
memory/
├── PROJECT.md      # verified facts and conventions
├── DECISIONS.md    # durable decisions
└── LESSONS.md      # mistakes worth preventing again
```

Memory is not a transcript archive.

### Subagents are conditional

Use isolation only when it helps:

- **explorer** — unfamiliar existing repository or pattern search;
- **reviewer** — large, risky, or cross-feature change;
- **verifier** — independent check of the main acceptance journey;
- **debugger** — observed failure with an unclear root cause.

Small greenfield work should not spawn a multi-agent ceremony.

### One execution loop

```text
implement → verify
              │
        pass ─┴─ fail
         │        │
      continue   diagnose → fix → verify
```

No failure means no debugging loop.

## Quality levels

The same repository moves through two useful states.

### `PREVIEW_READY`

Ready for stakeholder feedback when:

- the primary business journey works;
- the interface is understandable on desktop and mobile;
- there is no obvious runtime failure in that journey;
- the Vercel preview is reachable;
- the verifier has exercised the acceptance path.

### `DEV_READY`

Ready for a developer team to continue when the same codebase additionally has:

- clean feature boundaries and understandable data access;
- TypeScript/build/lint checks passing;
- tests protecting important behavior;
- reproducible migrations and reviewed RLS/auth assumptions when Supabase is used;
- accurate `.env.example` and local setup;
- architecture notes and known deferred work made explicit.

The second gate exists so engineering hardening does not slow the first stakeholder review.

## Repository layout

```text
Product-Skills/
├── README.md              # human entry point
├── AGENTS.md              # shared coding-agent map and invariants
├── CLAUDE.md              # thin Claude Code entry point
├── skills/                # canonical reusable capabilities
├── workflows/             # short execution recipes
├── subagents/             # optional isolated roles
├── memory/                # small durable project context
├── rules/                 # engineering / security / delivery invariants
├── hooks/                 # deterministic safety and ship checks
├── scripts/               # validation / setup utilities
├── templates/             # React starter contract
├── .claude/               # Claude-specific configuration only
├── .codex/                # Codex-specific configuration only
├── .cursor/               # Cursor-specific configuration only
└── docs/                  # deeper architecture and runtime documentation
```

`skills/` is the canonical skill source. Vendor-specific directories must not become copies of the shared skill library.

## Try it

Give your coding agent a business request, not an implementation blueprint:

```text
Build a purchase-request interface.
Employees create and submit requests. Managers review, approve, or reject them.
Start with the shortest credible workflow, use mock data unless persistence is necessary,
and deploy a shareable preview to Vercel.
```

The agent should use Product-Skills to resolve only business ambiguity that materially changes behavior, then move to implementation quickly.

## Supported coding agents

Phase 1 focuses on:

- **ChatGPT** — use repository context plus `AGENTS.md` and canonical skills.
- **Claude Code** — thin `CLAUDE.md` entrypoint; runtime-specific configuration stays under `.claude/`.
- **OpenAI Codex** — use `AGENTS.md`; `.codex/` is configuration-only.
- **Cursor** — `.cursor/` is configuration/rules-only; shared skills remain canonical at `/skills`.

See [`docs/RUNTIME-COMPATIBILITY.md`](./docs/RUNTIME-COMPATIBILITY.md).

## Deeper architecture

See [`docs/HARNESS-ENGINEERING.md`](./docs/HARNESS-ENGINEERING.md) for the distinction between model and harness, context capsules, conditional subagents, memory discipline, and quality gates.

## Design principles

1. **Speed is a feature.** Harness mechanisms must earn their latency.
2. **Verified evidence beats agent confidence.**
3. **Keep context small.** More context is not automatically better context.
4. **Do not abstract before the problem requires it.**
5. **Prototype debt should be visible, not hidden.**
6. **The same repository should have a credible path from stakeholder preview to production.**

## Inspiration

Product-Skills is informed by patterns from:

- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [Superpowers](https://github.com/obra/superpowers)
- [pm-skills](https://github.com/phuryn/pm-skills)
- [Product-Manager-Skills](https://github.com/deanpeters/Product-Manager-Skills)
- [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- [deliverynotification](https://github.com/Trinhduyet/deliverynotification)
- [Umbraco-Figma-Agent-Skills](https://github.com/Trinhduyet/Umbraco-Figma-Agent-Skills)
- [OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- [diagram-design](https://github.com/cathrynlavery/diagram-design)

These repositories are references for ideas and workflow patterns; Product-Skills keeps its own lightweight conventions and canonical skills.

## License

MIT
