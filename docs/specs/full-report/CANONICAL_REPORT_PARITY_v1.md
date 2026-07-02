# Canonical Full Report — Web/Mobile Parity Foundation

**Source:** Wisewave 2/4 Review  
**Owner:** Nova  
**Status:** Gates 0–5 **QA PASS** (Stripe test mode). Phase 2 FS-005 in progress — see `docs/specs/canonical-soul-blueprint/CANONICAL_SOUL_BLUEPRINT_SPEC_v1.md`.

## Product decision

There is **one Soul Blueprint** (Wisewave-approved product definition). The Full Report is one presentation format; desktop and mobile are two renderers of the same canonical product.

- Content exists once (`CanonicalFullReport.payload`) — evolving toward **Canonical Soul Blueprint** terminology (FS-005)
- Presentation may differ (page count, layout, decorative copy)
- Meaning must not differ
- Mobile is **partial rendering** of the Full Report — not a condensed alternate product

## Architecture

```text
Content Database
       ↓
buildCanonicalReport()   ← single shared resolver entry
       ↓
CanonicalFullReport (FullReportV2Payload + section audit)
       ↓
   ┌───┴───┐
Desktop   Mobile
renderer  renderer
```

Implementation: `web/lib/canonical-report/`

| Module | Purpose |
|--------|---------|
| `types.ts` | Schema version, section ids, field kinds, audit types |
| `section-registry.ts` | 19 canonical sections, desktop/mobile page ids, fix priorities |
| `build-canonical-report.ts` | Shared builder + required-field audit |
| `resolve-presentation.ts` | Desktop/mobile resolver groups for parity |
| `compare-parity.ts` | Content + experience gap reporting |
| `extract-substantive-text.ts` | Ignores decorative/layout-only fields |

## Field kinds

| Kind | Meaning |
|------|---------|
| `required` | Must exist in canonical payload — omission is a bug |
| `optional` | Expected when content DB provides it |
| `relocatable` | May appear on different mobile pages; must still exist somewhere |
| `decorative` | Labels, timestamps, layout chrome — ignored in parity |
| `deprecated` | Retained for migration only |

## Fix priority (Wisewave)

| Priority | Sections | Rationale |
|----------|----------|-----------|
| **1** | Canonical schema + payload audit | One source of truth |
| **2** | Practice, Journal, Closing, Disclaimer | Completes customer experience |
| **3** | S6, S7, S8, S9 | Premium transformational value |
| **4** | S0–S5, Integrated, Cover/Opening/Dimensions/Signature | Foundation gaps |

## QA dimensions

1. **Content parity** — same substantive insight on both platforms
2. **Experience parity** — mobile feels complete and paced
3. **Product parity** — customer purchased the same product regardless of device

## Automated tests

```bash
npm run smoke:report-canonical   # Priority 1 — must pass
npm run smoke:report-parity      # Baseline gap report (non-enforcing)
npm run smoke:report-parity -- --enforce-priority=2   # fail on P2+ gaps when ready
```

Parity smoke **ignores:** decorative labels, image URLs, alt text (`iconAlt`), map logo labels, layout-only differences, generated metadata, and Phase B intentional mobile simplifications (see below).

Parity smoke **fails (when enforced):** required substantive desktop insight missing from mapped mobile resolver output.

## Experience parity exclusions (Phase B — Lumen signed off)

After Phase A wired agency/disclaimer/practice/journal/closing copy, **47** residual instance gaps were classified — not missing product content:

| Class | Examples | Parity handling |
|-------|----------|-----------------|
| **Decorative** | `S1-18 … journal icon`, `S3-03 … practice icon`, `Material & Energy Flow map logo` | Skipped — `iconAlt` not collected; `* map logo` pattern excluded |
| **Intentional mobile simplification** | `mature sovereignty appears as…`, `this code reflects a soul…`, `journaling reality vs projection` | Skipped — mobile map/essence slots carry condensed equivalent (Gate 4) |

Implementation: `web/lib/canonical-report/experience-parity-exclusions.ts` + `iconAlt` in `collectSubstantiveStrings` skip keys.

Re-audit: `npx tsx scripts/audit-experience-gaps.ts` — expect **0 actionable** gaps on smoke dates post-Phase B.

## Duplicate review rule

Do not treat every duplicate as a bug. Mobile may repeat anchor ideas across swipe pages.

Flag only:
- accidental duplication
- repeated wording that adds no new context
- repetition that interrupts reading flow

## Release gates (Lumen review — 2026-07-02)

Consolidated Gate 0–5 status for 1320 / Soul Code. Per-gate detail: `web/qa-artifacts/1320-gate-*-2026-07-01.md`.

| Gate | Scope | Status | Notes |
|------|--------|--------|-------|
| **0** | Calculation & DB truth | **PASS** | Golden Dataset layer — treat calc/DB as immutable; changes need explicit migration/versioning |
| **1** | Homepage + `/booking` alignment | **PASS** | Positioning implemented and visually verified |
| **2** | Product & ethical language | **PASS** (governance) | Brand Governance / Canonical Vocabulary — reflective, symbolic; avoid deterministic/predictive/therapeutic/diagnostic overclaim |
| **3** | Full Report content coverage | **Release QA passed** | Public paid release unblocked for report product; commerce gated on hosted Stripe test checkout |
| **4** | Renderer/product boundary | **Clarified** | One canonical Full Report; desktop/mobile are renderers — layout/relocation OK, meaningful personalized content must not drop |
| **5** | Payment / release readiness | **Stripe test mode in prod** | Not the main blocker; Chino switches live after QA. Release confidence = report QA, parity, ethical language, regression |

### Parity implementation (complete)

| Priority | Sections | Status |
|----------|----------|--------|
| P1 | Canonical schema + payload audit | Signed off |
| P2 | Practice, Journal, Closing, Disclaimer | Signed off |
| P3 | S6–S9 | Signed off |
| P4 | S0–S5 + Integrated/Foundation | Signed off |

| Phase | Tail + agency copy | Signed off (pages 02, 22, 28–32 @ 390×844) |
| Phase B | Parity exclusions for decorative / intentional mobile | Applied |

Latest smoke parity: **content gaps 0**, **actionable experience gaps 0** on smoke dates (post-Phase B).

## Related artifacts

- `qa-artifacts/1320-web-mobile-detail-content-diff-2026-07-01.md` — Lumen parity baseline
- `docs/specs/full-report/FULL_REPORT_RELEASE_QA_v1.md` — final release QA checklist (Sections 1–7)
- `docs/specs/full-report/LUMEN_QA_FULL_REPORT_V2_WEB_MOBILE.md` — visual QA chunks

## Release QA outcome (2026-07-02)

**Verdict: PASS WITH CHECKOUT NOTE** — see `qa-artifacts/1320-full-report-release-qa-2026-07-02.md` and `FULL_REPORT_RELEASE_QA_v1.md`.

| Area | Result |
|------|--------|
| Automated regression (`smoke:release-qa`) | PASS |
| Desktop + mobile + result (1980-05-22, 1982-02-03) | PASS |
| Gate 2 ethical language | PASS |
| Cross-surface codes / public-string scan | PASS |
| Checkout / access (Section 5) | **Blocked locally** — verify on hosted Stripe test mode before live switch |

Release-QA fixes landed: S6 sanitizer, customer-facing copy cleanup, result labels (`Expression Index`, `Relationship Mirror`).

**Only remaining blocker:** hosted Stripe test-mode checkout/access verification (Gate 5 live switch is separate from report QA).

1. ~~Create canonical schema~~ ✅
2. ~~Wire tail sections (Practice/Journal/Closing/Disclaimer) to shared resolver output~~ ✅ **Priority 2**
3. ~~Close S6–S9 presentation gaps~~ ✅ **Priority 3**
4. ~~Close foundation module gaps~~ ✅ **Priority 4**
5. ~~Phase A — must-fix tail/agency copy on mobile~~ ✅
6. ~~Phase B — classify/exclude decorative + intentional mobile gaps~~ ✅
7. ~~Final one-Full-Report release QA~~ ✅ **PASS WITH CHECKOUT NOTE**
