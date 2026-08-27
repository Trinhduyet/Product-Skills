# React Template Contract

Default structure for greenfield generated interfaces:

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

## Required greenfield baseline

- React + TypeScript + Vite
- TypeScript strict mode
- ESLint configured for React + TypeScript
- Tailwind CSS
- shadcn/ui or equivalent mature primitives
- package manager: prefer pnpm when no project convention exists; npm/yarn remain supported

The generated project must expose deterministic scripts named at least:

- `typecheck`
- `lint`
- `build`

`typecheck`, `lint`, and `build` must pass before the project is considered ready to share.

Do not create every folder eagerly. Generate only what the current experience needs.

Data can start as mock data. Add Supabase only when a real backend improves the experience. When Supabase is used, keep migrations/SQL, policies, types, API/data contracts, and server-side logic in source control so developers can continue or migrate the backend later.
