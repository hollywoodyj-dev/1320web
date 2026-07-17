# Lumen QA Handoff — Step 5 Entitled Account Mini-QA (E2E Closure)

**From:** Wisewave / Nova  
**To:** Lumen (or Holly with entitled session)  
**Date:** 2026-07-17  
**Prerequisite:** Step 5A accepted; Step 5B public/sample PASS WITH NOTES accepted  
**Production:** https://www.1320soulcode.com  
**Runtime version:** `commercial-v3-final` (commit `9c44e1a+`)

---

## Purpose

Final end-to-end closure gate before Wisewave marks:

- **Commercial Report Output Layer v3 Final — Fully Closed**
- **Unified Report delivery path — End-to-End Accepted**
- **Project status — Stable maintenance gate achieved**

---

## Entitled test account

| Field | Value |
|-------|--------|
| Email | `hollywoodyj@gmail.com` |
| Password | _Out-of-band only — do not commit_ |
| Birth date | **1982-02-03** |
| Expected signature | `S1-20 / S3-01 / S2-05 / S0-05` |

See also: `qa-artifacts/LUMEN_QA_HANDOFF_ENTITLED_ACCOUNT_2026-07-07.md`

---

## Required spot-checks (8 items)

| # | Check | Route / action | Expect |
|---|--------|----------------|--------|
| 1 | Entitled web report | `/my-report/[reportId]` | Full commercial copy; `reportType=full`; 17 pages |
| 2 | Entitled print HTML | `/report/[reportId]/print` | Portrait print surface; S1–S9 commercial blocks |
| 3 | Account download | Account → Download PDF | PDF returns 200; attachment filename |
| 4 | Entitled mobile | Phone UA → `/my-report/[reportId]` | Unified mobile shell; swipe; no overflow |
| 5 | Copy parity | Compare vs sample (1982-02-03) | Same codes; commercial layer on entitled sections |
| 6 | No template leak | All entitled surfaces | No source-layer trigger phrases |
| 7 | PDF path | Download + print HTML | Commercial copy parity with web |
| 8 | Entitlement gating | Sample vs entitled | Sample locked; entitled full — renderer content unchanged |

---

## Trigger phrases (must not appear)

- `Commercial report output layer`
- `It invites the user`
- `This Soul Origin reflects`
- `output layer - reflective`
- `template language`
- `missing: s1.soulTraits`

---

## Segment order

- Foundation: **S1 → S3 → S2 → S0**
- Advanced: **S4 → S5 → S6 → S7 → S8 → S9**
- Tail pages intact (practice, journal, closing, disclaimer)

---

## Automated helper (optional)

With session cookie from browser devtools after login:

```bash
# PowerShell
$env:STEP5_SESSION_COOKIE="<session cookie value>"
$env:STEP5_REPORT_ID="<entitled report uuid>"
$env:PUPPETEER_EXECUTABLE_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"
npx tsx scripts/lumen-qa-entitled-step5-prod.ts
```

---

## Sign-off block

```text
Step 5 Entitled Account Mini-QA
Date:
Deploy commit:
Account: hollywoodyj@gmail.com (yes/no)
Report ID:

1. /my-report/[id] web: PASS / FAIL
2. /report/[id]/print: PASS / FAIL
3. Account download PDF: PASS / FAIL
4. Mobile /my-report/[id]: PASS / FAIL
5. Commercial copy parity: PASS / FAIL
6. No template leak: PASS / FAIL
7. PDF parity: PASS / FAIL
8. Entitlement gating: PASS / FAIL

Overall: PASS / PASS WITH NOTES / FAIL
```

---

## Artifact target

`qa-artifacts/LUMEN_QA_COMMERCIAL_OUTPUT_LAYER_STEP5_E2E_ENTITLED_2026-07-17.md`
