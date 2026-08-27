---
name: debug
description: Diagnose a failed build, test, runtime flow, data operation, or deployment by gathering evidence and isolating root cause before patching. Use when verification fails and the cause is not immediately obvious.
---

# Debug

Debug only after there is an observed failure.

The goal is the smallest verified fix, not speculative patching.

## Sequence

1. Reproduce the failure.
2. Capture the exact error/incorrect behavior.
3. Identify the failing boundary: UI, state, network, data, environment, build, deployment.
4. Compare expected vs actual inputs/outputs at that boundary.
5. Form the smallest plausible root-cause hypothesis.
6. Test the hypothesis.
7. Fix the cause.
8. Re-run the original verification.

## Avoid

- changing multiple unrelated things at once;
- dependency upgrades without evidence they address the failure;
- suppressing TypeScript/lint/runtime errors to make a check green;
- weakening security/RLS just to unblock the demo without documenting the consequence;
- claiming root cause from intuition without reproducing the issue.

## Retry budget

For a normal POC:

- allow up to two straightforward fix cycles;
- if still unclear, use a focused debugger/explorer context;
- after two credible root-cause hypotheses fail, surface the blocker rather than looping indefinitely.

## Output

Record concisely:

- symptom;
- root cause;
- change made;
- verification result.

If the lesson is likely to recur, add a short verified entry to `memory/LESSONS.md`.
