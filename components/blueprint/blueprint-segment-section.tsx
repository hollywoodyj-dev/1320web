import Link from "next/link";
import type { BlueprintSegmentBlock } from "@/lib/blueprint-content";
import { PILLAR_TONE } from "@/lib/pillar-tone";
import { getSegment, segmentAccentClass } from "@/lib/segments";
import { GENERATE_CODE_CTA } from "@/lib/site-nav";

type BlueprintSegmentSectionProps = {
  block: BlueprintSegmentBlock;
};

export function BlueprintSegmentSection({ block }: BlueprintSegmentSectionProps) {
  const segment = getSegment(block.segmentId);
  const tone = PILLAR_TONE[block.segmentId];

  return (
    <section
      id={segment.blueprintAnchor}
      className={`blueprint-segment inner-segment-card ${segmentAccentClass(segment.id)}`}
    >
      <header className={`pillar-card pillar-${tone} report-module-pillar-hero blueprint-segment-pillar`}>
        <p className="pillar-code">{segment.code}</p>
        <div className="pillar-card-body">
          <h2>{segment.title.en.toUpperCase()}</h2>
          <p className="pillar-headline">{segment.shortLabel.en}</p>
          <p className="report-module-pillar-archetype">{block.headline}</p>
        </div>
      </header>

      <div className="blueprint-segment-content">
        <p className="blueprint-segment-body">{block.body}</p>
        <h3 className="blueprint-segment-reveals-title">{block.revealsTitle}</h3>
        <ul className="blueprint-segment-list">
          {block.reveals.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link href={GENERATE_CODE_CTA.href} className="gold-button blueprint-segment-cta">
          {block.cta}
        </Link>
      </div>
    </section>
  );
}
