# Phase 1A · N1.0 + N1.1 + KPI dedupe（玄微 / Haze · 归档）

**Owner:** Nova  
**Last updated:** 2026-09-23  
**Rule:** 玄微漏斗名与七字段不得改动；实现名不重命名（baseline 冻结）。

---

## Haze 裁决摘要（2026-09-23）

| 项 | 状态 |
|----|------|
| **N1.0** 落库 + probe_n10 | ✅ 接受 |
| **N1.0** Admin 逐步漏斗（同 `utm_content` × 事件链） | 📋 读数缺口 · **不阻塞首 pin** · 窗口期 SQL/导出 · 需时再开 N1.4 类增强 |
| **N1.1** 映射表 | ✅ 锁定（下表） |
| **N1.5** | ⏸ **不冻结** · 等玄微 BA01 p01–p03 语气/成品 |
| **OG / domain verify** | ✅ |
| **`generate_code_completed` 双发** | ✅ 小 PR `0b66ed8` + 生产目击（本节） |
| **T0 28 天时钟** | ⏸ 双发目击 PASS + BA01 对齐后再开 |

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

（目击 session / commit SHA 见下方 **归档行**，deploy 后填写。）

---

## 基线口径（读数勿混）

| 指标 | 口径 |
|------|------|
| **`purchase_completed` 6** | `PINTEREST_BASELINE_COUNTS` · all-time · `created_at < 2026-08-25T21:30+08` |
| **N0.4 30d RAW/CLEAN** | 滚动 30d Admin · QA 排除 SQL · 行计数 |

---

## 建议顺序（当前）

1. ~~KPI 双发修复 + 目击~~ → 与 BA01 对齐后 **开 T0**  
2. **N1.5** 冻结（玄微 BA01 后）  
3. **N1.4** / **N0.5** 并行  
