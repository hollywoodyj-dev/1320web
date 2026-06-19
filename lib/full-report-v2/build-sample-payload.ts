import { calculate1320Code } from "@/lib/calculate1320Code";
import { get1320Content } from "@/lib/get1320Content";
import { buildCalculationOutput } from "@/lib/full-report-v2/build-calculation-output";
import {
  FULL_REPORT_V2_THEME_VERSION,
  FULL_REPORT_V2_VERSION,
  type FullReportV2InputClient,
  type FullReportV2Payload,
} from "@/lib/full-report-v2/types";

export const CANONICAL_SAMPLE_BIRTH_DATE = "1980-05-22";

function formatReportId(birthDateIso: string): string {
  return `1320-FULL-${birthDateIso.replace(/-/g, "")}`;
}

function defaultGeneratedMeta(): { generated_date: string; generated_time: string } {
  const now = new Date();
  return {
    generated_date: now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    generated_time: now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}

function segmentTitle(segment: { title: { en: string } } | null | undefined): string {
  return segment?.title?.en ?? "";
}

export function buildSampleFullReportV2Payload(
  input: FullReportV2InputClient = {
    name: "Example",
    birth_date: CANONICAL_SAMPLE_BIRTH_DATE,
    birth_date_display: "May 22, 1980",
  },
): FullReportV2Payload {
  const [year, month, day] = input.birth_date.split("-").map(Number);
  const codes = calculate1320Code(year, month, day);
  const locale = input.language === "zh" ? "zh" : "en";

  const content = get1320Content(
    {
      s1: codes.s1,
      s3: codes.s3Raw,
      s2: codes.s2,
      s0: codes.s0,
      locale,
    },
    { birthDate: input.birth_date, reportTier: "advanced" },
  );

  const titles = {
    s1: segmentTitle(content.s1Content) || content.codes.s3Title,
    s2: segmentTitle(content.s2Content),
    s3: content.codes.s3Title,
    s0: segmentTitle(content.s0Content),
  };
  titles.s1 = segmentTitle(content.s1Content);

  const calculation = buildCalculationOutput(codes, titles);
  const generated = defaultGeneratedMeta();

  const moduleSlot = (
    segment: typeof content.s1Content | null | undefined,
    code: string,
    extra?: Record<string, unknown>,
  ) => {
    if (!segment) return { code, ...extra };
    return {
      code,
      segmentCode: segment.segmentCode ?? code,
      title: segment.title.en,
      subtitle: segment.subtitle.en,
      ...extra,
    };
  };

  return {
    client: {
      name: input.name,
      birth_date: input.birth_date,
      birth_date_display: input.birth_date_display ?? input.birth_date,
      birth_date_iso: input.birth_date,
      timezone: input.timezone,
      language: input.language ?? "en",
      report_mode: "paid_full",
    },
    report: {
      report_id: formatReportId(input.birth_date),
      version: FULL_REPORT_V2_VERSION,
      theme_version: FULL_REPORT_V2_THEME_VERSION,
      generated_date: generated.generated_date,
      generated_time: generated.generated_time,
      generated_by: "1320 Soul Code System",
      type: "Sample Full Report",
    },
    calculation,
    modules: {
      s0: moduleSlot(content.s0Content, codes.s0Code),
      s1: moduleSlot(content.s1Content, codes.s1Code),
      s2: moduleSlot(content.s2Content, codes.s2Code),
      s3: moduleSlot(content.s3Content, codes.s3Code, {
        raw: codes.s3Raw,
        s3Code: codes.s3Code,
      }),
      s4: moduleSlot(content.s4Content, codes.s4Code),
      s5: moduleSlot(content.s5Content, codes.s5Code),
      s6: moduleSlot(content.s6Content, codes.s6Code),
      s7: moduleSlot(content.s7Content ?? null, codes.s7Code),
      s8: moduleSlot(content.s8Content ?? null, codes.s8Code),
      s9: moduleSlot(content.s9Content ?? null, codes.s9Code),
    },
    integrated_blueprint: {},
    integration_practice: { days: [] },
    ctas: {
      primary: "Book a Personal 1320 Reading",
      secondary: "Start My 7-Day Integration Practice",
      soft: "Return to My Report",
      optional: "Continue Reflection with Wisewave",
    },
  };
}
