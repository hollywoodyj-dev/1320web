import { userHasEntitlement, userHasEntitlementForSignature } from "@/lib/db/entitlements";
import { getSoulReportById } from "@/lib/db/reports";
import { getCurrentUser } from "@/lib/auth/session";
import { isDatabaseConfigured } from "@/lib/platform-config";

export async function getEntitledReportAccess(reportId: string) {
  if (!isDatabaseConfigured()) return { allowed: false as const, reason: "db_unconfigured" as const };

  const user = await getCurrentUser();
  if (!user) return { allowed: false as const, reason: "unauthenticated" as const };

  const report = await getSoulReportById(reportId);
  if (!report) return { allowed: false as const, reason: "not_found" as const };

  const allowed = await userHasEntitlement({ userId: user.id, reportId });
  if (!allowed) return { allowed: false as const, reason: "no_entitlement" as const, user, report };

  return { allowed: true as const, user, report };
}

export async function resolveResultReportMode(combinationSignature: string): Promise<"free" | "full"> {
  if (!isDatabaseConfigured()) return "free";

  const user = await getCurrentUser();
  if (!user) return "free";

  const access = await userHasEntitlementForSignature({
    userId: user.id,
    combinationSignature,
  });

  return access.entitled ? "full" : "free";
}
