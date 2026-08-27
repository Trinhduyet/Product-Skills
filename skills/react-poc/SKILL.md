---
name: react-poc
description: Implement a fast, maintainable React POC from the approved POC/UI spec. Use for greenfield React POCs or new frontend features that need to remain suitable for developer continuation after stakeholder validation.
---

# React POC

Build the smallest credible implementation that respects the existing codebase and preserves a clean path to production.

## Stack choice

Inside an existing repository, use its established stack and conventions unless there is a compelling reason not to.

For greenfield POCs prefer:

- React;
- TypeScript;
- Vite;
- Tailwind CSS;
- shadcn/ui or similarly mature primitives;
- React Hook Form + Zod for non-trivial forms;
- TanStack Query when remote/server state warrants it.

Do not add a dependency merely because it is listed above.

## Architecture

Prefer a feature-based structure inspired by Bulletproof React:

```text
src/
├── app/
├── components/ui/
├── features/
│   └── <feature>/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── schemas/
│       └── types/
├── config/
├── lib/
├── testing/
└── types/
```

Only create folders the feature actually needs.

## Production seam

Keep remote/data access behind a feature-level seam when practical:

```text
Component → feature hook → feature API → provider
```

This allows:

```text
POC: mock or Supabase provider
Later: HTTP/backend provider
```

Do not scatter provider-specific calls throughout page components.

## Business logic

Simple presentation logic can remain local.

Extract logic when it is:

- reused;
- business-critical;
- hard to test inside a component;
- complex enough to obscure rendering.

Do not create domain/service/repository layers preemptively for a simple POC.

## Implementation priorities

1. Primary acceptance journey works.
2. UI states needed by that journey exist.
3. Forms and actions provide clear feedback.
4. Responsive layout does not break.
5. Types and boundaries remain understandable.
6. Reuse existing primitives/patterns before creating new ones.

## Code quality

- TypeScript should remain strict where the project supports it.
- Avoid `any` unless a temporary boundary is unavoidable and documented.
- Keep feature internals local; avoid casual cross-feature coupling.
- Shared components belong in shared UI only when genuinely reusable.
- Delete dead placeholder/demo code that no longer serves the POC.
- Avoid giant page components that mix fetching, rules, form logic, and layout.

## POC speed

Do not block POC delivery on production-hardening work that is safely deferrable, such as exhaustive unit coverage, advanced observability, or premature backend extraction.

Record meaningful deferred hardening in the POC notes for `dev-handoff`.

## Before verification

Run the fastest deterministic checks available, usually:

```text
typecheck
build
relevant tests
```

Do not claim the user journey works based only on compilation.
