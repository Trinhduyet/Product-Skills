---
name: supabase
description: Add Supabase only when the experience needs persistence, authentication, storage, or realistic shared data. Keep schema and policies reproducible and client boundaries safe enough for continued development.
---

# Supabase

Use this skill only when data/auth/storage materially improves the experience being built.

## Default posture

For UI-only work, prefer mock data and skip Supabase.

When Supabase is needed:

- keep migrations/versioned schema in the repository;
- use publishable/browser-safe credentials only in frontend code;
- never expose service-role or other privileged keys to the browser;
- add RLS for user- or role-owned data where relevant;
- keep provider calls behind feature-level API/hooks rather than scattering them through page components;
- keep seed/demo data non-sensitive and reproducible.

## Tool policy

Use the Supabase CLI and migrations for schema writes because they are reproducible and reviewable.

The repository MCP baseline is read-only and intended for remote database/docs/debugging context. If write-capable Supabase MCP access is needed, scope it to a non-production `project_ref` first and require explicit approval for destructive or production-impact operations.

Never make remote MCP writes the only record of a schema change.

## Repository shape

Prefer:

```text
supabase/
├── config.toml
├── migrations/
└── seed.sql
```

Use the project's existing Supabase conventions when they already exist.

## Auth

Do not add real authentication merely to make a demo look complete. Use real auth when identity/permissions are part of the behavior being validated or are needed for the next development stage.

## Completion

Before sharing or handoff, verify that a fresh environment can reproduce the schema and that the frontend does not require privileged credentials.
