# 1320 Blueprint Experience API v1.0

Private Coze / 扣子 bridge. Calculates Blueprint on the 1320 server and returns only approved external fields.

## Endpoints

| Method | Path | Auth |
|---|---|---|
| `POST` | `/v1/blueprints/resolve` | Bearer API key + `X-Client-Id` |
| `GET` | `/v1/blueprints/{blueprint_id}/experience-profile` | Bearer API key + `X-Client-Id` |
| `GET` | `/v1/health` | none |

Next.js also exposes the same handlers under `/api/v1/...`. Rewrites map `/v1/...` → `/api/v1/...`.

## Env

```bash
BLUEPRINT_EXPERIENCE_API_KEY=...
BLUEPRINT_EXPERIENCE_ID_SECRET=...   # optional; defaults to API key
BLUEPRINT_EXPERIENCE_ALLOWED_CLIENTS=coze-lifestyle-v1
```

## Specs in repo

- `docs/specs/blueprint-experience-api/1320_Nova_Blueprint_API_Implementation_Spec_v1.0.md`
- `docs/specs/blueprint-experience-api/1320_Blueprint_Experience_API_v1.0.openapi.yaml`
- `docs/specs/blueprint-experience-api/1320_Blueprint_Experience_API_v1.0_Coze_Compatible.openapi.yaml`

## Boundary

Returned: public foundation codes + display names (S1→S3→S2→S0), experience tags, governance flags.

Never returned: formulas, S3 raw/mapping tables, Full Report prose, birth dates, emails, stack traces.

## Smoke

```bash
npx tsx scripts/smoke-blueprint-experience-api.ts
```
