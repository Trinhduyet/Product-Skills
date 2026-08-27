# Product-Skills Agent Guide

Product-Skills helps PMs and BAs turn business ideas into deployable React experiences quickly while preserving a codebase developers can continue toward production.

Keep the harness lightweight. Prefer the shortest path that can produce verified evidence.

## Read order

1. Read this file.
2. Read `memory/PROJECT.md` for an existing project.
3. Read only the skill(s) relevant to the current task.
4. Read only relevant specs and source files.
5. Retrieve decisions/lessons only when the task touches them.

Do not load every skill or every memory file by default.

## Default path

```text
definition → ux-ui → react → verify → delivery
```

Conditional capabilities:

- use `supabase` only when persistence/auth/storage is required;
- use `debugger` only after an observed failure with an unclear cause;
- use `explorer` only when an existing repository is unfamiliar;
- use `reviewer` for large/risky/cross-feature work or before `DEV_READY`;
- use subagents only when context isolation or independent evidence adds value.

## Non-negotiable rules

1. Optimize for a working stakeholder experience first.
2. Do not invent business behavior that materially changes the user flow; surface blocking ambiguity.
3. Prefer existing project patterns over introducing new architecture.
4. Keep React architecture feature-based and simple.
5. Keep remote data access behind a feature API/hook boundary when practical.
6. Never expose secrets or privileged service credentials in browser code.
7. Persistent schema changes must be reproducible, preferably through migrations.
8. Do not add abstraction without demonstrated need.
9. Do not claim success without executing relevant verification.
10. Treat `PREVIEW_READY` and `DEV_READY` as different gates.

## Tool policy

Use local deterministic tools first: filesystem, shell, `git`, Node/npm, project checks, Playwright CLI, and Supabase CLI.

Use MCP only for remote state/actions that local tools do not provide cleanly:

- GitHub MCP — PRs, issues, remote repository state/actions;
- Vercel MCP — projects, deployments, preview state/logs;
- Supabase MCP — read-only database/docs/debugging by default.

Project MCP config lives in `/.mcp.json` for Claude Code, `/.codex/config.toml` for Codex, and `/.cursor/mcp.json` for Cursor.

Prefer OAuth. Never commit remote-service tokens. Remote database writes, destructive repository actions, and production-impact changes require explicit human approval.

## Context discipline

A task context should contain only:

- task/goal;
- relevant acceptance criteria;
- relevant project facts;
- relevant skill;
- relevant source files/interfaces.

Avoid passing full conversation history, every skill, or the entire repository to a subagent.

## Subagent policy

Use the main agent for low-complexity work.

Use `explorer` when an existing pattern probably already exists.
Use `reviewer` for large/risky/cross-feature changes or before developer handoff.
Use `verifier` before declaring `PREVIEW_READY`.
Use `debugger` only for focused root-cause analysis after a real failure.

Subagents receive a compact context capsule and a clear completion contract.

## Verification

For `PREVIEW_READY`, verify the primary business journey in the running application, not only a successful build.

For `DEV_READY`, additionally verify engineering checks, reproducible setup, relevant tests, and documentation.

## Architecture escalation

Start simple.

```text
Level 0: React + mock data
Level 1: React + feature data boundary + Supabase
Level 2: add feature service/domain logic only when complexity requires it
Level 3: replace provider with a dedicated backend when production needs require it
```

Do not force Level 2/3 architecture into a simple interface.

## Canonical locations

- `skills/` — reusable capability instructions
- `workflows/` — short execution recipes
- `subagents/` — optional isolated role contracts
- `memory/` — small verified project memory
- `rules/` — stable invariants
- `hooks/` / `scripts/` — deterministic checks
- `.mcp.json` — Claude Code project MCP configuration
- `.codex/`, `.cursor/` — runtime-native configuration
- `.claude/` — Claude-specific settings/rules/role wrappers when needed

Never duplicate canonical skill content into runtime-specific directories.
