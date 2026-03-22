# Copilot Working Instructions (Project Guardrails)

## Non-negotiable invariants

- Do **not** break RSVP backend connectivity.
- Do **not** change the website's current primary color choices.
- Do **not** change currently selected image assets.
- If redesign work is requested, preserve existing color/image decisions unless the user explicitly approves changes.
- After any redesign/refactor, verify the main theme colors and image selections are unchanged, and RSVP still works.

## Branching and merge workflow

- Always create a new branch for new changes.
- Verify implementation works as expected before merge.
- Merge into `main` only after verification.
- Delete merged working branches (local + remote) after merge.

## Deployment logistics (current setup)

- GitHub Pages is served from:
  - Branch: `production`
  - Path: `/docs`
  - Custom domain: `aliceandjohnnywedding.com`
- Deploy workflow: `.github/workflows/deploy-main-to-production.yml`
  - Trigger: push/workflow_dispatch on `main`
  - Requires `production` environment approval
  - Builds with `npm run build`
  - Force-syncs `main` commit to `production`

## Critical note about production build input

- Because deployment syncs source from `main` to `production`, production serves the committed `docs/` artifacts in the repo.
- This means changing GitHub secret alone is **not enough** if `docs/` still contains old values.
- Before each production deployment that affects env-injected frontend values (like `VITE_GOOGLE_SCRIPT_URL`), **rebuild and commit `docs/` on `main`**:

```bash
# ensure correct local env first
npm run build
git add docs
git commit -m "Rebuild docs for production"
git push origin main
```

Then trigger/approve deploy workflow.

## Backend connection contract (RSVP)

- Frontend reads `VITE_GOOGLE_SCRIPT_URL`.
- Local development uses local `.env` (ignored from git).
- Production build uses value injected at build time; resulting URL is embedded in `docs/assets/*.js`.
- Current RSVP submit path uses a GET request to Apps Script `/exec` with query params and `source=website`.
- Apps Script must accept:
  - `name`, `email`, `attendance`, `guests`, `arrivalDate`, `dietary`, `source`

## Required checks before closing tasks

- Local RSVP submit creates a new row in Google Sheet.
- Production bundle contains expected Apps Script script ID (inspect live `index-*.js` when needed).
- No accidental edits to colors/images unless explicitly requested.
- No deployment triggers unless user asks.
