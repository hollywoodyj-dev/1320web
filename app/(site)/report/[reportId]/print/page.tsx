import type { Metadata } from "next";
import Link from "next/link";
import { UnifiedReportPrintDocument } from "@/components/report-system/UnifiedReportPrintDocument";
import { resolveEntitledPrintReport } from "@/lib/report-system/resolve-print-report";
import { SectionCard } from "@/components/section-card";
import "@/styles/report-system/index.css";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ reportId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { reportId } = await params;
  return {
    title: `Full Report PDF ${reportId.slice(0, 8)}`,
    description: "PDF HTML surface for entitled Full Soul Origin Report.",
    robots: { index: false },
  };
}

export default async function EntitledReportPrintPage({ params }: PageProps) {
  const { reportId } = await params;
  const resolved = await resolveEntitledPrintReport(reportId);

  if (!resolved.ok) {
    if (resolved.reason === "db_unconfigured") {
      return (
        <SectionCard title="Report PDF Unavailable">
          <p>Database is not configured on this environment.</p>
        </SectionCard>
      );
    }

    if (resolved.reason === "unauthenticated") {
      return (
        <SectionCard title="Magic Link Required">
          <p>Open the secure link from your purchase email to render this report PDF.</p>
          <Link href="/checkout" className="gold-button mt-4 inline-flex">
            REQUEST ACCESS LINK
          </Link>
        </SectionCard>
      );
    }

    if (resolved.reason === "not_found") {
      return (
        <SectionCard title="Report Not Found">
          <p>This report could not be found.</p>
        </SectionCard>
      );
    }

    return (
      <SectionCard title="Full Report Locked">
        <p>You do not have an active entitlement for this report PDF.</p>
        <Link href="/checkout" className="gold-button mt-4 inline-flex">
          UNLOCK FULL REPORT
        </Link>
      </SectionCard>
    );
  }

  return <UnifiedReportPrintDocument reportType="full" data={resolved.report} />;
}
