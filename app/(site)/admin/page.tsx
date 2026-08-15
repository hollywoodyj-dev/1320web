import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminAccountsPanel } from "@/components/admin/admin-accounts-panel";
import { AdminConversionPanel } from "@/components/admin/admin-conversion-panel";
import { AdminStatsStrip } from "@/components/admin/admin-stats-strip";
import { isAdminAccountsEnabled } from "@/lib/admin/admin-accounts";
import { isAdminEmail } from "@/lib/admin/require-admin";
import { getCurrentUser } from "@/lib/auth/session";
import { isDatabaseConfigured } from "@/lib/platform-config";

export const metadata: Metadata = {
  title: "Admin — Tracking & accounts",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isDatabaseConfigured()) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="mt-4 text-[var(--muted,#555)]">
          Database is not configured. Set <code>POSTGRES_URL</code> and run{" "}
          <code>npm run db:migrate</code>.
        </p>
      </main>
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?next=/admin");
  }

  if (!isAdminEmail(user.email)) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="mt-4">
          Signed in as <strong>{user.email}</strong>, but this account is not on the admin
          allowlist. Set <code>ADMIN_EMAIL</code> to your login email (comma-separated for
          multiple).
        </p>
        <p className="mt-4">
          <Link href="/account" className="underline">
            Back to account
          </Link>
        </p>
      </main>
    );
  }

  if (!process.env.ADMIN_EMAIL?.trim()) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="mt-4">
          <code>ADMIN_EMAIL</code> is not configured.
        </p>
      </main>
    );
  }

  const accountsEnabled = isAdminAccountsEnabled();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="mt-2 text-sm text-[var(--muted,#555)]">
          Signed in as {user.email}. Marketing / LP tracking + accounts (ME Spec v1).
        </p>
      </header>

      <div className="flex flex-col gap-12">
        {accountsEnabled ? <AdminStatsStrip /> : null}
        <AdminConversionPanel />
        {accountsEnabled ? <AdminAccountsPanel /> : null}
      </div>
    </main>
  );
}
