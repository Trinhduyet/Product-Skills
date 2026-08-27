# Runtime Compatibility

Phase 1 targets:

- ChatGPT
- Claude Code
- OpenAI Codex
- Cursor

## Canonical content

`skills/`, `subagents/`, `memory/`, `rules/`, and `workflows/` are runtime-neutral sources.

## Runtime configuration

Runtime folders contain only native configuration required by that runtime. Canonical skill content must not be copied into them.

| Runtime | Shared instructions | MCP/tool configuration |
|---|---|---|
| Claude Code | `CLAUDE.md` → `AGENTS.md` | project `.mcp.json` at repository root |
| Codex | `AGENTS.md` | `.codex/config.toml` |
| Cursor | `AGENTS.md` + Cursor rules when needed | `.cursor/mcp.json` |
| ChatGPT web | repository context when available | Plugins/Connectors/Work UI; it does not read local MCP config files |

Claude's `.mcp.json` is at the repository root because that is Claude Code's native project-scoped convention; this is not a separate canonical knowledge layer.

## MCP baseline

The default remote MCP surface is intentionally small:

- GitHub — remote repository/PR/issue state;
- Vercel — project/deployment state;
- Supabase — read-only database/docs/debugging context by default.

See [`TOOLS-AND-MCP.md`](./TOOLS-AND-MCP.md) for authentication and security policy.

## AGENTS.md

`AGENTS.md` is the shared project map and behavioral contract. Runtime-specific instructions should point back to it rather than duplicating it.

## Future runtimes

Add a runtime only after the core workflow is stable. Runtime support must not require changing canonical skill semantics.
