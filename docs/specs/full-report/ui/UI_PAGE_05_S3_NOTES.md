# Page 05 · S3 Soul Vibration — Implementation Notes

**Component:** `components/full-report-v2/pages/page-05-s3.tsx`  
**Static UI:** `lib/full-report-v2/s3-page-static.ts`  
**Content resolver:** `lib/full-report-v2/resolve-s3-page-content.ts`

---

## Integration Focus (bottom band)

Uses **qualitative focus pills** — no percentage numbers. See `PERCENTAGE_DISPLAY_RULES.md` and `S3_INTEGRATION_FOCUS`.

---

## What is dynamic today

All narrative content on Page 05 comes from the official S3 database via `modules.s3` (enriched from `get1320Content()`):

| NOVA field | Source |
|------------|--------|
| `s3.code` | segment code |
| `s3.title` | archetype title |
| `s3.essence` | `fullEssence` / soul traits |
| `s3.energy_expression` | `expressionPattern` / expression style |
| `s3.aligned_expression` | strengths / `strengthSummary` |
| `s3.distorted_expression` | challenges / `growthEdge` |
| `s3.integration_advice` | `integrationKey` / integration prompt |
| `s3.wisewave_guidance` | steward guidance |
| `s3.reflection` | reflection question |

Expression wheel nodes are built from energy expression, aligned strengths, integration advice, and guidance — **not** AI-generated copy.

Sample canonical code: **S3-03 · Explorer** (`1980-05-22`).

---

## Content policy

Do **not** let AI freely write S3 page copy. Each user's S3 page must pull from the official content asset for their `s3.code`.
