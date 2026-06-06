# GitHub + Vercel deployment guide

**App root:** this folder (`web/`) is the git repository and the Next.js project.  
**Status:** local git only — no `origin` remote yet; many changes not committed.

---

## What Nova prepared (in repo)

| File | Purpose |
|------|---------|
| `.github/workflows/ci.yml` | Runs `qa:baseline`, `smoke:content`, `smoke:canonical`, `smoke:result-1977`, `build` on push/PR |
| `.env.example` | Env vars to copy into Vercel |
| `DEPLOYMENT.md` | This guide |

Vercel auto-detects Next.js — no `vercel.json` required for Phase 1.

---

## What you need to do (checklist)

### 1. Commit and push to GitHub

**You need:** a [GitHub](https://github.com) account.

1. On GitHub: **New repository**  
   - Name suggestion: `1320-website` or `1320-soul-code`  
   - **Private** or Public (your choice)  
   - **Do not** add README, .gitignore, or license (repo already has them)

2. In PowerShell, from this folder:

```powershell
cd C:\github\1320-website\web

# Stage everything (WebP assets, S2/S0 packs, a11y, etc.)
git add -A
git status

# Commit (adjust message if you like)
git commit -m "$( @'
Deploy prep: WebP assets, S2/S0 card packs, a11y, CI workflow.

EOF
'@ )"

# Add your GitHub repo (replace YOUR_USER and REPO_NAME)
git remote add origin https://github.com/YOUR_USER/REPO_NAME.git

# First push (branch is currently master)
git push -u origin master
```

Optional: rename branch to `main` before push:

```powershell
git branch -M main
git push -u origin main
```

> **Note:** First push may take a few minutes (~30+ MB of `public/` WebP assets). That is normal.

---

### 2. Connect Vercel

**You need:** a [Vercel](https://vercel.com) account (sign in with GitHub).

1. [vercel.com/new](https://vercel.com/new) → **Import** your GitHub repository.
2. **Root Directory:** leave as **`.`** (repo root = this Next.js app).  
   Only set `web` if you later move git to the parent `1320-website` folder.
3. **Framework Preset:** Next.js (auto).
4. **Build Command:** `npm run build` (default).
5. **Install Command:** `npm ci` or `npm install` (default).

Click **Deploy**. First build should pass if CI passes locally.

---

### 3. Environment variables (Vercel dashboard)

**Project → Settings → Environment Variables**

| Variable | Production | Required | Notes |
|----------|------------|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | **Yes** | Use Vercel preview URL first, then custom domain |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | No | Google Analytics 4 |
| `LEADS_WEBHOOK_URL` | your webhook URL | No | Waitlist/email/booking POST target |
| `NEXT_PUBLIC_ANALYTICS_DEBUG` | `false` | No | Leave unset in prod |
| `NEXT_PUBLIC_DEBUG_CALCULATOR` | unset | No | Dev QA only |

Copy from `.env.example`. After adding vars, **Redeploy** (env changes need a new deployment).

---

### 4. Custom domain (when ready)

1. Vercel → **Project → Settings → Domains**
2. Add `1320soulcode.com` (and `www` if you use it)
3. At your DNS provider, add the records Vercel shows (usually `A` / `CNAME`)
4. Set `NEXT_PUBLIC_SITE_URL=https://1320soulcode.com` and redeploy

---

### 5. Post-deploy smoke test

Open production URL and verify:

- [ ] `/` — homepage, hero images load
- [ ] `/your-code` → birth date `1980-05-22` → `/generating` → `/result`
- [ ] `/sample-report` — all four segment cards (S1/S2/S3/S0)
- [ ] `/full-report` waitlist form submits (check webhook or Vercel function logs)
- [ ] Mobile: inner pages cosmic background

Local preflight:

```powershell
npm run qa:baseline
npm run smoke:content
npm run build
```

---

## Optional tooling (later)

| Tool | Install | Use |
|------|---------|-----|
| [GitHub CLI](https://cli.github.com/) | `winget install GitHub.cli` | `gh repo create` from terminal |
| [Vercel CLI](https://vercel.com/docs/cli) | `npm i -g vercel` | `vercel` preview deploys from laptop |

Neither is required if you use the GitHub + Vercel websites.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails on Vercel, works locally | Check Node 20; ensure `package-lock.json` is committed |
| Images 404 on prod | Confirm `public/**/*.webp` were committed (`git status` clean) |
| Open Graph wrong URL | Set `NEXT_PUBLIC_SITE_URL` to production domain |
| Forms “success” but no email | Set `LEADS_WEBHOOK_URL` (Zapier, Make, custom API, etc.) |
| `master` vs `main` | Vercel deploys default branch; rename locally if you prefer `main` |

---

## Repo layout reminder

```
C:\github\1320-website\     ← parent folder (not a git repo)
└── web\                    ← git repo + Next.js app (push THIS to GitHub)
    ├── app/
    ├── public/
    ├── package.json
    └── ...
```

If you want the GitHub repo name `1320-website` at the parent level later, init git in the parent and set Vercel **Root Directory** to `web`. Current setup (git in `web/`) is simpler.
