# Cursor configuration

Canonical skills remain in `/skills` and shared behavior remains in `/AGENTS.md`.

`.cursor/mcp.json` preconfigures project-scoped GitHub, Vercel, and Supabase MCP servers.

## Connection behavior

Cursor should not require the user to manually pre-check every MCP connection before starting a task.

Use remote tools on demand:

- GitHub MCP when remote repository/PR/push state is needed;
- Vercel MCP when deployment, preview, or logs are needed;
- Supabase MCP only when the task actually needs an optional backend.

If the first tool call requires OAuth/authentication, Cursor should request that connection at that moment, then resume the same task after authorization. Unrelated MCP servers do not need to be connected.

This keeps the happy path fast while the repository still ships with the required integrations ready to activate.

Keep other Cursor-specific rules/hooks/agent wrappers here only when needed. Do not duplicate canonical skill instructions.
