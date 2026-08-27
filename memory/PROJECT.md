# Project Memory

Keep this file short and factual. It should be cheap enough to load frequently.

## Product

- Purpose: lightweight AI coding harness for PMs/BAs to create deployable React experiences that developers can continue toward production.
- Core is runtime-agnostic; runtime-specific config is additive.

## Default frontend stack

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- package manager: respect existing; prefer pnpm for greenfield; npm/yarn supported
- optional backend: Supabase when persistence/auth/storage/server behavior is useful
- Vercel for preview delivery

## Architecture

- Feature-based React structure.
- Prefer `component → feature hook → feature API → provider` for remote data.
- Backend artifacts must remain reproducible in source control.
- Do not force DDD/Clean Architecture layers into simple frontend work.

## Core path

`definition → ux-ui → react → verify → delivery`

Conditional: `supabase`, `explorer`, `reviewer`, `debugger`.

## Runtime compatibility

Any capable coding agent may use the canonical harness. Project configuration is currently provided for Claude Code, OpenAI Codex, and Cursor; ChatGPT and other agents can integrate through their own repository/tool mechanisms.
