import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { getLatestSoulReportForUser } from "@/lib/db/reports";
import { userHasEntitlement } from "@/lib/db/entitlements";
import { isDatabaseConfigured } from "@/lib/platform-config";
import { SectionCard } from "@/components/section-card";

export const metadata: Metadata = {
  title: "My Full Report",
  description: "Return to your purchased 1320 Full Soul Origin Report.",
};

export default async function MyReportIndexPage() {
  if (!isDatabaseConfigured()) {
    return (
      <SectionCard title="My Report Unavailable">
        <p>Report access requires the Phase 2A database to be configured.</p>
        <Link href="/checkout" className="blueprint-secondary-link">
          Go to checkout
        </Link>
      </SectionCard>
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    return (
      <SectionCard title="Sign In With Magic Link">
        <p>Use the link from your purchase email, or request a new one from checkout.</p>
        <Link href="/checkout" className="gold-button mt-4 inline-flex">
          GET ACCESS LINK
        </Link>
      </SectionCard>
    );
  }

  const report = await getLatestSoulReportForUser(user.id);
  if (!report) {
    return (
      <SectionCard title="No Report Found">
        <p>We could not find a saved report for {user.email}.</p>
        <Link href="/checkout" className="gold-button mt-4 inline-flex">
          UNLOCK FULL REPORT
        </Link>
      </SectionCard>
    );
  }

  const entitled = await userHasEntitlement({ userId: user.id, reportId: report.id });
  if (!entitled) {
    return (
      <SectionCard title="Full Report Not Unlocked">
        <p>Complete checkout to access your Full Report.</p>
        <Link href="/checkout" className="gold-button mt-4 inline-flex">
          UNLOCK FULL REPORT
        </Link>
      </SectionCard>
    );
  }

  redirect(`/my-report/${report.id}`);
}
