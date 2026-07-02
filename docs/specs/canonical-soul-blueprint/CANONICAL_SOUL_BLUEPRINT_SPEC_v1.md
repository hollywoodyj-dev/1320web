# Canonical Soul Blueprint Specification

**FS-005 · Version 1.1**  
**Owner:** Nova  
**Status:** Approved with Strategic Notes (Wisewave 9.8/10) — v1.1 platform principles applied  
**Authority:** Wisewave Phase 1 sign-off + FS-005 review + Product Bible v2.0  
**Implementation:** `web/lib/canonical-report/`

---

## 1. Purpose

This document defines the **Canonical Soul Blueprint** — the single source of truth for symbolic report content on the 1320 platform.

Phase 1 implemented this object as `CanonicalFullReport` (`canonical-report-v1`). Phase 2 formalizes the contract so all future capabilities consume the same Blueprint — not independent interpretations.

> **Product definition (Wisewave-approved):** There is one Soul Blueprint. Reports, conversations, Personal Integration Sessions, Membership, and future interfaces are different ways of relating to it.

---

## 2. Scope

### In scope (FS-005)

- Product definition and architecture
- Canonical section structure (19 sections)
- Field classification (required / optional / relocatable / decorative / deprecated)
- Builder pipeline and public API surface
- Presentation layer contract (desktop, mobile, paid access)
- Schema versioning policy
- QA and regression hooks
- Consumer rules for FS-006 / FS-007 / FS-008

### Out of scope (later Phase 2 steps)

- Expression Framework™ data model (FS-008)
- Wisewave API runtime (FS-007)
- Personal Integration booking UI (FS-006)
- PDF / voice / dashboard renderers
- Code rename `canonical-report` → `canonical-soul-blueprint` (documented; migrate before public API)

---

## 3. Architecture

```text
1320 Content Database (S0–S9 + synthesis)
              ↓
     calculate1320Code(birth date)
              ↓
     buildFullReportV2Payload(input)
              ↓
     enrichCanonicalPayload()
              ↓
     buildCanonicalReport(input)  ← Canonical Soul Blueprint
              ↓
    ┌─────────┴─────────┬──────────────┬─────────────┐
    ↓                   ↓              ↓             ↓
Desktop v2         Mobile v2      /my-report     Future:
FullReportV2Viewer MobileReport   (entitled)     Wisewave API
                   V2Viewer                        Membership
                                                   PDF / Voice
```

**Rules:**

1. **Content resolves once** — `buildCanonicalReport()` is the only shared resolver entry for paid substantive insight.
2. **Presentation may differ** — layout, pagination, swipe vs scroll, decorative chrome.
3. **Meaning must not differ** — same substantive insight on all entitled surfaces (Option A parity).
4. **No surface owns exclusive content** — desktop and mobile resolvers read from canonical payload; they do not invent parallel copy.

---

## 4. Canonical object

### 4.1 Type (current implementation)

```typescript
type CanonicalFullReport = {
  schemaVersion: "canonical-report-v1";
  payload: FullReportV2Payload;
  birthDate: string;           // ISO YYYY-MM-DD
  sections: CanonicalSectionAudit[];
};
```

| Field | Meaning |
|-------|---------|
| `schemaVersion` | Contract version for API backward compatibility |
| `payload` | Full resolved content — modules S0–S9, integrated blueprint, practice, journal, closing, disclaimer |
| `birthDate` | Canonical birth date key |
| `sections` | Per-section audit (required/optional field presence) |

### 4.2 Builder API

| Function | Purpose |
|----------|---------|
| `buildCanonicalReport(input)` | Primary entry — birth date + client name → canonical object |
| `buildCanonicalSampleReport(overrides?)` | Smoke / QA sample (`1980-05-22` default) |
| `assertCanonicalReportComplete(report)` | Returns failure strings; empty = pass |
| `enrichCanonicalPayload(payload)` | Post-build enrichment pass |

**Input:**

```typescript
type BuildCanonicalReportInput = {
  name: string;
  birth_date: string;           // YYYY-MM-DD
  birth_date_display: string;   // Human label
};
```

### 4.3 Sample canonical dates (QA)

| Birth date | Expected codes (smoke truth) |
|------------|------------------------------|
| `1980-05-22` | S1-18 / S3-110 / S2-27 / S0-07 |
| `1982-02-03` | S1-20 / S3-01 / S2-05 / S0-05 |
| `1977-11-12` | Regression (`smoke:result-1977`) |

---

## 5. Section registry (19 sections)

Authoritative source: `lib/canonical-report/section-registry.ts`

| # | Section ID | Label | Desktop pages | Mobile pages | Fix priority |
|---|------------|-------|---------------|--------------|--------------|
| 1 | `cover` | Cover | page-00 | mobile-00 | P4 |
| 2 | `opening` | Opening | page-01 | mobile-01, mobile-05 | P4 |
| 3 | `dimensions` | Dimensions | page-02 | mobile-04, mobile-05 | P4 |
| 4 | `signature` | Signature | page-03 | mobile-03, mobile-04 | P4 |
| 5 | `s1` | S1 Origin Frequency | page-04 | mobile-06, mobile-07 | P4 |
| 6 | `s3` | S3 Vibration Tier | page-05 | mobile-08, mobile-09 | P4 |
| 7 | `s2` | S2 Mirror Path | page-06 | mobile-10, mobile-11 | P4 |
| 8 | `s0` | S0 Void Gate | page-07 | mobile-12, mobile-13 | P4 |
| 9 | `integrated_blueprint` | Integrated Blueprint | page-08 | mobile-14, mobile-15 | P4 |
| 10 | `s4` | S4 Shadow Pattern | page-09 | mobile-16, mobile-17 | P4 |
| 11 | `s5` | S5 Soul Mission | page-10 | mobile-18, mobile-19 | P4 |
| 12 | `s6` | S6 Value & Receiving | page-11 | mobile-20, mobile-21 | P3 |
| 13 | `s7` | S7 Soul Sovereignty | page-12 | mobile-22, mobile-23 | P3 |
| 14 | `s8` | S8 Soul Contribution | page-13 | mobile-24, mobile-25 | P3 |
| 15 | `s9` | S9 Return to Source | page-14 | mobile-26, mobile-27 | P3 |
| 16 | `practice` | 7-Day Integration Practice | page-15 | mobile-28, mobile-29 | P2 |
| 17 | `journal` | Reflection Journal | page-16 | mobile-30 | P2 |
| 18 | `closing` | Closing Reflection | page-17 | mobile-31 | P2 |
| 19 | `disclaimer` | Disclaimer | page-18 | mobile-02, mobile-32 | P2 |

**Pagination:** Desktop indices 00–18 (19 pages). Mobile uses 33 swipe pages (01–32 + cover) with relocatable content.

---

## 6. Field classification

Every payload field participating in governance is one of:

| Kind | Rule |
|------|------|
| **required** | Must exist in canonical payload — omission is a bug |
| **optional** | Expected when content DB provides it |
| **relocatable** | May appear on different mobile pages; must exist somewhere in presentation |
| **decorative** | Labels, timestamps, layout chrome — ignored in parity |
| **deprecated** | Retained for migration only; remove from future releases |

**Governance rule:** No field disappears silently. Changes require section-registry update + parity smoke rerun.

**Parity rule:** Content parity compares substantive strings from desktop presentation resolvers vs mapped mobile resolvers (`resolve-presentation.ts`). Experience parity uses classified exclusions (`experience-parity-exclusions.ts`).

---

## 7. Presentation layer contract

### 7.1 Current consumers

| Consumer | Route / entry | Entitlement | Renderer |
|----------|---------------|-------------|----------|
| Desktop preview | `/full-report-v2?year&month&day` | Open (preview) | `FullReportV2Viewer` |
| Mobile preview | `/mobile-report-v2?year&month&day` | Open (preview) | `MobileReportV2Viewer` |
| Paid access | `/my-report/[reportId]` | Required | `FullReportV2Viewer` via `buildCanonicalReport()` |
| Free result | `/result` | Free tier only | `report-dashboard` (not full canonical) |

### 7.2 Presentation resolver groups

`PRESENTATION_PARITY_SECTIONS` maps each canonical section to:

- `desktopResolvers[]` — functions `(payload) => view model`
- `mobileResolvers[]` — functions `(payload) => view model`

Shared tail sections use `shared-tail-resolvers.ts` (practice, journal, closing, disclaimer).

### 7.3 Future consumers (Phase 2+)

| Consumer | Must read | Must not read |
|----------|-----------|---------------|
| Wisewave API (FS-007) | `CanonicalFullReport.payload` | Desktop page HTML |
| Personal Integration prep (FS-006) | Canonical + session context | Ad-hoc copy |
| Membership (FS-008) | Canonical + Expression layer | Separate report rebuild |
| PDF (2B) | Canonical payload | Desktop-only resolver |

---

## 8. QA and regression

### 8.1 Phase 1 gates (complete — test mode)

| Gate | Verification |
|------|--------------|
| 0 | Calculation + DB |
| 1 | Free Report MVP |
| 2 | Ethical language |
| 3 | Full Report integrity / parity |
| 4 | Static behaviour safety |
| 5 | Hosted Stripe test checkout |

### 8.2 Automated smokes (run on every canonical change)

```bash
npm run smoke:report-canonical    # Schema + assertCanonicalReportComplete
npm run smoke:report-parity       # Content + experience gaps
npm run smoke:release-qa          # Full release bundle
```

### 8.3 Phase 2 QA extensions (FS-007 / FS-008)

| Layer | Validates |
|-------|-----------|
| **Relationship QA** | Wisewave conversation consistent with canonical Blueprint |
| **Continuity QA** | Report → Wisewave → Session → Membership alignment |

These extend Gates 0–5; they do not replace them.

---

## 9. Schema versioning

### 9.1 Current version

```text
CANONICAL_REPORT_SCHEMA_VERSION = "canonical-report-v1"
```

### 9.2 Version policy

| Change type | Version bump | Example |
|-------------|--------------|---------|
| Add optional payload field | Minor doc update or v1 patch | New optional module field |
| Add required field | **v2** + migration | New mandatory section |
| Rename section id | **v2** + migration | `integrated_blueprint` rename |
| Remove field | **v2** + deprecation period | Drop deprecated copy |
| Breaking API shape | **v2** | Wisewave public API launch |

**Future versions:** `canonical-soul-blueprint-v2`, `v3`, …

**Backward compatibility (FS-007 requirement):**

- API must accept `schemaVersion` on read/write
- Consumers declare minimum supported version
- Migration functions: `migrateV1ToV2(report)`

### 9.3 Naming migration (document-only in v1)

| Current (code) | Target (product/docs) |
|----------------|----------------------|
| `CanonicalFullReport` | `CanonicalSoulBlueprint` (alias) |
| `buildCanonicalReport()` | keep — add alias `buildCanonicalSoulBlueprint()` when renaming |
| `lib/canonical-report/` | `lib/canonical-soul-blueprint/` (deferred) |
| `canonical-report-v1` | `canonical-soul-blueprint-v1` (next major version) |

Rename code paths before Wisewave API public release (Wisewave recommendation).

---

## 10. Future resolver chain (Phase 2+)

Current: **Blueprint resolver only** (`buildCanonicalReport`).

Target stack (Wisewave Rec 5):

```text
Blueprint Resolver
       ↓
Expression Resolver        ← FS-008 (Expression Framework™)
       ↓
Relationship Resolver      ← FS-007 (Wisewave)
       ↓
Conversation Resolver
       ↓
Presentation Resolver      ← desktop / mobile / PDF / voice
```

**Living Blueprint** (FS-008): Canonical Blueprint + Expression Layer = evolving user state.

---

## 11. Ethical and language constraints

All canonical and presentation output must comply with:

- `docs/governance/1320_BRAND_BIBLE_v1.md`
- `docs/governance/1320_PRODUCT_GOVERNANCE_v1.md`

**Customer-facing sanitizer** applied on shared/mobile resolvers. Deprecated public terms must not appear on entitled surfaces.

---

## 12. FS-005 exit checklist

- [x] Spec v1 published
- [x] Linked from Phase 2 roadmap + governance index
- [x] 19-section registry documented
- [x] Consumer contract defined
- [x] Versioning policy documented
- [x] Wisewave review — **Approved with Strategic Notes (9.8/10)**
- [x] v1.1 platform principles (Section 14) incorporated
- [ ] Optional: alias exports `buildCanonicalSoulBlueprint` (code — deferred)

---

## 13. Platform principles (v1.1 — Wisewave)

These are **platform-layer** rules — not report-layer rules. Every Phase 2 capability must comply.

### Platform Principles (five rules)

1. **One Soul Blueprint.**
2. **Blueprint is immutable.**
3. **Expression is dynamic.**
4. **Relationship creates continuity.**
5. **Presentation never owns meaning.**

### Blueprint Immutable Principle

The Canonical Soul Blueprint is **immutable**.

It represents the symbolic structure calculated from birth data.

No downstream capability — including Reports, Wisewave, Membership, Personal Integration, Dashboard, Voice, or Expression Framework™ — may alter or overwrite the Blueprint.

Dynamic systems may **relate to** the Blueprint. They must never **redefine** it.

### Expression Independence Principle

The Expression Framework™ exists **independently** from the Soul Blueprint.

| Layer | Question |
|-------|----------|
| **Blueprint** | What exists? |
| **Expression** | How is it currently being lived? |

The two layers must remain technically and conceptually separate.

### Meaning Ownership Principle

Meaning originates from the Canonical Soul Blueprint.

Wisewave does not replace, rewrite, or supersede Blueprint meaning.

Wisewave connects Blueprint meaning to lived experience through reflection, dialogue, and relationship.

It is a **relational layer**, not an authoritative source.

---

## 14. Related artifacts

| Artifact | Path |
|----------|------|
| Implementation | `lib/canonical-report/` |
| Parity foundation | `docs/specs/full-report/CANONICAL_REPORT_PARITY_v1.md` |
| Release QA | `docs/specs/full-report/FULL_REPORT_RELEASE_QA_v1.md` |
| Phase 2 roadmap | `docs/specs/phase-2/PHASE2_ROADMAP_v1.md` |
| Platform domain model (FS-005A) | `docs/specs/canonical-soul-blueprint/PLATFORM_DOMAIN_MODEL_v1.md` |
| Wisewave FS-005 sign-off | `docs/specs/canonical-soul-blueprint/WISEWAVE_FS005_SIGNOFF.md` |
| Governance pack | `docs/governance/README.md` |
| Gate 5 verification | `docs/governance/GATE5_STRIPE_VERIFICATION.md` |

---

## Appendix A — Module file map

| Module | File |
|--------|------|
| Types + schema version | `types.ts` |
| Section registry | `section-registry.ts` |
| Builder | `build-canonical-report.ts` |
| Payload enrichment | `enrich-canonical-payload.ts` |
| Parity compare | `compare-parity.ts` |
| Text extraction | `extract-substantive-text.ts` |
| Experience exclusions | `experience-parity-exclusions.ts` |
| Presentation mapping | `resolve-presentation.ts` |
| Foundation shared copy | `shared-foundation-resolvers.ts` |
| S6–S9 shared copy | `shared-expansion-resolvers.ts` |
| Tail shared copy | `shared-tail-resolvers.ts` |
| Payload path utils | `payload-path.ts` |
| Public exports | `index.ts` |
