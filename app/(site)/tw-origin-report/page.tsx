import type { Metadata } from "next";
import { headers } from "next/headers";
import { isTwOriginReportEnabled } from "@/lib/gzh/tw-origin-report-access";
import { buildTwOriginReport, isRealCalendarDate } from "@/lib/gzh/tw-origin-report";
import "./origin-report.css";

export const metadata: Metadata = {
  title: "1320 初始內容審閱",
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

export default async function TwOriginReportPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const host = (await headers()).get("host");
  if (!isTwOriginReportEnabled(host)) {
    return (
      <main className="origin-report">
        <div className="origin-report-inner">
          <h1>這一頁還沒有開放</h1>
        </div>
      </main>
    );
  }

  const params = await searchParams;
  const year = numberOr(one(params.year), 1980);
  const month = numberOr(one(params.month), 5);
  const day = numberOr(one(params.day), 22);
  if (!isRealCalendarDate(year, month, day)) {
    return (
      <main className="origin-report">
        <div className="origin-report-inner">
          <h1>日期無法讀取</h1>
        </div>
      </main>
    );
  }

  const report = buildTwOriginReport(year, month, day);

  return (
    <main className="origin-report">
      <article className="origin-report-inner">
        <p className="origin-kicker">1320 初始內容 · 審閱版</p>
        <h1>完整報告</h1>
        <p className="origin-lead">
          這一版用初期 1320 的十個模組。它和目前另一份偏向 reflection 的審閱稿是不同的版本。
        </p>
        <p className="origin-date">國曆 {report.dateLabel}</p>
        <p className="origin-codes">{report.codes.join(" · ")}</p>
        {report.sections.map((section) => (
          <section key={section.module} id={section.module} className="origin-section">
            <h2>{section.name || "這一則沒有對上的條目。"}</h2>
            <p className="origin-code">
              {section.moduleName} · {section.code}
            </p>
            {section.fields.map((field) => (
              <div key={field.label}>
                <h3>{field.label}</h3>
                {field.items.length > 1 ? (
                  <ul>
                    {field.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{field.text || "這一則沒有對上的條目。"}</p>
                )}
              </div>
            ))}
          </section>
        ))}
        <section className="origin-section" id="seven-day">
          <h2>七日對應</h2>
          <p className="origin-note">
            這份內容庫沒有另寫七日正文。下面只列出它自己的七天對應。第 5 天對的是整個靈魂使命。
          </p>
          <div className="origin-days">
            {report.days.map((item) => (
              <div key={item.day} className="origin-day">
                <strong>{item.day}</strong>
                <span>
                  {item.module} · {item.moduleName}
                </span>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
