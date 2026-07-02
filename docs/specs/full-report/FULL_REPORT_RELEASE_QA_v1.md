# Full Report — Final Release QA Checklist (One Product, Two Renderers)

**Owner:** Lumen (visual / ethical) + Nova (automated regression)  
**Gate:** Public paid release after Gate 0–5 + parity P1–P4 + Phase A/B  
**Canonical dates:** `1980-05-22`, `1982-02-03` (add `1977-11-12` for regression)

---

## Session log

```text
Date: 2026-07-02
Tester: Lumen
Birth dates tested: 1980-05-22, 1982-02-03
Automated regression (Section 1): PASS
Desktop full walkthrough (Section 2): PASS
Mobile full walkthrough (Section 3): PASS
Ethical language spot check (Section 4): PASS
Checkout / access (Section 5): BLOCKED LOCALLY - hosted Stripe test-mode checkout still required
Cross-surface codes (Section 6): PASS
Overall: PASS WITH CHECKOUT NOTE
Notes: Full Report content, renderer parity, ethical language, and cross-surface code consistency passed after release-QA sanitizer/vocabulary fixes. Local checkout is intentionally not live without Stripe env, so public paid release still needs hosted Stripe test-mode checkout/access verification before live commerce switch.
```

```text
Date:
Tester:
Birth dates tested:
Automated regression (Section 1): PASS / FAIL
Desktop full walkthrough (Section 2): PASS / FAIL / NOT RUN
Mobile full walkthrough (Section 3): PASS / FAIL / NOT RUN
Ethical language spot check (Section 4): PASS / FAIL / NOT RUN
Checkout / access (Section 5): PASS / FAIL / NOT RUN
Cross-surface codes (Section 6): PASS / FAIL / NOT RUN
Overall: QA PASS / PASS WITH NOTES / FAIL
Notes:
```

---

## 1. Automated regression (Nova — run first)

From `web/`:

| # | Command | Purpose | Result |
|---|---------|---------|--------|
| 1.1 | `npm run build` | Production compile | |
| 1.2 | `npm run smoke:report-canonical` | Canonical schema + payload audit | |
| 1.3 | `npm run smoke:report-parity` | Content + experience parity (0/0 post Phase B) | |
| 1.4 | `npm run smoke:report-parity -- --enforce-priority=2` | Enforced P2+ parity | |
| 1.5 | `npx tsx scripts/audit-experience-gaps.ts` | Actionable gap audit | |
| 1.6 | `npm run smoke:v2-calculation` | Golden Dataset calc rules | |
| 1.7 | `npm run smoke:v2-content` | v2 DB index + lookup | |
| 1.8 | `npm run smoke:full-report-v2-sample` | Sample payload 1980-05-22 | |
| 1.9 | `npm run smoke:full-report-payload` | Payload shape | |
| 1.10 | `npm run smoke:result-1977` | 1977 regression | |

**Pass criteria:** All green; parity content gaps = 0, experience gaps = 0 on smoke dates.

---

## 2. Desktop full walkthrough (Lumen)

**URL:** `/full-report-v2?year=YYYY&month=M&day=D`

| # | Check | 1980-05-22 | 1982-02-03 |
|---|-------|------------|------------|
| 2.1 | Cover → disclaimer → signature → S1–S9 → integrated → practice → journal → closing → disclaimer | | |
| 2.2 | Codes/titles match Chunk 0 system truth | | |
| 2.3 | No placeholder / template leak / `NOVA should` / old source-language | | |
| 2.4 | Personalized module copy present (not static-only pages for S1–S9) | | |
| 2.5 | Practice 7-day + journal + closing read complete | | |

Reference: `LUMEN_QA_FULL_REPORT_V2_WEB_MOBILE.md` chunks 2–5.

---

## 3. Mobile full walkthrough (Lumen @ 390×844)

**URL:** `/mobile-report-v2?year=YYYY&month=M&day=D`

| # | Check | 1980-05-22 | 1982-02-03 |
|---|-------|------------|------------|
| 3.1 | Pages 00–32 swipeable; no broken routes | | |
| 3.2 | No horizontal overflow | | |
| 3.3 | No clipped map/body text (scroll OK) | | |
| 3.4 | Agency language on 02, 28–32 (Phase A) | | |
| 3.5 | Foundation 06–19 + integrated 14–15 (P4) | | |
| 3.6 | Expansion 20–27 (P3) | | |

Reference: `LUMEN_QA_FULL_REPORT_V2_WEB_MOBILE.md` chunks 6–11.

---

## 4. Gate 2 — Ethical language spot check (Lumen)

Sample pages: mobile **02**, **32**; desktop **final disclaimer**, **closing**.

| # | Must present | Must NOT present |
|---|--------------|------------------|
| 4.1 | Reflective / symbolic framing | Deterministic fate language |
| 4.2 | Inner authority, self-responsibility | Diagnostic / therapeutic claims |
| 4.3 | “Mirror not cage” / “more than any report” | Financial/legal/medical advice |
| 4.4 | Customer-facing copy (no internal QA strings) | `NOVA should`, raw DB migration notes |

---

## 5. Checkout / access flow (Lumen or Chino)

| # | Step | Expected | Result |
|---|------|----------|--------|
| 5.1 | `/result?year=1982&month=2&day=3` → upgrade CTA | Reaches checkout (Stripe test mode) | |
| 5.2 | Checkout preserves birth context (cookie or query) | Correct date on paid report | |
| 5.3 | Success → magic link / my-report access | Paid report renders desktop + mobile | |
| 5.4 | Upsell copy matches delivered product (~32 pages, 7-day practice) | No overclaim vs actual report | |

Reference: `qa-artifacts/1320-gate-5-checkout-upgrade-2026-07-01.md`

---

## 6. Cross-surface code consistency

For each birth date, codes/titles must match across result, desktop, mobile:

| Field | Result | Desktop | Mobile |
|-------|--------|---------|--------|
| S1 code + title | | | |
| S3 code + title | | | |
| S2 code + title | | | |
| S0 code + title | | | |
| Signature string | | | |

CLI: `npm run smoke:result-1977` + Chunk 0 one-liner in `LUMEN_QA_FULL_REPORT_V2_WEB_MOBILE.md`.

---

## 7. Overall verdict

| Outcome | When |
|---------|------|
| **QA PASS** | Sections 1–6 pass; no blocker language or missing modules |
| **QA PASS WITH NOTES** | Visual polish only (spacing, minor CSS) |
| **QA FAIL** | Calc mismatch, missing content, unsafe language, checkout broken |

After **QA PASS:** Gate 3 public release unblocked; Gate 5 live Stripe switch is a separate business decision.

---

## Related

- `CANONICAL_REPORT_PARITY_v1.md` — parity architecture + Phase A/B
- `LUMEN_QA_PROTOCOL_v1.md` — paid delivery gate
- `npm run smoke:release-qa` — automated Section 1 bundle
