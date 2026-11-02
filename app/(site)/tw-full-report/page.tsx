import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { buildTwFullReportPreview } from "@/lib/gzh/build-tw-full-report-preview";
import { isTwFullReportPreviewEnabled } from "@/lib/gzh/tw-full-report-preview-access";
import { isValidBirthDate } from "@/lib/validateBirthDate";
import "./preview.css";

export const metadata: Metadata = {
  title: "繁中完整報告預覽",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

function readNumber(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return Number.NaN;
  return Number.parseInt(raw, 10);
}

export default async function TwFullReportPreviewPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const host = (await headers()).get("host");
  if (!isTwFullReportPreviewEnabled(host)) notFound();

  const params = await searchParams;
  const hasQuery = params.year != null || params.month != null || params.day != null;
  const year = hasQuery ? readNumber(params.year) : 1980;
  const month = hasQuery ? readNumber(params.month) : 5;
  const day = hasQuery ? readNumber(params.day) : 22;
  if (!isValidBirthDate(year, month, day)) {
    return (
      <article className="tw-zh-report">
        <h1>日期無法讀取</h1>
        <p>請用完整的年、月、日打開這份預覽。</p>
      </article>
    );
  }

  const report = buildTwFullReportPreview(year, month, day);

  return (
    <article className="tw-zh-report">
      <p className="tw-zh-kicker">預覽 · 尚未用於正式站</p>
      <h1 id="cover">完整報告</h1>
      <p>這是一份用來閱讀和校對的繁中全文。正式站、台灣免費報告和台灣付費交付都沒有改。</p>
      <p>國曆 {report.birthDateDisplay}</p>
      <p>基礎編號 {report.foundationCodes}</p>

      <h2 id="overview">四層放在一起</h2>
      {report.blocks.slice(0, 4).map((block) => (
        <p key={block.code}>
          {block.moduleTitle} · {block.code} · {block.entryTitle || "沒有對上的條目"}
        </p>
      ))}

      {report.blocks.map((block) => (
        <section key={`${block.moduleTitle}-${block.code}`} id={block.moduleTitle}>
          <h2>
            {block.moduleTitle} · {block.code}
          </h2>
          {block.entryTitle ? <h3>{block.entryTitle}</h3> : null}
          {block.note ? <p className="tw-zh-note">{block.note}</p> : null}
          {block.missing ? <p className="tw-zh-missing">這一則鎖定稿沒有對上的條目。</p> : null}
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}

      <section id="生命方向">
        <h2>生命方向</h2>
        <p>這一節有四塊：本源、你的關係、你怎麼表現、你反覆回到的模式。</p>
        {report.s5.map((block) => (
          <section key={block.moduleTitle}>
            <h3>
              {block.moduleTitle} · {block.code}
              {block.entryTitle ? ` · ${block.entryTitle}` : ""}
            </h3>
            {block.missing ? <p className="tw-zh-missing">這一則鎖定稿沒有對上的條目。</p> : null}
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </section>

      <section id="七日回看練習">
        <h2>七日回看練習</h2>
        <p className="tw-zh-kicker">七天 · 每天一小部分 · 和生活放在一起看</p>
        <p>
          你不需要一次看懂整份報告。接下來七天，每天只回看一小部分，再和當天真實發生的一件事放在一起看看。覺得貼近自己的經驗，就留下。不貼近，也可以放下。
        </p>
        <h3>這七天在做什麼</h3>
        <p>每天只回看一小部分，和當天真實發生的一件事放在一起看看。看見就可以，不必急著改。</p>
        <p>漏掉一天，也沒關係。想再看，不必從頭補。</p>
        <p>這七天不是要你把自己改好。七天只是七次回看，不是七個階段。第 7 天不是完成。你反覆回到的模式仍在完整報告裡，這七天沒有單獨的一天對應它。</p>
        {report.days.map((practiceDay) => (
          <section key={practiceDay.day} id={`day-${practiceDay.day}`}>
            <h3>{practiceDay.title}</h3>
            <p>{practiceDay.prompt}</p>
            {practiceDay.day === 5 ? <p>這一頁只回看生命方向裡的本源這一塊。</p> : null}
            {practiceDay.parts.map((part) => (
              <div key={part.heading}>
                {practiceDay.parts.length > 1 ? <h3>{part.heading}</h3> : null}
                {part.lines.map((line) => (
                  <p key={line.label}>
                    {line.label}：{line.text}
                  </p>
                ))}
              </div>
            ))}
          </section>
        ))}
        <h3>如果想留一句</h3>
        <p>今天我實際注意到的是哪一件？</p>
        <p>不寫也可以。</p>
      </section>
      <script
        dangerouslySetInnerHTML={{
          __html: "if(location.hash){var el=document.querySelector(location.hash);if(el)el.scrollIntoView();}",
        }}
      />
    </article>
  );
}
