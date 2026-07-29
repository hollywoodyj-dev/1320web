# Search Engine Submission — Google & Bing

**Canonical host:** `https://www.1320soulcode.com` (Wisewave-approved)  
**Secondary:** `thesoulprofile.com` — temporary; path-to-path **301** to canonical  
**Implemented:** `app/robots.ts` · `app/sitemap.ts` · host redirect in `middleware.ts` · optional verification meta  

Brand hierarchy: **1320 Soul Code** (brand) · **Soul Blueprint** (product) — see `CANONICAL_DOMAIN_WISEWAVE_DECISION.md`

## After deploy — verify live

1. `https://www.1320soulcode.com/robots.txt`
2. `https://www.1320soulcode.com/sitemap.xml` (all URLs on primary host)
3. Secondary redirect sample: `https://www.thesoulprofile.com/booking` → `https://www.1320soulcode.com/booking`

## Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console)
2. Prefer **Domain** property for `1320soulcode.com` (covers www + apex)
3. Keep `thesoulprofile.com` property temporarily while redirects settle
4. Verify via DNS TXT (preferred) **or** set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploy
5. Sitemaps → add only: `https://www.1320soulcode.com/sitemap.xml`
6. URL Inspection → request indexing for `/`, `/free-soul-blueprint`, `/full-report`, `/booking`

## Bing Webmaster Tools

1. Open [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add primary site, or **Import from Google Search Console**
3. Or set `NEXT_PUBLIC_BING_SITE_VERIFICATION` (msvalidate.01 token) and redeploy
4. Submit: `https://www.1320soulcode.com/sitemap.xml`

## What is excluded from the sitemap

Account, auth, checkout, facilitator, intake/prep tokens, personal reports, generating/result, login/signup, and other private surfaces are listed under `ROBOTS_DISALLOW_PATHS` in `lib/seo/public-routes.ts`.
