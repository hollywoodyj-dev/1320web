import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { UnifiedReportMobileShell } from "@/components/report-system/UnifiedReportMobileShell";
import { UnifiedReportWebShell } from "@/components/report-system/UnifiedReportWebShell";
import { getEntitledReportAccess } from "@/lib/auth/access";
import { buildCanonicalReport } from "@/lib/canonical-report";
import { preferMobileReportFromUserAgent } from "@/lib/report/prefer-mobile-report";
import { SectionCard } from "@/components/section-card";
import "@/styles/report-system/index.css";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ reportId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { reportId } = await params;
  return {
    title: `Full Report ${reportId.slice(0, 8)}`,
    description: "Your purchased 1320 Full Soul Origin Report.",
  };
}

export default async function MyReportPage({ params }: PageProps) {
  const { reportId } = await params;
  const access = await getEntitledReportAccess(reportId);

  if (!access.allowed) {
    if (access.reason === "db_unconfigured") {
      return (
        <SectionCard title="Report Access Unavailable">
          <p>Database is not configured on this environment.</p>
        </SectionCard>
      );
    }

    if (access.reason === "unauthenticated") {
      const loginNext = `/my-report/${reportId}`;
      return (
        <SectionCard title="Sign In Required">
          <p>Sign in to view your Full Report. Use your account password or the secure link from your purchase email.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href={`/login?next=${encodeURIComponent(loginNext)}`} className="gold-button inline-flex">
              SIGN IN
            </Link>
            <Link href="/checkout" className="blueprint-secondary-link inline-flex items-center">
              Request access link
            </Link>
          </div>
        </SectionCard>
      );
    }

    if (access.reason === "not_found") {
      return (
        <SectionCard title="Report Not Found">
          <p>This report could not be found.</p>
          <Link href="/my-report" className="blueprint-secondary-link">
            My reports
          </Link>
        </SectionCard>
      );
    }

    return (
      <SectionCard title="Full Report Locked">
        <p>You do not have an active entitlement for this report.</p>
        <Link href="/checkout" className="gold-button mt-4 inline-flex">
          UNLOCK FULL REPORT
        </Link>
      </SectionCard>
    );
  }

  const report = access.report;
  const birthDateLabel = `${report.birth_year}-${String(report.birth_month).padStart(2, "0")}-${String(report.birth_day).padStart(2, "0")}`;
  const birthDateDisplay = new Date(report.birth_year, report.birth_month - 1, report.birth_day).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" },
  );
  const preparedFor = access.user.first_name?.trim() || "You";

  const canonicalReport = buildCanonicalReport({
    name: preparedFor,
    birth_date: birthDateLabel,
    birth_date_display: birthDateDisplay,
    report_type: "Full Soul Origin Report",
  });

  const requestHeaders = await headers();
  const preferMobile =
    requestHeaders.get("x-1320-mobile-report") === "1" ||
    preferMobileReportFromUserAgent(requestHeaders.get("user-agent"));

  if (preferMobile) {
    return (
      <UnifiedReportMobileShell
        reportType="full"
        data={canonicalReport}
        closeHref="/account"
      />
    );
  }

  return (
    <UnifiedReportWebShell
      reportType="full"
      data={canonicalReport}
      closeHref="/account"
    />
  );
}
