# Lumen QA — Blueprint Integration Consultant role title

Date: 2026-07-27T15:26:00.839Z
Result: PASS

Short: Blueprint Integration Consultant
Full: 1320 Soul Blueprint Integration Consultant
ZH: 1320 灵魂蓝图整合顾问 / 蓝图整合顾问

- **No client "Facilitator" in lib/booking-content.ts**: PASS — clean
- **No client "Facilitator" in lib/booking/success-content.ts**: PASS — clean
- **No client "Facilitator" in lib/personal-integration/ops/intake-content.ts**: PASS — clean
- **No client "Facilitator" in lib/personal-integration/prep-content.ts**: PASS — clean
- **No client "Facilitator" in lib/email/send-integration-reminders.ts**: PASS — clean
- **No client "Facilitator" in lib/email/send-integration-summary.ts**: PASS — clean
- **No client "Facilitator" in lib/personal-integration/ops/summary-template.ts**: PASS — clean
- **No client "Facilitator" in app/(site)/account/integration-sessions/[sessionId]/page.tsx**: PASS — clean
- **Internal fields unchanged (facilitator_id)**: PASS — 
- **Role constants present**: PASS — 
- **Avoids bare Blueprint Consultant**: PASS — 
- **Booking page uses Consultant title**: PASS — {"hasShort":true,"hasMeet":true,"hasFacilitatorClient":false,"hasBareBlueprintConsultant":false,"nonPredictive":true}
- **Booking desktop no overflow**: PASS — 
- **Booking mobile no overflow 320px**: PASS — 
- **Booking mobile no overflow 390px**: PASS — 
- **Booking mobile no overflow 430px**: PASS — 
- **Disclaimer mentions Consultant**: PASS — 

Screenshots: `C:\github\1320-website\web\qa-artifacts\role-title-consultant`

## Internal boundary
- `facilitator_id`, `assigned_facilitator_id`, facilitator workspace routes unchanged.
- Summary JSON key `facilitator_label` retained; client-facing value/label use Consultant title.
