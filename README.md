# 1320 Soul Origin Code — Phase 1 MVP

Next.js 16 (App Router) marketing site + birth-date calculator funnel for the **1320 Soul Origin Code System**.

**Phase 1 scope:** Free result layer, sample report, full-report waitlist, booking request — no login, payments, or Soul Profile.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Test on your phone (same Wi‑Fi)

Use the **Network** URL from `npm run dev` (e.g. `http://172.16.0.21:3000`). `next.config.ts` includes `allowedDevOrigins` for LAN IPs so the client router and HMR work. **Restart the dev server** after changing that config.

If you still see `Router action dispatched before initialization`, hard-refresh the page or use `localhost` via USB tunneling instead of the LAN IP.

### `ChunkLoadError` / Turbopack HMR (dev only)

Console error like `Failed to load chunk ... [turbopack]_browser_dev_hmr-client` is a **dev hot-reload** issue, not your app code. It usually means the browser is talking to a **stale or wrong dev server**.

1. Stop **all** `next dev` terminals (Ctrl+C). On Windows, only one server should own port 3000 — if you see “Port 3000 is in use, using 3001”, kill the old process or you will load chunks from the wrong port.
2. Clear the dev cache and restart with webpack (more stable on Windows / LAN):
   ```bash
   npm run dev:fresh
   ```
3. Hard-refresh the browser (Ctrl+Shift+R) or close the tab and reopen the same URL shown in the terminal (`http://127.0.0.1:3000` or your Network URL).

For day-to-day dev after a clean start, `npm run dev` is fine. Use `npm run dev:webpack` if Turbopack HMR errors keep coming back.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development server (Turbopack) |
| `npm run dev:webpack` | Dev server using webpack (fewer HMR chunk errors) |
| `npm run dev:fresh` | Delete `.next` then start webpack dev |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npm run smoke:content` | Canonical code content smoke (S1-18 / S3-110 / S2-27 / S0-07) |
| `npm run smoke:funnel` | Phase 1 funnel + metadata/analytics checklist |

## Primary funnel

```
/ → /your-code → /generating → /result → /full-report
         ↘ /sample-report · /blueprint · /about-1320 · /booking · /faq
```

**Canonical test birth date:** `1980-05-22` → **S1-18 / S3-110 / S2-27 / S0-07**

## Environment variables

Copy `.env.example` to `.env.local` and adjust:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL for metadata (`https://1320soulcode.com`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_ANALYTICS_DEBUG` | Optional | Log analytics events in production when `true` |
| `LEADS_WEBHOOK_URL` | Optional | POST target for waitlist/email/booking payloads |

Without `LEADS_WEBHOOK_URL`, form submissions show client success but are only logged in dev server output.

## Deploy (GitHub + Vercel)

**Full checklist:** see [`DEPLOYMENT.md`](./DEPLOYMENT.md).

Quick version:

1. Push this folder (`web/`) to a new GitHub repo (git root = app root).
2. [Import on Vercel](https://vercel.com/new) — Framework: **Next.js**, Root Directory: **`.`**
3. Add env vars from `.env.example` (at minimum `NEXT_PUBLIC_SITE_URL`).
4. Deploy — no database required for Phase 1.

CI: `.github/workflows/ci.yml` runs `qa:baseline`, `smoke:content`, and `build` on push/PR.

Build command: `npm run build` · Output: Next.js default (`.next`)

## Before production launch

1. Replace `[Insert Contact Email]` and `[Insert Date]` in `lib/legal-placeholders.ts`.
2. Set `NEXT_PUBLIC_SITE_URL` to production domain.
3. Run `npm run lint && npm run build && npm run smoke:content && npm run smoke:funnel`.
4. Manual smoke: homepage calculator → generating chamber → result; `/sample-report`; `/full-report` waitlist; `/booking` form.

## Public assets

Required assets under `public/`:

- `1320-logo.jpeg`, `1320-icon.svg`
- `hero-banner-desktop-v1.webp`, `hero-banner-v5.webp` (mobile)
- `homepage-ui.png`, `generating-ui.png`, `report-ui.jpeg` (reference mockups only — not loaded in prod)
- `report-bg-v3-1920x4048.webp` — report page full-bleed background (1920×4048; see sizing below)
- `card/s1.webp` … `s0.webp` (pillar backgrounds)
- `how-1320-works/step-01.webp` … `step-04.webp`
- `S1-44/S01.webp` … `S44.webp`, `S2-50/S2-01.webp` … `S2-50.webp`, `S3-12/S01.webp` … `S12.webp`, `S0-19/S0-00.webp` … `S0-19.webp` (segment card art)

Re-compress after replacing PNG sources: `npm run compress:assets` (requires `sharp`).

### Report background (`report-bg-v3-1920x4048.webp`)

Used with `background-size: cover` on `/result` and `/sample-report`. **Clarity depends on pixel width, not file size (MB).**

| Asset | Size | Notes |
|-------|------|--------|
| **Current (v3)** | **1920 × 4048** | Sharp on 1080p desktop; good for phones @2x |
| Legacy v2 | 864 × 1821 | Too small for wide screens — kept for reference only |

To replace: drop new file in `public/` and update the URL in `globals.css` (`.page-shell-inner:has(.report-page)::before`).

## Architecture

```
birth date → calculate1320Code() → get1320Content() → UI
```

Content lives in `data/1320/*.json` — do not hardcode interpretation copy in components.

Implementation tracker: `IMPLEMENTATION_BATCHES.md` · Handoff: `PHASE1_HANDOFF.md`
