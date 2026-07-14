import { ReportHero } from "@/components/report-system/ReportHero";
import { ReportInsightCard } from "@/components/report-system/ReportInsightCard";
import { ReportSegmentGrid } from "@/components/report-system/ReportSegmentGrid";
import type { CanonicalFullReport } from "@/lib/canonical-report/types";

type ReportDisclaimerPageProps = {
  data: CanonicalFullReport;
  variant?: "closing" | "disclaimer";
};

export function ReportDisclaimerPage({ data, variant = "disclaimer" }: ReportDisclaimerPageProps) {
  if (variant === "closing") {
    const closing = data.payload.closing_reflection;
    const reminders = [
      { title: closing?.reminder_1_title, body: closing?.reminder_1_copy },
      { title: closing?.reminder_2_title, body: closing?.reminder_2_copy },
      { title: closing?.reminder_3_title, body: closing?.reminder_3_copy },
    ].filter((item) => item.title && item.body) as Array<{ title: string; body: string }>;

    return (
      <>
        <ReportHero
          eyebrow="Closing Reflection"
          title={closing?.subtitle ?? "Integration Remembrance"}
          description={closing?.message ?? "Return to the awareness that was already within you."}
        />
        <ReportSegmentGrid>
          {reminders.map((item) => (
            <ReportInsightCard
              key={item.title}
              kicker="Closing"
              title={item.title}
              body={item.body}
            />
          ))}
        </ReportSegmentGrid>
      </>
    );
  }

  const disclaimer = data.payload.final_disclaimer;

  return (
    <>
      <ReportHero
        eyebrow="Final Disclaimer"
        title="Reflection, Not Instruction"
        description={disclaimer?.hero_note ?? "You remain the final authority of your life."}
      />
      <ReportSegmentGrid>
        {disclaimer?.remember_copy ? (
          <ReportInsightCard
            kicker="Remember"
            title="Your Mirror"
            body={disclaimer.remember_copy}
          />
        ) : null}
        {disclaimer?.thank_you_line ? (
          <ReportInsightCard
            kicker="Thank You"
            title="Closing Note"
            body={disclaimer.thank_you_line}
          />
        ) : null}
      </ReportSegmentGrid>
    </>
  );
}
