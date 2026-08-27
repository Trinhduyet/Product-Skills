---
name: react
description: Build or change a React interface quickly while preserving a clean path for developers to continue the same codebase. Use for React/TypeScript implementation, feature structure, forms, routing, data seams, and reusable UI composition.
---

# React

Optimize for a working interface first, with simple boundaries that remain maintainable.

## Greenfield baseline

Prefer the existing repository stack. If starting fresh, default to:

- React + TypeScript + Vite;
- Tailwind CSS;
- shadcn/ui or equivalent mature primitives;
- React Hook Form + Zod for non-trivial forms;
- TanStack Query when remote/server state justifies it.

Do not add dependencies without current value.

## Structure

Use feature-based organization inspired by Bulletproof React:

```text
src/
├── app/
├── components/ui/
├── features/
├── config/
├── lib/
├── testing/
└── types/
```

Inside a feature, create only folders actually needed, such as `api`, `components`, `hooks`, `schemas`, `types`.

## Production seam

Keep provider/data access out of large page components. Prefer:

```text
component → feature hook → feature API → provider
```

The provider may initially be mock data or Supabase. A future backend should be replaceable behind the feature API without rewriting the UI.

## Implementation rules

- Reuse existing components and patterns before inventing new shared abstractions.
- Keep business-critical transitions understandable and close to the owning feature.
- Model loading, empty, validation, error, and success states when the journey can reach them.
- Keep TypeScript strictness and existing lint conventions intact.
- Do not prematurely introduce DDD/service/repository layers for simple UI work.
- Avoid giant page components; extract when behavior or reuse gives a concrete reason.

## Completion

Implementation is not complete until the relevant deterministic checks run and the main acceptance journey is verified in the running application.
