/**
 * T32 — operator traffic is tagged at read time, never deleted.
 *
 * **page_view:** session/user has any event under `/admin` (see OPERATOR_PATH_PREFIX).
 *
 * **Funnel / purchase KPIs:** QA-tagged at read time via `lib/funnel/qa-traffic-exclusion.ts`
 * (campaign `haze_*` or utm_source `operator`) — not `/admin` session, so incognito
 * test checkouts with `haze_t33_flow_*` campaigns are excluded without visiting /admin.
 */
export const OPERATOR_PATH_PREFIX = "/admin";
