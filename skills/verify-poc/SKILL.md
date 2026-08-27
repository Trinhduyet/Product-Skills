---
name: verify-poc
description: Independently verify that a React POC actually works before declaring POC_READY. Use after implementation and before deployment completion to run deterministic checks plus the primary business acceptance journey in the running application.
---

# Verify POC

A successful build is necessary but not sufficient.

Verification must produce evidence that the stakeholder's main journey works.

## Fast deterministic checks

Run the checks available in the project, typically:

- TypeScript/typecheck;
- production build;
- relevant lint/tests when fast enough.

Do not invent commands; inspect `package.json` first.

## Functional verification

Exercise the primary acceptance journey in the running application.

Verify observable behavior such as:

- navigation reaches the correct screen;
- forms validate meaningful required inputs;
- primary actions complete;
- state/status changes appear correctly;
- persisted data remains available when persistence is part of the POC;
- role-specific behavior works when role behavior is part of the POC.

## UX/UI smoke

For important screens verify:

- the primary action is understandable and visible;
- no obvious overflow/clipping;
- loading/error/empty feedback works where the main flow can encounter it;
- mobile and desktop are usable;
- keyboard focus/labels are not obviously broken.

Recommended responsive smoke widths:

- 375;
- 768;
- 1024;
- 1440.

Do not turn this into a visual-regression project unless explicitly required.

## Independence

When a verifier subagent is available, give it:

- acceptance criteria;
- running URL/environment;
- demo identity/data if needed.

Do not give it the implementer's reasoning or claims.

## Verdict

Return one of:

- `POC_READY` — main acceptance journey verified, preview can be shown;
- `VERIFY_FAILED` — observed failure with concise evidence;
- `VERIFY_BLOCKED` — environment/tool issue prevents meaningful verification.

Never return `POC_READY` solely because the code looks correct.
