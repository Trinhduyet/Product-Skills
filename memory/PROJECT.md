# Project Memory

Keep this file short and factual. It should be cheap enough to load frequently.

## Product

- Purpose: Product-Skills is a lightweight AI coding harness for PMs/BAs to create deployable React experiences that developers can continue toward production.

## Default frontend stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase only when persistence/auth/storage is needed
- Vercel for preview deployment

## Architecture

- Feature-based React structure.
- Prefer `component → feature hook → feature API → provider` for remote data.
- Do not force DDD/Clean Architecture layers into simple frontend work.

## Core path

`definition → ux-ui → react → verify → delivery`

Conditional: `supabase`, `explorer`, `reviewer`, `debugger`.

## Runtime focus

- ChatGPT
- Claude Code
- Codex
- Cursor
