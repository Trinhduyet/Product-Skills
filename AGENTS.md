# Product-Skills Agent Guide

Product-Skills helps PMs and BAs turn business ideas into deployable React experiences quickly while preserving a codebase developers can continue toward production.

The core harness is runtime-agnostic. Use native runtime configuration when available, but never assume a task must run in Claude Code, Codex, Cursor, ChatGPT, or any other named agent.

Keep the harness lightweight. Prefer the shortest path that can produce verified evidence.

## Read order

1. Read this file.
2. Read `memory/PROJECT.md` for an existing project.
3. Read only the skill(s) relevant to the current task.
4. Read only relevant specs and source files.
5. Retrieve decisions/lessons only when the task touches them.

Do not load every skill or every memory file by default.

## Default path

`definition → ux-ui → react → verify → delivery`

Conditional capabilities:

- use `supabase` only when a backend materially improves the experience;
- use `debugger` only after an observed failure with an unclear cause;
- use `explorer` only when an existing repository is unfamiliar;
- use `reviewer` for large/risky/cross-feature work or before `DEV_READY`;
- use subagents only when context isolation or independent evidence adds value.

## Non-negotiable rules

1. Optimize for a working stakeholder experience first.
2. Do not invent business behavior that materially changes the user flow; surface blocking ambiguity.
3. Prefer existing project patterns over introducing new architecture.
4. Keep React architecture feature-based and simple.
5. Greenfield React uses TypeScript with strict mode and ESLint as the default code-quality baseline.
6. Do not suppress type/lint failures with blanket disables, unsafe `any`, or casts merely to pass checks.
7. Keep remote data access behind a feature API/hook boundary when practical.
8. Never expose secrets or privileged service credentials in browser code.
9. Persistent schema changes must be reproducible through source-controlled migrations/SQL.
10. Backend tooling must leave reusable contracts/artifacts for developer continuation.
11. Do not add abstraction without demonstrated need.
12. Do not claim success without executing relevant verification.
13. Treat `PREVIEW_READY` and `DEV_READY` as different gates.

## Package manager policy

Respect the current repository first.

Detect the package manager from `packageManager` metadata and lockfiles. Use `pnpm` for greenfield when no manager is established, but support `npm` and `yarn` without rewriting a project just to standardize tooling.

Never hard-code `npm run` when the selected manager can be detected.

## Tool policy

Use local deterministic tools first: filesystem, shell, `git`, the detected package manager, project checks, Playwright CLI, and Supabase CLI.

Use MCP for remote state/actions when useful:

- GitHub MCP — PRs, issues, remote repository state/actions;
- Vercel MCP — projects, deployments, preview state/logs;
- Supabase MCP — optional backend/database context and actions.

Supabase is not mandatory. For UI-only work, mock data is usually faster. When Supabase is used, preserve migrations/SQL, policies, generated types, API/data contracts, and server-side logic in the repository so developers can keep or migrate the backend later.

Prefer OAuth. Never commit remote-service tokens. Destructive repository/database operations and production-impact changes require explicit human approval.

## Context discipline

A task context should contain only the task/goal, relevant acceptance criteria, relevant project facts, relevant skill, and relevant source files/interfaces.

Avoid passing full conversation history, every skill, or the entire repository to a subagent.

## Subagent policy

Use the main agent for low-complexity work. Use `explorer` for unfamiliar patterns, `reviewer` for large/risky changes, `verifier` before `PREVIEW_READY`, and `debugger` only for focused root-cause analysis after a real failure.

## Verification

For greenfield React, `typecheck`, `lint`, and `build` are required deterministic gates before `PREVIEW_READY`; use the detected package manager.

For `PREVIEW_READY`, also verify the primary business journey in the running application, not only a successful build.

For `DEV_READY`, additionally verify reproducible setup, relevant tests, documentation, and backend artifacts when a backend exists.

## Architecture escalation

Start simple:

- Level 0 — React + mock data.
- Level 1 — React + feature data boundary + optional backend provider such as Supabase.
- Level 2 — add service/domain logic only when complexity requires it.
- Level 3 — dedicated backend/services when production needs require them.

Do not force later-stage architecture into a simple interface.

## Canonical locations

- `skills/` — reusable capability instructions
- `workflows/` — short execution recipes
- `subagents/` — optional isolated role contracts
- `memory/` — small verified project memory
- `rules/` — stable invariants
- `hooks/` / `scripts/` — deterministic checks
- runtime-specific config files/directories — integration only

Never duplicate canonical skill content into runtime-specific configuration.
