# Environment gaps — three records, kept separate

Do not merge these. Cursor installing a dependency does **not** prove an earlier machine was fixed.

Both ENV-1 and ENV-2 are **test-runner blocked**. They must not be recorded as game-test failures. `94e2f8d` **ALL PASS** applies only to the Cursor workspace in ENV-3. iPhone Safari / Android Chrome device verification remains open.

| ID | Where | What actually failed | What it is not | Status |
|---|---|---|---|---|
| ENV-1 | Founder / previous local round (reported 2026-10-30) | Python package `playwright` was **not importable** (module missing) | Not a missing Chromium binary; not a game-logic failure | **原环境未复测；Cursor 环境已解决同类依赖问题。** Installing Playwright here does not prove that original machine is fixed. |
| ENV-2 | Archived Acceptance Review v1.0 environment | Playwright **Python package was present**; Chromium Headless Shell binary was missing: `BrowserType.launch: Executable doesn't exist` | Not a missing `playwright` module; not a game-logic failure | **Historical finding, retained.** That review machine was not retested in this workspace. |
| ENV-3 | Cursor intake machine (`C:\Users\hugoz\soulsync-kingdom-1320`) | Default `python` on PATH is 3.9.1 (too old for current Playwright wheels) | Not a game-logic failure | After switching to **`py -3.13`** (Python 3.13.5 + Playwright 1.64.1 + Chromium 156 / `chromium-1248`), smoke and interaction **ALL PASS** at `94e2f8d`. **This result is for this Cursor environment only.** Device tests are still pending. |

Logs for ENV-3 only: `docs/cursor/evidence/smoke-current-v0.2.3-2026-10-30.txt`, `smoke-frozen-v0.2.2-2026-10-30.txt`, `interaction-regression-2026-10-30.txt`.
