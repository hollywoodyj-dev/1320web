# 1320 Soul Code — Marketing & LP Tracking + Admin Dashboard  
## ME Spec v1 (Wisewave-parity pattern)

**Date:** 2026-08-15  
**Product:** [1320 Soul Code](https://www.1320soulcode.com/)  
**Reference implementation:** Wisewave (`lib/wisewave-analytics.ts`, `MarketingPageView`, `/api/marketing/conversion-event`, `/api/admin/conversion-tracking`, `pages/admin.tsx`)  
**Status:** **DRAFT SPEC** — not an implementation authorization for Wisewave  
**Audience:** Nova (or 1320 eng) implementing tracking on the 1320 codebase

---

## 1. Objective

Instrument **all marketing pages and future LPs** on 1320 Soul Code with the same dual-path pattern Wisewave uses:

1. **Client events** → GA4 (`gtag` / `dataLayer`) for ads/reporting  
2. **Server persistence** → first-party DB events for an **admin-only** dashboard  

Admins log in with an **admin account** and see tracking **directly on the admin page** (no separate BI tool required for day-1).

Pages/LPs may be added later; the system must be **route-agnostic**: new paths auto-emit `page_view` without code changes per page, while named funnel events remain catalogued.

---

## 2. Non-goals (v1)

- Full product analytics for the Soul Blueprint engine internals (calculation steps, report content) — optional later  
- Replacing GA4 with a custom realtime UI (GA4 remains optional mirror)  
- Cross-product shared DB with Wisewave  
- Public-facing “stats” pages  
- Hosted Preview / Production gates for Wisewave (this is a **1320** project spec)

---

## 3. Architecture (Wisewave parity)

```text
Browser (marketing site + /lp/*)
  ├─ SiteAnalytics shell (pathname + query)
  │    └─ trackEvent("page_view" | "homepage_view" | "paid_landing_view", …)
  ├─ TrackButton / TrackLink on CTAs
  │    └─ trackEvent("…_cta_click", { from, lp, ad_group, path })
  │
  ├─→ GA4 gtag/dataLayer (if NEXT_PUBLIC_GA_MEASUREMENT_ID set)
  └─→ POST /api/marketing/conversion-event  (beacon, keepalive)
           └─ Prisma MarketingConversionEvent (or 1320 equivalent table)

Admin browser
  └─ Login (admin role)
       └─ /admin (or /admin/tracking)
            └─ GET /api/admin/conversion-tracking  (requireAdmin)
                 └─ counts, LP breakdown, path breakdown, recent events
```

**Principle:** GA4 is for ads/external; **admin reads first-party DB**, so tracking still works if GA4 is misconfigured.

---

## 4. Data model

### 4.1 Table: `marketing_conversion_events` (name may be `soulcode_marketing_events`)

| Column | Type | Notes |
|--------|------|--------|
| `id` | cuid | PK |
| `event_name` | string | Catalog name |
| `user_id` | string? | If logged in / attributable |
| `session_id` | string? | Anonymous funnel continuity |
| `source` | string? | e.g. `organic`, `google_ads`, `utm_source` |
| `lp` | string? | Paid LP slug (`reflection-without-advice` style → `generate-code`, etc.) |
| `ad_group` | string? | Ads ad group id |
| `platform` | string? | `web` / future `ios` / `android` |
| `path` | string? | `window.location.pathname` |
| `metadata` | json? | Extra dims (never store JWT / PII secrets) |
| `created_at` | datetime | Indexed with `event_name` |

Indexes: `(event_name, created_at)`, `(created_at)`.

### 4.2 Auth for admin

- Reuse 1320 admin role (or add `isAdmin` / `role === "admin"` like Wisewave `requireAdmin`).  
- Admin API **must** reject non-admin tokens (401/403).  
- Admin UI loads only after successful admin login.

---

## 5. Event catalog (v1 — 1320-shaped)

Mirror Wisewave’s **tiers**: `required` | `recommended` | `funnel`.

### 5.1 Always-on (all pages / LPs)

| Event | When | Persist? |
|-------|------|----------|
| `page_view` | Every marketing route change | **Yes** |
| `homepage_view` | Path `/` | Yes (optional duplicate of page_view for KPI convenience) |
| `paid_landing_view` | Path starts with `/lp/` | Yes |

Payload baseline: `path`, `page` (slug), optional `from`, `lp`, `ad_group`, UTM fields if present.

### 5.2 CTA / funnel (wire as pages exist)

| Event | Suggested use |
|-------|----------------|
| `web_cta_click` | Generic primary CTA toward Generate / Report |
| `homepage_primary_cta_click` | Homepage “Generate My Code” |
| `homepage_secondary_cta_click` | Sample report / learn more |
| `paid_landing_primary_cta_click` | LP primary CTA |
| `paid_landing_secondary_cta_click` | LP secondary |
| `generate_code_started` | User submits birth date / starts generation |
| `generate_code_completed` | Free foundation result shown |
| `sample_report_view` | Sample report opened |
| `full_report_cta_click` | Upsell toward Full Soul Origin Report |
| `checkout_started` | Enter paid checkout (when exists) |
| `payment_button_clicked` | Payment attempt |
| `subscription_completed` / `purchase_completed` | Paid conversion |
| `signup_completed` | Account created (if accounts exist) |

**Primary KPI (suggested):** `generate_code_completed` (free value delivered) and later `purchase_completed` (paid).

Persist only names in `PERSISTED_CONVERSION_EVENT_NAMES` (same pattern as Wisewave) so noise events can stay GA4-only if desired. **Recommendation for 1320 v1:** persist all catalogued events including `page_view` so admin can monitor every page/LP without GA4.

---

## 6. Client instrumentation

### 6.1 `lib/soulcode-analytics.ts` (Wisewave `trackEvent` clone)

- Typed `AnalyticsEventName`  
- Flatten payload → `gtag("event", …)` or `dataLayer.push`  
- Strip secrets (`auth_token`) before GA4  
- Beacon `POST /api/marketing/conversion-event` with `keepalive: true` for persisted names  
- Dev fallback: `console.info("[analytics]", …)` when no gtag

### 6.2 Site-wide shell

Mount once in marketing layout (like `MarketingSiteAnalytics` + `MarketingPageView`):

- On `pathname` / `searchParams` change → `page_view`  
- If `/` → also `homepage_view`  
- If `/lp/*` → also `paid_landing_view` with `lp` + `ad_group` from query or path

**New pages/LPs later:** no per-page view wiring required if they sit under the same layout.

### 6.3 CTA helpers

- `TrackButton` / `TrackLink` — onClick → `trackEvent(name, { from, lp, ad_group, path })`  
- Convention: `from=` query on destination URLs for attribution (Wisewave pattern)

### 6.4 GA4 snippet

- `GoogleAnalytics` component gated by `NEXT_PUBLIC_GA_MEASUREMENT_ID` (or `NEXT_PUBLIC_GA4_MEASUREMENT_ID`)  
- Admin response should expose `ga4Configured` + measurement id (non-secret) for ops sanity

---

## 7. Server APIs

### 7.1 `POST /api/marketing/conversion-event`

Public beacon (no auth required for anonymous funnels).

Body:

```ts
{
  eventName: string;
  token?: string;      // optional JWT → resolve userId
  sessionId?: string;
  source?: string;
  lp?: string;
  adGroup?: string;
  platform?: string;
  path?: string;
  metadata?: Record<string, unknown>;
}
```

- Reject unknown `eventName` not in persist set  
- Never log raw JWT  
- Best-effort insert; return 204/200 quickly

### 7.2 `GET /api/admin/conversion-tracking`

`requireAdmin` only.

Default window: **30 days**.

Response shape (Wisewave-compatible so UI can be ported):

```ts
{
  windowDays: 30;
  generatedAt: string;
  ga4Configured: boolean;
  ga4MeasurementId: string | null;
  primaryKpi: { event: string; count30d: number };
  catalog: Array<{ name; label; tier; description; count30d }>;
  paidLpBreakdown: Array<{ lp: string; count: number }>;
  pageViewBreakdown: Array<{ path: string; count: number }>; // top N page_view paths
  recentEvents: Array<{ id; eventName; userId; sessionId; source; lp; adGroup; platform; path; createdAt }>;
}
```

---

## 8. Admin UI

### 8.1 Login

- Existing admin account flow (email/password or current 1320 auth)  
- Only `admin` role reaches `/admin`

### 8.2 Admin page sections (show tracking **inline**)

Port Wisewave admin conversion panel patterns:

1. **Primary KPI** card (e.g. Generate completed / Purchases)  
2. **Catalog table** — event label, tier, 30d count  
3. **Page views by path** — confirms “monitor all pages”  
4. **Paid LP breakdown** — ready before LPs exist (empty OK)  
5. **Recent events** — last ~80 rows for debugging  
6. **GA4 status** — configured yes/no + measurement id  

Optional later: date-range picker, CSV export — **out of v1**.

### 8.3 Empty state

If table missing: clear message `Run prisma migrate` (same as Wisewave).

---

## 9. Env

| Var | Purpose |
|-----|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 (optional but recommended) |
| `DATABASE_URL` | Persist events |
| Admin auth secrets | Existing 1320 admin |

Do not commit secrets.

---

## 10. Implementation slices (suggested)

| Slice | Deliverable | Done when |
|-------|-------------|-----------|
| **S0** | Prisma model + migrate + `recordConversionEvent` helper | Insert works in script/probe |
| **S1** | `soulcode-analytics` + layout `page_view` + GA4 component | Every route under marketing layout logs `page_view` to DB |
| **S2** | Beacon API + persist allowlist | Network tab shows POST; admin API returns counts |
| **S3** | Admin API + admin UI panel behind admin login | Admin sees path breakdown + recent events without GA4 |
| **S4** | Wire homepage / generate CTAs + catalog KPIs | Primary KPI moves when Generate completes |
| **S5** | LP layout template (`/lp/[slug]`) with auto `paid_landing_view` | New LP = content only; tracking inherited |

---

## 11. LP readiness (pages later)

When adding an LP:

1. Add route under `/lp/<slug>` using shared LP shell  
2. Set `ad_group` (and optional `lp`) in Ads final URL  
3. Use `TrackButton` for primary/secondary CTAs  
4. **Do not** invent new event names without catalog update  

Admin `paidLpBreakdown` and `pageViewBreakdown` pick them up automatically.

---

## 12. Privacy / compliance

- Do not send birth date, full Soul Blueprint, or report body into GA4 or `metadata`  
- Prefer hashed/anonymous `session_id` for pre-auth funnels  
- Document events in privacy policy if required for 1320 jurisdiction  
- Admin dashboard is internal-only; `robots` disallow `/admin`

---

## 13. Acceptance criteria

1. Admin logs in → `/admin` shows tracking panel without opening GA4.  
2. Visit `/`, `/faq` (or any marketing page), and a stub `/lp/test` → `page_view` rows appear with correct `path`.  
3. Click instrumented CTA → persisted event + catalog count increments.  
4. Non-admin cannot call `/api/admin/conversion-tracking`.  
5. GA4 optional: with measurement id unset, DB + admin still work.  
6. Adding a new LP under the shared layout requires **no** new page-view code.

---

## 14. Rollback

- Feature-flag client beacon (`NEXT_PUBLIC_ENABLE_MARKETING_BEACON=0`)  
- Drop or stop writing to events table  
- Remove admin panel section only (auth unchanged)

---

## 15. Mapping to Wisewave files (port checklist)

| Wisewave | 1320 target |
|----------|-------------|
| `lib/wisewave-analytics.ts` | `lib/soulcode-analytics.ts` |
| `lib/wisewave-conversion-tracking.ts` | `lib/soulcode-conversion-tracking.ts` |
| `lib/record-conversion-event.ts` | same helper name OK |
| `components/.../MarketingPageView.tsx` | `SoulcodePageView.tsx` |
| `components/.../TrackButton.tsx` | port |
| `components/.../GoogleAnalytics.tsx` | port |
| `pages/api/marketing/conversion-event.ts` | port |
| `pages/api/admin/conversion-tracking.ts` | port |
| `pages/admin.tsx` conversion panel | embed in 1320 admin |
| `prisma` `MarketingConversionEvent` | port model |

---

## 16. Open decisions (Tree / 1320 owner) — **CONFIRMED 2026-08-15 (Nova)**

1. **Primary KPI:** `generate_code_completed` for v1; `purchase_completed` later when paid funnel is instrumented (S4).  
2. **Accounts:** 1320 **has** signup/accounts; beacon attributes optional `userId` from cookie session when present; catalog includes `signup_completed`. Primary funnel remains usable anonymously.  
3. **Admin surface:** embed panel at **`/admin`** (not a separate-only `/admin/tracking`).  
4. **Repo:** implement in 1320 app repo (`web/`) — confirmed.  
5. **GA4 property:** **separate 1320 property** (recommended).
---

## 17. Next step

After owner confirms open decisions (esp. KPI + admin route), authorize **S0–S3** as the first build slice so admin can monitor all current pages before LPs and paid funnel exist.
