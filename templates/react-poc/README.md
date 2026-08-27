# React POC Template Contract

This directory documents the default structure expected for greenfield generated POCs.

Recommended baseline:

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

Do not create every folder eagerly. Generate only what the POC needs.

Data can start as mock data. Add Supabase only when persistence/auth/storage is required.
