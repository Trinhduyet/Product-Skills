---
name: delivery
description: Publish a verified React experience to Vercel and, when requested, harden the same repository for developer continuation. Use after verification or when preparing the accepted preview for engineering handoff.
---

# Delivery

Delivery has two depths: stakeholder preview and developer-ready handoff.

## Tool policy

Use local `git` for deterministic repository operations. Use GitHub MCP when remote PR/issue/repository state is needed.

Use Vercel MCP for remote project/deployment state and Vercel CLI when a deterministic local deployment command is the shorter path.

Prefer OAuth-based MCP authentication. Do not commit GitHub PATs, Vercel tokens, or other remote-service credentials.

## Preview delivery

Before deployment:

1. run relevant deterministic checks;
2. validate required environment variables;
3. ensure secrets are not in browser/source control;
4. deploy to Vercel;
5. confirm the preview URL is reachable;
6. exercise the main acceptance journey against the deployed URL.

A successful deployment alone is not `PREVIEW_READY`.

## Developer-ready depth

After stakeholder acceptance, harden the same repository rather than creating a replacement implementation.

Check:

- feature boundaries and data access remain understandable;
- TypeScript/build/lint checks pass;
- important business behavior has proportionate tests;
- Supabase migrations/RLS/auth are reproducible and reviewed when relevant;
- `.env.example` and local setup are accurate;
- known deferred work and architecture decisions are visible;
- unnecessary demo hacks, dead mocks, hidden credentials, and temporary bypasses are removed.

Return `DEV_READY` only when the repository is genuinely understandable and runnable by a developer who did not author the preview.
