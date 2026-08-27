---
name: definition
description: Turn a business idea into the minimum buildable definition for a credible interface. Use when work is new, ambiguous, or missing a clear primary journey, rules, screens, or acceptance criteria.
---

# Definition

Capture only the product and BA thinking needed to build the first credible experience.

## Goal

Produce a concise definition that answers:

- What outcome matters?
- Who is the primary actor?
- What is the main journey?
- What rules materially change behavior?
- Which screens are required?
- What must be demonstrably true when the work is done?

## Method

1. State the product outcome in one short paragraph.
2. Identify primary and secondary actors only when they affect behavior.
3. Write the shortest end-to-end journey.
4. Extract only business rules that change UI state, validation, permissions, or transitions.
5. Derive the minimum screen set from that journey.
6. Write observable acceptance criteria.
7. Surface only blocking ambiguity to the human; make reversible implementation choices yourself.

## Output

Prefer a small `docs/definition.md` or an equivalent section in an existing project document:

```markdown
# Definition

## Goal
## Actors
## Primary journey
## Business rules
## Screens
## Acceptance criteria
## Open decisions
```

Do not create a long PRD unless explicitly requested.

## Quality bar

A developer should be able to start implementation without guessing the core journey. Acceptance criteria must be observable in the running interface.
