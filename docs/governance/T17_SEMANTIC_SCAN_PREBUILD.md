# T17 · Semantic scan (concept-family)

**Date:** 2026-09-15 (executed 2026-09-17)  
**Purpose:** Concept-level regression guard before and after T17 page build.  
**Not a re-open of T26** — T26 eight blocks are closed. This scan finds the same symbol family elsewhere.

**Execution:** `npx tsx scripts/probe-t17-semantic-scan.ts` — 11 hits on 2026-09-17 (excludes T17 page files). Post-T26 marketing drift candidates unchanged; T17 page title hits are expected scoped uses.

**Principle:** Preserve the symbol. Remove the unsupported ontological claim.

**Three questions (concept-family version):**

1. Is this a symbolic name 1320 uses, or a reality claim?
2. Did grammar upgrade Tradition / Resonance to Evidence / Authority?
3. Would a first-time reader hear an objective assertion about their true nature?

---

## Scan method

Grep across `lib/*content*.ts`, `lib/seo/**`, `lib/faq-content.ts`, `lib/report/` (marketing surfaces).  
Full Report / mobile report **product copy** included as secondary — entitlement content, not homepage/SEO, but same drift risk.

Smoke locks **eight T26 strings only** — this doc is the concept-level complement 玄微 requested.

---

## ✅ T26-closed surfaces (reference template)

| Surface | Status |
|---|---|
| Homepage A1–A4 | Accepted language live |
| FAQ S1, S0 | Accepted — **FAQ S1 is the reference template** (`what the system calls…`) |
| Page 01 summary + S5 body | Accepted |

---

## 🟡 Post-T26 sweep candidates (marketing / funnel)

These still use pre-T26 grammar on **public marketing** surfaces. Do not block T17; schedule follow-up sweep under T26 principle.

| Location | Current phrase | Layer risk | Q3 naive read | Suggested direction |
|---|---|---|---|---|
| `result-content.ts` FREE_RESULT_FOUNDATION S1 | *Your original essence beneath adaptation.* | Authority / Evidence | “1320 says this is my essence” | Mirror FAQ S1: *what may feel more essential beneath adaptation* or *what the system calls…* |
| `your-code-content.ts` | *Your original essence beneath adaptation.* | Same | Same | Align with T26 A2 / B1 |
| `blueprint-content.ts` S1 card | *Who you are beneath adaptation.* | Authority | Identity fact | T26 A2 wording |
| `blueprint-content.ts` S1 body | *Your S1 reveals the source pattern…* | Evidence | “1320 revealed my frequency” | *S1 is used to explore…* / *may feel* |
| `blueprint-content.ts` FAQ chip | *Who am I beneath adaptation?* | Authority | Identity question as fact | *What may feel foundational beneath adaptation?* |
| `full-report-content.ts` S1 line | *Who you are beneath adaptation.* | Authority | Same | T26 family |
| `sample-report-content.ts` S1 | *Who you are beneath adaptation.* | Authority | Same | T26 family |
| `generating-content.ts` | *Recognizing the original pattern beneath adaptation.* | Evidence | “1320 is finding my pattern” | *Exploring the original pattern…* |
| `free-soul-blueprint-content.ts` | *what may already be true beneath adaptation* | Evidence-lite | Softer but still factual | *what may feel present beneath adaptation* |
| `booking-content.ts` | *How your original pattern shapes self-recognition.* | Evidence | Pattern as causal agent | *How the original pattern is used as a mirror for self-recognition* |
| `about-1320-content.ts` S1 | *The source pattern beneath adaptation.* | Tradition | OK if framed as vocabulary | Add *1320 uses…* if used standalone |
| Page 01 meta intro | *reflect on your **original essence*** | Evidence | Essence as object | *explore themes the system groups under origin / essence* — **does not block T17** per 玄微 |
| Page 01 foundation item S1 body | *Soul Origin reflects the original pattern…* | Resonance + mild Evidence | Acceptable if “reflects” read as mirror | Optional tighten to *is used to explore…* |
| SEO guides (life-path, numerology) | *Who am I beneath adaptation?* / *The original pattern beneath adaptation* | Mixed | FAQ-style pages | Batch with blueprint/sample alignment |

---

## 🟢 Boundaries already strong (no action for T17)

| Pattern | Where |
|---|---|
| *not a fixed identity* / mirror framing | homepage boundary, FAQ, disclaimer, terms, result hero |
| *not destiny* / *not prediction* | full-report, SEO birthday pages, Page 01 S5 (post-T26) |
| *soul contracts* named as tradition, not fact | Page 01 traditions section |
| *spiritual ranking* explicitly denied | `full-report-content.ts` authority line |

---

## 🔵 Entitlement / report product copy (secondary)

Full Report v2 and mobile static layers contain phrases like *Your Soul Origin*, *Your Void Gate*, *Your Soul Mission* — **Tradition + personalized mirror** inside a paid symbolic report. Higher drift risk on Pinterest **derivatives** (C-4 Q4), not T17 page build.

Examples to watch in derivative QA, not bulk-rewrite pre-T17:

- `adapt1320V1.ts` — *Your Void Gate points to…*
- `full-report-v2/resolve-s1-page-content.ts` — *Your Soul Origin reflects…*
- Mobile reveal pages — second-person module titles

---

## T17 build clearance

| Item | Status |
|---|---|
| T26 closed | ✅ (production verified) |
| Semantic scan executed | ✅ 2026-09-17 (`probe-t17-semantic-scan.ts`) — repo only |
| Locked T17 title | **Is Numerology Scientifically Proven? Evidence, Symbolism, and the Limits of Interpretation** |
| Five-layer framework in page copy | ✅ in repo |
| Page live (production) | **PENDING DEPLOY** — repo has route + intent manifest; prod still 404 / sitemap 19 |
| Blockers | Deploy → then Haze production check (200, self-canonical, sitemap 20, Genovese citation) |

**Acceptance:** observed working in production, not implemented in repo.

**Next after deploy:** Haze T17 prod verify → post-T26 marketing sweep (table above) as separate pass.
