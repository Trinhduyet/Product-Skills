---
name: verify
description: Independently prove that the main user journey works before a preview is shared. Use after implementation and before delivery to run deterministic checks plus acceptance verification in the running application.
---

# Verify

A successful build is necessary but not sufficient.

## Deterministic checks

Inspect project scripts first, then run the fastest relevant checks, typically:

- TypeScript/typecheck;
- production build;
- relevant lint/tests.

Do not invent commands.

## Acceptance verification

Exercise the primary journey in the running application. Check observable behavior such as:

- navigation reaches the intended screen;
- forms validate meaningful required inputs;
- primary actions complete;
- state/status changes appear correctly;
- data persists when persistence is required;
- role-specific behavior works when roles matter.

## UX/UI smoke

For important screens verify:

- the primary action is understandable and visible;
- no obvious overflow or clipping;
- relevant loading/error/empty feedback works;
- mobile and desktop are usable;
- labels and keyboard focus are not obviously broken.

Recommended widths: **375 / 768 / 1024 / 1440**.

Do not turn this into visual-regression infrastructure unless requested.

## Independence

When a verifier subagent is available, give it only:

- acceptance criteria;
- running URL/environment;
- demo identity/data if required.

Do not preload the implementer's reasoning or confidence claims.

## Verdict

Return one of:

- `PREVIEW_READY` — primary journey verified and safe to share;
- `VERIFY_FAILED` — observed failure with concise evidence;
- `VERIFY_BLOCKED` — environment/tool issue prevents meaningful verification.

Never return `PREVIEW_READY` because the code merely looks correct.
