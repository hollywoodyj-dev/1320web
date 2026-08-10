# KOZE Controlled Nova API Access — Status (2026-08-11)

**Audience:** Wisewave / KOZE Backend  
**Classification:** Ops status — no secrets  

## Wisewave checklist response

1. **API access status:** ENABLED  
2. **Environment:** staging credential lane on production host (`https://www.1320soulcode.com`)  
3. **Authorized client:** `coze-lifestyle-staging-v1`  
4. **Required credential mechanism:** confirmed — `Authorization: Bearer <server key>` + `X-Client-Id` + `Content-Type: application/json`  
5. **Resolve endpoint:** reachable (auth-gated; unauthenticated probe returns HTTP 401 as designed)  
6. **Experience Profile endpoint:** reachable (same auth gate as Resolve)  
7. **Any required network allow-list action:** no  
8. **Rate-limit constraint KOZE must observe:** Resolve **30 / client / 60s** · Experience Profile **120 / client / 60s** · Health **30 / 60s** · recommended client timeout **10_000 ms**  
9. **Canonical Nova contract unchanged:** yes — `api_version = 1.0` · `profile_version = 1320-experience-profile-v1` · Foundation order `S1 → S3 → S2 → S0`

## Live probes (no credential)

```text
GET  /api/v1/health
→ 200 {"status":"ok","api_version":"1.0","blueprint_service":"available","experience_profile_service":"available"}

POST /api/v1/blueprints/resolve  (no Bearer)
→ 401 UNAUTHORIZED
```

## KOZE call contract (unchanged)

| Item | Value |
|---|---|
| Base | `https://www.1320soulcode.com` |
| Resolve | `POST /api/v1/blueprints/resolve` |
| Recovery | `GET /api/v1/blueprints/{blueprint_id}/experience-profile` |
| Health | `GET /api/v1/health` |
| Client | `coze-lifestyle-staging-v1` |
| Credential | previously issued staging Bearer key (Backend env secrets only) |

## Explicit non-goals (confirmed)

- No public / browser exposure  
- No Lifestyle-specific Nova endpoint  
- No Experience Profile schema change  
- No Supabase service-role / Nova signing secret / symbolic source table exposure  
- CORS is not the security boundary  

## Nova note for Holly ops

If Vercel currently has an **explicit**  
`BLUEPRINT_EXPERIENCE_ALLOWED_CLIENTS=coze-lifestyle-v1`  
(without staging), update it to:

```bash
BLUEPRINT_EXPERIENCE_ALLOWED_CLIENTS=coze-lifestyle-v1,coze-lifestyle-staging-v1
```

If the variable is **unset**, Nova default now includes both clients after deploy.

## Next

KOZE may execute `go-real-final-001` handshake against the canonical endpoints above.
