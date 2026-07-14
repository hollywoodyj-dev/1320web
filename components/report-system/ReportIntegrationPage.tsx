import { ReportHero } from "@/components/report-system/ReportHero";
import { ReportInsightCard } from "@/components/report-system/ReportInsightCard";
import { ReportSegmentGrid } from "@/components/report-system/ReportSegmentGrid";
import type { CanonicalFullReport } from "@/lib/canonical-report/types";
import { REPORT_SEGMENT_NAMES, type ReportSegmentCode } from "@/lib/report-system/report-surface";

type ReportIntegrationPageProps = {
  segments: ReportSegmentCode[];
  data: CanonicalFullReport;
};

export function ReportIntegrationPage({ segments, data }: ReportIntegrationPageProps) {
  const blueprint = data.payload.integrated_blueprint;

  const cards = [
    {
      key: "core-essence",
      title: "Core Essence",
      body: blueprint.core_essence ?? "",
    },
    {
      key: "energy-expression",
      title: "Energy Expression",
      body: blueprint.energy_expression ?? "",
    },
    {
      key: "relationship-mirror",
      title: "Relationship Mirror",
      body: blueprint.relationship_mirror ?? "",
    },
    {
      key: "awakening-path",
      title: "Awakening Path",
      body: blueprint.awakening_path ?? "",
    },
  ].filter((card) => card.body.trim());

  return (
    <>
      <ReportHero
        eyebrow="Integrated Foundation"
        title="Four Layers · One Mirror"
        description={`Foundation order: ${segments.join(" → ")} — ${REPORT_SEGMENT_NAMES.S1}, ${REPORT_SEGMENT_NAMES.S3}, ${REPORT_SEGMENT_NAMES.S2}, and ${REPORT_SEGMENT_NAMES.S0} as one living blueprint.`}
      />
      <ReportSegmentGrid>
        {cards.map((card) => (
          <ReportInsightCard
            key={card.key}
            kicker="Integrated Foundation"
            title={card.title}
            body={card.body}
          />
        ))}
      </ReportSegmentGrid>
    </>
  );
}
