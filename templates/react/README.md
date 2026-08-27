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

Do not create every folder eagerly. Generate only what the current experience needs.

Data can start as mock data. Add Supabase only when persistence/auth/storage is required.
