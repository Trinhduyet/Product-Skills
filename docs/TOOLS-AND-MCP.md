# Tools & MCP

Product-Skills follows one rule: **local deterministic tools first; MCP for remote state/actions when it helps.**

The tool surface is intentionally small so the harness stays fast.

## Local tool baseline

- filesystem / shell;
- git;
- package manager selected by the project;
- TypeScript/build/lint/test commands;
- Playwright CLI when browser verification is useful;
- Supabase CLI when a Supabase backend is used.

### Package manager

Respect the existing repository first:

1. `packageManager` metadata when present;
2. `pnpm-lock.yaml` → pnpm;
3. `yarn.lock` → yarn;
4. `package-lock.json` or `npm-shrinkwrap.json` → npm.

For a greenfield project with no established manager, prefer **pnpm**. npm and yarn remain supported. Harness scripts must not hard-code npm.

## Remote MCP baseline

The repository preconfigures:

- GitHub MCP — repository/PR/issue and remote source-control state;
- Vercel MCP — projects/deployments/logs/preview state;
- Supabase MCP — optional backend/database context and supported actions.

These integrations are **preconfigured, not pre-required**.

The agent should start the task without asking the user to inspect MCP settings manually. When the task first reaches a capability that needs a remote service, the agent invokes that configured MCP server. If the runtime reports that authentication is required, the user connects only that service and the agent resumes the same task.

Examples:

- implementing a local React screen does not require GitHub/Vercel/Supabase auth;
- pushing or creating a PR activates GitHub MCP and may trigger GitHub OAuth;
- deploying a verified preview activates Vercel MCP and may trigger Vercel OAuth;
- adding a real backend activates Supabase MCP/CLI and may trigger Supabase authentication.

Do not block implementation because an unrelated remote MCP is not authenticated.

## Supabase: optional backend accelerator

Supabase is optional. For a frontend-only experience, mock data is usually faster.

When a real backend is valuable, the coding agent may use Supabase MCP and CLI so the PM/BA does not have to write backend code or SQL manually. Speed does not remove the requirement for a reusable handoff.

Preserve durable backend assets in the repository:

- migrations and SQL;
- policies/auth assumptions;
- generated types;
- feature API/data contracts;
- Edge Functions/server-side logic when used;
- environment requirements;
- safe seed/demo data when useful.

A developer team can then keep Supabase, harden it, or replace the provider while retaining business/data knowledge and frontend boundaries.

Remote MCP state must never be the only source of truth for schema/backend behavior.

## Authentication and safety

Prefer OAuth where supported. Never commit PATs, access tokens, service-role keys, or other privileged credentials.

Authentication should be lazy and task-driven. Authorization is requested only when the agent first invokes a capability that requires it.

Write-capable remote tools should be scoped to the smallest useful environment. Destructive database/repository operations and production-impact actions require explicit human approval.

## Runtime configuration

- Claude Code: root `.mcp.json`.
- OpenAI Codex: `.codex/config.toml`.
- Cursor: `.cursor/mcp.json`.
- Other coding agents: configure equivalent servers through their own native MCP/tool mechanism.

These files are thin runtime-specific configuration, not a definition of which AI coding agents Product-Skills supports.
