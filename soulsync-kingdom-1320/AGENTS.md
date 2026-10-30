# Agent notes — SoulSync Kingdom 1320

Read `START_HERE.md` first. Then `docs/cursor/PHASE_1_INTAKE_RECEIPT.md`. Gate B inputs: `docs/cursor/NOVA_FOUNDER_REQUEST_LIST_2026-10-30.md`. Environment gaps (do not merge): `docs/cursor/ENVIRONMENT_GAPS.md`.

- Develop in a **new filename** copied from `src/current/soulsync-kingdom-1320-v0.2.3-visual-dev.html`.
- Keep `#selftest` / `window.__ssk` only in the selftest copy.
- Frozen baseline v0.2.2 is read-only.
- Retracted: `S2=月＋日`, `S3=月×日`. Do not implement.
- Incoming Nova/Founder files: archive, hash, schema-check, offline mock, then propose a plan. **Do not** create HTML, add network, or edit `Adapter1320.compute()` on receipt.
- Preview / deploy / public launch are not authorized.

Checks:

```
py -3.13 -I tools/guard_retracted_formulas.py
py -3.13 -I tools/guard_frozen_hashes.py
py -3.13 -I tools/smoke_test.py src/current/soulsync-kingdom-1320-v0.2.3-visual-dev.html src/current/soulsync-kingdom-1320-v0.2.3-visual-dev-selftest.html
py -3.13 -I tools/interaction_regression.py
```

On Windows, `python` on PATH may be 3.9. Use `py -3.13` (Playwright is installed there). Git `sha256sum` lives at `C:\Program Files\Git\usr\bin\sha256sum.exe`.
