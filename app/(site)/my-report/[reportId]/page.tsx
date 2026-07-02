import type { Metadata } from "next";
import Link from "next/link";
import { FullReportV2Viewer } from "@/components/full-report-v2/full-report-v2-viewer";
import { getEntitledReportAccess } from "@/lib/auth/access";
import { buildCanonicalReport } from "@/lib/canonical-report";
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

  const report = access.report;
  const birthDateLabel = `${report.birth_year}-${String(report.birth_month).padStart(2, "0")}-${String(report.birth_day).padStart(2, "0")}`;
  const birthDateDisplay = new Date(report.birth_year, report.birth_month - 1, report.birth_day).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" },
  );
  const preparedFor = access.user.first_name?.trim() || "You";

  const payload = buildCanonicalReport({
    name: preparedFor,
    birth_date: birthDateLabel,
    birth_date_display: birthDateDisplay,
  }).payload;

  return (
    <div className="page-shell-inner page-shell--full-report">
      <div className="page-frame page-frame--full-report">
        <main className="inner-main inner-main--full-report">
          <FullReportV2Viewer payload={payload} />
        </main>
      </div>
    </div>
  );
}
