---
name: ux-ui-design
description: Convert a POC definition into a coherent, implementable user flow and React UI direction. Use before creating or significantly changing screens, navigation, interaction states, responsive behavior, or visual hierarchy.
---

# UX/UI Design for Fast POCs

Design enough to make the POC understandable, credible, and quick to implement.

Do not turn design into a separate long-running phase.

## Start from the primary journey

Derive the interface from:

1. actor;
2. user goal;
3. action sequence;
4. information required at each step;
5. system feedback after each important action.

Prefer the fewest screens that make the journey clear.

## Screen specification

For each required screen identify:

- purpose;
- primary action;
- essential information;
- important secondary actions;
- state variants that affect the primary journey.

Consider these states when relevant:

- default;
- loading;
- empty;
- validation/error;
- success/confirmation;
- disabled/permission-limited.

Do not generate every theoretical state if it cannot occur in the POC.

## Visual direction

Use a small consistent direction rather than inventing per-page styles.

For greenfield business applications default toward:

- clear information hierarchy;
- restrained professional visual language;
- consistent spacing and typography;
- shadcn/ui-quality primitives where practical;
- strong distinction between primary, secondary, and destructive actions;
- familiar controls before custom interaction patterns.

Avoid decorative complexity that slows implementation or harms clarity.

## Responsive baseline

Smoke-check key screens at approximately:

- 375 px mobile;
- 768 px tablet;
- 1024 px laptop;
- 1440 px desktop.

A POC does not need bespoke art direction at every breakpoint. It must avoid overflow, hidden primary actions, unusable forms, and broken navigation.

## Accessibility baseline

At minimum:

- visible keyboard focus;
- labels for form controls;
- useful validation/error text;
- semantic interactive elements;
- sufficient contrast for important text/actions;
- avoid relying on color alone for important status;
- preserve reduced-motion expectations if animations are used.

## Output

For new POCs create or update `docs/ui-spec.md` with:

```markdown
# UI Spec

## Navigation
## Primary user flow
## Screens
### Screen name
- Purpose
- Layout
- Primary action
- Important states

## Design direction
## Responsive notes
## Accessibility notes
```

Keep it small. The React implementer should be able to act directly on it.

## Reuse first

Inside an existing project:

- inspect current components and layout patterns;
- reuse the design system before adding new primitives;
- do not introduce a second component language for one POC feature.

## Avoid

- generic "AI dashboard" visual clutter;
- gradients, glass effects, animations, or charts without product value;
- creating a large token system before the POC demonstrates a need;
- designing screens disconnected from acceptance criteria.
