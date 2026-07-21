# 1320 Blueprint Experience API
## Nova Implementation Specification v1.0

**Purpose:** Build a private 1320 server API that can be called by Coze/扣子 without exposing the 1320 calculation engine, S3 mapping, S0–S9 databases, commercial source content, or internal governance logic.

**Primary consumer:** Coze workflow / Coze agent  
**System owner:** 1320 Soulcode  
**Implementation owner:** Nova  
**Status:** Implementation-ready specification  
**API style:** JSON over HTTPS  
**Authentication:** Server-issued API key  
**Scope:** Blueprint only — no tarot endpoints, card content, draw logic, or tarot data

---

## 1. Product Role

This API is the protected bridge between:

```text
1320 Production System
计算、映射、内容治理
        ↓
1320 Blueprint Experience API
只输出已批准的外部资料
        ↓
Coze / 扣子
生活表达、阅读、视觉、旅行与品牌推荐
```

The API must calculate or retrieve the user’s fixed 1320 Soul Blueprint on the 1320 server, then return only normalized, approved external fields.

Coze must never calculate, infer, reconstruct, or store the protected 1320 source logic.

---

## 2. Version 1 Scope

Version 1 must support:

1. Resolve an existing Blueprint by `blueprint_id`.
2. Resolve or create a Blueprint from a valid birth date.
3. Return the fixed public Blueprint signature in the locked order:
   - S1
   - S3
   - S2
   - S0
4. Return approved external profiles for:
   - lifestyle expression
   - reading inspiration
   - visual expression
   - travel inspiration
   - brand affinity
5. Return safe governance flags.
6. Return safe, standardized errors.
7. Provide a minimal health endpoint.

Version 1 does **not** include:

- Tarot
- Oracle cards
- Card drawing
- Daily divination
- Wisewave responses
- Full Report HTML or PDF
- Complete S0–S9 content
- Internal scores
- Commercial report blocks
- User-facing prediction logic

---

## 3. Protected Boundary

The following must remain server-side and must never be returned to Coze:

- S1, S2, S3 and S0 calculation formulas
- S4–S9 derivation formulas
- the complete S3 mapping table
- the complete S0–S9 databases
- calculation intermediates
- raw S3 values
- internal numerical weights
- hidden matching scores
- internal database record IDs
- commercial-report source blocks
- internal test fixtures
- internal governance notes
- stack traces
- infrastructure details

Coze may receive only:

- `blueprint_id`
- approved public signature
- approved display names
- normalized experience tags
- optional approved S4–S9 public labels when explicitly enabled
- governance flags
- version identifiers
- safe error messages

---

## 4. Production Base URL

Recommended:

```text
https://api.1320soulcode.com
```

Versioned prefix:

```text
/v1
```

Endpoints:

```text
POST /v1/blueprints/resolve
GET  /v1/blueprints/{blueprint_id}/experience-profile
GET  /v1/health
```

---

## 5. Authentication

Every Coze request must include:

```http
Authorization: Bearer <COZE_1320_API_KEY>
X-Client-Id: coze-lifestyle-v1
Content-Type: application/json
```

Requirements:

- Generate one dedicated API key for Coze.
- Store the key in Coze secret configuration.
- Never place the key inside prompts, knowledge bases or user-visible code.
- Allow key rotation without changing the API contract.
- Reject missing, invalid or revoked keys with HTTP `401`.
- Restrict the Coze key to the three published endpoints only.
- Do not allow export, admin, database or report-generation access.

---

## 6. Endpoint 1 — Resolve Blueprint

### Route

```http
POST /v1/blueprints/resolve
```

### Purpose

Resolve an existing Blueprint or create/find one from a valid birth date, then return the approved external experience profile.

### Request by Blueprint ID

```json
{
  "blueprint_id": "bp_01JEXAMPLE",
  "locale": "zh-CN",
  "purpose": "combined"
}
```

### Request by Birth Date

```json
{
  "birth_date": "1980-05-22",
  "locale": "zh-CN",
  "purpose": "lifestyle_expression",
  "consent": {
    "blueprint_generation": true,
    "personalized_expression": true
  }
}
```

### Request Rules

One and only one of the following must be supplied:

- `blueprint_id`
- `birth_date`

Validation:

- `birth_date` must use `YYYY-MM-DD`.
- Reject impossible Gregorian dates.
- Birth time is not accepted in v1.
- Birth location is not accepted in v1.
- Supported locales:
  - `zh-CN`
  - `en`
- Supported purposes:
  - `lifestyle_expression`
  - `soul_reading`
  - `visual_expression`
  - `travel_inspiration`
  - `brand_matching`
  - `combined`
- Birth-date generation requires:
  - `blueprint_generation = true`
  - `personalized_expression = true`
- Do not include raw birth dates in normal application logs.

---

## 7. Blueprint Resolve Response

```json
{
  "request_id": "req_01JEXAMPLE",
  "api_version": "1.0",
  "profile_version": "1320-experience-profile-v1",
  "blueprint_id": "bp_01JEXAMPLE",
  "signature": "S1-18/S3-03/S2-27/S0-07",
  "foundation_order": ["S1", "S3", "S2", "S0"],
  "foundation": {
    "s1": {
      "code": "S1-18",
      "display_name": "The Transformer"
    },
    "s3": {
      "code": "S3-03",
      "display_name": "The Explorer"
    },
    "s2": {
      "code": "S2-27",
      "display_name": "The Soul Shock Mirror"
    },
    "s0": {
      "code": "S0-07",
      "display_name": "Self-Worth Illusion"
    }
  },
  "experience_profile": {
    "essence_traits": [
      "transformative",
      "deep",
      "quietly expressive"
    ],
    "style_traits": [
      "structured",
      "layered",
      "fluid contrast"
    ],
    "palette_traits": [
      "deep navy",
      "mineral blue",
      "soft gold"
    ],
    "texture_traits": [
      "soft wool",
      "silk",
      "matte leather"
    ],
    "visual_traits": [
      "threshold",
      "light through shadow",
      "renewal"
    ],
    "travel_traits": [
      "slow exploration",
      "cultural depth",
      "quiet renewal"
    ],
    "reading_traits": {
      "core_themes": [
        "transformation",
        "self-recognition",
        "meaning",
        "inner authority"
      ],
      "preferred_depth": "deep",
      "preferred_styles": [
        "reflective nonfiction",
        "psychology",
        "philosophy",
        "literary fiction"
      ],
      "learning_orientation": [
        "pattern recognition",
        "inner inquiry",
        "lived integration"
      ]
    },
    "brand_affinity_traits": [
      "craftsmanship",
      "timelessness",
      "quiet luxury"
    ]
  },
  "governance": {
    "symbolic_only": true,
    "non_predictive": true,
    "non_diagnostic": true,
    "user_agency_required": true
  }
}
```

### Response Rules

The response must:

- preserve the locked foundation order `S1 → S3 → S2 → S0`
- return only approved public display names
- return normalized tags rather than long report prose
- include profile and API versions
- include governance flags

The response must not expose:

- formulas
- modulo logic
- S3 raw values
- S3 mapping ranges
- internal scores
- database row IDs
- content-source filenames
- internal labels not approved for external use
- complete Full Report sections

---

## 8. Endpoint 2 — Get Existing Experience Profile

### Route

```http
GET /v1/blueprints/{blueprint_id}/experience-profile
```

### Purpose

Retrieve the current approved external experience profile for an existing Blueprint without resubmitting the birth date.

### Query Parameters

```text
locale=zh-CN
purpose=combined
profile_version=1320-experience-profile-v1
```

### Example

```http
GET /v1/blueprints/bp_01JEXAMPLE/experience-profile?locale=zh-CN&purpose=combined
```

### Response

Uses the same response body as `POST /v1/blueprints/resolve`.

### Rules

- Return `404 BLUEPRINT_NOT_FOUND` if the ID does not exist.
- Return `409 VERSION_CONFLICT` if a requested profile version is unavailable.
- Do not return the user’s birth date.
- Do not return account email or personal identity fields.
- Do not expose ownership or entitlement data unless a future endpoint explicitly requires it.

---

## 9. Health Endpoint

### Route

```http
GET /v1/health
```

### Response

```json
{
  "status": "ok",
  "api_version": "1.0",
  "blueprint_service": "available",
  "experience_profile_service": "available"
}
```

Do not disclose:

- framework names
- server versions
- database types
- environment variables
- deployment identifiers
- stack information

---

## 10. Error Contract

All errors use:

```json
{
  "request_id": "req_01JERROR",
  "error": {
    "code": "INVALID_BIRTH_DATE",
    "message": "The supplied birth date is invalid.",
    "safe_message_zh": "出生日期无效，请检查后再试。",
    "retryable": false
  }
}
```

Required errors:

| HTTP | Code | Meaning |
|---|---|---|
| 400 | `INVALID_REQUEST` | Invalid JSON or unsupported fields |
| 400 | `INVALID_BIRTH_DATE` | Invalid Gregorian date |
| 400 | `CONSENT_REQUIRED` | Required consent missing |
| 400 | `UNSUPPORTED_LOCALE` | Locale not supported |
| 400 | `UNSUPPORTED_PURPOSE` | Purpose not supported |
| 401 | `UNAUTHORIZED` | Missing or invalid API key |
| 403 | `FORBIDDEN_CLIENT` | Client is not permitted |
| 404 | `BLUEPRINT_NOT_FOUND` | Blueprint ID not found |
| 409 | `VERSION_CONFLICT` | Requested version unavailable |
| 429 | `RATE_LIMITED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Safe generic server failure |
| 503 | `BLUEPRINT_SERVICE_UNAVAILABLE` | Blueprint engine unavailable |
| 503 | `PROFILE_SERVICE_UNAVAILABLE` | Experience profile service unavailable |

Never return stack traces, raw SQL errors, file paths or protected calculation values.

---

## 11. Privacy

Nova must implement:

- Do not log complete birth dates in standard request logs.
- Do not include birth dates in analytics events.
- Do not return birth dates to Coze after resolution.
- Use redacted or hashed identifiers in observability systems.
- Do not send Blueprint data to advertisers.
- Do not expose one user’s profile to another user.
- Encrypt data in transit and at rest.
- Separate retention policies for:
  - API request metadata
  - Blueprint records
  - Coze session data
  - user preferences
- Return only the minimum fields required for the requested purpose.

Recommended Coze session storage:

```text
blueprint_id
signature
foundation public fields
experience_profile
profile_version
governance
```

Coze should not store:

```text
birth_date
calculation intermediates
complete Full Report
internal database content
```

---

## 12. Idempotency

For `POST /v1/blueprints/resolve`, support:

```http
Idempotency-Key: <uuid>
```

Rules:

- The same idempotency key and same request body must return the same successful result for at least 24 hours.
- The same key with a different request body must return `409`.
- Do not use birth date itself as the idempotency key.

---

## 13. Rate Limits

Initial recommendation per API key:

- Blueprint resolve: 30 requests/minute
- Existing profile read: 120 requests/minute
- Health: 30 requests/minute

Return:

```http
X-RateLimit-Limit
X-RateLimit-Remaining
X-RateLimit-Reset
```

---

## 14. Caching

Safe to cache privately:

- approved experience profiles by:
  - `blueprint_id`
  - `profile_version`
  - `locale`
  - `purpose`

Do not create public caches keyed by raw birth date.

Recommended:

```http
Cache-Control: private, max-age=300
ETag: "<profile-version-hash>"
```

---

## 15. Observability

Every response must include a `request_id`.

Record:

- endpoint
- method
- status code
- latency
- client ID
- API version
- profile version
- safe error code

Do not record:

- full birth date
- complete API key
- protected formula values
- raw database errors
- full user profile payloads in standard logs

Recommended service metrics:

- Blueprint resolution success rate
- Existing profile retrieval success rate
- p50 and p95 latency
- invalid request rate
- consent error rate
- rate-limit rate
- profile-version mismatch rate

---

## 16. Versioning

API version:

```text
/v1
```

Content version:

```text
profile_version
```

Rules:

- Formula changes require internal 1320 governance and regression tests.
- Public tag edits may increment `profile_version` without changing endpoint structure.
- Never silently alter the meaning of an existing code.
- Preserve backward compatibility during the supported version window.
- Deprecated profile versions require a published sunset period.

---

## 17. Coze Integration Contract

Coze must:

1. Ask for consent before sending a birth date.
2. Store the API key only as a secret.
3. Call `POST /v1/blueprints/resolve` for first connection.
4. Store only `blueprint_id` and approved external profile fields.
5. Use `GET /v1/blueprints/{id}/experience-profile` for later sessions.
6. Use returned tags to generate:
   - Soul OOTD
   - Mood Impression
   - Travel Resonance
   - Soul Reading Library
   - brand matching
7. Preserve governance flags.
8. Never calculate a Blueprint locally.
9. Never infer missing Blueprint codes.
10. Never present tags as fate, diagnosis or a fixed identity.
11. Never tell the user that a colour, book, trip or product is spiritually mandatory.
12. Clearly distinguish Blueprint foundation from daily context.

---

## 18. Nova Implementation Tasks

### Backend

- [ ] Create versioned routes.
- [ ] Add API-key authentication.
- [ ] Wrap the existing production Blueprint engine.
- [ ] Create an external-profile mapper.
- [ ] Remove all protected calculation fields.
- [ ] Add purpose-based field filtering.
- [ ] Add locale support.
- [ ] Add safe error middleware.
- [ ] Add request IDs.
- [ ] Add redacted logging.
- [ ] Add rate limiting.
- [ ] Add idempotency support.
- [ ] Add ETag and private caching.
- [ ] Add version controls.

### Data

- [ ] Create normalized external lifestyle tags.
- [ ] Create normalized visual tags.
- [ ] Create normalized travel tags.
- [ ] Create normalized reading tags.
- [ ] Create normalized brand-affinity tags.
- [ ] Keep external tags separate from the Full Report source database.
- [ ] Ensure every returned field is approved for external use.

### Security

- [ ] Generate a dedicated Coze API key.
- [ ] Restrict key permissions.
- [ ] Add key rotation.
- [ ] Prefer server-to-server calls.
- [ ] Add abuse monitoring.
- [ ] Confirm raw birth dates are excluded from standard logs.
- [ ] Confirm calculation formulas cannot be reconstructed from responses.

---

## 19. Acceptance Tests

### Blueprint Resolution

- [ ] Valid `blueprint_id` returns the approved experience profile.
- [ ] Valid birth date returns or creates the correct Blueprint.
- [ ] Invalid date returns `INVALID_BIRTH_DATE`.
- [ ] Missing consent returns `CONSENT_REQUIRED`.
- [ ] Unsupported purpose returns `UNSUPPORTED_PURPOSE`.
- [ ] Unsupported locale returns `UNSUPPORTED_LOCALE`.
- [ ] Foundation order is always `S1 → S3 → S2 → S0`.
- [ ] The canonical production test date remains consistent with the production engine.
- [ ] No calculation intermediate appears in the response.
- [ ] No S3 mapping value or range appears in the response.
- [ ] No complete Full Report prose appears in the response.

### Existing Profile

- [ ] Existing profile can be retrieved without resending birth date.
- [ ] Unknown ID returns `BLUEPRINT_NOT_FOUND`.
- [ ] Requested unavailable version returns `VERSION_CONFLICT`.
- [ ] Response never includes email or birth date.

### Security

- [ ] Missing API key returns `401`.
- [ ] Invalid or revoked key returns `401`.
- [ ] Wrong client returns `403`.
- [ ] Rate limit returns `429`.
- [ ] No stack trace is exposed.
- [ ] Logs contain no raw birth date.
- [ ] Responses contain no protected formulas or mapping data.

### Coze

- [ ] OpenAPI imports successfully.
- [ ] Coze can resolve by Blueprint ID.
- [ ] Coze can resolve by birth date with consent.
- [ ] Coze can retrieve an existing profile.
- [ ] Coze can read Chinese and English responses.
- [ ] Coze does not receive or store calculation source data.

---

## 20. Launch Sequence

### Step 1

Deploy staging:

```text
https://staging-api.1320soulcode.com/v1
```

### Step 2

Run canonical Blueprint regression tests.

### Step 3

Validate the external-profile mapper against protected-field rules.

### Step 4

Generate a private Coze staging API key.

### Step 5

Connect the Coze test workflow.

### Step 6

Validate:

- authentication
- birth-date consent
- Blueprint ID flow
- profile response
- Chinese and English output
- error handling
- logging
- privacy
- rate limiting
- idempotency

### Step 7

After Lumen QA passes:

- deploy production API
- rotate staging credentials
- provide the production base URL
- provide the dedicated Coze API key separately
- import the Coze-compatible OpenAPI file

---

## 21. Final Handoff Boundary

Nova owns:

```text
Blueprint calculation
S3 mapping
S0–S9 databases
external profile mapping
API security
versioning
privacy
```

Coze owns:

```text
user context collection
workflow orchestration
OOTD presentation
Mood Impression presentation
Travel Inspiration presentation
Soul Reading presentation
brand recommendation presentation
```

The separation is permanent:

> **1320 calculates and governs.  
> Coze receives approved fields and presents the experience.**

The Blueprint is never calculated inside Coze.  
The complete 1320 database is never copied into Coze.
