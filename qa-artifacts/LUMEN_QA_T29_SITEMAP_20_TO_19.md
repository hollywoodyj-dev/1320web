# LUMEN QA · T29 `/reflect` sitemap 20 → 19

**Date:** 2026-08-25  
**Status:** Expected change — **not a regression**

## What changed

`/reflect` moved from sitemap membership to class D:

- `index: false`
- `sitemap: false`
- `meta robots: noindex, follow`
- self-canonical `/reflect` kept

Public sitemap loc count: **20 → 19**. Production `public/sitemap.xml` has 19 `<loc>` and does not list `/reflect`.

Automated lock: `scripts/smoke-funnel.ts` asserts `getSitemapRoutesFromManifest().length === 19` and that `public/sitemap.xml` has 19 `<loc>` and no `/reflect</loc>`.

## robots.txt — do not “tidy”

`robots.txt` is **unchanged**. `Disallow: /reflect/` remains.

That prefix does **not** match `/reflect` itself. It matches `/reflect/*` session URLs.

Those session URLs carry `?token=` runtime credentials. 玄微 accepted keeping Disallow on the interaction subtree. Do not open `/reflect/*` for crawl hygiene.

## Related

See `lib/seo/intent-manifest.ts` notes on `/reflect` and `lib/seo/public-routes.ts` (`ROBOTS_DISALLOW_PATHS`).
