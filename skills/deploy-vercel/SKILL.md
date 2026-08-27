---
name: deploy-vercel
description: Deploy a verified React POC to Vercel and confirm the preview is reachable and usable. Use after local verification passes, or to update an existing preview after a verified fix.
---

# Deploy to Vercel

Deployment is part of POC evidence, not a substitute for verification.

## Before deploy

Confirm:

- production build succeeds;
- required environment variable names are known;
- no secret is committed to the client/source;
- the intended project/root directory is clear.

## Deploy

Prefer the project's established Vercel/GitHub workflow.

If no workflow exists, create the minimum configuration necessary for a standard React/Vite deployment.

Do not introduce server-side Vercel architecture when the POC only needs static frontend hosting.

## Environment

For Supabase POCs, ensure public client configuration is present in the appropriate Vercel environment.

Never put privileged service credentials in browser environment variables.

## After deploy

Confirm:

- deployment status is successful;
- preview URL is reachable;
- the app loads without an obvious fatal runtime error;
- the primary acceptance journey is smoke-tested against the deployed environment when practical.

## Result

Return:

- preview URL;
- deployment status;
- any required demo role/data notes;
- verification status.

A URL that renders an error page is not a successful POC deployment.
