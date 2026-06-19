"use client";

import {
  CalculationRow,
  CodeCard,
  CTAButton,
  DisclaimerBox,
  GlassPanel,
  GuidanceBox,
  InsightCard,
  JournalPrompt,
  ModuleBadge,
  ModuleWheel,
  PageFooter,
  PageHeader,
  PracticeDayCard,
  ProgressRail,
  QuoteBlock,
  ReflectionBox,
  ReportPage,
} from "@/components/full-report-v2";
import {
  buildSampleFullReportV2Payload,
  CANONICAL_SAMPLE_BIRTH_DATE,
} from "@/lib/full-report-v2/build-sample-payload";

export function FullReportV2Phase1Gallery() {
  const payload = buildSampleFullReportV2Payload({
    name: "Phase 1 Preview",
    birth_date: CANONICAL_SAMPLE_BIRTH_DATE,
    birth_date_display: "May 22, 1980",
  });

  const sig = payload.calculation.combination_signature;

  return (
    <div
      className="full-report-v2-root full-report-v2-root--cosmic-bg full-report-v2-root--starfield full-report-v2-root--frame"
      style={{ position: "relative", minHeight: "100vh", padding: "24px 0 48px" }}
    >
      <div className="fr-v2-cosmic-lines" />

      <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 24px" }}>
        <h1
          className="fr-v2-serif"
          style={{
            textAlign: "center",
            color: "var(--fr-v2-gold-bright)",
            fontSize: 28,
            letterSpacing: "0.12em",
            marginBottom: 8,
          }}
        >
          Full Report v2 — Phase 1 Foundation
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "var(--fr-v2-text-soft)",
            marginBottom: 32,
            fontSize: 14,
          }}
        >
          Theme · components · sample payload ({CANONICAL_SAMPLE_BIRTH_DATE})
        </p>

        <ProgressRail activeIndex={1} />

        <div style={{ marginTop: 32, display: "grid", gap: 32 }}>
          <ReportPage sectionId="phase1-header-demo" fluid>
            <div className="fr-v2-page-shell" style={{ gridTemplateRows: "auto" }}>
              <PageHeader pageIndex={1} />
            </div>
          </ReportPage>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            <GlassPanel style={{ padding: 20 }}>
              <ModuleBadge
                moduleCode="S1"
                moduleName="Soul Origin"
                codeTitle={`${payload.calculation.s1.code} · ${payload.calculation.s1.title}`}
              />
            </GlassPanel>
            <CodeCard
              label="Core Signature Preview"
              code={sig.replace(/\|/g, " | ")}
              subtitle={`Report ID: ${payload.report.report_id}`}
            />
            <InsightCard title="Insight Card">
              Symbolic mirror — not prediction. Sample module titles from database lookup.
            </InsightCard>
          </div>

          <ReflectionBox>Where am I still mistaking pain for transformation?</ReflectionBox>
          <GuidanceBox>
            You are not here to suffer. You are here to refine your frequency.
          </GuidanceBox>
          <DisclaimerBox>
            <strong>Disclaimer:</strong> This report is a symbolic self-reflection tool. It is not
            medical, psychological, financial, legal, or predictive advice.
          </DisclaimerBox>

          <GlassPanel style={{ padding: 24 }}>
            <div className="fr-v2-small-panel-title" style={{ marginBottom: 16, textAlign: "center", color: "var(--fr-v2-gold-bright)", fontSize: 13, letterSpacing: "0.2em" }}>
              Calculation Trace
            </div>
            <CalculationRow
              label="S1 Soul Origin"
              formula={payload.calculation.s1.formula}
              value={`${payload.calculation.s1.code} (${payload.calculation.s1.raw})`}
            />
            <CalculationRow
              label="S3 Raw"
              formula={payload.calculation.s3.formula}
              value={String(payload.calculation.s3.raw)}
            />
            <CalculationRow
              label="S3 Mapped"
              value={`${payload.calculation.s3.code} · ${payload.calculation.s3.title}`}
            />
            <CalculationRow
              label="Combination"
              value={sig}
            />
          </GlassPanel>

          <QuoteBlock>Your code is a mirror — not a sentence.</QuoteBlock>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <CTAButton href="/full-report">{payload.ctas.primary}</CTAButton>
            <CTAButton variant="soft">{payload.ctas.soft}</CTAButton>
          </div>

          <JournalPrompt prompt="What resonated most in this report?" />
          <PracticeDayCard
            day={1}
            theme="Observe the Pattern"
            practice="Notice one recurring pattern without judging it."
            reflection="What pattern am I ready to observe?"
          />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <ModuleWheel />
          </div>

          <PageFooter
            items={[
              {
                icon: "◇",
                content: (
                  <>
                    Use this report as a <strong>mirror for awareness</strong>, not as a fixed
                    identity.
                  </>
                ),
              },
              {
                icon: "✦",
                content: "You are more than any pattern.",
              },
              {
                icon: "♡",
                content: "Thank you for choosing self-awareness.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
