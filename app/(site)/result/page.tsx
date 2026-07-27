import type { Metadata } from "next";
import Link from "next/link";
import { ReportDashboard } from "@/components/report/report-dashboard";
import { SectionCard } from "@/components/section-card";
import { resolveResultReportMode } from "@/lib/auth/access";
import { buildReportViewModel } from "@/lib/report/build-report-view-model";
import { calculate1320Code } from "@/lib/calculate1320Code";
import { get1320Content } from "@/lib/get1320Content";
import { resolveBirthDateFromRequest } from "@/lib/resolve-birth-date";
import { RESULT_META } from "@/lib/result-content";
import { getFullReportAmountCents } from "@/lib/stripe/client";

export const metadata: Metadata = {
  title: RESULT_META.title,
  description: RESULT_META.description,
  robots: { index: false, follow: false, nocache: true },
};

function formatFullReportPriceDisplay(): string {
  const cents = getFullReportAmountCents();
  const amount = cents / 100;
  return `USD ${amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(2)}`;
}

/** Never cache — each birth date must render fresh segment content. */
export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function ResultPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const birth = await resolveBirthDateFromRequest(params);

  if (!birth) {
    return (
      <SectionCard title="No Soul Code Found" subtitle="Enter your birth date to generate your code">
        <p>
          We could not read a valid birth date from this link. Start fresh to open your four-part
          mirror.
        </p>
        <Link href="/free-soul-blueprint" className="gold-button mt-4 inline-flex">
          Discover My Free Soul Blueprint
        </Link>
      </SectionCard>
    );
  }

  const { year, month, day } = birth;
  const code = calculate1320Code(year, month, day);
  const birthDateLabel = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const content = get1320Content(
    {
      s1: code.s1,
      s3: code.s3Raw,
      s2: code.s2,
      s0: code.s0,
      locale: "en",
    },
    { birthDate: birthDateLabel, reportTier: "free" },
  );

  const reportMode = await resolveResultReportMode(content.combinationSignature);

  const viewModel = buildReportViewModel(content, {
    mode: reportMode,
    variant: "result",
    birthDateLabel,
  });

  return (
    <div className="report-page report-page--free-refined">
      <ReportDashboard
        key={code.codeString}
        viewModel={viewModel}
        analyticsEvent="result_view"
        fullReportPriceDisplay={formatFullReportPriceDisplay()}
      />
    </div>
  );
}
