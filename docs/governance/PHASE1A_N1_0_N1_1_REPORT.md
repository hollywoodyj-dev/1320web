# Phase 1A · N1.0 + N1.1 + KPI dedupe（玄微 / Haze · 归档）

**Owner:** Nova  
**Last updated:** 2026-09-23 · N1.5 FROZEN  
**Rule:** 玄微漏斗名与七字段不得改动；实现名不重命名（baseline 冻结）。

---

## Haze 裁决摘要（2026-09-23）

| 项 | 状态 |
|----|------|
| **N1.0** 落库 + probe_n10 | ✅ 接受 |
| **N1.0** Admin 逐步漏斗（同 `utm_content` × 事件链） | 📋 读数缺口 · **不阻塞首 pin** · 窗口期 SQL/导出 · 需时再开 N1.4 类增强 |
| **N1.1** 映射表 | ✅ 锁定（下表） |
| **N1.5** | ✅ **FROZEN** · `docs/governance/N1_5_UTM_CONTENT_NAMING_TABLE.md` · BA01 `ba01_p01`–`p03` |
| **OG / domain verify** | ✅ |
| **`generate_code_completed` 双发** | ✅ 小 PR `0b66ed8` + 生产目击（本节） |
| **T0 28 天时钟** | ⏸ 等 **p01 上线 + Admin 见 `first_touch_content=ba01_p01`** → 写入 `PINTEREST_T0_CLOCK_START` |

---

## N1.0 · `first_touch_content` / Admin

- **落库：** `writeCampaignAttributionMetadata` · 七字段 + legacy fallback · `gclid` 合并 N1.2。
- **生产目击：** probe_n10 · session `dd844d77-21e8-4777-8a94-3b9e2567c0cd` · `first_touch_content=lp_ad_01` 全链 · probe exit 0。
- **Admin：** Recent **Content** 列 + **`utmContentBreakdown`**（30d 按 content 聚合**行计数**）。**无** 同 content 逐步漏斗 UI。

---

## N1.1 · 事件映射（锁定）

| 玄微 funnel | 实现事件名 | 接线 | 生产目击 |
|-------------|-----------|------|----------|
| `campaign_landing` | `page_view` + attribution | ✅ | ✅ |
| `guide_cta_click` | `guide_cta_click` | ✅ | ✅ probe_n10 |
| `free_start` | `generate_code_started` | ✅ | ✅ |
| `free_complete` | `generate_code_completed` | ✅ | ✅ |
| `sample_view` | `sample_report_view` | ✅ | ✅ |
| `checkout_start` | `checkout_started` | ✅ | ✅ |
| `purchase_completed` | `purchase_completed` | ✅ | ✅ |
| `booking_page_view` | `booking_page_view` | ✅ | ✅ |
| `booking_completed` | `booking_completed` | ✅ | ✅ |

报表用**左列**；查库/Admin 用**右列**。

---

## Primary KPI · `generate_code_completed` 双发修复

### 原因

`ReportDashboard` 在 `result_view` 时 `useEffect` 可重复触发；DB 原先仅 **logged-in userId** 去重，匿名 **无 session 去重** → 同 `session_id` 可多行。

### 修复（小 PR）

1. **Server:** `generate_code_completed` → `DEDUPE_ONCE_PER_SESSION`（`session_id`）；移出 `DEDUPE_ONCE_PER_USER`。
2. **Client:** `trackGenerateCodeCompletedOnce()` · sessionStorage keyed by analytics `session_id`.

### CLEAN 口径（不变）

- **RAW** = 全部行。  
- **CLEAN** = 排除 QA 标签（`purchase_context=internal_qa` · campaign `haze_*` / legacy · source `operator` / `haze_t6b` · `first_touch_*` fallback）。  
- **不**做 session 去重以外的额外规则；session 去重发生在 **写入前**（重复 POST 不入库）。

### 生产目击

| 项 | 值 |
|----|-----|
| **方法** | 生产 API 双 POST 同 `session_id`（`utm_source=pinterest` · 非 operator）+ DB probe |
| **Probe** | `npx tsx --env-file=.env.local scripts/probe-generate-code-completed-session.ts <session_id>` |
| **Pass** | 同 session **≤ 1** 行 `generate_code_completed` |

| **Deploy** | `0b66ed8` |
| **session_id** | `68692e2d-80f7-4e8e-bb6d-7fe9c362ca38` |
| **方法** | 生产 `POST /api/marketing/conversion-event` ×2 同 session · `utm_source=pinterest` · `utm_campaign=haze_gcc_dedupe_v1` → 两次 **204** |
| **DB** | `probe-generate-code-completed-session.ts` → **rows=1** · 2026-09-23T06:38:28Z |

**CLEAN：** 该探针行 **计入 RAW**（非 operator）；**CLEAN 规则未改** — 仍仅 QA 标签排除，不在读数层做 session 折叠。

---

## 基线口径（读数勿混）

| 指标 | 口径 |
|------|------|
| **`purchase_completed` 6** | `PINTEREST_BASELINE_COUNTS` · all-time · `created_at < 2026-08-25T21:30+08` |
| **N0.4 30d RAW/CLEAN** | 滚动 30d Admin · QA 排除 SQL · 行计数 |

---

## N1.5 · BA01（冻结摘要）

| 键 | 值 |
|----|-----|
| source / medium / campaign | `pinterest` / `organic` / `beneath_adaptation` |
| content | `ba01_p01` · `ba01_p02` · `ba01_p03` |
| 发布序 | Day0 p01 → Day2–3 p02 → Day7 p03 |
| T0 起算 | p01 上线 **且** 见 `first_touch_content=ba01_p01` |

全表与 URL：`N1_5_UTM_CONTENT_NAMING_TABLE.md` · `lib/funnel/ba01-utm-naming.ts`

---

## 建议顺序（当前）

1. KPI 双发 ✅ · N1.5 冻结 ✅  
2. **发 p01** → Admin 确认 `ba01_p01` → **设 `PINTEREST_T0_CLOCK_START`**  
3. Day2–3 p02 · Day7 p03（不改编码）  
4. **N1.4** / **N0.5** 并行  
