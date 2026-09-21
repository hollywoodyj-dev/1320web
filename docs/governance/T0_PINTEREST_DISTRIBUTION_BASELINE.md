# T0 · Pinterest distribution · baseline clock

**Updated:** 2026-09-21 (Haze)

---

## Two dates (do not conflate)

| Concept | Meaning | Value |
|---------|---------|--------|
| **T0 approved** | N0 preconditions met; Holly may start publishing pins | **2026-09-17** |
| **T0 clock start** | First pin live on Pinterest — measurement window **starts here** | **`PINTEREST_T0_CLOCK_START`** — set on first publish (not 9/17) |

Pre-approval work (infra, T17, N0.2–N0.4, D-11) is **not** T0 traffic. Week-1 KPIs and funnels are measured from **first pin publish date** forward.

Code lock: `lib/funnel/pinterest-t0-clock-baseline.ts`

---

## When batch 1 goes live

1. Record pin publish date (SG calendar day) in `PINTEREST_T0_CLOCK_START`.
2. Snapshot CLEAN baselines for key events at clock start (probe scripts / admin).
3. Do not back-attribute pre-pin days to T0 performance.

---

## Related (historical)

- `lib/funnel/t0-baseline.ts` — August 2026 infra snapshot (pre–Phase 0 distribution).
- `lib/funnel/pinterest-start-baseline.ts` — T8/T9 era Pinterest funnel lock (2026-08-25).
