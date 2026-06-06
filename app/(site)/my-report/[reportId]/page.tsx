import type { Metadata } from "next";
import Link from "next/link";
import { ReportDashboard } from "@/components/report/report-dashboard";
import { getEntitledReportAccess } from "@/lib/auth/access";
import { buildPaidReportViewModel } from "@/lib/report/build-report-from-row";
import { SectionCard } from "@/components/section-card";

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
      return (
        <SectionCard title="Magic Link Required">
          <p>Open the secure link from your purchase email to view this Full Report.</p>
          <Link href="/checkout" className="gold-button mt-4 inline-flex">
            REQUEST ACCESS LINK
          </Link>
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

  const viewModel = buildPaidReportViewModel(access.report);

  return (
    <div className="report-page">
      <ReportDashboard viewModel={viewModel} analyticsEvent="result_view" />
    </div>
  );
}
