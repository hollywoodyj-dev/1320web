# 1320_GZH_0_ARCHITECTURE_PROPOSAL

**Document Type:** Global Chinese Track (GZH) — Foundation Architecture Proposal  
**Status:** Filed · Authorized by Addendum A **MODIFY — ACCEPTED IN PRINCIPLE** (2026-09-29) · awaiting Founder lock on open decisions (§10)  
**Owners:** Nova (proposal) · Holly (coordination) · Founder (lock)  
**Parent:** [`1320_CN_MAINLAND_LANDING_SPEC_v0.1.md`](./1320_CN_MAINLAND_LANDING_SPEC_v0.1.md) §36  

**Purpose:** Lock implementation model for GZH-0 **without reopening** Mainland LOCK.

**Track architecture (LOCKED at product level):**

```
EN Global  →  Global Chinese (GZH)  →  CN Mainland
```

Three tracks share the 1320 core; they do **not** share one undifferentiated “中国版” locale.

| Track | Internal name | Must appear in |
|-------|---------------|----------------|
| English global | `EN` | analytics · campaigns · attribution |
| Global Chinese | `GZH` (never “CN”) | locale · analytics · campaigns · legal · checkout · content gates · release gates |
| Mainland China | `CN Mainland` | separate gates · Mainland overlay · Mini Program / H5 |

---

## 1 · Locale / routing model (proposal — needs Founder lock)

### Recommended model: **script + market**, not a single `/zh/`

| Dimension | Values | Role |
|-----------|--------|------|
| **Track** | `en` · `gzh` · `cn-mainland` | Product / analytics / gate family |
| **Script** | `Hans` (Simplified) · `Hant` (Traditional) | UI + copy surface |
| **Market** | `tw` · `hk` · `sg` · `my` · (`…`) | Privacy overlay · currency · ads geo · legal links |

**Proposed public URL shape (option A — preferred for clarity):**

```
/gzh/hant/tw/...     Taiwan Traditional
/gzh/hant/hk/...     Hong Kong Traditional
/gzh/hans/sg/...     Singapore Simplified
/gzh/hans/my/...     Malaysia Simplified
```

**Option B (shorter, still separable):**

```
/tw/...  /hk/...  /sg/...  /my/...
```
with `track=gzh` and `script` inferred from market defaults (TW/HK→Hant, SG/MY→Hans), overridable.

**Option C (reject for long-term):** single undifferentiated `/zh/` for all Chinese — **conflicts with A1/A2**.

**CN Mainland (later):** separate prefix or host (e.g. Mini Program + Mainland H5) — **not** under `/gzh/`.

**CN-0A note:** Existing authorization for `/zh/` scaffolding may remain as a **temporary shell** or redirect map into GZH routes once GZH-0 is locked. Until locked, do not treat `/zh/` as “the Global Chinese market.”

**hreflang (proposal):** `zh-Hant-TW` · `zh-Hant-HK` · `zh-Hans-SG` · `zh-Hans-MY` · `en` · Mainland later as own set.

**Founder lock needed:** Option A / B / other.

---

## 2 · Simplified vs Traditional strategy

| Layer | Approach |
|-------|----------|
| **Semantic core** | One governed meaning source (EN + approved Chinese meaning), reviewed once |
| **Script rendering** | Dedicated **Hant** and **Hans** string tables — not auto-convert as sole localization |
| **Market overlay** | TW vs HK vocabulary/tone differences; SG vs MY as needed |

**Rule:** Simplified ↔ Traditional conversion may assist drafting; **public GREEN** requires GZH Semantic Gate on the **target script**.

Initial validation markets (A12): **TW · HK · SG · MY** — market-by-market, not one blended audience.

---

## 3 · Market-overlay model

```
Global Privacy Core
+ Market Overlay (tw | hk | sg | my)

Global Commercial Core (Stripe / EN stack where eligible)
+ Market Overlay (currency display · tax/invoice notes · support locale)

GZH Semantic Core
+ Script Layer (Hant | Hans)
+ Market Overlay (copy variants where TW ≠ HK, etc.)
```

Overlays configured; **counsel** decides legal text — Nova does not invent PDPA/PCOPD overlays.

---

## 4 · Content-source hierarchy

```
Global Source Governance (EN + C-4 / T17)
        ↓
Global Chinese Semantic Core (candidates)
        ↓
GZH Semantic Gate → GREEN / YELLOW / RED
        ↓
Script Layer (Hant / Hans) GREEN required for that script
        ↓
Market Overlay (optional variant)
        ↓
[Mainland only] CN Mainland Public Semantics Gate
```

Existing `data/1320-v2-locale/zh/` = **candidates** for GZH; not auto-GREEN.

If Full Report remains EN on a Chinese landing: UI must state **完整报告目前提供英文版本。**

---

## 5 · Analytics segmentation

Every persisted marketing / funnel event for GZH should carry (metadata and/or dims):

| Field | Example |
|-------|---------|
| `product_track` | `gzh` \| `en` \| `cn_mainland` |
| `script` | `hant` \| `hans` |
| `market` | `tw` \| `hk` \| `sg` \| `my` |
| `utm_*` | campaign naming must use `gzh_…` prefix, never `cn_…` for this track |

**Campaign naming examples:**

```
utm_source=google
utm_medium=cpc
utm_campaign=gzh_tw_lifepath_test   # not cn_*
utm_content=gzh_ad_01
```

EN Phase 1A (`beneath_adaptation` / BA01) and GZH campaigns must remain **separately readable**.

---

## 6 · Payment / report-state handling

| State | Behaviour |
|-------|-----------|
| GZH Free | Deterministic Free 生命映照 · Gregorian Y/M/D only |
| GZH Paid (after Commercial Readiness Gate) | May reuse global Stripe stack where available |
| Report language EN-only | Disclose clearly on landing + checkout |
| Report language ZH GREEN | Disclosure may be removed |
| Mainland payment | **Out of scope** for GZH |

**GZH Commercial Readiness Gate** checklist (A5): landing GREEN · accurate product · price/currency · checkout destination · refund · privacy/terms for market · support · accurate Chinese-availability representation.

---

## 7 · Google Ads readiness gate (A7)

Before any GZH Google Ads spend:

- [ ] Landing URL is GZH track (not Mainland; not EN Phase 1A mix)  
- [ ] Landing = GREEN (GZH Semantic Gate)  
- [ ] Ad copy C-4 compliant · no prediction/destiny/diagnosis  
- [ ] Price / product accurately represented  
- [ ] Geo: HK / TW / SG / MY (or approved list) — **Mainland excluded**  
- [ ] No sensitive psych-vulnerability custom audiences  
- [ ] Privacy / Terms overlay ready for that market  
- [ ] Creative sells reflection / self-understanding  

Creative pitch: **reflection / self-understanding** — not vulnerability-as-targeting.

---

## 8 · Rollout (A11) — status

| Stage | Status |
|-------|--------|
| **GZH-0 Foundation** | **IN PROGRESS** (this proposal) |
| **GZH-1 Organic Pilot** | After GZH-0 lock + GREEN landings |
| **GZH-2 Controlled Acquisition** | After Ads readiness gate |
| **GZH-3 Commercial Validation** | After Commercial Readiness Gate |

---

## 9 · Success criteria (A13) — reminder

North-star qualitative check: *What does the user think 1320 is after the experience?*  
算命 / 命理 / 测命 / 心理诊断 = positioning failure even if conversion is high.

---

## 10 · Open decisions for Founder

1. **URL model:** Option A (`/gzh/{script}/{market}/…`) vs Option B (market-first) vs other  
2. **Default script per market:** TW/HK→Hant, SG/MY→Hans — confirm  
3. **CN-0A `/zh/`:** keep as temporary alias / redirect into GZH, or freeze new work on `/zh/` pending GZH routes  
4. **First organic market:** TW vs HK vs SG vs MY (single market first recommended)  

---

## 11 · Authorization recap

| Allowed now | Blocked until gates |
|-------------|---------------------|
| Finish GZH-0 proposal → Founder lock | GZH Google Ads |
| CN-0A scaffolding (distinguish from GZH markets) | GZH paid funnel activation |
| Organic pilot **prep** | Mainland acquisition in GZH campaigns |

---

**Next step after Founder locks §10:** Nova implements foundation (routes · analytics dims · gate flags · privacy overlay slots) for **GZH-0**, then Holly schedules GZH-1 organic for one market.
