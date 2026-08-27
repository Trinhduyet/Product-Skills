# Workflow: Idea to Preview

Use the shortest path that produces a credible stakeholder experience.

```text
definition
    ↓
ux-ui
    ↓
react
    │
    ├── persistence/auth/storage required? → supabase
    │
    ▼
verify
    │
    ├── obvious failure → fix → verify
    └── unclear failure → debugger → verify
    ↓
delivery
    ↓
PREVIEW_READY
```

## Fast-path rules

- Do not spawn subagents by default.
- Do not create a formal task graph for small greenfield work.
- Do not add Supabase to UI-only work.
- Do not run developer hardening before stakeholder validation.
- Ask PM/BA only about ambiguity that materially changes user behavior.

## Escalation

Use `explorer` in an unfamiliar existing codebase.
Use `reviewer` for large, cross-feature, data/security-sensitive changes or before developer handoff.
Use `verifier` before `PREVIEW_READY`.
Use `debugger` only after an observed failure needs root-cause isolation.
