/**
 * Admin accounts helpers (ME Spec v1) — map 1320 users + entitlements/purchases
 * into Wisewave-compatible admin list shapes. Never expose secrets or birth data.
 */

export type AdminEffectiveStatus = "none" | "pending" | "active" | "expired" | "canceled";

export type AdminSubscriptionView = {
  id: string;
  status: string;
  plan: string | null;
  platform: string | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  externalSubscriptionId: string | null;
};

export type AdminUserView = {
  id: string;
  email: string;
  name: string | null;
  oauthProvider: string | null;
  country: string | null;
  createdAt: string;
  effectiveStatus: AdminEffectiveStatus;
  subscription: AdminSubscriptionView | null;
  generateCount: number;
  lastGenerateAt: string | null;
  hasFullReport: boolean;
};

export function displayName(
  firstName: string | null | undefined,
  lastName: string | null | undefined,
): string | null {
  const parts = [firstName?.trim(), lastName?.trim()].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : null;
}

export function authProviderLabel(hasPassword: boolean): string {
  return hasPassword ? "email" : "magic_link";
}

export function computeEffectiveStatus(input: {
  entitlementStatus: string | null;
  entitlementExpiresAt: Date | null;
  purchaseStatus: string | null;
}): AdminEffectiveStatus {
  const now = Date.now();
  if (input.entitlementStatus === "active") {
    if (input.entitlementExpiresAt && input.entitlementExpiresAt.getTime() <= now) {
      return "expired";
    }
    return "active";
  }
  if (input.entitlementStatus === "expired" || input.entitlementStatus === "canceled") {
    return input.entitlementStatus;
  }
  if (input.purchaseStatus === "pending") return "pending";
  if (input.purchaseStatus === "completed" && !input.entitlementStatus) {
    // Completed purchase without entitlement row — treat as pending fulfillment edge.
    return "pending";
  }
  return "none";
}

export function isAdminAccountsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_ADMIN_ACCOUNTS !== "0";
}
