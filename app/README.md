# Admin Settings App

React demo implementing the **Admin Dashboard / System Settings** experience with Supabase auth and persisted **Settings Presets**.

## Stack

- React 19 + TypeScript (strict)
- Vite
- Tailwind CSS v4
- shadcn/ui-style primitives (Radix UI)
- Supabase Auth + Postgres (RLS)

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Set these values in `.env.local`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` (publishable or anon key only)

Apply database migrations from the repository root:

```bash
# with Supabase CLI linked to the project
supabase db push
```

Or run the SQL in `supabase/migrations/` against your Supabase project.

## Scripts

```bash
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
pnpm preview
```

## Structure

```text
src/
├── app/
├── components/ui/
├── features/
│   ├── auth/
│   └── settings/
├── config/
├── lib/
└── types/
```

## Phase 2 capabilities

- Email/password sign-in and sign-up
- Protected admin/settings area with session restoration
- `settings_presets` CRUD scoped per user via RLS
- Source-controlled migration in `supabase/migrations/`

## Demo credentials (optional seed)

After running `supabase/seed.sql` against your project:

- Email: `admin.demo@euroland.com`
- Password: `Phase2Demo123!`

Use only for stakeholder demos — not for production.
