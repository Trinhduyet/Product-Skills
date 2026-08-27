---
name: dev-handoff
description: Harden an accepted POC so a developer team can confidently continue the same repository toward production. Use only after stakeholder feedback validates the POC direction or when the user explicitly requests developer-ready quality.
---

# Developer Handoff

Do not run full production hardening before the POC earns it.

This skill upgrades the accepted POC from `POC_READY` to `DEV_HANDOFF_READY` without rewriting the product.

## Review scope

### Architecture

- feature boundaries are understandable;
- remote/data access is behind clear feature seams;
- no unnecessary abstractions were introduced;
- repeated business-critical logic is testable and appropriately extracted.

### Type and build quality

- production build succeeds;
- TypeScript remains strict/clean enough for the project;
- avoid unexplained `any`, dead code, and temporary demo hacks that hide behavior.

### Data

If Supabase is used:

- migrations reproduce schema;
- `.env.example` is accurate;
- important RLS/auth assumptions are documented/reviewed;
- demo-only authorization shortcuts are explicit.

### Tests

Prioritize tests that protect important behavior:

- business-critical transformations/rules;
- integration behavior for important features;
- at least the critical E2E journey when practical.

Do not chase arbitrary coverage percentages.

### Documentation

A developer should be able to answer:

- how do I run it locally?
- how is the frontend organized?
- where does data access live?
- how do I reproduce the database?
- what is intentionally deferred from the POC?
- what important decisions were made?

Update README/architecture notes accordingly.

## Final gate

Return `DEV_HANDOFF_READY` only when:

- agreed engineering checks pass;
- critical known failures are resolved or explicitly accepted;
- setup is reproducible;
- important technical debt from the POC is visible rather than hidden.
