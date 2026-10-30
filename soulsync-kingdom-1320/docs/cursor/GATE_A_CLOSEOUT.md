# Gate A closeout against Acceptance Review v1.0

**Review file:** `docs/cursor/SoulSync_Kingdom_1320_Cursor_Handoff_Acceptance_Review_v1.0.md`  
**Date:** 2026-10-30  
**Workspace:** `C:\Users\hugoz\soulsync-kingdom-1320`

The review’s verdict remains **ACCEPT WITH CONDITIONS — local Cursor handoff only**. This closeout records what Cursor has now executed in this environment. It does **not** authorize Preview, deploy, production, or public launch, and it does **not** accept official 1320 algorithm or content.

Founder (2026-10-30) records Cursor-side verification at checkpoint `94e2f8d` as passed, without having independently read the evidence files.

**Environment gaps are three separate records** — see `docs/cursor/ENVIRONMENT_GAPS.md`. Do not collapse them:

- **ENV-1 (Founder previous round):** Python `playwright` **module missing**. Status: **原环境未复测；Cursor 环境已解决同类依赖问题.** A Cursor install does not prove that original machine was fixed.
- **ENV-2 (archived review v1.0):** Playwright package **present**; **Chromium Headless Shell** missing. **Historical finding, retained.**
- **ENV-3 (this Cursor workspace):** tests run with **`py -3.13`**; smoke + interaction ALL PASS at `94e2f8d` **in this environment only**. Device tests still pending.

ENV-1 and ENV-2 blocked the *test runner*, not the game. Do not record them as game-test failures.

## 1. Review matrix vs Cursor re-run

| Area | Review status | Cursor now |
|---|---|---|
| ZIP contents (120 entries) | PASS | Confirmed. ZIP SHA-256 `A5D22ED23B47153957E80112E3062C64A4F4E72A0314A439219DF4A2C9BEAEFB` |
| SHA-256 (119 files) | PASS | Reconfirmed OK |
| `START_HERE.md` | PASS | Followed |
| Frozen baseline structure | PASS (structure) | Hash-guarded; read-only |
| Source + selftest exist | PASS (existence) | Unmodified |
| Smoke tests | ENV-1: `playwright` module missing (original machine not retested). ENV-2: Chromium binary missing (historical). Neither is a game-test failure. | ENV-3: **ALL PASS** current + frozen after `py -3.13` — **this Cursor environment only** |
| Full interaction regression | OPEN | **Rebuilt and ALL PASS** (see gaps below) |
| Design docs | PASS (existence) | Unchanged |
| 1320 computation | HOLD FOR INTEGRATION | Unchanged; DEMO only; `Adapter1320.compute()` not edited |
| Official totems | PARTIAL | Fixtures hashed only; not wired into the game |
| Nova contract | OPEN | Waiting on Nova |
| Privacy / consent copy | OPEN | 6-key whitelist enforced in tests; formal copy still missing |
| Device tests | OPEN | Not run |
| Publish permission | PASS (governance) | Preview / deploy / launch still forbidden |

## 2. P0 items from §4

| P0 | Evidence | Status |
|---|---|---|
| Independent baseline tests + logs | `docs/cursor/evidence/smoke-current-v0.2.3-2026-10-30.txt`, `…smoke-frozen-v0.2.2-2026-10-30.txt`; Playwright 1.64.1 + Chromium 156; Python 3.13.5 | **Closed** |
| Git baseline + immutable ZIP | commit `b0761015f884a2c178371602f474264f17052243`; ZIP hash in `handoff-immutable/ZIP_SHA256.txt`; ZIP kept on disk | **Closed** |
| Retracted-formula rule + static check | `.cursor/rules/1320-local-handoff.mdc`, `tools/guard_retracted_formulas.py` PASS | **Closed** |
| Rebuild interaction regression | `tools/interaction_regression.py` + `docs/cursor/evidence/interaction-regression-2026-10-30.txt` ALL PASS | **Closed for ENV-3 Chromium only** (not ENV-1/ENV-2 retest; not device) |

Remaining after local P0: leap-day official asserts and adapter contract tests (**blocked on Nova NF-1 / NF-5**); iPhone Safari / Android Chrome (Gate C).

## 3. What the rebuilt regression now covers (§3.4)

Dream catch 4 lights → gate skip → wrong PIN then `1320` → sample birth → four realms → gather → blueprint → bottle (empty / snippet-only / URL blocked) → preview → consent / alias regen revoke → meteor → wall → sample-star gesture.

Also: unfinished leave, redo+leave restore, `#shell.inert` + Tab trap + Escape, visible controls ≥44px, walker vs labels, reduced-motion mid-flow overflow on map/blueprint/preview/wall, public payload exactly 6 keys, birth and gate answers not in payload.

## 4. Gate readout after this closeout

| Gate | Status |
|---|---|
| A — Local engineering handoff | **Cursor-side P0 closed at `94e2f8d` (ENV-3 only).** Smoke/interaction ALL PASS here does not retest ENV-1 or ENV-2, and is not device verification. Still not product acceptance. |
| B — Official 1320 integration | **Waiting on inputs.** NF-1–NF-5 list is locked: `docs/cursor/NOVA_FOUNDER_REQUEST_LIST_2026-10-30.md`. Game/test checkpoint remains `94e2f8d`. |
| C — Hosted Preview | Not authorized |
| D — Production / public launch | Not authorized |

Founder review of `docs/cursor/PHASE_1_INTAKE_RECEIPT.md` and this closeout can proceed. Cursor will not call Nova, add network, embed official WebP, or apply for Preview unless separately approved.
