# Lumen QA — SEO Phase 0 Technical Foundation

Base: http://localhost:3010
Date: 2026-07-30T15:20:40.906Z
Result: PASS

- **Required SEO analytics events registered**: PASS — all present
- **Sitemap includes /guides**: PASS — /, /free-soul-blueprint, /your-code, /full-report, /booking, /guides, /about-1320, /blueprint, /full-report-v2, /faq, /reflect, /privacy, /terms, /disclaimer
- **No unpublished article paths in sitemap**: PASS — published=0 planned=10
- **Article template + hub files exist**: PASS — 
- **Guides hub loads**: PASS — status=200
- **Guides hub shows roadmap**: PASS — 
- **Sitemap lists guides hub on canonical host**: PASS — 
- **Unpublished guide /guides/what-is-a-soul-blueprint returns 404**: PASS — status=404
- **Unpublished guide /guides/life-path-number-vs-soul-blueprint returns 404**: PASS — status=404
- **Unpublished guide /guides/this-slug-does-not-exist-xyz returns 404**: PASS — status=404
- **Generic unknown route returns 404**: PASS — status=404
