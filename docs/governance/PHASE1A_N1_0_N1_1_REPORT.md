# Phase 1A · N1.0 + N1.1 回报（玄微工作单 · 2026-09-22）

**Owner:** Nova  
**Status:** N1.0 + N1.2 + N1.3 **生产目击 PASS**（`cf7e165` · 2026-09-22）；**Pinterest 首 pin 仍等 N1.5**  
**Rule:** 玄微漏斗名与七字段定义不得改动；实现须对齐规格，不重命名已有 baseline 事件。

### 玄微 2026-09-22 修正（已纳入实现）

| 项 | 规则 |
|----|------|
| 读取 fallback | **必需** — 新行写 `first_touch_*` / `landing_path` / `gclid`；Admin / QA / probe 读 `campaign-attribution-metadata` 多键 fallback，避免 baseline 静默漂移 |
| N1.2 | **合并进 N1.0** — 一次 schema + 一次目击 |
| 基线口径 | **`purchase_completed` 6** = `PINTEREST_BASELINE_COUNTS`（**冻结时点** all-time，`created_at < 2026-08-25T21:30+08`）· **N0.4 30d RAW/CLEAN** = **滚动 30 天** Admin 窗口（部署时 probe：RAW 8 / CLEAN 2 / QA 6）；两者均为 **行计数**，不依赖 metadata 键名，但 QA 排除 SQL 已加 `first_touch_*` fallback |
| Pinterest | T0 = **首条 pin 发布日**；开户/域名/BA01 可立即做；**首 pin 等 N1.0 + N1.5** |
| 目击 URL | `utm_medium=cpc` + `gclid=probe_n10_fake_click_id`；`landing_path` 在 guide → Free 全链保持 `/what-is-my-life-path-number` |

---

## 开窗日期结论（N1.0 + N1.1 合读）

| 轨道 | 能否按当前实现开窗 | 条件 |
|------|-------------------|------|
| **Pinterest** | ⏸ **N1.0 已闭合**；开窗仍要 **N1.5 命名表冻结** + 你定 **首 pin 日** | T0 **时钟** = first pin 发布日 |
| **Google Search** | ⏸ Conditional GO — #2/#3 **字段与 guide_cta_click 已目击**；仍缺 T24、政策审查、预算上限、N1.4 等 |

**最早可开窗（Pinterest）：** N1.0 补齐 + 一次带 `utm_content` 的生产目击 + N1.5 冻结后。  
**Google Search：** 在 N1.0–N1.3 + Holly T24 + 政策审查 + 预算上限 全部就绪前 **不启动**。

---

## N1.0 · `first_touch_content` / `first_touch_medium` 四层核实

玄微要求字段名（每事件）：`session_id`, `first_touch_source`, `first_touch_medium`, `first_touch_campaign`, `first_touch_content`, `landing_path`, `gclid`（Google 适用时）。

### 1) 落地捕获

| 项 | 状态 | 核验 |
|----|------|------|
| `utm_content` / `utm_medium` 从 URL 读取 | **已实现** | `lib/funnel/attribution.ts` — `readAttributionFromSearchParams`, `ATTR_KEYS` |
| 写入 first-touch 存储 | **已实现** | `captureLandingAttribution` → `saveFunnelAttribution`（需至少一个 campaign key 在 URL） |
| **`page_view`（campaign_landing）落库** | **部分** | `SoulcodePageView` 写入 `source` / `medium` / `campaign` / `landingPath` — **未写 `content` / `utm_content`** |
| 漏斗 beacon（`trackFunnelEvent`） | **部分** | `attributionToAnalyticsProps` → metadata 键名为 **`content` / `medium` / `campaign` / `source`**，非 `first_touch_*`；`landingPath` 非 `landing_path` |

### 2) First-touch 持久化（30 天）

| 项 | 状态 | 核验 |
|----|------|------|
| `utm_content`, `utm_medium` 在 sessionStorage + cookie | **已实现** | `FUNNEL_ATTRIBUTION_STORAGE_KEY`, `Max-Age=2592000` |
| 不覆盖（first-touch） | **已实现** | `mergeAttribution` 仅填空键 |

### 3) Stripe 交接

| 项 | 状态 | 核验 |
|----|------|------|
| Checkout metadata | **已实现** | `attributionToCheckoutMetadata` — 含 `utm_content`, `utm_medium`, `landingPath` |
| `purchase_completed` | **已实现** | `fulfill-checkout.ts` — `...attr.meta` 含 `utm_*` |
| `booking_started` / `booking_completed` | **部分** | `record-booking-funnel-event.ts` — 显式 `first_touch_source` / `first_touch_campaign` + `...attr.meta`（含 `utm_content`, `utm_medium`）；**无** `first_touch_content` / `first_touch_medium` 别名 |

### 4) Admin 读数

| 项 | 状态 | 核验 |
|----|------|------|
| Recent 行展示 medium / campaign | **部分** | `conversion-tracking/route.ts` — `readMetaString(..., ["utm_medium","medium"])` |
| Recent 行展示 **content** | **未实现** | 无 `utm_content` / `content` 列 |
| **按 `utm_content` 分组漏斗** | **未实现** | 无 SQL / UI 分组 |

### 生产目击（content 字段）

- **尚无** 玄微口径的「带 `utm_content` landing → 事件 metadata 可见 `first_touch_content`」目击。
- 间接：`test07@yy.com` Flow B 证明 **`landingPath` / first-touch 链**在跨页存活；URL 上 UTM 进入 booking metadata（`referrer_into_booking` 含 query）。
- **待办目击：**  
  `https://www.1320soulcode.com/what-is-my-life-path-number?utm_source=operator&utm_medium=organic&utm_campaign=probe_n10&utm_content=lp_ad_01`  
  → Free Blueprint → `generate_code_started` → DB 行 metadata 含规定七字段（实现补齐后跑 probe）。

### N1.0 补齐方案（不改玄微字段名）

1. **统一写入层** — 所有 persisted 事件 metadata 写入玄微七字段（含 `first_touch_*`, `landing_path`）；保留旧键只读兼容可选。  
2. **`SoulcodePageView`** — 补 `utm_content` → beacon。  
3. **Admin** — recent 列 + 按 `metadata->>'first_touch_content'`（或规范键）分组计数。  
4. **`gclid`** — 归 **N1.2**（当前 repo **零** `gclid` 引用）。

**预估：** 1–2 天实现 + 1 次生产目击（与 N1.2 可并行部分）。

---

## N1.1 · 事件命名映射（不重命名）

| 玄微 funnel | 实现事件名 | 已接线 | 生产已目击 |
|-------------|-----------|--------|------------|
| `campaign_landing` | `page_view`（+ `captureLandingAttribution` / UTM） | ✅ | ✅（多源；含 test07 `/full-report` + UTM） |
| `guide_cta_click` | **无** — 现为 `seo_article_cta_click` + `seo_to_free_blueprint`（GA/beacon，**非** ME catalog） | ❌ 需 **N1.3 新建** | ❌ |
| `free_start` | `generate_code_started` | ✅ | ✅（baseline / 生产历史） |
| `free_complete` | `generate_code_completed` | ✅ | ✅（Pinterest baseline 7） |
| `sample_view` | `sample_report_view` | ✅ | ✅（baseline 1） |
| `checkout_start` | `checkout_started` | ✅ | ✅（baseline 8） |
| `purchase_completed` | `purchase_completed` | ✅ | ✅（baseline 6） |
| `booking_page_view` | `booking_page_view` | ✅ | ✅（N0.2 test014/07） |
| `booking_completed` | `booking_completed` | ✅ | ✅（N0.2 test012） |

**不在玄微链但存在：** `booking_started`, `booking_option_selected`, `payment_button_clicked`, `full_report_cta_click` — 保持不动。

**Guide 页 CTA 现状：** `/what-is-my-life-path-number` → `SeoArticleCtaLink` → `appendAttributionToHref` + `seo_to_free_blueprint`；**不等于** `guide_cta_click`。

---

## 与 Google Conditional GO 的对应

| 前置 | N1.0 / N1.1 结论 |
|------|------------------|
| #2 utm_content 真实保存 | **PASS**（probe_n10 生产 DB） |
| #3 schema 锁定 | **PASS**（七字段 + `guide_cta_click` + `gclid` 同 session 目击） |

---

## 生产目击 · probe_n10（2026-09-22）

| 项 | 值 |
|----|-----|
| **Production deploy** | `cf7e165` Ready（`ddc8762` Vercel TS 失败已修） |
| **Browser** | Lumen · incognito · 2026-09-22 00:27:52 UTC |
| **session_id** | `dd844d77-21e8-4777-8a94-3b9e2567c0cd` |
| **DB probe** | `npx tsx --env-file=.env.local scripts/probe-n10-campaign-attribution.ts dd844d77-…` → **exit 0** |

**Verified on persisted rows (10 events, one session):**

- `page_view`, `guide_cta_click`, `generate_code_started`, `generate_code_completed`
- All rows: `first_touch_content=lp_ad_01`, `first_touch_medium=cpc`, `gclid` present, `landing_path=/what-is-my-life-path-number` (including after Free Blueprint navigation)
- Free Blueprint URL retained UTM + gclid (+ `language=en`)

---

## 建议下一步

1. **N1.5** — utm_content 命名表冻结（Pinterest + Google 初稿）  
2. **N1.4** — Booking 纳入 campaign 读数 + 显式 0  
3. **N0.5** — 闭表（并行）  
4. **Google Search** — T24 + 政策审查 + 预算上限（六项剩余项）
