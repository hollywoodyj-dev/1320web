# Connected Lifestyle Mode — Nova Option A Delivery Pack

**Decision:** Wisewave Option A approved — locked Nova Experience API v1  
**Status:** Controlled KOZE Backend access ENABLED for Connected Lifestyle runtime  
**Date:** 2026-08-01 · Access confirm 2026-08-11  
**Owner:** Nova  

---

## 1. Canonical API (locked)

| Method | Path | Auth |
|---|---|---|
| `POST` | `/v1/blueprints/resolve` | Bearer + `X-Client-Id` |
| `GET` | `/v1/blueprints/{blueprint_id}/experience-profile` | Bearer + `X-Client-Id` |
| `GET` | `/v1/health` | none |

Next rewrite equivalents (same handlers):

- `POST /api/v1/blueprints/resolve`
- `GET /api/v1/blueprints/{blueprint_id}/experience-profile`
- `GET /api/v1/health`

**Not canonical:**

- `/api/v1/blueprint/lifestyle-profile`
- `/api/blueprint/lifestyle-profile`

---

## 2. Base URLs

| Env | Base URL | Notes |
|---|---|---|
| Development | `http://localhost:3000` | Local Next |
| Staging (approved for Connected MVP) | `https://www.1320soulcode.com` | Isolated by staging API key + `X-Client-Id` |
| Production | `https://www.1320soulcode.com` | Production key + `coze-lifestyle-v1` |
| Future dedicated API | `https://api.1320soulcode.com` | Not required for Connected MVP |
| Future dedicated staging | `https://staging-api.1320soulcode.com` | Not required for Connected MVP |

Coze Backend should call `/api/v1/...` on the approved base URL.

---

## 3. Staging credential pack (server-to-server)

**Channel:** out-of-band to Coze Backend only (never Taro / Mini App / Frontend env).

### Required Vercel / server env

```bash
BLUEPRINT_EXPERIENCE_API_KEY=<staging-or-production-secret>
BLUEPRINT_EXPERIENCE_ID_SECRET=<rotation-friendly-hmac-secret>
BLUEPRINT_EXPERIENCE_ALLOWED_CLIENTS=coze-lifestyle-v1,coze-lifestyle-staging-v1
```

### Staging client headers

```http
Authorization: Bearer <STAGING_KEY_ISSUED_OUT_OF_BAND>
X-Client-Id: coze-lifestyle-staging-v1
Content-Type: application/json
```

### Production client headers

```http
Authorization: Bearer <PRODUCTION_KEY_ISSUED_OUT_OF_BAND>
X-Client-Id: coze-lifestyle-v1
Content-Type: application/json
```

### Issue steps (Holly / Nova ops)

1. Generate secrets: `openssl rand -hex 32` (API key) and `openssl rand -hex 32` (ID secret).
2. Set Vercel Production env vars (above).
3. Redeploy.
4. Confirm `GET https://www.1320soulcode.com/api/v1/health` returns `blueprint_service: "available"`.
5. Send staging Bearer key + client id to Coze Backend via secure channel.
6. Never commit secrets to git.

Template (no secrets): `docs/specs/blueprint-experience-api/STAGING_CREDENTIAL_PACK.template.md`

---

## 4. Machine-readable schema

**Authority file:**  
`docs/specs/blueprint-experience-api/experience-profile.schema.json`

Coze must:

1. Import this schema as runtime validation authority
2. Generate or sync Zod from it
3. Lock `api_version = "1.0"`
4. Lock `profile_version = "1320-experience-profile-v1"`
5. Reject inventing required fields (`profile_id`, `profile_fingerprint`, `module_rules`, etc.)

OpenAPI remains supplementary: `1320_Blueprint_Experience_API_v1.0.openapi.yaml`

---

## 5. Timeout and rate limits (exact)

| Item | Value |
|---|---|
| Recommended Coze Backend client timeout | **10_000 ms** |
| Resolve rate limit | **30 / client / 60s** |
| Experience-profile rate limit | **120 / client / 60s** |
| Health rate limit | **30 / client-or-anonymous / 60s** |

Response headers:

- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

Source of truth: `lib/blueprint-experience-api/contracts.ts` + `rate-limit.ts`

Machine copy: `qa-artifacts/connected-mvp-option-a-fixtures/timeout-and-rate-limits.json`

---

## 6. Desensitized runtime fixtures

Directory: `qa-artifacts/connected-mvp-option-a-fixtures/`

Regenerate:

```bash
npx tsx scripts/export-experience-profile-fixtures.ts
```

| Fixture | Expected |
|---|---|
| `1990-01-15` | HTTP 200 · validation passed |
| `1980-05-22` | HTTP 200 · validation passed |
| `2000-02-29` | HTTP 200 · validation passed |
| Recovery via `blueprint_id` (from 1980) | HTTP 200 · validation passed |
| Invalid date `1980-02-30` | `INVALID_BIRTH_DATE` |
| Future date `2030-01-01` | `INVALID_BIRTH_DATE` |
| Health | Contract evidence + live probe after credential deploy |

Each success evidence row includes: `request_id` (in body files), `timestamp`, endpoint, HTTP status, latency, `api_version`, `profile_version`, masked signature, validation result.

Privacy: responses never include birth date, email, raw formulas, or Full Report.

---

## 7. Health endpoint evidence

After staging key is live:

```bash
curl -s https://www.1320soulcode.com/api/v1/health
```

Expected shape:

```json
{
  "status": "ok",
  "api_version": "1.0",
  "blueprint_service": "available",
  "experience_profile_service": "available"
}
```

If API key env is missing: services report `degraded` (auth-gated routes will 401).

---

## 8. Acceptance checklist (Nova side)

| Item | Status |
|---|---|
| Canonical path locked | ✅ |
| Experience Profile v1 source of truth | ✅ |
| `experience-profile.schema.json` exported | ✅ |
| Fixture pack generated | ✅ |
| Timeout + rate-limit specified | ✅ |
| Future birth dates rejected | ✅ |
| Staging credential pack template | ✅ |
| Staging key issued to Coze Backend | ✅ Issued out-of-band (Holly confirmed 2026-08-03) |
| Live health `available` after env set | ✅ Confirmed on production host |
| Authorized client `coze-lifestyle-staging-v1` | ✅ In default + documented allow-list |
| Network / IP allow-list required | ❌ No — Bearer + `X-Client-Id` only (S2S) |
| Canonical contract unchanged | ✅ Experience Profile v1 locked |
| Coze / KOZE Credential handshake | ⏳ Awaiting KOZE Backend `go-real-final-001` resolve/recovery success |

---

## 9. Explicitly not in this delivery

- Experience Profile v1.1 (`module_rules`, `profile_fingerprint`, trait renames)
- Account / report entitlement recovery
- Lifestyle-profile path aliases
