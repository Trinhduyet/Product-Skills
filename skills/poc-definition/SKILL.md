---
name: poc-definition
description: Turn a business idea into the minimum buildable POC definition by combining product intent, BA requirements, business rules, primary flow, screens, and acceptance criteria. Use before building a new POC or when a request is too ambiguous to implement safely.
---

# POC Definition

Turn business language into a compact buildable specification without producing a long PRD.

The objective is **clarity sufficient to build**, not exhaustive product documentation.

## What to establish

Capture only what materially affects the POC:

- **Goal** — what outcome the POC demonstrates.
- **Actors** — who performs the primary actions.
- **Primary journey** — the shortest end-to-end path that proves the idea.
- **Business rules** — rules that change behavior or available actions.
- **Screens** — only the screens needed to support the journey.
- **Data needs** — mock vs persistent data; auth only if necessary.
- **Acceptance criteria** — observable behaviors the verifier can exercise.
- **Out of scope** — explicit cuts that protect POC speed.

## Product + BA balance

Use Product thinking for:

- why the workflow matters;
- who it is for;
- which outcome and scenario are important;
- what can be cut from the first POC.

Use BA thinking for:

- behavior;
- transitions;
- permissions;
- business rules;
- edge cases that block the primary flow;
- observable acceptance criteria.

Do not split this into separate Product and BA processes unless the request genuinely requires deeper discovery.

## Ambiguity policy

Do not ask questions about implementation choices the coding agent can decide safely.

Ask only when ambiguity changes:

- a user's allowed action;
- the primary workflow;
- a material business rule;
- destructive behavior;
- security/permission expectations;
- what must be demonstrated to stakeholders.

Otherwise choose a reversible default and record it as an assumption.

## Recommended output

Create or update `docs/poc-spec.md`:

```markdown
# <POC name>

## Goal

## Actors

## Primary journey

## Business rules
- RULE-01 ...

## Screens

## Data / Auth

## Acceptance criteria
- AC-01 ...

## Assumptions

## Out of scope
```

Keep the document concise enough that an implementer can read it in a few minutes.

## Quality checks

Before handing off to UI/build:

- the primary journey has a clear start and end;
- each important rule is testable;
- acceptance criteria describe behavior, not implementation;
- optional ideas have not leaked into required scope;
- unresolved ambiguity is either non-blocking or clearly surfaced.

## Avoid

- long product strategy documents for a small POC;
- story points, RACI, sprint ceremony, or corporate process overhead;
- inventing requirements because they seem "best practice";
- defining backend architecture unless it changes the POC behavior.
