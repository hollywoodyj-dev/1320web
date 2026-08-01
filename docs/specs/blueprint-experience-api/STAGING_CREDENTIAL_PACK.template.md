# Staging Credential Pack Template — Blueprint Experience API v1

**Classification:** Server-to-server only  
**Audience:** Coze Backend  
**Never place in:** Taro, Mini App bundle, Frontend env, prompts, knowledge bases  

Fill secrets out-of-band. Do not commit completed packs to git.

---

## Connection

| Field | Value |
|---|---|
| Staging base URL (approved) | `https://www.1320soulcode.com` |
| Resolve | `POST /api/v1/blueprints/resolve` |
| Recovery | `GET /api/v1/blueprints/{blueprint_id}/experience-profile` |
| Health | `GET /api/v1/health` |
| `X-Client-Id` (staging) | `coze-lifestyle-staging-v1` |
| `Authorization` | `Bearer <ISSUED_OUT_OF_BAND>` |
| Client timeout | `10000` ms |
| `api_version` lock | `1.0` |
| `profile_version` lock | `1320-experience-profile-v1` |
| Schema authority | `docs/specs/blueprint-experience-api/experience-profile.schema.json` |

---

## Smoke (after key issue)

```bash
# Health (no auth)
curl -s https://www.1320soulcode.com/api/v1/health

# Resolve (auth required)
curl -s -X POST https://www.1320soulcode.com/api/v1/blueprints/resolve \
  -H "Authorization: Bearer $BLUEPRINT_EXPERIENCE_STAGING_KEY" \
  -H "X-Client-Id: coze-lifestyle-staging-v1" \
  -H "Content-Type: application/json" \
  -d '{
    "birth_date": "1980-05-22",
    "locale": "zh-CN",
    "purpose": "combined",
    "consent": {
      "blueprint_generation": true,
      "personalized_expression": true
    }
  }'
```

Expected: HTTP 200 with `profile_version: "1320-experience-profile-v1"` and no `birth_date` field.

---

## Privacy reminders

- Keep `signature` backend-only (never LLM / Mini App UI / share cards).
- Do not reinterpret raw S-codes beyond approved display names + experience traits.
- Local `blueprint_id` is reference only — always re-confirm with Nova before `connected`.
