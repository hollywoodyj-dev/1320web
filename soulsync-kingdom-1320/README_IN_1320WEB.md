# SoulSync Kingdom — subfolder inside `1320web`

This folder is a **local working copy** of the SoulSync Kingdom 1320 handoff, placed under `hollywoodyj-dev/1320web` at Founder request (2026-10-30). It is **not** wired into the Next.js site, Preview, or production.

**What this folder is for:** [FUNCTION.md](FUNCTION.md)  
**What the 1320web site agent must implement:** [REQUEST_FOR_1320WEB_AGENT.md](REQUEST_FOR_1320WEB_AGENT.md)

- Standalone workspace (older twin on this machine): `C:\Users\hugoz\soulsync-kingdom-1320`
- Parent repo: `https://github.com/hollywoodyj-dev/1320web`
- Bridge build: `src/current/soulsync-kingdom-1320-v0.2.4-1320web-bridge.html` (calls `/api/soulsync-kingdom/*`; those routes are not in this folder)
- Offline visual-dev file stays at v0.2.3 and must not be overwritten
- Official algorithm stays on the 1320 server. Hosted Preview remains unauthorized

**Not copied here (on purpose):**

- Official fixture WebP files (`assets/official-1320-fixture/*.webp`) — fixtures only; authorization to ship with a public site is not confirmed
- The immutable handoff ZIP — stays in the standalone workspace

The fixture **manifest** remains. Do not invent replacement totems.

Read `START_HERE.md` and `docs/cursor/S3_SINGLE_REALM_OFFLINE_PROTOTYPE_BRIEF_2026-10-30.md` before changing game files. Develop in a **new HTML filename**; do not overwrite `src/current/soulsync-kingdom-1320-v0.2.3-visual-dev.html` or frozen v0.2.2.
