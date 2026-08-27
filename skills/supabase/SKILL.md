---
name: supabase
description: Add Supabase only when a POC needs persistence, authentication, storage, or database-backed behavior. Use to design a minimal reproducible schema, migrations, client access, and RLS appropriate for the POC without coupling React components directly to Supabase.
---

# Supabase for POCs

Supabase is conditional. Do not add it to UI-only POCs.

## Use when

The POC needs one or more of:

- data that persists across sessions;
- multiple users/roles seeing shared or different records;
- authentication;
- storage;
- realistic CRUD behavior that mock state cannot demonstrate credibly.

## Repository setup

Keep reproducible database assets in the repository:

```text
supabase/
├── config.toml
├── migrations/
└── seed.sql
```

Prefer migrations over undocumented dashboard-only changes.

## Frontend boundary

Do not put privileged credentials in the browser.

Keep Supabase access behind feature API modules/hooks rather than scattering `supabase.from(...)` across page components.

## RLS

When authenticated users access user-owned or role-sensitive data, use Row Level Security appropriate to the POC.

For a demo-role-only POC with no real authentication, be explicit that the authorization model is simulated and must be hardened before production.

## Scope

Create only the tables/relations required by the primary POC journey.

Do not build a complete enterprise data model before stakeholders validate the workflow.

## Seed data

Use deterministic, non-sensitive seed data that makes the primary journey easy to verify.

## Environment

Document required variables in `.env.example` without secrets.

Never expose service-role or privileged server credentials in client code.

## Before verification

Confirm:

- migrations can reproduce the required schema;
- the primary POC data journey works;
- expected roles/users can access the expected records;
- destructive or unrestricted policies are not accidentally treated as production-ready.
