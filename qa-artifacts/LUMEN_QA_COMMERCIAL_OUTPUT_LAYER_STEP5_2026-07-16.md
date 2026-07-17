# Lumen QA - Commercial Output Layer Step 5A/5B

Date: 2026-07-16  
Target: 1320 / Soul Code commercial-v3-final package  
Production: https://www.1320soulcode.com  
Local commit checked: `9c44e1ae00e46583f92e03146f10a89d06ec6627` (`Ship commercial-v3-final overlay package for Step 5A.`)

## Verdict

PASS WITH NOTES.

Step 5A package is accepted locally, and Step 5B production sample surfaces pass the available public checks for web, mobile, print HTML, and sample PDF. Entitled `/my-report/[id]`, `/report/[id]/print`, and account download remain unverified because no authenticated entitled report session/report ID was available in this cycle.

## Local Step 5A Preflight

Commands run from `C:\github\1320-website\web`:

| Check | Result |
|---|---|
| `npm run package:commercial-v3-final` | PASS - 258 entries |
| `npm run smoke:commercial-overlay` | PASS |
| `npm run smoke:v2-get-content` | PASS |
| `npm run smoke:full-report-v2-sample` | PASS - `S1-18|S3-03|S2-27|S0-07`, modules=10 |
| `npm run smoke:report-system` | PASS - pages=17, sampleLocked=9 |
| `npm run smoke:report-pdf` | PASS - unifiedPages=17 |
| `npx tsc --noEmit` | PASS |

Package regeneration output confirmed:

- Total entries: 258
- S0: 20
- S1: 44
- S2: 50
- S3: 12
- S4: 20
- S5: 44
- S6: 44
- S7: 7
- S8: 8
- S9: 9
- Overlay: `data\1320-v2\commercial-report-blocks-overlay-v3-final.json`
- Module exports: `data\1320-v2\commercial-overlay\v3-final\`

Runtime pointer checks:

- `_manifest.json` points to `commercial-report-blocks-overlay-v3-final.json`
- `_manifest.json` version is `commercial-v3-final`
- `lib/1320-v2/commercial-report-layer.ts` imports the v3-final overlay
- `COMMERCIAL_LAYER_VERSION = "commercial-v3-final"`

## Production Step 5B Checks

### Route Availability

The following routes returned HTTP 200:

- `/full-report-v2?year=1980&month=5&day=22`
- `/mobile-report-v2?year=1980&month=5&day=22`
- `/sample-report/print?type=full&year=1980&month=5&day=22`
- `/sample-report/print?type=sample&year=1980&month=5&day=22`

### Ten-Date Web/Mobile Matrix

Checked both `/full-report-v2` and `/mobile-report-v2` for:

1. `1980-05-22`
2. `1982-02-03`
3. `1977-11-12`
4. `1988-07-14`
5. `1990-03-09`
6. `2000-01-01`
7. `1999-12-31`
8. `2024-02-29`
9. `1960-02-29`
10. `1970-01-01`

Result for all 20 web/mobile responses:

- HTTP 200
- Foundation codes present: S1 / S3 / S2 / S0
- Advanced codes present: S4 / S5 / S6 / S7 / S8 / S9
- No internal/template trigger phrases found:
  - `Commercial report output layer`
  - `It invites the user`
  - `This Soul Origin reflects`
  - `output layer - reflective`
  - `template language`
  - `missing: s1.soulTraits`

### Existing Production Probes

`npx tsx scripts/lumen-qa-commercial-step4-prod.ts`

- PASS for S7/S8/S9 code presence on five reference dates.
- No Step 4 trigger phrases found.

`npx tsx scripts/lumen-qa-visual-density-prod-390.ts`

- PASS homepage mobile first screen.
- PASS unified mobile sample cover + overview at 390px.
- PASS unified mobile seven-day-practice locked sample page at 390px.
- PASS mobile sample redirect/path from `/full-report-v2`.
- No horizontal overflow detected in checked mobile states.

### Print / PDF

HTML print:

- `/sample-report/print?type=full&year=1980&month=5&day=22`
  - HTTP 200
  - Renderer content present
  - S1 and S9 present
  - No internal/template trigger phrases found
- `/sample-report/print?type=sample&year=1980&month=5&day=22`
  - HTTP 200
  - Renderer content present
  - Locked/sample state present
  - S1 and S9 present
  - No internal/template trigger phrases found

PDF API:

- `/api/report/sample/pdf?type=full`
  - HTTP 200
  - `Content-Type: application/pdf`
  - `Content-Disposition: attachment; filename="1320-sample-report-full.pdf"`
  - Size observed: ~7.16 MB
- `/api/report/sample/pdf?type=sample`
  - HTTP 200
  - `Content-Type: application/pdf`
  - `Content-Disposition: attachment; filename="1320-sample-report-sample.pdf"`
  - Size observed: ~4.48 MB

## Notes / Limits

- Production behavior matches the v3-final Step 5A package, but Vercel response headers do not expose a commit SHA.
- Entitled report surfaces were not verified:
  - `/my-report/[id]`
  - `/report/[id]/print`
  - account download button
- Existing unrelated untracked QA images/logs remain in the local worktree and were not touched.

## Acceptance

Step 5A can be treated as locally accepted.

Step 5B can be treated as PASS WITH NOTES for public sample/unified surfaces. Full closure still requires an authenticated entitled report session/report ID if Wisewave wants account-owned surfaces included in the same gate.
