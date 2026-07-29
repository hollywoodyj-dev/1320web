# Canonical Domain & Brand Hierarchy — Wisewave Decision

**Status:** ✅ Accepted (Wisewave, 2026-07-29) · Nova shipped · **Production verified (Holly, 2026-07-29)**  
**Scope:** Dual-domain canonical cleanup only — no P0–P4 reopen · no homepage rebuild · no major rename

## Production verification

Confirmed live:

1. `NEXT_PUBLIC_SITE_URL=https://www.1320soulcode.com`
2. Stripe webhook uses the primary host
3. Secondary/apex path-to-path 301 and primary sitemap behaviour verified

## Confirmed hierarchy

| Role | Term |
|------|------|
| Canonical host | `https://www.1320soulcode.com` |
| Brand / system | **1320 Soul Code** |
| Core product object | **Soul Blueprint** |
| Entry experience | **Free Soul Blueprint** |
| Paid product | **Full Soul Blueprint Report** |
| Long-term relationship | **Living Blueprint** |

**Not elevated:** Soul Profile as primary brand or product term  
**Historical only where needed:** “Soul Origin Code”, “Soul Profile”

## Implementation

| Item | Behaviour |
|------|-----------|
| `CANONICAL_SITE_URL` | `https://www.1320soulcode.com` in `lib/platform-config.ts` |
| `getSiteUrl()` | Auth, checkout, email, magic-link, OG metadata origin |
| `robots.ts` / `sitemap.ts` | Always emit primary-domain URLs |
| Root metadata | Brand titles / OG `siteName` → 1320 Soul Code; `alternates.canonical` |
| Middleware | Path-to-path **301** from `thesoulprofile.com` / `www.thesoulprofile.com` and apex `1320soulcode.com` → `www.1320soulcode.com` |
| Account / free-result CTA | “Soul Profile” primary labels softened to Account / Soul Blueprint language |

## Production env

Set (or confirm) on Vercel:

```
NEXT_PUBLIC_SITE_URL=https://www.1320soulcode.com
```

Stripe success/cancel URLs and webhooks should already use `getSiteUrl()` / the primary domain. Re-check Stripe Dashboard webhook endpoint if it still lists the secondary host.

## Verify after deploy

1. `https://www.thesoulprofile.com/booking` → 301 → `https://www.1320soulcode.com/booking`
2. `https://1320soulcode.com/faq` → 301 → `https://www.1320soulcode.com/faq`
3. `https://www.1320soulcode.com/sitemap.xml` lists only `www.1320soulcode.com` URLs
4. View-source homepage includes canonical / OG pointing at primary host
5. Magic-link / booking reminder emails use primary host
6. Search Console: keep secondary property temporarily; submit primary sitemap; monitor redirect coverage

## Explicit non-scope

- P5–P8  
- Full homepage rebuild  
- Bulk rewrite of every historical “Soul Origin Code System” string inside report page static packs  
- Keyword stuffing
