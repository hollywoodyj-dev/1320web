import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ReportHero, type ReportHeroTitleIcon } from "@/components/report-system/ReportHero";
import { ReportInsightCard } from "@/components/report-system/ReportInsightCard";
import { ReportPage } from "@/components/report-system/ReportPage";
import { ReportRoot } from "@/components/report-system/ReportRoot";
import { ReportSegmentGrid } from "@/components/report-system/ReportSegmentGrid";
import {
  buildTwFullReportPreview,
  type PreviewParagraphBlock,
} from "@/lib/gzh/build-tw-full-report-preview";
import { isTwFullReportPreviewEnabled } from "@/lib/gzh/tw-full-report-preview-access";
import { REPORT_SEGMENT_FALLBACK_ICONS } from "@/lib/report-system/report-segment-card-image";
import { isValidBirthDate } from "@/lib/validateBirthDate";
import "@/styles/report-system/index.css";

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

function heroIcon(block: PreviewParagraphBlock): ReportHeroTitleIcon | undefined {
  if (!block.imageUrl) return undefined;
  return {
    segmentKey: block.segmentKey,
    imageUrl: block.imageUrl,
    fallbackIcon: REPORT_SEGMENT_FALLBACK_ICONS[block.segmentKey],
    code: block.code,
    title: block.entryTitle || block.moduleTitle,
  };
}

function ParagraphCards({ block }: { block: PreviewParagraphBlock }) {
  if (block.missing) {
    return (
      <ReportSegmentGrid>
        <ReportInsightCard kicker={block.code} title={block.moduleTitle} body="這一則鎖定稿沒有對上的條目。" />
      </ReportSegmentGrid>
    );
  }

  return (
    <ReportSegmentGrid>
      {block.note ? <ReportInsightCard kicker={block.code} title="預覽對應" body={block.note} /> : null}
      {block.paragraphs.map((paragraph, index) => (
        <ReportInsightCard
          key={`${block.code}-${index}`}
          kicker={index === 0 ? block.code : undefined}
          title={index === 0 ? block.entryTitle : block.moduleTitle}
          body={paragraph}
        />
      ))}
    </ReportSegmentGrid>
  );
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
      <div className="unified-report-web-shell">
        <ReportRoot reportType="full" surface="web">
          <ReportPage pageId="invalid-date">
            <ReportHero title="日期無法讀取" description="請用完整的年、月、日打開這份預覽。" />
          </ReportPage>
        </ReportRoot>
      </div>
    );
  }

  const report = buildTwFullReportPreview(year, month, day);
  const modulePages = report.blocks;
  const totalPages = modulePages.length + 4;

  return (
    <div className="unified-report-web-shell">
      <div className="unified-report-web-banner" role="note">
        預覽。正式站、台灣免費報告和台灣付費交付都沒有改。
      </div>
      <ReportRoot reportType="full" surface="web">
        <ReportPage pageId="cover" pageNumber={1} totalPages={totalPages}>
          <ReportHero
            eyebrow="預覽 · 尚未用於正式站"
            title="完整報告"
            description={`國曆 ${report.birthDateDisplay}。基礎編號 ${report.foundationCodes}。`}
          />
        </ReportPage>

        <ReportPage pageId="overview" pageNumber={2} totalPages={totalPages}>
          <ReportHero eyebrow="四層" title="四層放在一起" />
          <ReportSegmentGrid>
            {report.blocks.slice(0, 4).map((block) => (
              <ReportInsightCard
                key={block.code}
                kicker={block.code}
                title={block.moduleTitle}
                body={block.entryTitle || "沒有對上的條目"}
                segmentKey={block.segmentKey}
                segmentCode={block.code}
                iconImageSrc={block.imageUrl}
                icon={REPORT_SEGMENT_FALLBACK_ICONS[block.segmentKey]}
              />
            ))}
          </ReportSegmentGrid>
        </ReportPage>

        {modulePages.map((block, index) => (
          <ReportPage
            key={`${block.moduleTitle}-${block.code}`}
            pageId={block.moduleTitle}
            pageNumber={index + 3}
            totalPages={totalPages}
          >
            <ReportHero
              eyebrow={block.code}
              title={block.moduleTitle}
              description={block.entryTitle}
              titleIcon={heroIcon(block)}
            />
            <ParagraphCards block={block} />
          </ReportPage>
        ))}

        <ReportPage pageId="生命方向" pageNumber={modulePages.length + 3} totalPages={totalPages}>
          <ReportHero
            eyebrow="生命方向"
            title="生命方向"
            description="這一節有四塊：本源、你的關係、你怎麼表現、你反覆回到的模式。"
          />
          {report.s5.map((block) => (
            <section key={block.moduleTitle}>
              <ReportHero
                eyebrow={block.code}
                title={block.moduleTitle}
                description={block.entryTitle}
                titleIcon={heroIcon(block)}
              />
              <ParagraphCards block={block} />
            </section>
          ))}
        </ReportPage>

        <ReportPage pageId="七日回看練習" pageNumber={totalPages} totalPages={totalPages}>
          <ReportHero
            eyebrow="七天 · 每天一小部分 · 和生活放在一起看"
            title="七日回看練習"
            description="你不需要一次看懂整份報告。接下來七天，每天只回看一小部分，再和當天真實發生的一件事放在一起看看。覺得貼近自己的經驗，就留下。不貼近，也可以放下。"
          />
          <ReportSegmentGrid>
            <ReportInsightCard
              title="這七天在做什麼"
              body="每天只回看一小部分，和當天真實發生的一件事放在一起看看。看見就可以，不必急著改。漏掉一天，也沒關係。想再看，不必從頭補。這七天不是要你把自己改好。七天只是七次回看，不是七個階段。第 7 天不是完成。你反覆回到的模式仍在完整報告裡，這七天沒有單獨的一天對應它。"
            />
            {report.days.map((practiceDay) => (
              <ReportInsightCard
                key={practiceDay.day}
                kicker={practiceDay.title}
                title={practiceDay.prompt}
                body={[
                  practiceDay.day === 5 ? "這一頁只回看生命方向裡的本源這一塊。" : "",
                  ...practiceDay.parts.flatMap((part) => [
                    practiceDay.parts.length > 1 ? part.heading : "",
                    ...part.lines.map((line) => `${line.label}：${line.text}`),
                  ]),
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            ))}
            <ReportInsightCard title="如果想留一句" body="今天我實際注意到的是哪一件？不寫也可以。" />
          </ReportSegmentGrid>
        </ReportPage>
      </ReportRoot>
      <script
        dangerouslySetInnerHTML={{
          __html: "if(location.hash){var el=document.querySelector(location.hash);if(el)el.scrollIntoView();}",
        }}
      />
    </div>
  );
}
