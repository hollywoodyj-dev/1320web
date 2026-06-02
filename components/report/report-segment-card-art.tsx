import Image from "next/image";

type ReportSegmentCardArtProps = {
  codeLabel: string;
  archetype: string;
  imageUrl: string;
};

/**
 * Archetype card under segment titles. PNG black is removed via mix-blend-mode: screen
 * so the art sits on the pillar / node background.
 */
export function ReportSegmentCardArt({ codeLabel, archetype, imageUrl }: ReportSegmentCardArtProps) {
  return (
    <div className="report-segment-card-stage">
      <Image
        src={imageUrl}
        alt={`${codeLabel} — ${archetype}`}
        width={420}
        height={600}
        className="report-segment-card-img"
        sizes="(max-width: 900px) 88vw, 320px"
        priority={false}
      />
    </div>
  );
}
