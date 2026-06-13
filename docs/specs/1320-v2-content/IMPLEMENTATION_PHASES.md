# 1320 v2 implementation phases

**Status:** Phase 0–3 complete in repo. Phases 4–6 not started.

## Phase 0 — Spec lock (done)

- [x] Copy spec markdown + calculation JSON into `web/docs/specs/1320-v2-content/`
- [x] Corrected content index JSON (S4 v2 filename)
- [x] `CONTENT_DATABASE_MANIFEST.md`
- [x] `USE_1320_V2_CONTENT` in `.env.example`
- [x] `/sample-report-v2` — 4 test screens (S7 content + S8 divider teaser)
- [x] Sample S7 database in `web/data/1320-v2/`

## Phase 1 — Calculation (done)

- [x] Extend `calculate1320Code()` → full S0–S9 chain per `NOVA_Master_Calculation_Logic_v2`
- [x] S3 via `data/1320-v2/s3-vibration-mapping.json` (`lib/s3-vibration-level.ts`)
- [x] S4 = `(S2 + S0) mod 20`
- [x] Zero rules: S4/S7/S8/S9 keep 0; S5/S6 0→44
- [x] Smoke: `npm run smoke:v2-calculation` (1980-05-22, 1988-07-14, 1977-11-12)

## Phase 2 — Import content databases (done)

- [x] Copy all primary JSONs to `web/data/1320-v2/` (+ `_manifest.json`)
- [x] `lib/1320-v2/` index + `lookupV2Entry()`
- [x] Adapters: `adapt-v2-segment.ts` → `SegmentContent` + `soulMissionSections`
- [x] `get1320V2Content()` — full S0–S9 lookup from v2 DBs
- [x] `npm run smoke:v2-content` · `npm run import:v2-databases` (re-copy from steward pack)

## Phase 3 — `get1320Content()` v2 branch (done)

- [x] Gate behind `USE_1320_V2_CONTENT` (`lib/use-1320-v2-content.ts`)
- [x] Tier gating: `reportTier` — `free` S0–S4 · `full` S5–S7 · `advanced` S8–S9
- [x] S5: direct v4 lookup (`s5-soul-mission.json`) — no seed assembly
- [x] S6: Value & Receiving labels (not Money Frequency)
- [x] S4: lookup by `s4Code` (not S1-shadow)
- [x] Extended `CodeDisplay` + optional `s7`/`s8`/`s9` on result
- [x] `npm run smoke:v2-get-content` (sets flag in script)
- [x] Routes: `/result` → `free`; `/sample-report`, `/my-report`, checkout → `full`

## Phase 4 — Full report content mapping

- New UI (separate track); interim: extend payloads like `build-full-report-v2-test-payload.ts`
- Add S7 screens to production manifest when Lumen art arrives
- S8/S9 screens for Advanced tier (Phase 2B)
- Dashboard code strip S0–S7 (S8/S9 when Advanced)

## Phase 5 — Lumen art & layout

- S7 divider + content backgrounds in `public/full-report/backgrounds/`
- S8/S9 art for Advanced
- Per-page CSS safe zones

## Phase 6 — QA

- Anti-drift checklist (`NOVA_Anti_Drift_Report_Rendering_Rules_v1.md`)
- `npm run smoke:content` + v2 smoke script
- Update `WHATS_LEFT.md`, `QA_WISEWAVE_ABC_LUMEN.md`
