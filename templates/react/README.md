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

Default stack: React + TypeScript + Vite + Tailwind + shadcn/ui.

Package manager policy:

- respect an existing repository's `packageManager` metadata/lockfile;
- prefer pnpm for a new project when none is selected;
- keep npm and yarn compatible.

Do not create every folder eagerly. Generate only what the current experience needs.

Data can start as mock data. Add Supabase only when a real backend improves the experience. If Supabase is used, keep SQL/migrations, policies, types, feature API contracts, and server-side logic in source control so developers can continue or migrate the backend later.
