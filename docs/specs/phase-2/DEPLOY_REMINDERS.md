# Phase 2 — Deploy reminders

Check before **push to production** or **go-live**:

| Item | When | Action |
|------|------|--------|
| **`WISEWAVE_API_KEY`** | Before production push | Set a long random secret in Vercel/host env. Locks `POST /api/wisewave/sessions` to Bearer auth. Public `/reflect` uses `/api/reflect/start` (no key). Leave **unset** for local dev if testing both routes open. |
| **`PERSONAL_INTEGRATION_FACILITATOR_KEY`** | Before facilitator console in prod | Set for `/integration/facilitator` API access. |
| **`RESEND_API_KEY` + `EMAIL_FROM`** | When prep/follow-up emails should send | Optional locally (URLs log to console). |
| **`POSTGRES_URL`** | All Phase 2 domain features | Run `npm run db:migrate` after schema changes. |
| **Stripe live keys** | Separate go-live gate | Test mode verified (Gate 5); live switch is explicit. |

Added: 2026-07-05 (FS-007 / user request — remind on push).
