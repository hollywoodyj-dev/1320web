# Interaction regression plan — v0.2.3

Script: `tools/interaction_regression.py` (Playwright, selftest copy, 390×844, reduced motion).

This replaces the lost full-flow script. Device Safari / Android Chrome remain open.

## Covered now (Acceptance Review §3.4 local P0)

| Flow | Assertion |
|---|---|
| About modal | `#shell.inert`, focus in modal, Tab trapped, Escape restores |
| Catch 4 dream lights (not skip) | `dreamNext` appears |
| Gate skip ×3 | Door keypad |
| Wrong PIN `0000` then `1320` | Error then birth screen |
| Sample birth | Map reached |
| Map | Visible controls ≥44px; walker vs labels; no horizontal overflow |
| Leave unfinished S1 | Node not marked visited |
| Complete S1 / S3 / S2 / S0 | All four nodes `done` |
| Redo S1 then leave | Completed result restored; gather available |
| Gather → blueprint | Four cards; no overflow |
| Empty / snippet-only / URL in bottle | Preview blocked |
| Preview consent | Publish disabled until consent; regen revokes it |
| Publish → meteor → wall | Wall reached; no overflow |
| Sample-star gesture | `light` selected |
| Public payload | Exactly 6 keys; birth and gate answers stay private |

## Still open (not local P0)

- Manual birth date including leap day (needs Nova fixture before official asserts).
- Official-adapter contract tests once Nova schema exists: version, `foundation_order`, code format, totem match, timeout/error, no DEMO fallback.
- iPhone Safari safe-area / Android Chrome.
- Founder / Hollywood visual sign-off.

## How to run

```
py -3.13 -I tools/interaction_regression.py
```

Do not point this script at the clean (non-selftest) file; the state hook lives only on the selftest copy.
