import { assembledS5FreeEssence } from "@/lib/assemble-s5-soul-mission";
import { pickLocalized } from "@/lib/getLocalized";
import type { Locale, SegmentContent } from "@/lib/types/1320-content";
import type { AssembledSoulMission } from "@/lib/types/s5-soul-mission";

const S5_LOCKED_EN =
  "The Full Soul Origin Report assembles your Soul Mission from four approved seeds — primary mission, mirror task, vibration carrier, and void challenge — not from random generation.";
const S5_LOCKED_ZH =
  "完整灵魂起源报告会从四个已批准种子组装灵魂使命——主使命、镜像任务、振动承载与空性考验——而非随机生成。";

export function adaptAssembledS5(mission: AssembledSoulMission): SegmentContent {
  const fullEn = [
    ...mission.sections.map((s) => `${pickLocalized(s.label, "en")}\n${pickLocalized(s.body, "en")}`),
    pickLocalized(mission.integratedSummary, "en"),
  ]
    .filter(Boolean)
    .join("\n\n");

  const fullZh = [
    ...mission.sections.map((s) => `${pickLocalized(s.label, "zh")}\n${pickLocalized(s.body, "zh")}`),
    pickLocalized(mission.integratedSummary, "zh"),
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    id: mission.signature,
    number: 0,
    title: { en: "Soul Mission", zh: "灵魂使命" },
    subtitle: { en: "Assembled Blueprint", zh: "组装蓝图" },
    shortLabel: { en: mission.signature, zh: mission.signature },
    segmentCode: mission.signature,
    freeEssence: {
      en: assembledS5FreeEssence(mission, "en"),
      zh: assembledS5FreeEssence(mission, "zh"),
    },
    lockedPreview: { en: S5_LOCKED_EN, zh: S5_LOCKED_ZH },
    fullEssence: { en: fullEn, zh: fullZh },
    guidance: mission.integratedSummary,
    soulMissionSections: mission.sections,
    assemblySignature: mission.signature,
    s5SeedVersion: mission.seedVersion,
  };
}
