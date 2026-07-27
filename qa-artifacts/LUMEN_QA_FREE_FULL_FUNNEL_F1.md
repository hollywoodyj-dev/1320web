# Lumen QA — Free → Full Funnel Phase F1

Base: http://localhost:3000
Date: 2026-07-27T14:23:11.659Z
Result: PASS

- **Landing hero CTA + no Session prices**: PASS — cta=true sessionPrices=false
- **Landing foundations + boundary + sample label**: PASS — 
- **Desktop no overflow**: PASS — 
- **Mobile no overflow**: PASS — 
- **Submit opens generating**: PASS — http://localhost:3000/generating?year=1980&month=5&day=22&utm_source=lumen&utm_campaign=f1-qa
- **Result recognition + Missing Map + offer**: PASS — 
- **Result has no Session price cards**: PASS — 
- **Full Report offer price is USD**: PASS — price=USD 49
- **Full Report sales Spec alignment**: PASS — 
- **Full Report sales keeps USD (no AUD)**: PASS — usd=false aud=false
- **Alias /free-soul-blueprint/result serves result**: PASS — status=200

Screenshots: `C:\github\1320-website\web\qa-artifacts\free-full-funnel-f1`

## Continuity notes
- Birth submit uses existing `/generating` → `/result` (no second engine).
- Checkout remains `/checkout`; attribution metadata forwarded when present.
- Entitlement path unchanged: purchase → `/my-report/[reportId]`.
