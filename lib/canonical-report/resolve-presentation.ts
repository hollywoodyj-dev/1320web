import { resolveClosingPageContent } from "@/lib/full-report-v2/resolve-closing-page-content";
import { resolveDisclaimerPageContent } from "@/lib/full-report-v2/resolve-disclaimer-page-content";
import { resolveIntegratedPageContent } from "@/lib/full-report-v2/resolve-integrated-page-content";
import { resolveJournalPageContent } from "@/lib/full-report-v2/resolve-journal-page-content";
import { resolvePracticePageContent } from "@/lib/full-report-v2/resolve-practice-page-content";
import { resolveS0PageContent } from "@/lib/full-report-v2/resolve-s0-page-content";
import { resolveS1PageContent } from "@/lib/full-report-v2/resolve-s1-page-content";
import { resolveS2PageContent } from "@/lib/full-report-v2/resolve-s2-page-content";
import { resolveS3PageContent } from "@/lib/full-report-v2/resolve-s3-page-content";
import { resolveS4PageContent } from "@/lib/full-report-v2/resolve-s4-page-content";
import { resolveS5PageContent } from "@/lib/full-report-v2/resolve-s5-page-content";
import { resolveS6PageContent } from "@/lib/full-report-v2/resolve-s6-page-content";
import { resolveS7PageContent } from "@/lib/full-report-v2/resolve-s7-page-content";
import { resolveS8PageContent } from "@/lib/full-report-v2/resolve-s8-page-content";
import { resolveS9PageContent } from "@/lib/full-report-v2/resolve-s9-page-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";
import { collectSubstantiveStrings } from "@/lib/canonical-report/extract-substantive-text";
import type { CanonicalSectionId } from "@/lib/canonical-report/types";
import { resolveMobile7DayIntegrationPracticeOverviewContent } from "@/lib/mobile-report-v2/resolve-mobile-seven-day-integration-practice-overview-content";
import { resolveMobile7DayPracticeCardsContent } from "@/lib/mobile-report-v2/resolve-mobile-seven-day-practice-cards-content";
import { resolveMobileClosingReflectionContent } from "@/lib/mobile-report-v2/resolve-mobile-closing-reflection-content";
import { resolveMobileFinalDisclaimerContent } from "@/lib/mobile-report-v2/resolve-mobile-final-disclaimer-content";
import { resolveMobileDisclaimerContent } from "@/lib/mobile-report-v2/resolve-mobile-disclaimer-content";
import { resolveMobileIntegratedBlueprintOverviewContent } from "@/lib/mobile-report-v2/resolve-mobile-integrated-blueprint-overview-content";
import { resolveMobileIntegratedPatternActionContent } from "@/lib/mobile-report-v2/resolve-mobile-integrated-pattern-action-content";
import { resolveMobileReflectionJournalContent } from "@/lib/mobile-report-v2/resolve-mobile-reflection-journal-content";
import { resolveMobileS0RevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s0-reveal-content";
import { resolveMobileS0VoidGateIntegrationContent } from "@/lib/mobile-report-v2/resolve-mobile-s0-void-gate-integration-content";
import { resolveMobileS1EssenceContent } from "@/lib/mobile-report-v2/resolve-mobile-s1-essence-content";
import { resolveMobileS1RevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s1-reveal-content";
import { resolveMobileS2MirrorLessonContent } from "@/lib/mobile-report-v2/resolve-mobile-s2-mirror-lesson-content";
import { resolveMobileS2RevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s2-reveal-content";
import { resolveMobileS3ExpressionContent } from "@/lib/mobile-report-v2/resolve-mobile-s3-expression-content";
import { resolveMobileS3RevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s3-reveal-content";
import { resolveMobileS4ShadowLoopGrowthEdgeContent } from "@/lib/mobile-report-v2/resolve-mobile-s4-shadow-loop-growth-edge-content";
import { resolveMobileS4ShadowRevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s4-shadow-reveal-content";
import { resolveMobileS5MissionPathwayIconContent } from "@/lib/mobile-report-v2/resolve-mobile-s5-mission-pathway-icon-content";
import { resolveMobileS5SoulMissionRevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s5-soul-mission-reveal-content";
import { resolveMobileS6ReceivingPatternMapContent } from "@/lib/mobile-report-v2/resolve-mobile-s6-receiving-pattern-map-content";
import { resolveMobileS6ValueReceivingRevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s6-value-receiving-reveal-content";
import { resolveMobileS7SoulSovereigntyRevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s7-soul-sovereignty-reveal-content";
import { resolveMobileS7SovereigntyAlignmentMapContent } from "@/lib/mobile-report-v2/resolve-mobile-s7-sovereignty-alignment-map-content";
import { resolveMobileS8ContributionPathwayContent } from "@/lib/mobile-report-v2/resolve-mobile-s8-contribution-pathway-content";
import { resolveMobileS8SoulContributionRevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s8-soul-contribution-reveal-content";
import { resolveMobileS9ReturnPathwayRemembranceContent } from "@/lib/mobile-report-v2/resolve-mobile-s9-return-pathway-remembrance-content";
import { resolveMobileS9ReturnToSourceRevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s9-return-to-source-reveal-content";

type PresentationResolver = (payload: FullReportV2Payload) => unknown;

export type PresentationParitySection = {
  sectionId: CanonicalSectionId;
  desktopResolvers: PresentationResolver[];
  mobileResolvers: PresentationResolver[];
};

/** Resolver groups used for desktop/mobile substantive text parity checks. */
export const PRESENTATION_PARITY_SECTIONS: PresentationParitySection[] = [
  {
    sectionId: "s1",
    desktopResolvers: [resolveS1PageContent],
    mobileResolvers: [resolveMobileS1RevealContent, resolveMobileS1EssenceContent],
  },
  {
    sectionId: "s3",
    desktopResolvers: [resolveS3PageContent],
    mobileResolvers: [resolveMobileS3RevealContent, resolveMobileS3ExpressionContent],
  },
  {
    sectionId: "s2",
    desktopResolvers: [resolveS2PageContent],
    mobileResolvers: [resolveMobileS2RevealContent, resolveMobileS2MirrorLessonContent],
  },
  {
    sectionId: "s0",
    desktopResolvers: [resolveS0PageContent],
    mobileResolvers: [resolveMobileS0RevealContent, resolveMobileS0VoidGateIntegrationContent],
  },
  {
    sectionId: "integrated_blueprint",
    desktopResolvers: [resolveIntegratedPageContent],
    mobileResolvers: [
      resolveMobileIntegratedBlueprintOverviewContent,
      resolveMobileIntegratedPatternActionContent,
    ],
  },
  {
    sectionId: "s4",
    desktopResolvers: [resolveS4PageContent],
    mobileResolvers: [resolveMobileS4ShadowRevealContent, resolveMobileS4ShadowLoopGrowthEdgeContent],
  },
  {
    sectionId: "s5",
    desktopResolvers: [resolveS5PageContent],
    mobileResolvers: [resolveMobileS5SoulMissionRevealContent, resolveMobileS5MissionPathwayIconContent],
  },
  {
    sectionId: "s6",
    desktopResolvers: [resolveS6PageContent],
    mobileResolvers: [resolveMobileS6ValueReceivingRevealContent, resolveMobileS6ReceivingPatternMapContent],
  },
  {
    sectionId: "s7",
    desktopResolvers: [resolveS7PageContent],
    mobileResolvers: [resolveMobileS7SoulSovereigntyRevealContent, resolveMobileS7SovereigntyAlignmentMapContent],
  },
  {
    sectionId: "s8",
    desktopResolvers: [resolveS8PageContent],
    mobileResolvers: [resolveMobileS8SoulContributionRevealContent, resolveMobileS8ContributionPathwayContent],
  },
  {
    sectionId: "s9",
    desktopResolvers: [resolveS9PageContent],
    mobileResolvers: [resolveMobileS9ReturnToSourceRevealContent, resolveMobileS9ReturnPathwayRemembranceContent],
  },
  {
    sectionId: "practice",
    desktopResolvers: [resolvePracticePageContent],
    mobileResolvers: [
      resolveMobile7DayIntegrationPracticeOverviewContent,
      resolveMobile7DayPracticeCardsContent,
    ],
  },
  {
    sectionId: "journal",
    desktopResolvers: [resolveJournalPageContent],
    mobileResolvers: [resolveMobileReflectionJournalContent],
  },
  {
    sectionId: "closing",
    desktopResolvers: [resolveClosingPageContent],
    mobileResolvers: [resolveMobileClosingReflectionContent],
  },
  {
    sectionId: "disclaimer",
    desktopResolvers: [resolveDisclaimerPageContent],
    mobileResolvers: [resolveMobileDisclaimerContent, resolveMobileFinalDisclaimerContent],
  },
];

function resolvePresentationText(
  payload: FullReportV2Payload,
  side: "desktop" | "mobile",
): Map<CanonicalSectionId, Set<string>> {
  const out = new Map<CanonicalSectionId, Set<string>>();

  for (const section of PRESENTATION_PARITY_SECTIONS) {
    const strings = new Set<string>();
    const resolvers = side === "desktop" ? section.desktopResolvers : section.mobileResolvers;
    for (const resolver of resolvers) {
      const content = resolver(payload);
      for (const value of collectSubstantiveStrings(content)) {
        strings.add(value);
      }
    }
    out.set(section.sectionId, strings);
  }

  return out;
}

export function resolveDesktopPresentationText(payload: FullReportV2Payload): Map<CanonicalSectionId, Set<string>> {
  return resolvePresentationText(payload, "desktop");
}

export function resolveMobilePresentationText(payload: FullReportV2Payload): Map<CanonicalSectionId, Set<string>> {
  return resolvePresentationText(payload, "mobile");
}
