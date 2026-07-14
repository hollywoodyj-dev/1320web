import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import {
  MobileReportHero,
  MobileReportPracticeCard,
  MobileReportTipsPanel,
} from "@/components/mobile-report-v2/density";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import {
  resolvePracticeCardAccent,
  resolvePracticeCardSubtitle,
  resolvePracticeCardTitle,
} from "@/lib/mobile-report-v2/resolve-mobile-density-practice-card";
import { resolveMobile7DayIntegrationPracticeOverviewContent } from "@/lib/mobile-report-v2/resolve-mobile-seven-day-integration-practice-overview-content";
import { MOBILE_7DIP_TIPS, MOBILE_7DIP_TIPS_TITLE } from "@/lib/mobile-report-v2/seven-day-integration-practice-overview-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage287DayIntegrationPracticeOverviewProps = {
  payload: FullReportV2Payload;
};

export function MobilePage287DayIntegrationPracticeOverview({
  payload,
}: MobilePage287DayIntegrationPracticeOverviewProps) {
  const content = resolveMobile7DayIntegrationPracticeOverviewContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--7-day-integration-practice-overview mr-v2-screen--density-v1"
      id="mobile-page-28-7-day-integration-practice-overview"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-density-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <MobileReportHero
          eyebrow={content.kicker}
          title={
            <>
              {content.titleLine}
              <br />
              {content.titleEmphasis}
            </>
          }
          description={content.subtitle}
        />

        <section className="mr-density-practice-list" aria-label="7-Day Integration Practice">
          {content.days.map((day) => {
            const primaryIcon = day.moduleIcons[0];

            return (
              <MobileReportPracticeCard
                key={day.key}
                dayLabel={`Day ${day.day}`}
                title={resolvePracticeCardTitle(day)}
                subtitle={resolvePracticeCardSubtitle(day)}
                accent={resolvePracticeCardAccent(day)}
                icon={
                  primaryIcon ? (
                    <SignatureSegmentCardIcon
                      imageUrl={primaryIcon.imageUrl}
                      code={primaryIcon.code}
                      title={primaryIcon.title}
                      fallbackIcon={primaryIcon.fallbackIcon}
                      size={44}
                    />
                  ) : (
                    "✦"
                  )
                }
              />
            );
          })}
        </section>

        <MobileReportTipsPanel
          title={MOBILE_7DIP_TIPS_TITLE}
          tips={MOBILE_7DIP_TIPS.map((tip) => ({
            icon: tip.icon,
            lines: [...tip.lines],
          }))}
        />
      </section>
    </main>
  );
}
