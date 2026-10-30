# What this subfolder is for

`soulsync-kingdom-1320/` is the SoulSync Kingdom 1320 **game handoff**, sitting inside the live 1320 site repo (`hollywoodyj-dev/1320web`). It is a **local engineering copy**, not a shipped site route.

## Function

- Hold the Kingdom prototype, design docs, Data Pack, and local tools next to the product that already owns **SoulCode data** (`calculate1320Code`, `get1320Content`) and the **LLM / Wisewave** stack.
- Let Kingdom call 1320 **only through same-origin proxy routes**. The browser never holds `BLUEPRINT_EXPERIENCE_API_KEY`, never copies the private algorithm, and never talks to `/api/v1/blueprints/resolve` as Coze.
- Keep official results honest: sample dates stay labeled DEMO; official failure is `unconnected` / `validation_failed` / `temporarily_unavailable`. There is no silent DEMO fallback.

## What is live in this folder now

| File | Role |
| --- | --- |
| `src/current/soulsync-kingdom-1320-v0.2.3-visual-dev.html` | Offline visual-dev checkpoint. **Do not overwrite.** |
| `src/current/soulsync-kingdom-1320-v0.2.4-1320web-bridge.html` | Bridge build. Official birth → `POST /api/soulsync-kingdom/blueprints/resolve`. Tonight’s traces (no birthday) → `POST /api/soulsync-kingdom/reflect`. |
| `REQUEST_FOR_1320WEB_AGENT.md` | Forward this to the 1320web workspace agent. Those two routes do **not** exist yet. |
| `src/frozen-baseline-v0.2.2/` | Read-only baseline. |
| `docs/data/SoulSync_Kingdom_1320_Data_Pack_for_Claude_v0.2.3.md` | Official Data Pack. Input sources only — not arithmetic. |

## What this folder is not

- Not wired into Next.js pages, Preview, or production.
- Not a second copy of the private 1320 algorithm.
- Not authorized for public launch.
- Official WebP fixtures were **not** copied here on purpose.

## How the bridge talks to 1320

Until the 1320web agent lands the proxies, the official path and the LLM button will surface **unconnected**. That is correct.

```
Kingdom HTML (this folder)
    POST /api/soulsync-kingdom/blueprints/resolve   { birth_date, locale, purpose:soulsync_kingdom, consent }
    POST /api/soulsync-kingdom/reflect              { foundation, exploration, governance }  — no birth_date
        ↓  (to be implemented in 1320web app/, not in this folder)
1320 server: calculate1320Code + get1320Content + Wisewave / content reflect
        ↓
Kingdom shows official codes + one symbolic reflection
```

Optional query `?api=https://host` overrides the API origin for local tests. Default is same origin (empty base).

## Binding rules (do not weaken)

- Retracted: `S2 = month + day`, `S3 = month × day`. Do not implement, display, or “explain” them.
- Public star payload stays exactly six keys: `alias, experience, insight, wish, blueprintSnippet, contentWarning`.
- Do not invent totems, names, or meanings. Missing `totemId` ↔ `code` must error visibly; otherwise keep realm placeholders.
- No `localStorage` / `sessionStorage` / cookies in the prototype. Session stays in memory.
- Secrets stay out of this folder and out of the browser.

## Standalone twin

On this machine the older standalone workspace is `C:\Users\hugoz\soulsync-kingdom-1320`. Game edits for the bridge belong **here**. Site `app/` / `lib/` edits belong in the 1320web workspace, via `REQUEST_FOR_1320WEB_AGENT.md`.
