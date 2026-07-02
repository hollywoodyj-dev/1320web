"use client";

import { type ReactNode, useEffect, useMemo, useRef } from "react";
import { useMobilePageSwipe } from "@/components/mobile-report-v2/use-mobile-page-swipe";
import { MobilePage00Cover } from "@/components/mobile-report-v2/pages/mobile-page-00-cover";
import { MobilePage01Opening } from "@/components/mobile-report-v2/pages/mobile-page-01-opening";
import { MobilePage02Disclaimer } from "@/components/mobile-report-v2/pages/mobile-page-02-disclaimer";
import { MobilePage03Signature } from "@/components/mobile-report-v2/pages/mobile-page-03-signature";
import { MobilePage04CodeMap } from "@/components/mobile-report-v2/pages/mobile-page-04-code-map";
import { MobilePage05HowToRead } from "@/components/mobile-report-v2/pages/mobile-page-05-how-to-read";
import { MobilePage06S1Reveal } from "@/components/mobile-report-v2/pages/mobile-page-06-s1-reveal";
import { MobilePage07S1Essence } from "@/components/mobile-report-v2/pages/mobile-page-07-s1-essence";
import { MobilePage08S3Reveal } from "@/components/mobile-report-v2/pages/mobile-page-08-s3-reveal";
import { MobilePage09S3Expression } from "@/components/mobile-report-v2/pages/mobile-page-09-s3-expression";
import { MobilePage10S2Reveal } from "@/components/mobile-report-v2/pages/mobile-page-10-s2-reveal";
import { MobilePage11S2MirrorLesson } from "@/components/mobile-report-v2/pages/mobile-page-11-s2-mirror-lesson";
import { MobilePage12S0Reveal } from "@/components/mobile-report-v2/pages/mobile-page-12-s0-reveal";
import { MobilePage13S0VoidGateIntegration } from "@/components/mobile-report-v2/pages/mobile-page-13-s0-void-gate-integration";
import { MobilePage14IntegratedBlueprint } from "@/components/mobile-report-v2/pages/mobile-page-14-integrated-blueprint";
import { MobilePage15IntegratedPatternAction } from "@/components/mobile-report-v2/pages/mobile-page-15-integrated-pattern-action";
import { MobilePage16S4ShadowReveal } from "@/components/mobile-report-v2/pages/mobile-page-16-s4-shadow-reveal";
import { MobilePage17S4ShadowLoopGrowthEdge } from "@/components/mobile-report-v2/pages/mobile-page-17-s4-shadow-loop-growth-edge";
import { MobilePage18S5SoulMissionReveal } from "@/components/mobile-report-v2/pages/mobile-page-18-s5-soul-mission-reveal";
import { MobilePage19S5MissionPathwayIcon } from "@/components/mobile-report-v2/pages/mobile-page-19-s5-mission-pathway-icon";
import { MobilePage20S6ValueReceivingReveal } from "@/components/mobile-report-v2/pages/mobile-page-20-s6-value-receiving-reveal";
import { MobilePage21S6ReceivingPatternMap } from "@/components/mobile-report-v2/pages/mobile-page-21-s6-receiving-pattern-map";
import { MobilePage22S7SoulSovereigntyReveal } from "@/components/mobile-report-v2/pages/mobile-page-22-s7-soul-sovereignty-reveal";
import { MobilePage23S7SovereigntyAlignmentMap } from "@/components/mobile-report-v2/pages/mobile-page-23-s7-sovereignty-alignment-map";
import { MobilePage24S8SoulContributionReveal } from "@/components/mobile-report-v2/pages/mobile-page-24-s8-soul-contribution-reveal";
import { MobilePage25S8ContributionPathway } from "@/components/mobile-report-v2/pages/mobile-page-25-s8-contribution-pathway";
import { MobilePage26S9ReturnToSourceReveal } from "@/components/mobile-report-v2/pages/mobile-page-26-s9-return-to-source-reveal";
import { MobilePage27S9ReturnPathwayRemembrance } from "@/components/mobile-report-v2/pages/mobile-page-27-s9-return-pathway-remembrance";
import { MobilePage287DayIntegrationPracticeOverview } from "@/components/mobile-report-v2/pages/mobile-page-28-7-day-integration-practice-overview";
import { MobilePage297DayPracticeCards } from "@/components/mobile-report-v2/pages/mobile-page-29-7-day-practice-cards";
import { MobilePage30ReflectionJournal } from "@/components/mobile-report-v2/pages/mobile-page-30-reflection-journal";
import { MobilePage31ClosingReflection } from "@/components/mobile-report-v2/pages/mobile-page-31-closing-reflection";
import { MobilePage32FinalDisclaimer } from "@/components/mobile-report-v2/pages/mobile-page-32-final-disclaimer";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobileReportV2ViewerProps = {
  payload: FullReportV2Payload;
};

type MobilePageDef = {
  id: string;
  scrollable: boolean;
  render: () => ReactNode;
};

export function MobileReportV2Viewer({ payload }: MobileReportV2ViewerProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const pages = useMemo<MobilePageDef[]>(
    () => [
      {
        id: "mobile-page-00-cover",
        scrollable: false,
        render: () => <MobilePage00Cover payload={payload} />,
      },
      {
        id: "mobile-page-01-opening",
        scrollable: true,
        render: () => <MobilePage01Opening payload={payload} />,
      },
      {
        id: "mobile-page-02-disclaimer",
        scrollable: true,
        render: () => <MobilePage02Disclaimer payload={payload} />,
      },
      {
        id: "mobile-page-03-signature",
        scrollable: true,
        render: () => <MobilePage03Signature payload={payload} />,
      },
      {
        id: "mobile-page-04-code-map",
        scrollable: true,
        render: () => <MobilePage04CodeMap payload={payload} />,
      },
      {
        id: "mobile-page-05-how-to-read",
        scrollable: true,
        render: () => <MobilePage05HowToRead payload={payload} />,
      },
      {
        id: "mobile-page-06-s1-reveal",
        scrollable: true,
        render: () => <MobilePage06S1Reveal payload={payload} />,
      },
      {
        id: "mobile-page-07-s1-essence",
        scrollable: true,
        render: () => <MobilePage07S1Essence payload={payload} />,
      },
      {
        id: "mobile-page-08-s3-reveal",
        scrollable: true,
        render: () => <MobilePage08S3Reveal payload={payload} />,
      },
      {
        id: "mobile-page-09-s3-expression",
        scrollable: true,
        render: () => <MobilePage09S3Expression payload={payload} />,
      },
      {
        id: "mobile-page-10-s2-reveal",
        scrollable: true,
        render: () => <MobilePage10S2Reveal payload={payload} />,
      },
      {
        id: "mobile-page-11-s2-mirror-lesson",
        scrollable: true,
        render: () => <MobilePage11S2MirrorLesson payload={payload} />,
      },
      {
        id: "mobile-page-12-s0-reveal",
        scrollable: true,
        render: () => <MobilePage12S0Reveal payload={payload} />,
      },
      {
        id: "mobile-page-13-s0-void-gate-integration",
        scrollable: true,
        render: () => <MobilePage13S0VoidGateIntegration payload={payload} />,
      },
      {
        id: "mobile-page-14-integrated-blueprint",
        scrollable: true,
        render: () => <MobilePage14IntegratedBlueprint payload={payload} />,
      },
      {
        id: "mobile-page-15-integrated-pattern-action",
        scrollable: true,
        render: () => <MobilePage15IntegratedPatternAction payload={payload} />,
      },
      {
        id: "mobile-page-16-s4-shadow-reveal",
        scrollable: true,
        render: () => <MobilePage16S4ShadowReveal payload={payload} />,
      },
      {
        id: "mobile-page-17-s4-shadow-loop-growth-edge",
        scrollable: true,
        render: () => <MobilePage17S4ShadowLoopGrowthEdge payload={payload} />,
      },
      {
        id: "mobile-page-18-s5-soul-mission-reveal",
        scrollable: true,
        render: () => <MobilePage18S5SoulMissionReveal payload={payload} />,
      },
      {
        id: "mobile-page-19-s5-mission-pathway-icon",
        scrollable: true,
        render: () => <MobilePage19S5MissionPathwayIcon payload={payload} />,
      },
      {
        id: "mobile-page-20-s6-value-receiving-reveal",
        scrollable: true,
        render: () => <MobilePage20S6ValueReceivingReveal payload={payload} />,
      },
      {
        id: "mobile-page-21-s6-receiving-pattern-map",
        scrollable: true,
        render: () => <MobilePage21S6ReceivingPatternMap payload={payload} />,
      },
      {
        id: "mobile-page-22-s7-soul-sovereignty-reveal",
        scrollable: true,
        render: () => <MobilePage22S7SoulSovereigntyReveal payload={payload} />,
      },
      {
        id: "mobile-page-23-s7-sovereignty-alignment-map",
        scrollable: true,
        render: () => <MobilePage23S7SovereigntyAlignmentMap payload={payload} />,
      },
      {
        id: "mobile-page-24-s8-soul-contribution-reveal",
        scrollable: true,
        render: () => <MobilePage24S8SoulContributionReveal payload={payload} />,
      },
      {
        id: "mobile-page-25-s8-contribution-pathway",
        scrollable: true,
        render: () => <MobilePage25S8ContributionPathway payload={payload} />,
      },
      {
        id: "mobile-page-26-s9-return-to-source-reveal",
        scrollable: true,
        render: () => <MobilePage26S9ReturnToSourceReveal payload={payload} />,
      },
      {
        id: "mobile-page-27-s9-return-pathway-remembrance",
        scrollable: true,
        render: () => <MobilePage27S9ReturnPathwayRemembrance payload={payload} />,
      },
      {
        id: "mobile-page-28-7-day-integration-practice-overview",
        scrollable: true,
        render: () => <MobilePage287DayIntegrationPracticeOverview payload={payload} />,
      },
      {
        id: "mobile-page-29-7-day-practice-cards",
        scrollable: true,
        render: () => <MobilePage297DayPracticeCards payload={payload} />,
      },
      {
        id: "mobile-page-30-reflection-journal",
        scrollable: true,
        render: () => <MobilePage30ReflectionJournal payload={payload} />,
      },
      {
        id: "mobile-page-31-closing-reflection",
        scrollable: true,
        render: () => <MobilePage31ClosingReflection payload={payload} />,
      },
      {
        id: "mobile-page-32-final-disclaimer",
        scrollable: true,
        render: () => <MobilePage32FinalDisclaimer payload={payload} />,
      },
    ],
    [payload],
  );

  useMobilePageSwipe(trackRef, pages.length);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const STORAGE_KEY = "mr-v2-page-index";

    let pageIndex = 0;
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = Number.parseInt(stored, 10);
        if (Number.isFinite(parsed)) {
          pageIndex = Math.max(0, Math.min(pages.length - 1, parsed));
        }
      }
    } catch {
      /* sessionStorage unavailable — ignore */
    }

    const syncViewport = () => {
      const width = track.clientWidth;
      track.style.setProperty("--mr-v2-viewport", `${track.clientHeight}px`);
      if (width > 0) {
        track.scrollLeft = pageIndex * width;
      }
    };

    const onScroll = () => {
      const width = track.clientWidth;
      if (width <= 0) return;
      pageIndex = Math.round(track.scrollLeft / width);
      try {
        window.sessionStorage.setItem(STORAGE_KEY, String(pageIndex));
      } catch {
        /* sessionStorage unavailable — ignore */
      }
    };

    syncViewport();
    const resizeObserver = new ResizeObserver(syncViewport);
    resizeObserver.observe(track);
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      resizeObserver.disconnect();
      track.removeEventListener("scroll", onScroll);
    };
  }, [pages.length]);

  return (
    <div className="mobile-report-v2-root mobile-report-v2-root--cosmic-bg mobile-report-v2-root--starfield">
      <div
        ref={trackRef}
        className="mr-v2-page-track"
        aria-label="Mobile report pages"
        role="region"
      >
        {pages.map((page) => (
          <div key={page.id} id={page.id} className="mr-v2-page-panel">
            <div
              className={[
                "mr-v2-page-panel-inner",
                page.scrollable ? "mr-v2-page-panel-inner--scroll" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {page.render()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
