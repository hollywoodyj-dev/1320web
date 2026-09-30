# 1320_GZH_0_ARCHITECTURE_PROPOSAL

**Document Type:** Global Chinese Track (GZH) — Foundation Architecture  
**Status:** **FROZEN** · Founder GZH-1 lock (2026-09-30) — Taiwan first · Option B · implement authorized  
**Owners:** Nova (implement) · Holly (coordination) · Founder (lock)  
**Parent:** [`1320_CN_MAINLAND_LANDING_SPEC_v0.1.md`](./1320_CN_MAINLAND_LANDING_SPEC_v0.1.md) §36  

**Purpose:** Frozen implementation model for GZH-0 / GZH-1 **without reopening** Mainland LOCK.

**Track architecture (LOCKED):**

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

## 0 · GZH-1 LOCK (Founder · 2026-09-30) — FROZEN

| Item | Lock |
|------|------|
| **First organic market** | **Taiwan** · public route **`/tw/`** |
| **Second organic market** | **Hong Kong** · `/hk/` — **after** TW semantic calibration (not a copy-paste of TW copy) |
| **Track** | `gzh` |
| **Default language / script** | Traditional Chinese · **Hant** |
| **hreflang** | `zh-TW` (HK later: `zh-HK`) |
| **URL model** | **Option B** — market-first (`/tw/` · `/hk/` · `/sg/` · `/my/`) |
| **Script in public URL** | **Not required** at this stage · do **not** use `/gzh/hant/tw/` or `/tw/hant/` for V1 |
| **Purpose** | Organic **semantic + product comprehension** validation — not max reach / revenue |
| **Paid acquisition** | **NOT AUTHORIZED** under GZH-1 |
| **Mainland** | Separate / unaffected |
| **EN Phase 1A** | Separate / unaffected |

**Why Taiwan first (test design, not “TW > HK commercially”):**

1. Cleaner semantic validation — Mandarin-first Traditional Chinese closer to the Chinese 1320 semantic core; fewer HK variables (Cantonese-influenced wording, EN/ZH mix, local commercial tone).  
2. Larger organic observation pool for comprehension / completion / return without paid acquisition.  
3. First calibration of **「1320｜生命映照」** — TW = semantic calibration market; HK = first localization adaptation market.

**Primary GZH-1 research question:**  
After the experience, does the user understand 1320 as a **reflective framework** (patterns in my life) rather than fate / soul / personality prediction?

Ideal associations: 自我觉察 · 反思 · 认识自己 · 看见自己的模式  
Failure associations: 算命 · 命理 · 心理测验 · 灵魂预测  

Include a lightweight post-result comprehension check, e.g.:

> 完成后，你觉得 1320 更像什么？

with neutral research options (not persuasion). This signal may matter more than conversion at GZH-1.

---

## 1 · Locale / routing model — FROZEN (Option B)

### Internal dimensions (must stay separate — never hard-code `market = script`)

| Dimension | Values | Role |
|-----------|--------|------|
| **track** | `en` · `gzh` · `cn-mainland` | Product / analytics / gate family |
| **market** | `tw` · `hk` · `sg` · `my` · (`…`) | Privacy overlay · currency · ads geo · legal |
| **language** | `zh` · `en` · … | Language family |
| **script** | `Hant` · `Hans` | UI + copy surface |
| **contentVariant** | optional market/tone variant | TW ≠ HK copy where needed |

Example (TW): `track=gzh` · `market=tw` · `language=zh` · `script=Hant`

### Public URL shape — Option B (LOCKED)

```
/tw/...     Taiwan · default Hant · hreflang zh-TW
/hk/...     Hong Kong · default Hant · hreflang zh-HK
/sg/...     Singapore · default Hans (when opened)
/my/...     Malaysia · default Hans (when opened)
```

`track=gzh` and `script` inferred from market defaults; script may be overridable for accessibility / preference.

**Rejected for V1 public URLs:** Option A `/gzh/{script}/{market}/…` · `/tw/hant/…` · undifferentiated `/zh/` as the GZH market.

**SEO (Founder):** Locale need not appear as a language name in the path; **hreflang** maps language/region. Script need not appear in the public URL.

### Crawl / index constraint — LOCK

Do **not** create separately indexable duplicate script URLs (e.g. `/tw/` and `/tw/?script=hans` with equivalent content and no canonical strategy).

| | GZH-1 TW |
|--|----------|
| Public canonical | `/tw/…` |
| Canonical language | Traditional Chinese |
| hreflang | `zh-TW` |
| User script override | May exist for preference · **must not** auto-become a separately indexed SEO page |

Same principle for HK later.

### `/zh/` temporary alias — LOCK

`/zh/` is **not** the GZH canonical market. Temporary entry / routing only.

Before GZH-1 goes public: Nova must define **explicit canonical / redirect** so `/zh/` and `/tw/` are **not** two indistinguishable indexable Traditional Chinese experiences. `/zh/` must not compete with `/tw/` as an indexed Chinese destination.

**CN Mainland (later):** separate prefix or host — **not** under GZH market paths.

---

## 2 · Simplified vs Traditional strategy

| Layer | Approach |
|-------|----------|
| **Semantic core** | One governed meaning source (EN + approved Chinese meaning), reviewed once |
| **Script rendering** | Dedicated **Hant** and **Hans** string tables — not auto-convert as sole localization |
| **Market overlay** | TW vs HK vocabulary/tone differences; SG vs MY as needed |

**Rule:** Simplified ↔ Traditional conversion may assist drafting; **public GREEN** requires GZH Semantic Gate on the **target script**.

**HK (GZH-2 organic):** Do **not** copy TW text. Explicitly review: local Traditional usage · Cantonese-sensitive expressions · whether English terms stay visible · privacy/consent · support expectations.

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

Privacy overlays required per market; for GZH-1 organic (not CRM-heavy), privacy law is **not** the reason TW was chosen first — **semantic experiment quality** is. Counsel owns legal text.

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
| `market` | `tw` \| `hk` \| `sg` \| `my` |
| `language` | `zh` |
| `script` | `hant` \| `hans` |
| `utm_*` | campaign naming must use `gzh_…` prefix, never `cn_…` for this track |

```
utm_campaign=gzh_tw_…   # never cn_*
```

EN Phase 1A and GZH must remain **separately readable**.

---

## 6 · Payment / report-state handling

| State | Behaviour |
|-------|-----------|
| GZH Free | Deterministic Free 生命映照 · Gregorian Y/M/D only |
| GZH Paid (after Commercial Readiness Gate) | May reuse global Stripe stack where available |
| Report language EN-only | Disclose clearly on landing + checkout |
| Mainland payment | **Out of scope** for GZH |

**GZH-1:** Free organic only · **no paid campaign**.

---

## 7 · Google Ads readiness gate (A7)

**Not authorized for GZH-1.** Remains behind Ads readiness + GREEN landing after organic evidence.

---

## 8 · Rollout status

| Stage | Status |
|-------|--------|
| **GZH-0 Foundation** | **IMPLEMENTED** · `/tw/` · Option B · `/zh/`→`/tw` 301 · analytics dims · privacy slot · comprehension check component · semantic YELLOW (noindex until GREEN) |
| **GZH-1 Organic Pilot** | **Taiwan `/tw/`** · after GREEN + comprehension instrument live · paid **not** authorized |
| **GZH-2 Organic (HK)** | After TW semantic calibration · market-specific review · **not** paid acquisition by default |
| **GZH-2 Controlled Acquisition** | After Ads readiness gate (naming in Addendum A; do not confuse with HK organic) |
| **GZH-3 Commercial Validation** | After Commercial Readiness Gate |

---

## 9 · Success criteria

North-star: *完成后，用户认为 1320 是什么？*  
算命 / 命理 / 测命 / 心理诊断 / 灵魂预测 = positioning failure even if conversion is high.

---

## 10 · Founder decision log

| Date | Decision |
|------|----------|
| 2026-09-29 | §36 Addendum A **MODIFY — ACCEPTED IN PRINCIPLE** · Option B + `/zh/` alias + TW/HK-first direction |
| 2026-09-30 | **GZH-1 LOCK:** Taiwan `/tw/` first · HK next · Option B keep · script out of public URL · internal market≠script · Nova freeze implement |

**Not authorized:** GZH paid · GZH Google Ads · Mainland public under this lock · new Chinese AI layer · indexing `/zh/` as competing TW destination.

---

## 11 · Authorization

| Allowed now | Blocked |
|-------------|---------|
| Implement GZH-0 foundation for **`/tw/`** (routes · dims · gate flags · privacy overlay slots · `/zh/` → GZH canonical/redirect) | GZH Google Ads |
| GZH-1 organic **prep** (TW GREEN + comprehension check) | GZH paid funnel / paid campaign |
| CN-0A under §34 (distinguish from GZH markets) | Mainland acquisition in GZH |

---

**Next step:** Holly schedules GZH Semantic Gate review for TW chrome → GREEN → indexable GZH-1 organic. Result/report Chinese shell + market-aware `/result` remain follow-on.
