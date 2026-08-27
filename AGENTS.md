# Product-Skills Agent Guide

Product-Skills exists to help PMs and BAs turn business ideas into deployable React POCs quickly while preserving a codebase developers can continue toward production.

Keep the harness lightweight. Prefer the shortest path that can produce verified evidence.

## Read order

1. Read this file.
2. Read `memory/PROJECT.md` when working on an existing project.
3. Read only the skill(s) relevant to the current task.
4. Read only relevant specs and source files.
5. Retrieve decisions/lessons only when the task touches them.

Do not load every skill or every memory file by default.

## Default workflow

For a normal POC:

```text
poc-definition → ux-ui-design → react-poc → verify-poc → deploy-vercel
```

Conditional capabilities:

- use `supabase` only when persistence/auth/storage is required;
- use `debug` only when verification fails and the root cause is not trivial;
- use `dev-handoff` only after the POC has been accepted for further development;
- use subagents only when context isolation or independent evidence adds value.

## Non-negotiable rules

1. Optimize for a working POC first.
2. Do not invent business behavior that materially changes the user flow; surface blocking ambiguity.
3. Prefer existing project patterns over introducing new architecture.
4. Keep React architecture feature-based and simple.
5. Do not put remote data access directly inside page components when a feature API/hook boundary is practical.
6. Never expose secrets or privileged service credentials in browser code.
7. Persistent schema changes must be reproducible, preferably through migrations.
8. Do not add abstraction without demonstrated need.
9. Do not claim success without executing the relevant verification.
10. Treat `POC_READY` and `DEV_HANDOFF_READY` as different gates.

## Context discipline

A task context should contain only:

- the task/goal;
- relevant acceptance criteria;
- relevant project facts;
- the relevant skill;
- relevant source files/interfaces.

Avoid passing full conversation history, every skill, or the entire repository to a subagent.

## Subagent policy

Use the main agent for low-complexity tasks.

Use `explorer` when an existing repository is unfamiliar or an existing pattern probably already exists.
Use `reviewer` for large/risky/cross-feature changes or before developer handoff.
Use `verifier` before declaring `POC_READY`.
Use `debugger` only when a failure needs focused root-cause analysis.

Subagents must receive a compact context capsule and a clear completion contract.

## Verification

For `POC_READY`, verify the primary business journey in the running application, not only a successful build.

For `DEV_HANDOFF_READY`, additionally verify engineering checks, reproducible setup, relevant tests, and documentation.

## Architecture escalation

Start simple.

```text
Level 0: React + mock data
Level 1: React + feature data boundary + Supabase
Level 2: add feature service/domain logic only when complexity requires it
Level 3: replace provider with dedicated backend when production needs require it
```

Do not force Level 2/3 architecture into a simple POC.

## Canonical locations

- `skills/` — reusable capability instructions
- `workflows/` — high-level execution recipes
- `subagents/` — canonical role contracts
- `memory/` — small verified project memory
- `rules/` — stable invariants
- `hooks/` / `scripts/` — deterministic checks
- `.claude/`, `.codex/`, `.cursor/` — runtime-specific configuration only

Never duplicate canonical skill content into runtime-specific directories.
