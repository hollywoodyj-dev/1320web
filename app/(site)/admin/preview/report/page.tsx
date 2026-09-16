import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { UnifiedReportMobileShell } from "@/components/report-system/UnifiedReportMobileShell";
import { UnifiedReportWebShell } from "@/components/report-system/UnifiedReportWebShell";
import { isAdminEmail } from "@/lib/admin/require-admin";
import { buildCanonicalReport } from "@/lib/canonical-report";
import { formatBirthDateLabel, parseAdminBirthDateInput } from "@/lib/admin/report-preview";
import { getCurrentUser } from "@/lib/auth/session";
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
  const birthDateDisplay = new Date(parsed.year, parsed.month - 1, parsed.day).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" },
  );

  const canonicalReport = buildCanonicalReport({
    name: "Admin Preview",
    birth_date: birthDateLabel,
    birth_date_display: birthDateDisplay,
    report_type: "Full Soul Origin Report",
  });

  const banner = `Admin preview — ${birthDateLabel} · ${canonicalReport.payload.calculation.combination_signature}. Internal review only.`;
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
