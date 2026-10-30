# Nova / Founder request list — Gate B inputs

**Date:** 2026-10-30  
**From:** Cursor local handoff (`C:\Users\hugoz\soulsync-kingdom-1320`)  
**Checkpoint:** `94e2f8d` (`94e2f8d5dd390523946435b6817a3883b73f6dbc`)  
**Verdict (unchanged):** **ACCEPT WITH CONDITIONS — local Cursor handoff only.**  
**Gate A:** Cursor-side local P0 closed at this checkpoint. Founder has not independently read the evidence files under `docs/cursor/evidence/`.  
**Gate B:** blocked on the inputs below.  
**Gate C / D:** Preview, deploy, and production remain **not authorized**. Device tests (iPhone Safari / Android Chrome) are **not done**.  
**Wording patch:** 2026-10-30 Founder review of this list (NF-1 CORS vs keys; NF-4 optional-consent encoding; receive ≠ implement; NF-3 written scope sufficient to start intake; NF-1 = confirm effective spec vs live service).  
**List status:** **LOCKED** (2026-10-30). This file is the delivery basis for NF-1–NF-5. Incoming replies are checked against it. Intake order: archive → hash → schema check → offline mock → written integration plan. Game/test checkpoint remains `94e2f8d`. Gate B still waiting on inputs.

Do not treat this list as permission to call Nova, add network, embed official WebP, or copy a v0.2.4 HTML. **Receiving files does not trigger a new HTML, network, or `Adapter1320` edit.** The adapter stays DEMO until Founder accepts a written integration plan after intake.

Known fixture already in-tree (do not re-send unless hashes change):

| birth_date | result | assets |
|---|---|---|
| `1980-05-22` | `S1-18 / S3-03 / S2-27 / S0-07` | 4 official WebP + `assets/official-1320-fixture/official-1320-fixture-totems.manifest.json` |

Retracted and still forbidden: `S2 = 月＋日`, `S3 = 月×日`, and any range claims derived from them.

---

## 1. Versioned request / response schema, errors, auth, versions

| | |
|---|---|
| **ID** | NF-1 |
| **Provider** | Nova (schema, examples, live values). Founder confirms the backend-proxy topology. |
| **What to provide** | Nova confirms the **effective version of the existing API spec that matches the current service**, plus matching **response samples** and **compatibility rules**. Include request / success / error shapes for at least `unconnected` / `validation_failed` / `temporarily_unavailable` (and any extra official codes); auth **configuration names** and placement (header vs env, **server-only keys**); real `algorithmVersion` and `contentVersion` strings. Historical API spec files already exist; this handoff ZIP only has the Data Pack sketch — do not treat “no schema in the ZIP” as “no spec was ever written.” |
| **Already known (incomplete)** | Data Pack sketch: `POST /api/v1/blueprints/resolve` with `{ birth_date, consent.blueprint_generation, consent.personalized_expression }`. Client must check `connected === true`, `source === 'nova_1320'`, `foundation_order === ['S1','S3','S2','S0']`. Config **names** in `.env.example`: `NOVA_1320_BASE_URL`, `NOVA_1320_API_KEY`, `NOVA_1320_TIMEOUT_MS`. **Nova keys stay on the server.** Browser-to-game-backend-proxy **CORS is a separate question** and is configured per deployment topology. |
| **Unknown / 待提供** | Which historical spec version is **currently live**; live base URL (proxy, not browser); auth scheme and header name; whether mTLS or IP allowlist exists; success and error **samples aligned to that live version**; timeout and retry policy; proxy CORS policy for the chosen topology; real `algorithmVersion` / `contentVersion` and which content versions a given algorithm version may return. |
| **Delivery format** | Pointer to the confirmed spec version (or a copy) **plus** redacted JSON fixtures: 1 success (`1980-05-22`), ≥1 of each error class. Auth documented as names and placeholder values only — **no secrets in git**. |
| **Acceptance** | Fixtures validate against the schema. Cursor contract tests can assert order, code format, versions, and “no DEMO fallback” without guessing numbers. A dry-run against a mock built from those fixtures passes. |
| **Blocks** | Replacing `Adapter1320.compute()`; async loading / error UI; official provenance; Gate B contract tests. |

## 2. Remaining 122 official totems, per-code mapping, names, short meanings

| | |
|---|---|
| **ID** | NF-2 |
| **Provider** | Nova (registry + files). Founder confirms the canonical source. |
| **What to provide** | The **122** missing official result assets and a complete `code → totemId → file/url → sha256` map, plus official `name` and `shortMeaning` for every code. |
| **Already known** | Counts: S1 `01–44` minus S1-18 = **43**; S3 `01–12` minus S3-03 = **11**; S2 `01–50` minus S2-27 = **49**; S0 `00–19` minus S0-07 = **19**. Fixture names only: Transformer / Explorer / The Soul Shock Mirror / Self-Worth Illusion. Path **hints** on the public site (`/S1-44/S18.webp` etc.) are **not** a registry — do not invent files from the pattern. |
| **Unknown / 待提供** | Whether S1 uses `S18.webp` vs `S1-18.webp` consistently; whether S0 includes `S0-00`; `totemId` namespace; ZH vs EN name/meaning tables; whether shortMeaning is one sentence or structured fields. |
| **Delivery format** | Manifest JSON (code, totemId, filename, sha256, license id, contentVersion) + one WebP (or approved format) per code. Separate or same file: `name` / `shortMeaning` per code, language-tagged. |
| **Acceptance** | 126 codes present (4 fixture + 122). Every hash matches. `totemId` matches `code`. Missing/mismatch path is testable as a hard error, not a placeholder swap. Cursor will not fill gaps with realm SVG. |
| **Blocks** | Official totem on blueprint / detail / export card; `getFoundation()` official branch; removing DEMO card pool from official mode. |

## 3. Totem embed, resize, and redistribution license

| | |
|---|---|
| **ID** | NF-3 |
| **Provider** | **Founder** (written license decision). Nova supplies any upstream license terms they already have. |
| **What to provide** | Written yes/no (and conditions) for: (a) **embed** in the single-file prototype (data URI / in-repo static files); (b) **resize / recompress / thumbnail** (export card is Canvas 1080×1560; fixtures are 1254×1254); (c) **ship in the handoff ZIP / git / a future Preview host**; (d) user-exported PNG/JPEG that contains the totem. |
| **Already known** | 4 fixtures are stored locally and **not** loaded by the game. URL loading would break the current zero-network rule and needs a separate approval. Full library inlined would be large. |
| **Unknown / 待提供** | Licensor identity; whether modification (crop, gold overlay, sleeping vs revealed treatment) is allowed; attribution text; whether Preview hosting is a different grant from local git. |
| **Delivery format** | Founder **written authorization scope** (email or note is enough): yes/no/conditions for embed, resize, ship, export. For third-party material, attach the corresponding rights basis. **Do not wait for signed + territory + duration to be complete before starting intake / hash checks of files already received.** |
| **Acceptance (intake)** | Written scope on file, or a dated “pending / unknown” on any bullet, is enough to **archive and verify** incoming assets. |
| **Acceptance (wire-in)** | Embed, resize, or Preview still needs the relevant yes on that bullet. Missing third-party basis is recorded, not invented. |
| **Blocks** | **Wire-in / export / Preview hosting** of official art. Does **not** block archiving, hashing, or schema/mock review of materials already delivered. |

## 4. Two consents — purpose, required/optional, copy

| | |
|---|---|
| **ID** | NF-4 |
| **Provider** | **Founder / legal** for purpose, required vs optional, and approved copy. Nova confirms how the API rejects missing flags. |
| **What to provide** | For `blueprint_generation` and `personalized_expression`: **actual use**; **required vs optional** and whether one can be true without the other; **approved copy** (ZH required; EN if that language will ship); withdrawal behavior. |
| **Already known** | Request sketch sends both as booleans. Current UI has **one** unrelated checkbox: public-share consent (`pv.consent` / `S.consent`) before lighting the meteor. That is not these two official consents. Public payload remains exactly 6 keys. |
| **Unknown / 待提供** | Whether `blueprint_generation` is required before calling resolve; whether `personalized_expression` gates scene notes / bottle / alias vs something else; under-18; retention; what happens if the user later unchecks; ZH/EN final sentences. |
| **Delivery format** | Approved strings + a one-page behavior table (when shown, blocking or not, what is stored, what is sent to Nova). No live personal data in examples. |
| **Acceptance** | Copy is the on-screen source of truth. Tests: missing **required** consent → no official resolve. If a consent is **optional** and off: field omitted, sent as `false`, or the request rejected — **whichever the Nova-confirmed schema specifies.** Do not pre-commit to omitting the field. Withdrawal matches the behavior table. |
| **Blocks** | Official consent UI; sending a real birth date to any proxy; changing the authorization flow (already listed as needing extra approval). |

## 5. Official verification vectors (leap day, century-year bounds)

| | |
|---|---|
| **ID** | NF-5 |
| **Provider** | **Nova** (expected codes from the real service). Founder confirms which dates are in-scope for the product. |
| **What to provide** | Versioned table: `birth_date` → expected `S1/S3/S2/S0` codes + `algorithmVersion` / `contentVersion`. Must include **leap days**, **non-leap Feb 29 rejections**, and **century-year** bounds. |
| **Already known** | One vector: `1980-05-22 → S1-18 / S3-03 / S2-27 / S0-07`. UI currently offers years **1920 … current year** and uses the civil calendar for day counts (`new Date(y, m, 0)`). Sample button uses DEMO `1990-06-15`, not an official vector. |
| **Unknown / 待提供** | Suggested minimum (Nova may replace with their official set): `2000-02-29` (leap century); `1900-02-29` (invalid); `2000-01-01` / `2000-12-31`; `2024-02-29`; `2023-02-28`; `1920-01-01` (UI min); a current-year bound. Expected codes for each **待提供**. Time zone for “today” vs future-date rejection **待提供**. |
| **Delivery format** | Versioned JSON or CSV: date, validity, four codes or error code, algorithmVersion, contentVersion. No formula commentary. |
| **Acceptance** | Mock/contract tests match the table. Invalid dates never yield a DEMO official-looking blueprint. These vectors are **not** to be reverse-engineered into local arithmetic. |
| **Blocks** | Official leap-day / bound tests; claiming Adapter integration complete; any “golden” birth-date QA beyond the single 1980 fixture. |

---

## What Cursor will do after materials arrive

**Receiving files does not, by itself, create a new HTML, open a network path, or edit `Adapter1320.compute()`.**

1. Archive under `docs/cursor/received/` (new checksum file — **do not overwrite** `SHA256SUMS.txt` from the v0.2.3 ZIP).  
2. Verify hashes; check the confirmed schema against fixtures; build an **offline mock** only.  
3. When those records are complete, **propose a concrete integration plan** for Founder sign-off.  
4. Only after that plan is accepted: copy a **new HTML filename** from `src/current/soulsync-kingdom-1320-v0.2.3-visual-dev.html` if the plan says so. No v0.2.4 until Founder asks. Frozen v0.2.2 stays read-only. Browser never receives `NOVA_1320_API_KEY`. Failures never fall back to DEMO.

## Not requested in this round (still open, not Gate B P0)

v0.1 任务书原文、v0.2 计划 §1–§3.2、Figma/PSD 设计源、真机与 Hollywood 逐屏验收。 These do not unblock Adapter work.
