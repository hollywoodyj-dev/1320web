import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";
import { ReportToolbar } from "@/app/(site)/tw-v2-report/ReportToolbar";
import { isTwV2ReportEnabled } from "@/lib/gzh/tw-v2-report-access";
import { buildTwV2Report, isRealCalendarDate, type V2Product } from "@/lib/gzh/tw-v2-report";
import "../v2-report.css";

export const metadata: Metadata = {
  title: "1320 一頁摘要",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

function one(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function numberOr(value: string, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : Number.NaN;
}

function productOf(value: string): V2Product {
  return value.toLowerCase() === "sample" ? "SAMPLE" : "FULL";
}

export default async function TwV2SummaryPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const host = (await headers()).get("host");
  if (!isTwV2ReportEnabled(host)) {
    return (
      <main className="v2-report">
        <div className="v2-report-inner">
          <h1>這一頁還沒有開放</h1>
        </div>
      </main>
    );
  }

  const params = await searchParams;
  const year = numberOr(one(params.year), 1980);
  const month = numberOr(one(params.month), 5);
  const day = numberOr(one(params.day), 22);
  const hideBirthday = one(params.hideBirthday) === "1";
  if (!isRealCalendarDate(year, month, day)) {
    return (
      <main className="v2-report">
        <div className="v2-report-inner">
          <h1>日期無法讀取</h1>
        </div>
      </main>
    );
  }

  const product = productOf(one(params.product));
  const report = buildTwV2Report(year, month, day, product, one(params.focus));

  return (
    <main className="v2-report v2-report--summary">
      <article className="v2-report-inner">
        <p className="v2-kicker">1320 Soul Code</p>
        <h1>一頁摘要</h1>
        {!hideBirthday ? <p className="v2-date">國曆 {report.dateLabel}</p> : null}
        <p className="v2-codes">{report.codes.join(" · ")}</p>
        <Suspense fallback={null}>
          <ReportToolbar
            year={year}
            month={month}
            day={day}
            product={product}
            hasNarrative={report.status === "REFERENCE_SAMPLE" || report.status === "EDITORIAL_CANDIDATE"}
          />
        </Suspense>
        {report.status === "BLOCKED_NO_APPROVED_SOURCE" ? (
          <section className="v2-blocked">
            <h2>編碼已產生，敘事尚未核准</h2>
            <p>摘要只在有 Preview 敘事的生日顯示。這一頁不會套用其他生日的內容。</p>
          </section>
        ) : report.snapshot ? (
          <section className="v2-summary-card">
            {report.status === "EDITORIAL_CANDIDATE" ? (
              <p className="v2-focus">內部候選摘要 · 尚未核准</p>
            ) : null}
            <h2>{report.snapshot.title}</h2>
            <p className="v2-cover-theme">{report.snapshot.theme}</p>
            <p>{report.snapshot.lead}</p>
            <p>{report.snapshot.questionLead}</p>
            <p className="v2-summary-question">{report.snapshot.question}</p>
            <div className="v2-card-grid">
              {report.snapshot.cards.map((item) => (
                <div key={item.label} className="v2-card">
                  <p className="v2-card-label">{item.label}</p>
                  <p className="v2-card-title">{item.title}</p>
                  <p className="v2-card-codes">{item.codes}</p>
                </div>
              ))}
            </div>
            <h3>帶著這個問題繼續閱讀</h3>
            <p className="v2-summary-question">{report.snapshot.readingQuestion}</p>
            {report.readerFocus ? <p className="v2-focus">你選擇的關注主題：{report.readerFocus}</p> : null}
          </section>
        ) : (
          <section className="v2-summary-card">
            {report.status === "EDITORIAL_CANDIDATE" ? (
              <p className="v2-focus">內部候選摘要 · 尚未核准</p>
            ) : null}
            <h2>一頁摘要</h2>
            {report.coverTheme ? <p className="v2-cover-theme">{report.coverTheme}</p> : null}
            <p>這一組生日的摘要卡尚未整理成獨立圖卡格式。請先閱讀完整章節。</p>
            <p className="v2-codes">{report.codes.join(" · ")}</p>
          </section>
        )}
      </article>
    </main>
  );
}
