# Tools & MCP

Product-Skills follows one rule: **local deterministic tools first; MCP for remote state and remote actions.**

This keeps the happy path fast and reduces tool/context overhead.

## Default tool surface

| Capability | Default | Why |
|---|---|---|
| Filesystem / shell | Native agent tools | Fast local read/write and execution |
| Git | Local `git` | Deterministic diff/status/commit operations |
| Node / npm | Local CLI | Install, typecheck, build, lint, test |
| Browser verification | Playwright CLI when available | Repeatable acceptance checks |
| Supabase schema | Supabase CLI + migrations | Reproducible schema changes |
| GitHub remote state | GitHub MCP | PRs, issues, repository state, remote actions |
| Vercel remote state | Vercel MCP | Projects, deployments, logs, preview state |
| Supabase remote state | Supabase MCP | Database/docs/debugging context |

Do not expose every possible MCP server by default. Add a tool only when it materially helps the current workflow.

## Shared MCP endpoints

The repository ships project configuration for three remote MCP servers:

- GitHub: `https://api.githubcopilot.com/mcp/`
- Vercel: `https://mcp.vercel.com`
- Supabase: `https://mcp.supabase.com/mcp?read_only=true&features=docs%2Cdatabase%2Cdebugging`

The committed Supabase connection is intentionally **read-only**. Schema writes should normally happen through versioned migrations and the Supabase CLI.

If remote Supabase writes are truly useful, scope the MCP server to a non-production project first, for example:

`https://mcp.supabase.com/mcp?project_ref=<PROJECT_REF>&features=docs%2Cdatabase%2Cdebugging%2Cdevelopment`

Do not enable write-capable database MCP access against production as a default.

## Claude Code

Claude Code project-scoped MCP configuration lives at the repository root in `.mcp.json`.

After opening the repository:

1. run `/mcp`;
2. approve the project MCP configuration;
3. authenticate `github`, `vercel`, and `supabase` through their OAuth flows.

No PAT/token belongs in `.mcp.json`.

## OpenAI Codex

Codex project MCP configuration lives in `.codex/config.toml` for trusted projects.

Useful commands:

```bash
codex mcp list
codex mcp login github
codex mcp login vercel
codex mcp login supabase
```

The committed config uses `default_tools_approval_mode = "writes"` so reads can stay lightweight while mutation-capable tools require approval.

## Cursor

Cursor project MCP configuration lives in `.cursor/mcp.json`.

Authenticate from **Settings → Tools & MCP**, or with the Cursor CLI when available:

```bash
agent mcp login github
agent mcp login vercel
agent mcp login supabase
```

## ChatGPT

ChatGPT web does not read repository-local Codex/Claude/Cursor MCP config files. Use ChatGPT Plugins/Connectors/Work integrations for remote GitHub, Vercel, or Supabase access.

The repository config is still useful for Codex CLI/IDE and other local coding-agent runtimes working on the same project.

## Approval policy

PM/BA should approve **business/security/production-impact decisions**, not low-level shell commands.

Human approval is appropriate for:

- destructive GitHub actions or force operations;
- production deployment changes;
- write-capable remote database operations;
- deleting or rewriting persistent data;
- enabling privileged credentials or broad access.

Normal local reads, builds, typechecks, linting, and non-destructive verification should not require ceremony.

## Secrets

Prefer OAuth for remote MCP servers.

Never commit:

- GitHub PATs;
- Vercel tokens;
- Supabase access tokens;
- service-role keys;
- production secrets.

Keep credentials in the runtime's OAuth/keychain/session store or local environment only.

## Official references

- Claude Code MCP: https://code.claude.com/docs/en/mcp
- Codex MCP: https://developers.openai.com/codex/mcp
- Cursor MCP: https://cursor.com/docs/mcp
- GitHub MCP: https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/set-up-the-github-mcp-server
- Vercel MCP: https://vercel.com/docs/agent-resources/vercel-mcp
- Supabase MCP: https://supabase.com/docs/guides/ai-tools/mcp
