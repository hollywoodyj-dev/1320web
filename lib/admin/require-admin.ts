import { getCurrentUser } from "@/lib/auth/session";

export type AdminCheckResult =
  | { ok: true; adminUserId: string; email: string }
  | { ok: false; status: number; message: string };

function adminEmailAllowlist(): string[] {
  const raw = process.env.ADMIN_EMAIL?.trim() ?? "";
  if (!raw) return [];
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const allow = adminEmailAllowlist();
  if (allow.length === 0) return false;
  return allow.includes(email.trim().toLowerCase());
}

/**
 * Cookie-session admin gate (1320).
 * Requires signed-in user whose email is in ADMIN_EMAIL (comma-separated OK).
 */
export async function requireAdmin(): Promise<AdminCheckResult> {
  const allow = adminEmailAllowlist();
  if (allow.length === 0) {
    return { ok: false, status: 500, message: "ADMIN_EMAIL is not configured" };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { ok: false, status: 401, message: "Unauthorized" };
  }

  if (!isAdminEmail(user.email)) {
    return { ok: false, status: 403, message: "Forbidden" };
  }

  return { ok: true, adminUserId: user.id, email: user.email };
}
