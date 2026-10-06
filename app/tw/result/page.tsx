import type { Metadata } from "next";
import Link from "next/link";
import { GzhTwFreeReportComplete } from "@/components/gzh/gzh-tw-free-report-complete";
import { calculate1320Code } from "@/lib/calculate1320Code";
import { containsCjk, pickLocalized } from "@/lib/getLocalized";
import { get1320Content } from "@/lib/get1320Content";
import { traditionalLines } from "@/lib/gzh/to-traditional";
import { GZH_TW_RESULT } from "@/lib/gzh/tw-content";
import { gzhHref } from "@/lib/gzh/locale";
import { resolveBirthDateFromRequest } from "@/lib/resolve-birth-date";
import type { SegmentContent } from "@/lib/types/1320-content";

export const metadata: Metadata = {
  title: GZH_TW_RESULT.metaTitle,
  description: GZH_TW_RESULT.metaDescription,
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

const PART_ORDER = GZH_TW_RESULT.parts;

function formatBirthLabel(year: number, month: number, day: number): string {
  return `${GZH_TW_RESULT.birthPrefix} ${year}年${month}月${day}日`;
}

function partLines(segment: SegmentContent): string[] {
  const zh = pickLocalized(segment.freeEssence, "zh");
  if (!containsCjk(zh)) return [];
  return traditionalLines(zh);
}

export default async function TwResultPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const birth = await resolveBirthDateFromRequest(params);
  const backHref = gzhHref("tw", "free-soul-blueprint");

  if (!birth) {
    return (
      <article className="gzh-free">
        <h1 className="gzh-hero-brand">{GZH_TW_RESULT.missingDateTitle}</h1>
        <p className="gzh-hero-lead">{GZH_TW_RESULT.missingDateBody}</p>
        <Link className="gzh-btn" href={backHref}>
          {GZH_TW_RESULT.missingDateCta}
        </Link>
      </article>
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
      locale: "zh",
    },
    { birthDate: birthDateLabel, reportTier: "free" },
  );

  const numbers = {
    s1: code.s1,
    s3: code.s3Raw,
    s2: code.s2,
    s0: code.s0,
  } as const;

  const segments = {
    s1: content.s1Content,
    s3: content.s3Content,
    s2: content.s2Content,
    s0: content.s0Content,
  } as const;

  const reflection = traditionalLines(pickLocalized(content.reflectionQuestion, "zh"));
  const reflectionText = reflection.join("");
  const showReflection = containsCjk(reflectionText);

  return (
    <article className="gzh-free gzh-report">
      <h1 className="gzh-hero-brand">{GZH_TW_RESULT.title}</h1>
      <p className="gzh-boundary">{GZH_TW_RESULT.boundary}</p>
      <p className="gzh-trust">{formatBirthLabel(year, month, day)}</p>

      <div className="gzh-report-codes">
        {PART_ORDER.map((part) => (
          <div key={part.id}>
            <span className="gzh-report-code-num">{numbers[part.id]}</span>
            <span className="gzh-report-code-label">{part.label}</span>
          </div>
        ))}
      </div>

      {PART_ORDER.map((part) => {
        const lines = partLines(segments[part.id]);
        return (
          <section key={part.id} className="gzh-report-part">
            <h2>{part.label}</h2>
            <p className="gzh-report-part-num">{numbers[part.id]}</p>
            {lines.length > 0 ? (
              lines.map((line, index) => (
                <p key={`${part.id}-${index}`} className="gzh-report-line">
                  {line}
                </p>
              ))
            ) : (
              <p className="gzh-report-line">{GZH_TW_RESULT.missingPart}</p>
            )}
          </section>
        );
      })}

      <p className="gzh-example-takeaway">{GZH_TW_RESULT.mirrorLine}</p>
      <p className="gzh-hero-lead">{GZH_TW_RESULT.mirrorBody}</p>

      {showReflection ? (
        <section className="gzh-report-part">
          <h2>{GZH_TW_RESULT.reflectionTitle}</h2>
          <p className="gzh-report-line">{reflectionText}</p>
        </section>
      ) : null}

      <p className="gzh-report-note">{GZH_TW_RESULT.fullReportNote}</p>
      <GzhTwFreeReportComplete />
    </article>
  );
}
