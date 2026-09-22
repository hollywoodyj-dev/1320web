# Pinterest · OG metadata (Phase 1A · pre–first pin)

**Status:** Wired in code · **Rich Pins:** no validator / no application (Pinterest auto-sync ≤24h after metadata correct)  
**Deploy gate:** Production Ready required before re-probing URLs.

## Checklist (Haze 2026-09-22)

| # | Item | Implementation |
|---|------|----------------|
| 1 | `/free-soul-blueprint` · `og:type=article` + full OG/Twitter image | `app/(site)/free-soul-blueprint/page.tsx` · `lib/seo/site-open-graph.ts` |
| 2 | `og:image` · `/` · `/free-soul-blueprint` · P7 | `/seo/home-1320.webp` · `/seo/free-soul-blueprint-1320.webp` · `/seo/is-numerology-scientifically-proven-1320.webp` |
| 3 | `p:domain_verify` | `app/layout.tsx` · `other["p:domain_verify"]` |
| 4 | JSON-LD on Free Blueprint | **Out of scope** this round |

## Art placeholder

Three new WebPs are **interim copies** of `what-is-a-soul-blueprint-1320.webp` until Holly ships page-specific 1200×630 assets at the paths above (same filenames — drop-in replace).

## Verify (production)

```powershell
function Show-Meta($url) {
  $h = curl.exe -sL $url
  Write-Host "--- $url ---"
  foreach ($p in @('p:domain_verify','og:type','og:url','og:image','og:image:width','og:image:height','twitter:card','twitter:image')) {
    if ($h -match "property=`"$p`" content=`"([^`"]+)`"") { Write-Host "$p`: $($matches[1])" }
    elseif ($h -match "name=`"$p`" content=`"([^`"]+)`"") { Write-Host "$p`: $($matches[1])" }
  }
}
Show-Meta "https://www.1320soulcode.com/free-soul-blueprint"
Show-Meta "https://www.1320soulcode.com/"
Show-Meta "https://www.1320soulcode.com/is-numerology-scientifically-proven"
```

Expected Free Blueprint highlights: `og:type=article`, `og:image=…/seo/free-soul-blueprint-1320.webp`, `twitter:card=summary_large_image`.
