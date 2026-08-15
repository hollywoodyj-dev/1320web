# 1320 Soul Code — Admin Accounts Table  
## ME Spec v1 (Wisewave-parity pattern)

**Date:** 2026-08-15  
**Product:** 1320 Soul Code  
**Companion spec:** `docs/1320_SOUL_CODE_ANALYTICS_TRACKING_ADMIN_ME_SPEC_v1.md`  
**Reference:** Wisewave `pages/admin.tsx` + `pages/api/admin/users.ts` + `pages/api/admin/stats.ts` + `prisma` `User` / `Subscription`  
**Status:** **DRAFT SPEC** — implement in the **1320** codebase  
**Audience:** Nova (1320 workspace)

---

## 1. Objective

Add an **Accounts** table on the 1320 **admin page** so an admin account can, after login:

1. See all registered users (and key account fields)  
2. See summary stats (totals / 30d)  
3. Optionally manage entitlement / purchase status when paid products exist  
4. Sit **alongside** the marketing tracking panel (same admin shell)

This is the Wisewave admin **users table** pattern, adapted for Soul Code (generate / report / purchase), not reflection chat.

---

## 2. Non-goals (v1)

- Public user directory  
- Editing Soul Blueprint content from admin  
- Full CRM / email marketing  
- Impersonation (“login as user”) — out of v1 unless explicitly authorized later  
- Deleting accounts in bulk without a separate safety auth  
- Sharing Wisewave’s DB or admin token

---

## 3. Admin access

Same gate as tracking:

```text
Bearer JWT → verify user → email === ADMIN_EMAIL (or role === admin)
```

- Env: `ADMIN_EMAIL` (recommended parity with Wisewave)  
- Non-admin → **403** on all `/api/admin/*`  
- UI: `/admin` only useful after admin login; `robots` disallow `/admin`

---

## 4. Data model (minimum)

### 4.1 `User` (accounts)

| Field | Type | Admin table? | Notes |
|-------|------|--------------|--------|
| `id` | cuid | Yes (truncate display) | PK |
| `email` | string unique | **Yes** | Primary identity |
| `name` | string? | Yes | OAuth display name |
| `oauthProvider` | string? | Yes | `google` / `email` / etc. |
| `oauthId` | string? | No (or masked) | Do not expose raw in UI unless needed for support |
| `passwordHash` | string? | **Never** | Never return to admin UI |
| `country` | string? | Yes | Optional geo |
| `createdAt` | datetime | **Yes** | Sort default desc |
| `updatedAt` | datetime | Optional | |

### 4.2 Entitlement / purchase (when product exists)

Prefer a separate `Subscription` or `Purchase` model (Wisewave-style), not flags scattered on `User`:

| Field | Type | Admin table? |
|-------|------|--------------|
| `status` | enum | Yes — `none` / `trialing` / `active` / `canceled` / `expired` (or 1320 equivalents) |
| `plan` | string? | Yes — e.g. `full_report` / `monthly` |
| `platform` | string? | Yes — `web` / `stripe` / `paypal` / store |
| `currentPeriodEnd` | datetime? | Yes |
| `externalSubscriptionId` | string? | Yes (support / duplicate detection) |

If v1 is **anonymous generate only** (no accounts yet):

- Still build admin **shell** + empty Accounts table  
- Spec remains ready; Accounts populates when signup ships  
- Do not invent fake users

### 4.3 Optional 1320 product columns (recommended if easy)

| Field / derived | Source | Why |
|-----------------|--------|-----|
| `generateCount` | count of generate events or report rows | Support / abuse |
| `lastGenerateAt` | max timestamp | Engagement |
| `hasFullReport` | purchase / entitlement | Paid funnel |
| `linkedEventUserId` | same as `User.id` for conversion events | Join to tracking |

Do **not** store or show birth dates or blueprint payloads in the accounts table.

---

## 5. APIs

### 5.1 `GET /api/admin/users`

`requireAdmin` only.

**Response:**

```ts
{
  users: Array<{
    id: string;
    email: string;
    name: string | null;
    oauthProvider: string | null;
    country: string | null;
    createdAt: string; // ISO
    effectiveStatus: "none" | "trialing" | "active" | "canceled" | "expired";
    subscription: null | {
      id: string;
      status: string;
      plan: string | null;
      platform: string | null;
      currentPeriodStart: string | null;
      currentPeriodEnd: string | null;
      externalSubscriptionId: string | null;
    };
    // optional v1.1
    generateCount?: number;
    lastGenerateAt?: string | null;
  }>;
}
```

Rules:

- Order: `createdAt desc`  
- Never include `passwordHash`  
- Cap: if user count may grow large, add `?limit=200&cursor=` in v1.1; v1 may return all with a soft warning above N  

### 5.2 `GET /api/admin/stats`

`requireAdmin` only.

**Response (adapt Wisewave):**

```ts
{
  totals: {
    totalUsers: number;
    newUsers30d: number;
    totalSubscriptions: number;      // or totalPurchases
    newSubscriptions30d: number;
  };
  byStatus: { active; trialing; canceled; expired }; // omit unused
  byPlan?: { ... };
  byCountry?: Array<{ country: string | null; users: number }>;
  revenueEstimate?: { mrrUsd: number; arrUsd: number }; // optional; only if pricing known
  generatedAt: string;
}
```

If no paid product yet: show `totalUsers` / `newUsers30d` only; leave subscription cards at 0.

### 5.3 Optional mutations (v1.1 — only if Tree authorizes)

Wisewave has admin set subscription / clear store ref. For 1320:

| Endpoint | Purpose | Auth |
|----------|---------|------|
| `POST /api/admin/set-entitlement` | Grant/revoke Full Report access | Admin |
| `POST /api/admin/set-user-location` | Set `country` | Admin |

**v1 default:** **read-only** accounts table + stats. Mutations are a separate auth.

---

## 6. Admin UI — Accounts section

### 6.1 Placement

Single `/admin` page (recommended), sections top → bottom:

1. **Stats** strip (users / 30d / entitlements)  
2. **Marketing tracking** (from analytics ME spec)  
3. **Accounts table**  

Alternative: tabs `Overview | Tracking | Accounts` if the page gets long.

### 6.2 Table columns (v1)

| Column | Content |
|--------|---------|
| Email | Primary |
| Created | Local or ISO date |
| Auth | `email` / `google` / … |
| Country | or `—` |
| Status | `effectiveStatus` badge |
| Plan | plan or `—` |
| Period end | date or `—` |
| External ref | truncated id; flag duplicates if same ref on multiple rows |
| Actions | v1: none (read-only) or “Copy user id” |

### 6.3 UX requirements

- Loading / error states  
- Empty: “No accounts yet”  
- Search filter (client-side on email) — recommended even in v1  
- Do not auto-refresh every second; load on admin page mount  
- Use same Bearer token as tracking fetch  

### 6.4 Duplicate external refs

If store/payment ids can collide (Wisewave App Store case): highlight rows sharing the same `externalSubscriptionId`.

---

## 7. Privacy

- Admin-only  
- No password hashes, reset tokens, or OAuth secrets in JSON  
- No birth date / Soul Blueprint / report body in accounts API  
- Log admin access lightly if needed; do not log full user dumps to console in production  

---

## 8. Implementation slices

| Slice | Deliverable | Done when |
|-------|-------------|-----------|
| **A0** | Confirm `User` (+ entitlement model if any) in 1320 schema | Schema matches §4 |
| **A1** | `requireAdmin` shared helper | One helper used by users/stats/tracking |
| **A2** | `GET /api/admin/users` + `GET /api/admin/stats` | Admin token returns JSON; non-admin 403 |
| **A3** | Admin UI Accounts table + stats strip | Visible after admin login |
| **A4** | Client email filter + duplicate-ref highlight | Usable for support |
| **A5** | (Optional) entitlement mutation APIs | Only after explicit Tree auth |

**Suggested order with tracking spec:**  
Shared admin shell + `requireAdmin` first → **A2–A3** and tracking **S3** in parallel on the same `/admin` page.

---

## 9. Acceptance criteria

1. Admin logs in → `/admin` shows Accounts table.  
2. Non-admin token cannot list users.  
3. `passwordHash` never appears in network responses.  
4. New signup appears in table after refresh (ordered by `createdAt`).  
5. Stats `totalUsers` / `newUsers30d` match DB counts.  
6. If no paid product: Status shows `none` / empty subscription without errors.  
7. Birth/blueprint data never shown in this table.

---

## 10. Rollback

- Hide Accounts section behind `NEXT_PUBLIC_ENABLE_ADMIN_ACCOUNTS=0`  
- Or remove UI section only; keep APIs disabled via env  

---

## 11. Wisewave port checklist

| Wisewave | 1320 |
|----------|------|
| `pages/api/admin/users.ts` | port + drop chat-specific fields |
| `pages/api/admin/stats.ts` | port; simplify if no plans |
| `pages/admin.tsx` users table | Accounts section |
| `lib/admin-require.ts` (or inline requireAdmin) | shared |
| `User` + `Subscription` | map to 1320 product names |

---

## 12. Open decisions (1320 owner) — **CONFIRMED 2026-08-15 (Nova)**

1. **Accounts already live** — signup exists; table shows real `users` rows (empty state only if none).  
2. **Paid plan label:** `full_report` (purchase/entitlement product), not subscription. Status derived from entitlement + purchase: `none` | `active` | `pending` | `expired`.  
3. **Read-only v1** — no grant/revoke until A5 authorized.  
4. **Single `/admin`** page: Stats → Tracking → Accounts (same shell as analytics ME spec).  
5. Tracking KPI / GA4: see companion analytics spec (generate_code_completed; separate GA4 property).

---

## 13. Next step

After open decisions: implement **A0–A3** with the tracking admin panel so one admin login shows **stats + tracking + accounts**.
