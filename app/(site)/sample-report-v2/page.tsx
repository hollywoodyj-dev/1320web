import type { Metadata } from "next";
import { FullReportViewer } from "@/components/full-report/full-report-viewer";
import { buildFullReportV2TestPayload } from "@/lib/full-report/build-full-report-v2-test-payload";
import { get1320Content } from "@/lib/get1320Content";
import { SAMPLE_REPORT_META } from "@/lib/report/report-static-content";
import { calculate1320Code } from "@/lib/calculate1320Code";

const V2_TEST_META = {
  title: "Full Report v2 Content Test",
  description:
    "Minimal full-report screens for S7 v2 database lookup and layout smoke. Placeholder art; not the production 37-page report.",
  fictionBanner:
    "v2 content test — fictional birth date July 14, 1988. S7 from v2 database; S8 divider preview only.",
};

export const metadata: Metadata = {
  title: V2_TEST_META.title,
  description: V2_TEST_META.description,
};

/** Same sample date as `/sample-report`; S7 code uses v2 calc (S4/S6 inputs). */
export default function SampleReportV2Page() {
  const sample = calculate1320Code(1988, 7, 14);

  const content = get1320Content(
    {
      s1: sample.s1,
      s3: sample.s3Raw,
      s2: sample.s2,
      s0: sample.s0,
      locale: "en",
    },
    { birthDate: SAMPLE_REPORT_META.birthDate, reportTier: "full" },
  );

  const screenPayloads = buildFullReportV2TestPayload(SAMPLE_REPORT_META.birthDate);

  return (
    <div className="full-report-page">
      <FullReportViewer
        content={content}
        screenPayloads={screenPayloads}
        options={{
          birthDate: SAMPLE_REPORT_META.birthDate,
          preparedFor: "v2 Test Reader",
          fictionBanner: V2_TEST_META.fictionBanner,
        }}
        analyticsEvent="sample_report_view"
      />
    </div>
  );
}
