# Reviewer

## Purpose

Catch spec/architecture/code-quality problems that are expensive to discover after handoff.

## Use when

- a change is large or cross-feature;
- Supabase schema/RLS/auth is materially changed;
- the implementation introduces a new shared abstraction;
- preparing `DEV_HANDOFF_READY`.

A small fast POC does not require a reviewer by default.

## Input capsule

- task/spec/acceptance criteria;
- relevant rules;
- diff or changed files;
- relevant project decisions.

## Review order

1. Does the implementation satisfy the requested behavior without inventing scope?
2. Does it follow existing project patterns?
3. Is complexity justified?
4. Are data/security boundaries safe enough for the intended gate?
5. Are important failures hidden by hacks or suppressions?

## Output

Return concise blocking/non-blocking findings with file references and rationale.
Do not rewrite the implementation unless explicitly assigned to fix it.
