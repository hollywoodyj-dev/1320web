import Image from "next/image";
import type { FullReportScreenPayload } from "@/lib/full-report/build-full-report-payload";
import type { ReportBackgroundVariant } from "@/lib/full-report/backgrounds";
import { fullReportBackgroundSrc } from "@/lib/full-report/backgrounds";
import { contentZoneClass } from "@/lib/full-report/content-zones";
import { FullReportScreenContent } from "@/components/full-report/full-report-screen-content";

type FullReportScreenProps = {
  payload: FullReportScreenPayload;
  index: number;
  backgroundVariant?: ReportBackgroundVariant;
  /** When true, page fills flip stage (desktop). */
  active?: boolean;
};

export function FullReportScreen({
  payload,
  index,
  backgroundVariant = "desktop",
  active = true,
}: FullReportScreenProps) {
  const { screen, blocks } = payload;
  const src = fullReportBackgroundSrc(screen.background, backgroundVariant);
  const priority = index < 2;
  const hasContent = blocks.length > 0;
  const zoneClass = contentZoneClass(screen.layout, screen.id);

  return (
    <section
      id={`fr-screen-${screen.id}`}
      className={`fr-screen fr-screen--${screen.layout} fr-screen--ar-${screen.aspectRatio.replace("/", "-")}${active ? " fr-screen--active" : ""}${hasContent ? " fr-screen--has-content" : ""}`}
      data-screen-index={index + 1}
      data-art-page={screen.artPage}
      aria-label={screen.title}
      aria-hidden={!active}
    >
      <div className="fr-screen-frame">
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="fr-screen-bg"
          aria-hidden
        />
        {hasContent ? (
          <div className={`fr-screen-overlay ${zoneClass}`}>
            <FullReportScreenContent payload={payload} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
