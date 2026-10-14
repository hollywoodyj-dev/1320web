import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { UnifiedReportMobileShell } from "@/components/report-system/UnifiedReportMobileShell";
import { UnifiedReportWebShell } from "@/components/report-system/UnifiedReportWebShell";
import { isAdminEmail } from "@/lib/admin/require-admin";
import { buildCanonicalReport } from "@/lib/canonical-report";
import { formatBirthDateLabel, parseAdminBirthDateInput } from "@/lib/admin/report-preview";
import { getCurrentUser } from "@/lib/auth/session";
import { calculate1320Code } from "@/lib/calculate1320Code";
import { get1320ContentV1 } from "@/lib/get1320Content";
import { applyTraditionalChineseToCanonicalReport } from "@/lib/gzh/tw-full-report-preview";
import { resolveBirthDateFromRequest } from "@/lib/resolve-birth-date";
import "@/styles/report-system/index.css";

export const metadata: Metadata = {
  title: "Admin — Full report preview",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

function readFlag(value: string | string[] | undefined): boolean {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "1" || raw === "true";
}

function readLanguage(value: string | string[] | undefined): "zh" | "en" {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "zh" ? "zh" : "en";
}

export default async function AdminReportPreviewPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?next=/admin");
  }
  if (!isAdminEmail(user.email)) {
    redirect("/admin");
  }

  const params = await searchParams;
  const birth = await resolveBirthDateFromRequest(params);
  const forceMobile = readFlag(params.mobile);
  const language = readLanguage(params.lang);

  if (!birth) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Admin report preview</h1>
        <p className="mt-4 text-[var(--muted,#555)]">
          Add a valid birth date: <code>?year=1980&amp;month=5&amp;day=22</code>
        </p>
        <Link href="/admin" className="mt-6 inline-block underline">
          Back to admin
        </Link>
      </main>
    );
  }

  const parsed = parseAdminBirthDateInput(birth.year, birth.month, birth.day);
  if (!parsed) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Admin report preview</h1>
        <p className="mt-4 text-[var(--muted,#555)]">That birth date is not valid.</p>
        <Link href="/admin" className="mt-6 inline-block underline">
          Back to admin
        </Link>
      </main>
    );
  }

  const birthDateLabel = formatBirthDateLabel(parsed);
  const birthDateDisplay =
    language === "zh"
      ? `${parsed.year}年${parsed.month}月${parsed.day}日`
      : new Date(parsed.year, parsed.month - 1, parsed.day).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

  const englishReport = buildCanonicalReport({
    name: language === "zh" ? "管理員預覽" : "Admin Preview",
    birth_date: birthDateLabel,
    birth_date_display: birthDateDisplay,
    report_type: "Full Soul Origin Report",
    language,
  });

  let canonicalReport = englishReport;
  if (language === "zh") {
    const code = calculate1320Code(parsed.year, parsed.month, parsed.day);
    const content = get1320ContentV1(
      {
        s1: code.s1,
        s3: code.s3Raw,
        s2: code.s2,
        s0: code.s0,
        locale: "zh",
      },
      { birthDate: birthDateLabel, reportTier: "full" },
    );
    canonicalReport = applyTraditionalChineseToCanonicalReport(englishReport, content);
  }

  const banner =
    language === "zh"
      ? `管理員預覽 — ${birthDateLabel}。僅供內部審閱，不是付費交付。S0–S6 是目前的中文內容。S7–S9 仍是英文。台灣付費報告仍是英文完整報告。`
      : `Admin preview — ${birthDateLabel} · ${canonicalReport.payload.calculation.combination_signature}. Internal review only.`;
  const closeHref = "/admin";

  if (forceMobile) {
    return (
      <UnifiedReportMobileShell
        reportType="full"
        data={canonicalReport}
        closeHref={closeHref}
        banner={banner}
      />
    );
  }

  return (
    <UnifiedReportWebShell
      reportType="full"
      data={canonicalReport}
      closeHref={closeHref}
      banner={banner}
    />
  );
}
