---
name: supabase
description: Optionally add a real backend when persistence, authentication, storage, shared data, or server-side behavior materially improves the experience. Use Supabase tools to move quickly while preserving SQL, migrations, policies, types, and API/data contracts developers can continue toward production.
---

# Supabase

Supabase is an **optional backend accelerator**, not a required part of every React experience.

PM/BA should not need to write SQL or backend code manually. The coding agent may use Supabase MCP/CLI and project tooling to create the backend, but all durable backend work must remain inspectable, reproducible, and reusable in source control.

## When to use

Use Supabase when the experience benefits from one or more of:

- persistent/shared data;
- authentication or role-aware behavior;
- file/storage workflows;
- relational business data;
- server-side functions or protected operations;
- realistic backend behavior needed for stakeholder validation.

For UI-only work, prefer mock data and skip Supabase.

## Production-continuation contract

When Supabase is used, preserve in the repository as applicable:

- `supabase/migrations/` and SQL;
- RLS policies and authorization assumptions;
- seed/demo data that is safe to share;
- generated database types;
- feature API/data contracts used by the frontend;
- Edge Functions or other server-side logic;
- environment variable requirements;
- notes for any remote-only resource that cannot be fully represented as code.

These artifacts are developer-owned assets. Developers may keep Supabase for production, harden the implementation, or migrate to another backend while retaining business rules, SQL/data modeling knowledge, API contracts, and frontend boundaries.

## Safety

- Use browser-safe/publishable credentials only in frontend code.
- Never expose service-role or other privileged keys to the browser.
- Add RLS for user/role-sensitive access when relevant.
- Keep provider calls behind feature API/hooks rather than scattering them through page components.
- Never make remote MCP changes the only record of a schema or backend change.
- Destructive or production-impact changes require explicit approval.

## Tool policy

Use whichever path is fastest **without losing reproducibility**:

- Supabase MCP for remote project/database context and supported actions;
- Supabase CLI for local development, migrations, linking, and reproducible workflows;
- version-controlled SQL/migrations as the durable source of truth.

A repository may keep Supabase MCP read-only by default and enable scoped write access for a non-production project when useful.

## Suggested repository shape

```text
supabase/
├── config.toml
├── migrations/
├── functions/       # only when server-side functions are needed
└── seed.sql          # optional
```

## Completion

Before sharing, verify the required backend journey actually works. Before `DEV_READY`, verify a developer can understand/reproduce the data model and backend logic from repository artifacts rather than relying on hidden remote state.
