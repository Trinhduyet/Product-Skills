# Workflow: Idea to POC

Use the shortest path that produces a credible stakeholder demo.

```text
poc-definition
      ↓
ux-ui-design
      ↓
react-poc
      │
      ├── persistence/auth required? → supabase
      │
      ▼
verify-poc
      │
      ├── failure, obvious cause → fix → verify
      └── failure, unclear cause → debug → verify
      ↓
deploy-vercel
      ↓
POC_READY
```

## Fast-path rules

- Do not spawn subagents by default.
- Do not create a formal task graph for a small greenfield POC.
- Do not add Supabase for UI-only demos.
- Do not run developer-handoff hardening before stakeholder validation.
- Ask PM/BA only for business ambiguities that materially change the POC.

## Escalation

Use `explorer` when working in an unfamiliar existing codebase.
Use a reviewer when the diff is large, cross-feature, data/security-sensitive, or preparing for developer handoff.
Use a verifier before `POC_READY`.
Use a debugger only after an observed failure needs root-cause isolation.
