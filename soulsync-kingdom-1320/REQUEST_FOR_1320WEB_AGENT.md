# Request for the 1320web agent

**Forward this whole file** to the agent in the `1320web` workspace (the Next.js site, not the Kingdom subfolder). Kingdom HTML is already updated. Do **not** ask that agent to edit `soulsync-kingdom-1320/` except to serve the existing bridge file.

Parent repo: `https://github.com/hollywoodyj-dev/1320web`  
Bridge file (already written): `soulsync-kingdom-1320/src/current/soulsync-kingdom-1320-v0.2.4-1320web-bridge.html`  
Function of the subfolder: `soulsync-kingdom-1320/FUNCTION.md`

---

## Goal

Connect SoulSync Kingdom to **1320 SoulCode data** and the **1320 LLM**, without putting secrets or the private algorithm in the browser.

Kingdom already calls these two same-origin endpoints. They 404 today. Please implement them.

Preview / production / public launch stay **unauthorized** unless Founder says otherwise. Local `next dev` is enough.

---

## Do not

- Do not put `BLUEPRINT_EXPERIENCE_API_KEY`, Wisewave keys, or any secret in HTML, `public/`, or client bundles.
- Do not let the browser call `/api/v1/blueprints/resolve` (that route is Bearer + `x-client-id`, Coze/KOZE only).
- Do not add Kingdom as a Coze client just to reuse that public route.
- Do not change the existing Coze Blueprint Experience contract (`SUPPORTED_PURPOSES`, auth allowlist) unless you add a **new** purpose in a backward-compatible way. Prefer dedicated Kingdom routes.
- Do not silently fall back to Kingdom DEMO content on the server.
- Do not implement or return retracted formulas (`S2 = month + day`, `S3 = month × day`) or any “unreachable range” claims.
- Do not invent totem art, names, or meanings. If `totemId` is not a real mapped official id, omit it.
- Do not accept or log `birth_date` on the reflect route.
- Do not store Kingdom session in cookies / `localStorage` from these routes.

---

## 1) Serve the bridge HTML on the same origin

Kingdom must be same-origin with `/api/soulsync-kingdom/*` so `fetch` works without CORS and without an API key.

Suggested local URL:

`http://localhost:3000/soulsync-kingdom/`

Implementation options (pick one):

1. Next route `app/soulsync-kingdom/page.tsx` (or `route.ts`) that reads and returns the existing HTML file with `Content-Type: text/html; charset=utf-8`. Do not duplicate the 25MB ZIP or official WebP fixtures.
2. Rewrite `/soulsync-kingdom` → a thin handler. Do **not** copy the whole subfolder into `public/` (too large, and fixtures must stay unwired).

Do not add this page to production sitemap / Preview unless Founder grants it.

---

## 2) `POST /api/soulsync-kingdom/blueprints/resolve`

Server-only proxy. Call existing server functions **in process** (`validateResolveRequest` is the wrong public purpose list — do not send `soulsync_kingdom` through the Coze validator). Use `calculate1320Code` + `get1320Content` / `getPublicSegmentTitle` / `resolveBlueprintExperience` internals as appropriate.

### Request (from the game)

```json
{
  "birth_date": "1990-06-15",
  "locale": "zh-CN",
  "purpose": "soulsync_kingdom",
  "consent": {
    "blueprint_generation": true,
    "personalized_expression": true
  }
}
```

Reject unless both consents are `true`. Reject invalid / future dates. Locale: `zh-CN` (required now); `en` optional later.

### Success body (Kingdom mapper)

Keep `foundation_order: ["S1","S3","S2","S0"]`. Keys inside `foundation` must be `s1` `s3` `s2` `s0`.

```json
{
  "request_id": "req_…",
  "api_version": "1.0",
  "profile_version": "1320-experience-profile-v1",
  "blueprint_id": "…",
  "signature": "…",
  "foundation_order": ["S1", "S3", "S2", "S0"],
  "foundation": {
    "s1": {
      "code": "S1-…",
      "display_name": "官方短名",
      "short_meaning": "一句官方短释义（freeEssence / shortLabel 一类已有字段，不要新编）"
    },
    "s3": { "code": "S3-…", "display_name": "…", "short_meaning": "…" },
    "s2": { "code": "S2-…", "display_name": "…", "short_meaning": "…" },
    "s0": { "code": "S0-…", "display_name": "…", "short_meaning": "…" }
  },
  "experience_profile": {},
  "governance": {
    "symbolic_only": true,
    "non_predictive": true,
    "non_diagnostic": true,
    "user_agency_required": true
  }
}
```

`short_meaning` is the gap vs current Coze resolve (that API only has `code` + `display_name`). Pull it from existing 1320 content. If a segment has a code but no approved short line, return `short_meaning: ""` — do not invent copy.

Optional, only if a **real** official mapping exists:

```json
"totemId": "…",
"totemAssetUrl": "…"
```

If you cannot match `totemId` to `code`, omit both. Kingdom will keep realm placeholders. Do not invent SVGs.

### Errors

Return JSON the game can classify. Either official `{ "error": { "code": "INVALID_BIRTH_DATE", … } }` **or**:

```json
{ "error_code": "validation_failed", "message": "…" }
```

Map:

| Situation | `error_code` or official code | HTTP |
| --- | --- | --- |
| Bad JSON, bad date, missing consent, extra fields | `validation_failed` / `INVALID_*` / `CONSENT_REQUIRED` | 400 |
| Key / 1320 core missing on server | `unconnected` / `BLUEPRINT_SERVICE_UNAVAILABLE` | 503 |
| Upstream / content lookup failed | `temporarily_unavailable` | 503 |
| Rate limit | `temporarily_unavailable` / `RATE_LIMITED` | 429 |

Do not return DEMO cards from this route.

---

## 3) `POST /api/soulsync-kingdom/reflect`

One-shot symbolic reflection for tonight’s Kingdom traces. **Not** a Wisewave account session. **No birthday in, no birthday stored.**

### Request (from the game)

```json
{
  "locale": "zh-CN",
  "purpose": "soulsync_kingdom",
  "provenance": "official",
  "blueprint_id": "… or null",
  "foundation": [
    { "id": "S1", "code": "S1-…", "name": "…", "shortMeaning": "…" }
  ],
  "exploration": [
    { "module": "s1", "sceneVersion": "demo-0.2", "choice": "part", "playerWords": "", "completed": true }
  ],
  "governance": {
    "symbolic_only": true,
    "non_predictive": true,
    "non_diagnostic": true,
    "user_agency_required": true
  }
}
```

If `birth_date` or any birth-like field is present → `400 validation_failed`.  
If `provenance` is `"demo"`, you may still write a short symbolic line from exploration only; do not claim official SoulCode.  
If `provenance` is `"official"`, you may use `blueprint_id` + foundation codes to pull **existing** 1320 content into the prompt. Do not re-compute codes from a date.

### LLM rules

- Reflection, not prediction. No diagnosis, no fortune, no “you will…”.
- One short paragraph (ZH first), user agency intact.
- Prefer existing Wisewave **server** completion if you can call it without requiring a logged-in Kingdom user. If Wisewave needs account + DB + birth, **do not** reuse `/api/reflect/start` as-is. Add a Kingdom-only server path that never asks the browser for birth or email.
- If the model is down, `503 temporarily_unavailable`. Do not substitute canned DEMO game cards as if they were the model.

### Success

```json
{ "text": "……", "governance": { "symbolic_only": true, "non_predictive": true, "non_diagnostic": true, "user_agency_required": true } }
```

`text` must be a non-empty string.

---

## 4) Safety / ops

- Rate-limit both routes (reuse `enforceRateLimit` with a new `clientId` such as `soulsync_kingdom_local`).
- Log `request_id` only. Hash or drop birth dates. Never log the API key.
- CORS: same-origin only is fine. If you must allow another local origin, list it explicitly; do not `*`.
- Leave `/api/v1/blueprints/*` Coze auth unchanged.

---

## How to know it worked

1. `next dev` → open `/soulsync-kingdom/`.
2. Sample date still shows **示例数据，非 1320 原始算法** and `code: null`.
3. Real date + both consents → four official `code` values and `display_name` / `short_meaning` from 1320 content. Provenance tag **1320web / SoulCode**.
4. Stop the proxy or unset the server key → official path shows **unconnected** / **temporarily_unavailable** and stays on the birth screen. It must **not** become a DEMO blueprint.
5. After walking at least one realm, 映照 returns one ZH paragraph with no birthday in the network body.
6. `GET /api/v1/blueprints/resolve` from the browser still 401/403.

When done, reply with the route file paths and a short fixture (success + the three error codes). Do not push Preview.
