# Product-Skills

> **Product-Skills is a lightweight AI coding harness for Product Managers and Business Analysts to turn business ideas into deployable React POCs while preserving a codebase developers can continue toward production.**

Product-Skills helps non-developer or lightly technical Product Managers and Business Analysts work effectively with AI coding agents such as **ChatGPT, Claude Code, Codex, and Cursor**.

The goal is not to add process. The goal is to make the coding agent **faster on the happy path and safer at the points where agents commonly make mistakes**.

## What it optimizes for

1. **POC speed first** — get a usable React interface onto Vercel quickly.
2. **Business intent stays visible** — the agent should understand the user, flow, rules, and acceptance criteria before it writes UI.
3. **Developer-continuable code** — feature-based React structure, typed boundaries, reproducible data setup, and no throw-away prototype architecture.
4. **Adaptive guardrails** — extra review, subagents, memory retrieval, or debugging only activate when they add value.
5. **Low token overhead** — load only the current skill, relevant project facts, and relevant files.

## The core idea

```text
AI Agent = Model + Harness
```

For Product-Skills, the harness is not a `harness/` directory. It is the combined behavior created by this repository:

```text
Instructions + Skills + Context + Memory + Tools/MCP
+ Execution Loop + Conditional Subagents + Guardrails + Verification
```

## Fast path

Most POCs should follow the shortest useful path:

```text
Business idea
    ↓
poc-definition
    ↓
ux-ui-design
    ↓
react-poc
    ↓
verify-poc
    ↓
deploy-vercel
    ↓
POC_READY
```

Only add capabilities when required:

```text
Persistence/Auth required?  → supabase
Verification failed?         → debug
Existing repo is unclear?    → explorer subagent
Large/high-risk change?      → reviewer subagent
Stakeholder accepted POC?    → dev-handoff
```

The harness should be **mostly invisible on the happy path**.

## Architecture

```text
                    PM / BA
                       │
                business intent
                       ▼
       ChatGPT / Claude Code / Codex / Cursor
                       │
                       ▼
┌──────────────── PRODUCT-SKILLS ────────────────┐
│                                                │
│ Instructions       Skills                     │
│ AGENTS.md          POC / UX-UI / React / ... │
│                                                │
│ Context            Memory                     │
│ relevant files     facts / decisions / lessons│
│                                                │
│ Execution          Conditional subagents       │
│ build → verify     explorer/reviewer/verifier  │
│                                                │
│ Guardrails         Tools / MCP                 │
│ rules + checks     git/npm/browser/cloud       │
└───────────────────────┬────────────────────────┘
                        │
                        ▼
                React + TypeScript
                        │
                Supabase optional
                        │
                        ▼
                     Vercel
                        │
                        ▼
                    POC_READY
                        │
               same repository
                        │
                        ▼
              DEV_HANDOFF_READY
                        │
                        ▼
                     Production
```

## Eight core skills

| Skill | Purpose | When |
|---|---|---|
| `poc-definition` | Product + BA lite → buildable POC spec | Always |
| `ux-ui-design` | User flow, screens, states, responsive design | Always |
| `react-poc` | Production-compatible React implementation | Always |
| `supabase` | Persistence, auth, migrations, RLS | Conditional |
| `verify-poc` | Build + main acceptance journey + responsive smoke | Always |
| `debug` | Evidence-first root-cause fixing | On failure |
| `deploy-vercel` | Preview deployment and smoke verification | Always |
| `dev-handoff` | Harden accepted POC for engineering continuation | After POC approval |

Skills are intentionally broad. **Split by independent reuse, not conceptual purity.** Product-Skills is not intended to become a catalog of dozens of micro-skills before there is a real reuse need.

## Product + BA

Product and BA are different disciplines, but the fast POC workflow does not need separate agents by default.

```text
Product thinking
WHY / WHO / OUTCOME / SCOPE
          │
          ▼
BA thinking
BEHAVIOR / RULE / FLOW / ACCEPTANCE
          │
          ▼
Engineering
DESIGN / BUILD / VERIFY
```

The `poc-definition` skill combines the minimum Product and BA thinking needed to turn an idea into a buildable POC specification.

## Generated React architecture

For greenfield POCs, prefer a simple feature-based structure inspired by Bulletproof React:

```text
src/
├── app/
├── components/
│   └── ui/
├── features/
│   ├── feature-a/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   └── types/
│   └── feature-b/
├── config/
├── lib/
├── testing/
└── types/
```

Do **not** mechanically create every folder. Only add what the feature needs.

Preserve one important production seam:

```text
Component → feature hook → feature API → provider
```

A POC provider may be mock data or Supabase. A later production provider may be an HTTP API. The UI should not require a rewrite.

## UX/UI baseline

The UX/UI skill borrows the useful ideas from UI/UX Pro Max without turning design into a slow phase:

- derive screens from the primary user journey;
- define empty/loading/error/success states where relevant;
- reuse a small design-system direction rather than inventing every screen independently;
- responsive smoke targets: **375 / 768 / 1024 / 1440**;
- visible focus, understandable validation, clear primary actions;
- avoid visual novelty that hurts usability or implementation speed.

For greenfield UI, the preferred baseline is:

```text
React + TypeScript + Vite + Tailwind + shadcn/ui
```

Use the existing stack when working inside an established project.

## Adaptive harness

Product-Skills does not require every mechanism on every task.

### Complexity: low

```text
main agent → build → verify → deploy
```

### Complexity: medium

```text
explorer if needed → main implementer → verifier
```

### Complexity: high / risky

```text
explorer → small dependency plan → implementation
→ reviewer → verifier
```

Subagents exist to isolate context and reduce mistakes, not to create a ceremony.

## Memory model

Memory stays intentionally small:

```text
memory/
├── PROJECT.md    # current verified project facts
├── DECISIONS.md  # durable architectural decisions
└── LESSONS.md    # verified mistakes worth preventing
```

Never store the whole conversation as memory. Retrieve only what matters to the current task.

## Execution loop

There is one default loop:

```text
implement
   ↓
verify
   ↓
pass? ── yes ──→ continue / ship
   │
   no
   ↓
root cause obvious?
  │              │
yes              no
  │              │
fix             debug
  └──────┬───────┘
         ↓
       verify
```

No failure means no debugging loop.

## Quality gates

### `POC_READY`

Optimized for stakeholder feedback:

- primary business journey works;
- UI is understandable and basically responsive;
- no obvious runtime/console failure in the main journey;
- Vercel preview is reachable;
- verifier has exercised the main acceptance path.

### `DEV_HANDOFF_READY`

Same repository, higher engineering bar:

- feature boundaries are clean;
- TypeScript/build/lint checks pass;
- important behavior has tests;
- data schema is reproducible through migrations when Supabase is used;
- RLS/auth have been reviewed when relevant;
- `.env.example` and developer setup are accurate;
- README/architecture notes explain how to continue development;
- no known critical verification failure remains.

`POC_READY` and `DEV_HANDOFF_READY` are deliberately different gates so production hardening does not slow initial POC feedback.

## Repository layout

```text
Product-Skills/
├── README.md
├── AGENTS.md
├── CLAUDE.md
├── skills/
├── workflows/
├── subagents/
├── memory/
├── rules/
├── hooks/
├── scripts/
├── templates/
├── .claude/
├── .codex/
├── .cursor/
└── docs/
```

`skills/` is the canonical shared skill source. `.claude/`, `.codex/`, and `.cursor/` are runtime configuration only; they must not become duplicated skill libraries.

## Runtime support — Phase 1

Initial focus:

- ChatGPT
- Claude Code
- OpenAI Codex
- Cursor

Other runtimes can be added after the core workflow is stable.

## References and design inspiration

Product-Skills intentionally combines a small set of proven ideas rather than copying any one project wholesale:

- **Bulletproof React** — feature-oriented React code organization.
- **Superpowers** — planning just enough, fresh context, independent verification, systematic debugging.
- **pm-skills / Product-Manager-Skills** — reusable Product thinking encoded as skills and workflows.
- **UI/UX Pro Max Skill** — design-system guidance, responsive/accessibility quality checks.
- **deliverynotification / Umbraco-Figma-Agent-Skills** — explicit agent instructions, verification discipline, project engineering context.
- **OmniRoute / diagram-design** — human-first documentation and diagrams that explain rather than decorate.

## Philosophy

> Fast POC does not mean throw-away code.

The desired outcome is a small first increment of a real product: simple enough for an AI coding agent to build quickly, structured enough that a developer can keep going.
