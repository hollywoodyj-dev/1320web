# Phase 1 Intake Receipt — SoulSync Kingdom 1320 v0.2.3

**Date:** 2026-10-30 (Australia/Sydney)  
**Workspace:** `C:\Users\hugoz\soulsync-kingdom-1320`  
**Status:** Local engineering handoff accepted with conditions. **Preview / deploy / public launch remain unauthorized.**

This receipt is Cursor’s independent intake of `SoulSync_Kingdom_1320_Cursor_Handoff_v0.2.3.zip`. It is not official 1320 algorithm or content acceptance.

## 1. Environment

| Item | Value |
|---|---|
| OS | Windows 10 (10.0.19045) |
| Git | 2.51.0.windows.2 |
| Node | v24.11.0 |
| npm | 11.6.1 |
| Python on PATH `python` | 3.9.1 — **too old for current Playwright wheels** (do not use for tests) |
| Python used for tests | 3.13.5 via `py -3.13` |
| Playwright | 1.64.1 + Chromium 156.0.8078.4 (`chromium-1248`), via **`py -3.13`**. ENV-3 tests ALL PASS at `94e2f8d` **in this Cursor environment only**. ENV-1 (prior round, module missing): original machine **not retested**; Cursor solved the same class of dependency here. ENV-2 (archived review): Chromium binary missing — **historical finding retained**. See `docs/cursor/ENVIRONMENT_GAPS.md`. |
| sha256sum | Git `usr\bin\sha256sum.exe` |

`package.json` scripts still call `python3` / `sha256sum`. On this machine, run the Python 3.13 launcher and Git sha256sum directly. Do not treat `python` 3.9 as the test interpreter.

## 2. Delivery artifact

| Item | Value |
|---|---|
| ZIP | `SoulSync_Kingdom_1320_Cursor_Handoff_v0.2.3.zip` |
| Bytes | 25,880,012 |
| ZIP SHA-256 | `A5D22ED23B47153957E80112E3062C64A4F4E72A0314A439219DF4A2C9BEAEFB` |
| Duplicate download | `…v0.2.3 (1).zip` — same hash |
| Entries | 120 (top-level folder + 119 hashed files) |
| Local immutable copy | `handoff-immutable\` (ZIP kept on disk, not committed) |

`SHA256SUMS.txt`: **119/119 OK** in this environment.

Key file hashes (reconfirmed):

| File | sha256 |
|---|---|
| `src/current/soulsync-kingdom-1320-v0.2.3-visual-dev.html` | `415945045944264b21b362adb013a417ad3b6abaccf26a3ba1b888ce9ac3a77e` |
| `src/current/…-visual-dev-selftest.html` | `d57adeb60a608672753e42b89d72f12a45397a2aad4e19e1d599839f2df32740` |
| `src/frozen-baseline-v0.2.2/soulsync-kingdom-1320-v0.2.2.html` | `ff97cda62ab14382f789193278fff7eead0970fe9eb0906a46f50aa1bfb1e7de` |
| frozen selftest | `00e4d574cf31bc8624a51949e811157411ba233f338fa819a2248ab76862ff5a` |
| official S1-18 / S3-03 / S2-27 / S0-07 WebP | match `official-1320-fixture-totems.manifest.json` |

Official fixtures are stored and hashed only. They are **not** loaded by the game.

## 3. Git baseline

This repository did not exist in the ZIP. Cursor created it after extract.

| Item | Value |
|---|---|
| First commit | `b0761015f884a2c178371602f474264f17052243` |
| Branch | `master` |
| Meaning | Snapshot of the delivered tree. **Not** historical project history. |
| Author | one-off `hugoz <hugoz@users.noreply.local>` (no `git config` written) |

`src/current/` and `src/frozen-baseline-v0.2.2/` were not modified.

## 4. Tests run here

Results below are **ENV-3 only** (`py -3.13` on this Cursor machine at `94e2f8d`). They do not retest ENV-1 or ENV-2 and are not device verification.

| Check | Result |
|---|---|
| `sha256sum -c SHA256SUMS.txt` | PASS (119 OK) |
| smoke current v0.2.3 | **ALL PASS** (ENV-3) |
| smoke frozen v0.2.2 | **ALL PASS** (ENV-3) |
| `tools/guard_frozen_hashes.py` | **ALL PASS** (4 HTML hashes) |
| `tools/guard_retracted_formulas.py` | **PASS** (no live S2/S3 formulas) |
| `tools/interaction_regression.py` | **ALL PASS** (ENV-3; Chromium, not a device) |
| iPhone Safari / Android Chrome | **not run** — 真机验证仍待完成 |

Logs (gitignored): `logs/smoke-current-v0.2.3.txt`, `logs/smoke-frozen-v0.2.2.txt`, `logs/interaction-regression.txt`.

`.gitignore` was extended in the Cursor intake commit (`logs/`, `handoff-immutable/*.zip`). The original `SHA256SUMS.txt` remains the ZIP snapshot and will report `.gitignore` as changed if re-checked against the living tree. Use `tools/guard_frozen_hashes.py` for the game files.

Retracted `S2=月＋日` / `S3=月×日` appear only as withdrawal warnings in docs, plus the superseded Data Pack. Current and frozen HTML use only the labeled DEMO formula `(y*13+m*7+d*3+i*5)%pool.length`.

## 5. Binding constraints (accepted)

- Continue from a **copy** of the clean v0.2.3 visual-dev HTML. Do not overwrite it. Do not merge `#selftest` into it.
- Frozen v0.2.2 is read-only.
- Do not change `Adapter1320.compute()` until Nova schema, success/error fixtures, and real `algorithmVersion` / `contentVersion` exist.
- Official results: backend proxy → Nova. Browser must not hold the private algorithm or `NOVA_1320_API_KEY`. Failures must not fall back to DEMO.
- Do not invent totems, names, or formulas. Do not fill the 122 missing official assets with placeholders.
- Public payload stays 6 keys.
- Prototype: no network, no web storage, no cookies.
- Preview / deploy / public launch: not authorized.

## 6. Blocked on Nova / Founder

From `docs/GAPS_AND_NOVA_INPUTS.md`, still required before official integration (Gate B):

- Remaining official totems: S1×43, S3×11, S2×49, S0×19, plus full code→totemId→asset registry.
- Versioned Nova schema, live URL, auth, error samples, real version strings.
- Official names/meanings beyond the 4 fixture codes.
- More verified birth fixtures (leap day and range edges).
- Consent copy for `blueprint_generation` and `personalized_expression`.
- Redistribution/embed license for official WebP.
- Optional: editable design sources; v0.1 brief and v0.2 plan §1–§3.2.

## 7. Regression plan

See `docs/cursor/INTERACTION_REGRESSION_PLAN.md`. Chromium local P0 flow is in `tools/interaction_regression.py` (ALL PASS at `94e2f8d`). Still open: official adapter contract tests, leap-day vectors from Nova, iPhone Safari / Android Chrome.

## 8. Suggested next work (after this receipt)

1. Check NF-1–NF-5 replies against the **locked** list `docs/cursor/NOVA_FOUNDER_REQUEST_LIST_2026-10-30.md`. Arrival of files → archive, hash, schema check, offline mock, then a written integration proposal. **Does not** by itself create HTML, add network, or edit `Adapter1320.compute()`. Game/test checkpoint remains `94e2f8d`.
2. Do not apply for Preview until Founder approval, device tests, and visual sign-off.

## 9. Gate readout

| Gate | Status |
|---|---|
| A — Local engineering handoff | **Cursor-side P0 closed** at `94e2f8d` (Founder has not independently read evidence files). Not product acceptance. |
| B — Official 1320 integration | **Waiting on inputs.** List **locked** as NF-1–NF-5 delivery basis: `docs/cursor/NOVA_FOUNDER_REQUEST_LIST_2026-10-30.md`. Checkpoint `94e2f8d`. |
| C — Hosted Preview | Not authorized |
| D — Production / public launch | Not authorized |
