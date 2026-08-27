# Project Memory

Keep this file short and factual. It is intended to be cheap enough to load frequently.

## Product

- Purpose: Product-Skills is a lightweight AI coding harness for PMs/BAs to create deployable React POCs that developers can continue toward production.

## Default POC stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase only when persistence/auth/storage is needed
- Vercel for preview deployment

## Architecture

- Feature-based React structure.
- Prefer `Component → feature hook → feature API → provider` for remote data.
- Do not force DDD/Clean Architecture layers into simple POCs.

## Core workflow

`poc-definition → ux-ui-design → react-poc → verify-poc → deploy-vercel`

Conditional: `supabase`, `debug`, `dev-handoff`.

## Runtime focus

- ChatGPT
- Claude Code
- Codex
- Cursor
