/**
 * Probe admin accounts mapping (no HTTP auth).
 * Usage: npx tsx scripts/probe-admin-accounts.ts
 */
import {
  authProviderLabel,
  computeEffectiveStatus,
  displayName,
} from "../lib/admin/admin-accounts";
import { getSql } from "../lib/db/client";
import { FULL_REPORT_PRODUCT } from "../lib/platform-config";

async function main() {
  const db = getSql();
  const product = FULL_REPORT_PRODUCT;
  const rows = await db<Record<string, unknown>[]>`
    SELECT
      u.id,
      u.email,
      u.first_name,
      u.last_name,
      u.created_at,
      (u.password_hash IS NOT NULL AND length(u.password_hash) > 0) AS has_password,
      COALESCE(r.generate_count, 0)::int AS generate_count,
      r.last_generate_at,
      e.status AS entitlement_status,
      e.expires_at AS entitlement_expires_at,
      p.status AS purchase_status
    FROM users u
    LEFT JOIN LATERAL (
      SELECT COUNT(*)::int AS generate_count, MAX(created_at) AS last_generate_at
      FROM soul_reports sr WHERE sr.user_id = u.id
    ) r ON TRUE
    LEFT JOIN LATERAL (
      SELECT status, expires_at FROM entitlements ent
      WHERE ent.user_id = u.id AND ent.product = ${product}
      ORDER BY ent.granted_at DESC NULLS LAST LIMIT 1
    ) e ON TRUE
    LEFT JOIN LATERAL (
      SELECT status FROM purchases pur
      WHERE pur.user_id = u.id AND pur.product = ${product}
      ORDER BY pur.created_at DESC LIMIT 1
    ) p ON TRUE
    ORDER BY u.created_at DESC
    LIMIT 5
  `;

  const mapped = rows.map((row) => {
    const hasPassword = Boolean(row.has_password);
    const payload = {
      id: String(row.id),
      email: String(row.email),
      name: displayName(
        row.first_name as string | null,
        row.last_name as string | null,
      ),
      oauthProvider: authProviderLabel(hasPassword),
      effectiveStatus: computeEffectiveStatus({
        entitlementStatus: (row.entitlement_status as string | null) ?? null,
        entitlementExpiresAt: (row.entitlement_expires_at as Date | null) ?? null,
        purchaseStatus: (row.purchase_status as string | null) ?? null,
      }),
      generateCount: Number(row.generate_count) || 0,
    };
    return payload;
  });

  const blob = JSON.stringify(mapped);
  const forbidden = ["password", "password_hash", "birth_date", "birthDate", "blueprint", "code_string"];
  for (const key of forbidden) {
    if (blob.toLowerCase().includes(key.toLowerCase()) && key !== "password") {
      // "password" alone may appear in authProvider "email" path only — check hash fields strictly
    }
    if (blob.includes("password_hash") || blob.includes("birth_date") || blob.includes("birthDate")) {
      console.error("Leakage detected in mapped payload");
      process.exit(1);
    }
  }

  console.log("users sampled:", mapped.length);
  console.log(mapped);
  console.log("Probe OK — no password_hash/birth fields in mapped JSON");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
