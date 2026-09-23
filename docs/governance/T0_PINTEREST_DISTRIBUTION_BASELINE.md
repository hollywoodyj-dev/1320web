# T0 · Pinterest distribution · baseline clock

**Updated:** 2026-09-23 · N1.5 BA01 frozen

---

## Two dates (do not conflate)

| Concept | Meaning | Value |
|---------|---------|--------|
| **T0 approved** | N0 preconditions met; Holly may start publishing pins | **2026-09-17** |
| **T0 clock start** | BA01 **p01** live **and** Admin/DB shows `first_touch_content=ba01_p01` | **`2026-09-23`** (SG) — locked |

Pre-approval work (infra, T17, N0.2–N0.4, D-11) is **not** T0 traffic. Week-1 KPIs and funnels are measured from **T0 clock start** forward.

**N1.5 naming:** `docs/governance/N1_5_UTM_CONTENT_NAMING_TABLE.md`  
Code lock: `lib/funnel/pinterest-t0-clock-baseline.ts` · `lib/funnel/ba01-utm-naming.ts`

---

## T0 clock evidence · 2026-09-23 (SG)

| 项 | 值 |
|----|-----|
| **SG calendar day** | **2026-09-23** (confirmed via Asia/Singapore) |
| **First `ba01_p01` row** | `page_view` · `2026-09-23T07:59:10.835Z` (= **15:59 SGT**) |
| **Fields** | `first_touch_content=ba01_p01` · `source=pinterest` · `medium=organic` · `campaign=beneath_adaptation` · `landing_path=/free-soul-blueprint` |
| **Probe** | `npx tsx --env-file=.env.local scripts/probe-ba01-p01.ts` |

`PINTEREST_T0_CLOCK_START = "2026-09-23"`

---

## When BA01 p01 goes live

1. ~~Publish pin with destination URL for `ba01_p01`~~ **DONE**
2. ~~Confirm Admin/DB shows `first_touch_content=ba01_p01`~~ **DONE**
3. ~~Set `PINTEREST_T0_CLOCK_START`~~ **`2026-09-23`**
4. Snapshot CLEAN baselines for key events at clock start (optional follow-up).
5. Do not back-attribute pre-`ba01_p01` days to T0 performance.
6. Publish p02 (Day2–3) and p03 (Day7) **without renaming** codes.

---

## Related (historical)

- `lib/funnel/t0-baseline.ts` — August 2026 infra snapshot (pre–Phase 0 distribution).
- `lib/funnel/pinterest-start-baseline.ts` — T8/T9 era Pinterest funnel lock (2026-08-25).
