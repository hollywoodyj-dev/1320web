/**
 * T32 — operator traffic is tagged at read time, never deleted.
 *
 * An event is operator-sourced when:
 *   - its session_id has any event whose path is under /admin, or
 *   - its user_id has any event whose path is under /admin
 *     (covers an operator browsing landing pages without opening /admin in that tab).
 *
 * NULL session_id / user_id are not treated as operator.
 */
export const OPERATOR_PATH_PREFIX = "/admin";
