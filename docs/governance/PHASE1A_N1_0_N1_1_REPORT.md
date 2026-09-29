# Phase 1A · N1.0–N1.4 + Gate #5 organic baseline（Holly closeout）

**Owner:** Nova  
**Last updated:** 2026-09-29 · Gate #3 purchase half **OPEN**  
**Constraints:** D-4 frozen · approved spend **AUD $0** · **do not launch Google Ads** · T24 / Gate #1 closed · Gate #6 not a build task · no event renames · no new landing page.

**Rule:** 玄微漏斗名与七字段不得改动；实现名不重命名（baseline 冻结）。

---

## Gate #3 status (Haze · 2026-09-29)

| Half | Status |
|------|--------|
| Landing / first-touch (guide → free start) | **Proven** · session `dd844d77-21e8-4777-8a94-3b9e2567c0cd` · probe only · **`lp_ad_01` is not a live campaign name** |
| Purchase / Stripe hop | **OPEN** · 0 `purchase_completed` / `booking_completed` rows with `gclid` |
| Close condition | One browser · URL below · real checkout pay · Admin `purchase_completed` shows `gclid=probe_gate3_01` |

**Witness URL (do not use `lp_ad_01`):**  
`https://www.1320soulcode.com/what-is-my-life-path-number?utm_source=google&utm_medium=cpc&utm_campaign=life_path_au&utm_content=gate3_probe&gclid=probe_gate3_01`

**Probe after pay:** `npx tsx --env-file=.env.local scripts/probe-gate3-purchase.ts`  
**Pass:** purchase row has `probe_gate3_01`. **Fail:** purchase exists but `gclid` / `first_touch_content` empty.  
`booking_completed` may stay **0**.

Prior QA purchases without this `gclid` **do not** close Gate #3.

---

## Implemented / not implemented

| ID | Status | Notes |
|----|--------|-------|
| **N1.0** | **implemented** | Seven fields written at landing; first-touch held; Stripe metadata path; Admin Content / medium / landing / gclid columns. |
| **N1.1** | **implemented** | Mapping table only (below). No renames. |
| **N1.3** | **implemented** | `guide_cta_click` on `/what-is-my-life-path-number` Free Blueprint CTA only. |
| **N1.2 / Gate #3** | **landing proven · purchase OPEN** | Writer exists ≠ gate closed. Need `probe_gate3_01` on a real `purchase_completed` row. |
| **N1.4** | **implemented** | `booking_page_view` + `booking_completed` in Admin catalog readout; zero stays zero. |

---

## N1.1 · Mapping table

| Founder name | Implemented event | Wired | Production seen |
|--------------|-------------------|-------|-----------------|
| `campaign_landing` | `page_view` (+ attribution) | yes | yes (all-time 344) |
| `guide_cta_click` | `guide_cta_click` | yes | yes (all-time 1) |
| `free_start` | `generate_code_started` | yes | yes (all-time 22) |
| `free_complete` | `generate_code_completed` | yes | yes (all-time 28) |
| `sample_view` | `sample_report_view` | yes | yes (all-time 3) |
| `checkout_start` | `checkout_started` | yes | yes (all-time 14) |
| `purchase_completed` | `purchase_completed` | yes | yes (all-time 8) |
| `booking_page_view` | `booking_page_view` | yes | yes (all-time 12) |
| `booking_completed` | `booking_completed` | yes | yes (all-time 1) |

---

## Witnessed session ids

| Purpose | `session_id` | Evidence |
|---------|--------------|----------|
| **N1.0 + N1.2 + N1.3** (probe_n10) | `dd844d77-21e8-4777-8a94-3b9e2567c0cd` | Guide landing with `utm_content=lp_ad_01` · `first_touch_medium=cpc` · `gclid=probe_n10_fake_click_id` · `landing_path=/what-is-my-life-path-number` held through `guide_cta_click` → `generate_code_started` → `generate_code_completed`. Seven fields present on events. |
| **KPI dedupe** (prior) | `68692e2d-80f7-4e8e-bb6d-7fe9c362ca38` | `generate_code_completed` ≤1 row / session after fix. |

**N1.2 / Gate #3 purchase with gclid:** **0 rows** · Gate **OPEN** · prior purchases without this probe do not count.

---

## N1.4 · Campaign readout (30d · 2026-09-29 probe)

| Founder | Implemented | 30d count |
|---------|-------------|----------:|
| campaign_landing | page_view | 153 |
| guide_cta_click | guide_cta_click | 1 |
| free_start | generate_code_started | 13 |
| free_complete | generate_code_completed | 18 |
| sample_view | sample_report_view | **0** |
| checkout_start | checkout_started | 4 |
| purchase_completed | purchase_completed | 2 |
| booking_page_view | booking_page_view | 12 |
| booking_completed | booking_completed | 1 |

---

## Gate #5 · Organic baseline (this path only · before paid click)

**Path:** `/what-is-my-life-path-number` → `guide_cta_click` → Free Blueprint start → completion → checkout → purchase → booking  

**Scope:** `landing_path` (or legacy `landingPath` / `landing_page`) = `/what-is-my-life-path-number` · exclude operator / haze / `probe_n10` · **all-time** · as of **2026-09-29**.

| Founder name | Implemented event | Organic count |
|--------------|-------------------|--------------:|
| campaign_landing | page_view | **0** |
| guide_cta_click | guide_cta_click | **0** |
| free_start | generate_code_started | **0** |
| free_complete | generate_code_completed | **0** |
| sample_view | sample_report_view | **0** |
| checkout_start | checkout_started | **0** |
| purchase_completed | purchase_completed | **0** |
| booking_page_view | booking_page_view | **0** |
| booking_completed | booking_completed | **0** |

**Note:** Raw `page_view` with `path=/what-is-my-life-path-number` = **2**, both `source=operator` (probe only). Real zeros stay zeros. No paid Google click exists (D-4 = AUD $0).

**Probe script:** `scripts/probe-phase1a-gates-n10-n14.ts`

---

## Prior archive (Haze · 2026-09-23)

N1.5 BA01 FROZEN · T0 clock = 2026-09-23 · KPI session dedupe · OG verify — unchanged. See git history of this file for full Haze acceptance block.
