# Lumen QA — SEO Page 01 · What Is a Soul Blueprint?

Base: https://www.1320soulcode.com
Generated: 2026-07-30T16:06:17.429Z

Result: PASS (25/25)

- **PASS** Page 01 published in registry
  - path=/what-is-a-soul-blueprint
- **PASS** Canonical path is root /what-is-a-soul-blueprint
  - /what-is-a-soul-blueprint
- **PASS** Sitemap includes canonical Page 01 URL
- **PASS** Sitemap excludes duplicate /guides/what-is-a-soul-blueprint
- **PASS** Planned roadmap marks P1 published
- **PASS** Page 01 analytics events registered
  - all present
- **PASS** OG image asset present
  - C:\github\1320-website\web\public\seo\what-is-a-soul-blueprint-1320.webp
- **PASS** Route file exists
- **PASS** Foundation order S1 → S3 → S2 → S0 in body
- **PASS** Boundary language present (not prediction / fixed identity)
- **PASS** Page responds 200
  - status=200
- **PASS** H1 appears exactly once
  - count=1
  - text=What Is a Soul Blueprint?
- **PASS** H1 aligned to What Is a Soul Blueprint?
  - What Is a Soul Blueprint?
- **PASS** Title tag present and aligned
  - What Is a Soul Blueprint? Meaning & How It Works | 1320
- **PASS** Self-canonical is correct
  - https://www.1320soulcode.com/what-is-a-soul-blueprint
- **PASS** Meta description present
  - Learn what a Soul Blueprint means in 1320, how it uses your birth date as a symbolic mirror, what it explores, and why i
- **PASS** Direct answer appears in HTML
- **PASS** Foundation order visible
- **PASS** Article JSON-LD present
- **PASS** BreadcrumbList JSON-LD present
- **PASS** FAQPage rich-result schema not required (absent ok)
  - intentionally omitted for Page 01
- **PASS** Primary CTAs lead to Free Soul Blueprint
  - /free-soul-blueprint
  - /free-soul-blueprint
  - /free-soul-blueprint
- **PASS** No checkout / Session pressure in hero
- **PASS** Guides duplicate redirects with HTTP 301
  - hopStatus=301
  - finalUrl=https://www.1320soulcode.com/what-is-a-soul-blueprint
- **PASS** Desktop first viewport has at most one dominant gold CTA
  - goldInFirstViewport=1
  - priorHopCheck=0

## Correction-patch production acceptance

- **Commit under retest**: `21be3dd`
- **Redirect**: PASS — `/guides/what-is-a-soul-blueprint` returns HTTP 301 with `Location: /what-is-a-soul-blueprint`
- **1280px CTA density**: PASS — one visible dominant gold CTA in the first viewport; header CTA is visually quiet and the hero CTA remains gold
- **Replacement artwork live**: PASS — direct production asset is 1200×630 and its SHA-256 exactly matches the repository asset: `45f1bfc4bda3a14aba93d3f710528cc731685d761b6bdea0c601041ba5e43b03`
- **Artwork content**: PASS — visible left-to-right foundation pathway is S1 → S3 → S2 → S0
- **Responsive/console smoke**: PASS — no 1280px horizontal overflow and no console errors
- **Production screenshot**: `qa-artifacts/seo-page01-production-21be3dd/page01-1280-first-viewport.png`

**Wisewave acceptance verdict: PASS**
