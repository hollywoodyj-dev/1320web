import { loadS5SeedBundle, S5_SEED_VERSION, strArraySeed, strSeed } from "@/lib/load-s5-seeds";
import type { Locale, LocalizedText } from "@/lib/types/1320-content";
import type { AssembledSoulMission, SoulMissionSection } from "@/lib/types/s5-soul-mission";
import { pickLocalized } from "@/lib/getLocalized";

type SectionDef = {
  id: string;
  label: LocalizedText;
  en: (seeds: ReturnType<typeof loadS5SeedBundle>) => string;
  zh: (seeds: ReturnType<typeof loadS5SeedBundle>) => string;
};

/** Fixed S5 template slots — seed text only, no AI invention. */
const S5_SECTION_DEFS: SectionDef[] = [
  {
    id: "S5-1",
    label: { en: "Primary Mission", zh: "主使命" },
    en: (s) => strSeed(s.s1, "missionSeedEN"),
    zh: (s) => strSeed(s.s1, "missionSeedZH"),
  },
  {
    id: "S5-1-shadow",
    label: { en: "Mission Shadow", zh: "使命阴影" },
    en: (s) => strSeed(s.s1, "missionShadowEN"),
    zh: (s) => strSeed(s.s1, "missionShadowZH"),
  },
  {
    id: "S5-1-action",
    label: { en: "Mission Practice", zh: "使命实践" },
    en: (s) => strSeed(s.s1, "missionActionEN"),
    zh: (s) => strSeed(s.s1, "missionActionZH"),
  },
  {
    id: "S5-2",
    label: { en: "Mirror Task", zh: "镜像任务" },
    en: (s) => strSeed(s.s2, "mirrorTaskSeedEN"),
    zh: (s) => strSeed(s.s2, "mirrorTaskSeedZH"),
  },
  {
    id: "S5-2-shadow",
    label: { en: "Mirror Loop", zh: "镜像循环" },
    en: (s) => strSeed(s.s2, "mirrorShadowEN"),
    zh: (s) => strSeed(s.s2, "mirrorShadowZH"),
  },
  {
    id: "S5-2-action",
    label: { en: "Healing Path", zh: "疗愈路径" },
    en: (s) => strSeed(s.s2, "healingActionEN"),
    zh: (s) => strSeed(s.s2, "healingActionZH"),
  },
  {
    id: "S5-3",
    label: { en: "Vibration Carrier", zh: "振动承载" },
    en: (s) => strSeed(s.s3, "carrierSeedEN"),
    zh: (s) => strSeed(s.s3, "carrierSeedZH"),
  },
  {
    id: "S5-3-ground",
    label: { en: "Grounding Action", zh: "落地行动" },
    en: (s) => strSeed(s.s3, "groundingActionEN"),
    zh: (s) => strSeed(s.s3, "groundingActionZH"),
  },
  {
    id: "S5-4",
    label: { en: "Void Challenge", zh: "空性考验" },
    en: (s) => strSeed(s.s0, "voidChallengeSeedEN"),
    zh: (s) => strSeed(s.s0, "voidChallengeSeedZH"),
  },
  {
    id: "S5-4-gate",
    label: { en: "Breakthrough Gate", zh: "突破之门" },
    en: (s) => strSeed(s.s0, "breakthroughGateEN"),
    zh: (s) => strSeed(s.s0, "breakthroughGateZH"),
  },
  {
    id: "S5-4-return",
    label: { en: "Return Practice", zh: "回归练习" },
    en: (s) => strSeed(s.s0, "returnPracticeEN"),
    zh: (s) => strSeed(s.s0, "returnPracticeZH"),
  },
];

function buildIntegrationSummary(
  seeds: ReturnType<typeof loadS5SeedBundle>,
  signature: string,
  locale: Locale,
): string {
  const parts =
    locale === "zh"
      ? [
          `灵魂使命签名：${signature}。`,
          strSeed(seeds.s1, "missionActionZH"),
          strSeed(seeds.s2, "healingActionZH"),
          strSeed(seeds.s3, "groundingActionZH"),
          strSeed(seeds.s0, "returnPracticeZH"),
        ]
      : [
          `Soul mission signature: ${signature}.`,
          strSeed(seeds.s1, "missionActionEN"),
          strSeed(seeds.s2, "healingActionEN"),
          strSeed(seeds.s3, "groundingActionEN"),
          strSeed(seeds.s0, "returnPracticeEN"),
        ];

  return parts.filter(Boolean).join("\n\n");
}

function buildSections(seeds: ReturnType<typeof loadS5SeedBundle>): SoulMissionSection[] {
  const sections: SoulMissionSection[] = [];

  for (const def of S5_SECTION_DEFS) {
    const en = def.en(seeds);
    const zh = def.zh(seeds);
    if (!en && !zh) continue;
    sections.push({
      id: def.id,
      label: def.label,
      body: { en, zh: zh || en },
    });
  }

  const keywordsEn = strArraySeed(seeds.s1, "missionKeywordsEN");
  const keywordsZh = strArraySeed(seeds.s1, "missionKeywordsZH");
  if (keywordsEn.length || keywordsZh.length) {
    sections.splice(1, 0, {
      id: "S5-1-keywords",
      label: { en: "Mission Keywords", zh: "使命关键词" },
      body: {
        en: keywordsEn.join(" · "),
        zh: keywordsZh.length ? keywordsZh.join(" · ") : keywordsEn.join(" · "),
      },
    });
  }

  return sections;
}

export function assembleS5SoulMission(input: {
  s1Code: string;
  s2Code: string;
  s3Code: string;
  s0Code: string;
  combinationSignature: string;
}): AssembledSoulMission {
  const seeds = loadS5SeedBundle(input);
  const signature = input.combinationSignature;
  const sections = buildSections(seeds);

  return {
    signature,
    seedVersion: S5_SEED_VERSION,
    sections,
    integratedSummary: {
      en: buildIntegrationSummary(seeds, signature, "en"),
      zh: buildIntegrationSummary(seeds, signature, "zh"),
    },
  };
}

export function assembledS5FreeEssence(
  mission: AssembledSoulMission,
  locale: Locale,
): string {
  const primary = mission.sections.find((s) => s.id === "S5-1");
  return primary ? pickLocalized(primary.body, locale) : pickLocalized(mission.integratedSummary, locale);
}
