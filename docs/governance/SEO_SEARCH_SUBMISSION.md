# Search Engine Submission — Google & Bing

**Domains:** `1320soulcode.com` · `thesoulprofile.com`  
**Implemented:** `app/robots.ts` · `app/sitemap.ts` · optional verification meta via env  
**Canonical host for sitemap URLs:** value of `NEXT_PUBLIC_SITE_URL` (recommend `https://www.1320soulcode.com`)

## After deploy — verify live

1. `https://www.1320soulcode.com/robots.txt`
2. `https://www.1320soulcode.com/sitemap.xml`
3. Same paths on `https://www.thesoulprofile.com/...` (same app)

## Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console)
2. Add a **Domain** property for `1320soulcode.com` (covers www + apex)
3. Add a **Domain** property for `thesoulprofile.com`
4. Verify via DNS TXT (preferred) **or** set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploy, then use HTML-tag verification
5. Sitemaps → add: `https://www.1320soulcode.com/sitemap.xml` (and thesoulprofile sitemap if that property uses that host)
6. URL Inspection → request indexing for `/`, `/free-soul-blueprint`, `/full-report`, `/booking`

## Bing Webmaster Tools

1. Open [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add both sites, or **Import from Google Search Console**
3. Or set `NEXT_PUBLIC_BING_SITE_VERIFICATION` (msvalidate.01 token) and redeploy
4. Submit the same sitemap URL(s)

## Dual-domain note

Both hosts currently serve the same product. Prefer one canonical (`NEXT_PUBLIC_SITE_URL`) for sitemap/metadata. A future 301 from the secondary domain to the primary is a separate product decision — not included in this patch.

## What is excluded from the sitemap

Account, auth, checkout, facilitator, intake/prep tokens, personal reports, generating/result, login/signup, and other private surfaces are listed under `ROBOTS_DISALLOW_PATHS` in `lib/seo/public-routes.ts`.
