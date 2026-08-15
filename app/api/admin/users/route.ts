import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import {
  authProviderLabel,
  computeEffectiveStatus,
  displayName,
  type AdminUserView,
} from "@/lib/admin/admin-accounts";
import { getSql, withDb } from "@/lib/db/client";
import { FULL_REPORT_PRODUCT } from "@/lib/platform-config";

export const dynamic = "force-dynamic";

const USER_SOFT_CAP = 500;

type UserQueryRow = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_at: Date;
  has_password: boolean;
  generate_count: number;
  last_generate_at: Date | null;
  entitlement_id: string | null;
  entitlement_status: string | null;
  entitlement_product: string | null;
  entitlement_granted_at: Date | null;
  entitlement_expires_at: Date | null;
  purchase_id: string | null;
  purchase_status: string | null;
  purchase_product: string | null;
  purchase_created_at: Date | null;
  purchase_completed_at: Date | null;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
};

function toIso(value: Date | null | undefined): string | null {
  return value ? value.toISOString() : null;
}

function mapUser(row: UserQueryRow): AdminUserView {
  const effectiveStatus = computeEffectiveStatus({
    entitlementStatus: row.entitlement_status,
    entitlementExpiresAt: row.entitlement_expires_at,
    purchaseStatus: row.purchase_status,
  });

  const hasFullReport = effectiveStatus === "active";
  const plan = row.entitlement_product ?? row.purchase_product ?? null;

  let subscription: AdminUserView["subscription"] = null;
  if (row.entitlement_id || row.purchase_id) {
    subscription = {
      id: row.entitlement_id ?? row.purchase_id!,
      status: row.entitlement_status ?? row.purchase_status ?? "none",
      plan,
      platform: row.stripe_checkout_session_id || row.stripe_payment_intent_id ? "stripe" : "web",
      currentPeriodStart: toIso(row.entitlement_granted_at ?? row.purchase_completed_at ?? row.purchase_created_at),
      currentPeriodEnd: toIso(row.entitlement_expires_at),
      externalSubscriptionId:
        row.stripe_checkout_session_id ?? row.stripe_payment_intent_id ?? null,
    };
  }

  return {
    id: row.id,
    email: row.email,
    name: displayName(row.first_name, row.last_name),
    oauthProvider: authProviderLabel(Boolean(row.has_password)),
    country: null,
    createdAt: row.created_at.toISOString(),
    effectiveStatus,
    subscription,
    generateCount: Number(row.generate_count) || 0,
    lastGenerateAt: toIso(row.last_generate_at),
    hasFullReport,
  };
}

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  try {
    const payload = await withDb(async () => {
      const db = getSql();
      const product = FULL_REPORT_PRODUCT;

      const rows = await db<UserQueryRow[]>`
        SELECT
          u.id,
          u.email,
          u.first_name,
          u.last_name,
          u.created_at,
          (u.password_hash IS NOT NULL AND length(u.password_hash) > 0) AS has_password,
          COALESCE(r.generate_count, 0)::int AS generate_count,
          r.last_generate_at,
          e.id AS entitlement_id,
          e.status AS entitlement_status,
          e.product AS entitlement_product,
          e.granted_at AS entitlement_granted_at,
          e.expires_at AS entitlement_expires_at,
          p.id AS purchase_id,
          p.status AS purchase_status,
          p.product AS purchase_product,
          p.created_at AS purchase_created_at,
          p.completed_at AS purchase_completed_at,
          p.stripe_checkout_session_id,
          p.stripe_payment_intent_id
        FROM users u
        LEFT JOIN LATERAL (
          SELECT
            COUNT(*)::int AS generate_count,
            MAX(created_at) AS last_generate_at
          FROM soul_reports sr
          WHERE sr.user_id = u.id
        ) r ON TRUE
        LEFT JOIN LATERAL (
          SELECT id, status, product, granted_at, expires_at
          FROM entitlements ent
          WHERE ent.user_id = u.id
            AND ent.product = ${product}
          ORDER BY ent.granted_at DESC NULLS LAST
          LIMIT 1
        ) e ON TRUE
        LEFT JOIN LATERAL (
          SELECT
            id, status, product, created_at, completed_at,
            stripe_checkout_session_id, stripe_payment_intent_id
          FROM purchases pur
          WHERE pur.user_id = u.id
            AND pur.product = ${product}
          ORDER BY pur.created_at DESC
          LIMIT 1
        ) p ON TRUE
        ORDER BY u.created_at DESC
        LIMIT ${USER_SOFT_CAP}
      `;

      // Hard guarantee: never leak password/birth fields even if query drifts.
      const users = rows.map((row) => {
        const mapped = mapUser(row);
        const json = mapped as Record<string, unknown>;
        delete json.passwordHash;
        delete json.password_hash;
        delete json.birthDate;
        delete json.birth_date;
        return mapped;
      });

      return {
        users,
        truncated: rows.length >= USER_SOFT_CAP,
        limit: USER_SOFT_CAP,
      };
    });

    if (!payload) {
      return NextResponse.json({ error: "Database is not configured" }, { status: 503 });
    }

    return NextResponse.json(payload);
  } catch (error) {
    console.error("[admin/users]", error);
    return NextResponse.json({ error: "Failed to load users" }, { status: 500 });
  }
}
