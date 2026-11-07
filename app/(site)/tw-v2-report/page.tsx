import type { Metadata } from "next";
import { headers } from "next/headers";
import { isTwV2ReportEnabled } from "@/lib/gzh/tw-v2-report-access";
import { buildTwV2Report, isRealCalendarDate, type V2Product } from "@/lib/gzh/tw-v2-report";
import "./v2-report.css";

export const metadata: Metadata = {
  title: "1320 完整報告 v2.0",
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

export default async function TwV2ReportPage({
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
  if (!isRealCalendarDate(year, month, day)) {
    return (
      <main className="v2-report">
        <div className="v2-report-inner">
          <h1>日期無法讀取</h1>
        </div>
      </main>
    );
  }

  const report = buildTwV2Report(year, month, day, productOf(one(params.product)), one(params.focus));

  return (
    <main className="v2-report">
      <article className="v2-report-inner">
        <p className="v2-kicker">1320 完整報告 v2.0</p>
        <h1>{report.product === "SAMPLE" ? "四碼閱讀" : "完整靈魂藍圖"}</h1>
        <p className="v2-lead">
          這一頁讀 v2.0。v1.0 是已經鎖定的另一套稿，正文留在原處。這裡只用正式編碼。還沒有核准敘事的生日會停住，不會用別的日期補上。
        </p>
        <p className="v2-date">國曆 {report.dateLabel}</p>
        <p className="v2-codes">{report.codes.join(" · ")}</p>
        {report.readerFocus ? <p className="v2-focus">你選擇的關注主題：{report.readerFocus}</p> : null}
        {report.status === "BLOCKED_NO_APPROVED_SOURCE" ? (
          <section className="v2-blocked">
            <h2>這組編碼還沒有核准敘事</h2>
            <p>編碼已經對上。v2.0 目前只有 1980 年 5 月 22 日這一組有敘事樣本，所以這一個生日停在這裡。</p>
          </section>
        ) : (
          <>
            <nav className="v2-nav" aria-label="章節">
              {report.chapters.map((chapter) => (
                <a key={chapter.id} href={`#ch-${chapter.id}`}>
                  {chapter.title}
                </a>
              ))}
            </nav>
            {report.preamble.map((paragraph) => (
              <p key={paragraph} className="v2-preamble">
                {paragraph}
              </p>
            ))}
            {report.chapters.map((chapter) => (
              <section key={chapter.id} id={`ch-${chapter.id}`} className="v2-chapter">
                <h2>{chapter.title}</h2>
                {chapter.blocks.map((block, index) => {
                  if (block.type === "h3") return <h3 key={`${chapter.id}-${index}`}>{block.text}</h3>;
                  if (block.type === "table") {
                    return (
                      <div key={`${chapter.id}-${index}`} className="v2-table-wrap">
                        <table>
                          <thead>
                            <tr>
                              {block.headers.map((header) => (
                                <th key={header}>{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {block.rows.map((row) => (
                              <tr key={row.join("|")}>
                                {row.map((cell) => (
                                  <td key={cell}>{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                  return <p key={`${chapter.id}-${index}`}>{block.text}</p>;
                })}
              </section>
            ))}
          </>
        )}
        {report.days ? (
          <section className="v2-days" id="day-map">
            <h2>七日對應</h2>
            <p>S0 可以陪整週，不另成一天。</p>
            <div className="v2-day-grid">
              {report.days.map((item) => (
                <div key={item.day}>
                  <strong>{item.day}</strong>
                  <span>{item.modules}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
