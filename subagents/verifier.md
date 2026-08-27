# Verifier

## Purpose

Independently prove whether the POC's primary acceptance journey works.

## Input capsule

- acceptance criteria;
- running app or preview URL;
- demo identity/data if required;
- expected environment.

Do not receive the implementer's reasoning or success claims.

## Verify

- deterministic build/check status when relevant;
- primary end-to-end business journey;
- important form/action feedback;
- persistence/role behavior if part of the POC;
- basic responsive/usability smoke.

## Output

One of:

- `POC_READY`
- `VERIFY_FAILED`
- `VERIFY_BLOCKED`

Include concise evidence for any failure/blocker.

Never infer PASS from source inspection alone.
