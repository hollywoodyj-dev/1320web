import type { Metadata } from "next";
import Link from "next/link";
import { FullReportViewer } from "@/components/full-report/full-report-viewer";
import { getEntitledReportAccess } from "@/lib/auth/access";
import { get1320Content } from "@/lib/get1320Content";
import { calculate1320Code } from "@/lib/calculate1320Code";
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
  const code = calculate1320Code(report.birth_year, report.birth_month, report.birth_day);
  const birthDateLabel = `${report.birth_year}-${String(report.birth_month).padStart(2, "0")}-${String(report.birth_day).padStart(2, "0")}`;

  const content = get1320Content(
    {
      s1: code.s1,
      s3: code.s3Raw,
      s2: code.s2,
      s0: code.s0,
      locale: "en",
    },
    { birthDate: birthDateLabel, reportTier: "full" },
  );

  return (
    <div className="full-report-page">
      <FullReportViewer
        content={content}
        options={{
          birthDate: birthDateLabel,
          preparedFor: "You",
          reportId: report.id,
        }}
        analyticsEvent="full_report_view"
      />
    </div>
  );
}
