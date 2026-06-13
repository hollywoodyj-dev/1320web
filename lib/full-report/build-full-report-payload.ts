import { generateIntegrationPractices } from "@/lib/generate-integration-practices";
import { buildSynthesisLayerInput } from "@/lib/build-synthesis-input";
import { pickLocalized } from "@/lib/getLocalized";
import { getSegment } from "@/lib/segments";
import type { Get1320ContentResult, Locale, SegmentContent } from "@/lib/types/1320-content";
import type { IntegratedSoulBlueprint } from "@/lib/types/integrated-soul-blueprint";
import type { SoulMissionSection } from "@/lib/types/s5-soul-mission";
import {
  CLOSING_ATTRIBUTION,
  CLOSING_COPY,
  FULL_REPORT_COVER,
  GENERAL_DISCLAIMER,
  HOW_TO_READ_COPY,
  REPORT_CONFIDENCE_COPY,
  S6_VALUE_DISCLAIMER,
} from "@/lib/full-report/full-report-static";
import {
  formatBirthDateLabel,
  formatCodeStrip,
  formatS3RawLine,
} from "@/lib/full-report/format-display";
import { FULL_REPORT_ATTRIBUTION, FULL_REPORT_SCREENS, type FullReportScreenDef } from "@/lib/full-report/screen-manifest";

export type FullReportBlock =
  | {
      type: "text";
      variant: "eyebrow" | "title" | "subtitle" | "body" | "code" | "disclaimer" | "guidance" | "label";
      text: string;
    }
  | { type: "bullets"; label?: string; items: string[] }
  | { type: "chips"; items: string[] }
  | { type: "fields"; items: { label: string; value: string; items?: string[] }[] }
  | {
      type: "dashboard";
      cards: { code: string; title: string; meaning: string; meta?: string }[];
      sealCode: string;
    }
  | { type: "practice-days"; days: { day: string; title: string; practice: string }[] }
  | {
      type: "cta";
      primary: { label: string; href: string };
      secondary: { label: string; href: string };
      utility?: { label: string; href: string };
    };

export type FullReportScreenPayload = {
  screen: FullReportScreenDef;
  blocks: FullReportBlock[];
};

export type FullReportBuildOptions = {
  birthDate?: string;
  preparedFor?: string;
  fictionBanner?: string;
  reportId?: string;
};

function lt(seg: SegmentContent, field: keyof SegmentContent, locale: Locale): string {
  const value = seg[field];
  if (!value || typeof value !== "object" || !("en" in value)) return "";
  return pickLocalized(value as { en: string; zh?: string }, locale);
}

function listLt(items: LocalizedText[] | undefined, locale: Locale): string[] {
  return items?.map((item) => pickLocalized(item, locale)).filter(Boolean) ?? [];
}

type LocalizedText = { en: string; zh?: string };

function field(label: string, value: string, items?: string[]) {
  if (!value.trim() && !items?.length) return null;
  return { label, value, items };
}

function fieldsBlock(...items: ({ label: string; value: string; items?: string[] } | null)[]): FullReportBlock {
  return { type: "fields", items: items.filter((f): f is NonNullable<typeof f> => Boolean(f)) };
}

function bullets(label: string | undefined, items: string[]): FullReportBlock | null {
  if (!items.length) return null;
  return { type: "bullets", label, items };
}

/** Section header — title on line 1, SXX code on line 2 (pages 6–7 style). */
function sectionHeaderBlocks(title: string, code?: string): FullReportBlock[] {
  const blocks: FullReportBlock[] = [{ type: "text", variant: "title", text: title }];
  if (code?.trim()) {
    blocks.push({ type: "text", variant: "subtitle", text: code });
  }
  return blocks;
}

function s5Sections(sections: SoulMissionSection[] | undefined, ids: string[], locale: Locale) {
  return ids
    .map((id) => sections?.find((s) => s.id === id))
    .filter((s): s is SoulMissionSection => Boolean(s))
    .map((s) => field(pickLocalized(s.label, locale), pickLocalized(s.body, locale)))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));
}

function buildSevenDays(
  content: Get1320ContentResult,
  blueprint: IntegratedSoulBlueprint | null,
  locale: Locale,
) {
  const synthesisInput = buildSynthesisLayerInput(
    content,
    { s1: null, s3: null, s2: null, s0: null },
    { birthDate: undefined, locale },
  );
  const practices = generateIntegrationPractices(synthesisInput, locale);
  const prompts = blueprint?.reflectionQuestions?.length
    ? blueprint.reflectionQuestions
    : [
        "What part of this report feels most true?",
        "What part feels uncomfortable or resistant?",
        "What is one small action I can take from awareness?",
      ];

  const snippets = [
    blueprint?.coreEssenceSummary,
    blueprint?.energyExpressionSummary,
    blueprint?.relationshipMirrorSummary,
    blueprint?.awakeningPathSummary,
    blueprint?.embodimentPractice,
    blueprint?.mainInnerConflict,
    blueprint?.integratedSummary,
  ].filter(Boolean) as string[];

  return Array.from({ length: 7 }, (_, i) => {
    const practice = practices[i % practices.length];
    const snippet = snippets[i] ?? practice.body;
    return {
      day: `Day ${i + 1}`,
      title: i < practices.length ? practice.title : `Integration ${i + 1}`,
      practice: snippet,
      reflection: prompts[i % prompts.length],
    };
  });
}

function screenPayload(screen: FullReportScreenDef, blocks: FullReportBlock[]): FullReportScreenPayload {
  return { screen, blocks: blocks.filter(Boolean) };
}

export function buildFullReportPayload(
  content: Get1320ContentResult,
  options: FullReportBuildOptions = {},
): FullReportScreenPayload[] {
  const locale = content.locale;
  const { codes } = content;
  const s1 = content.s1Content;
  const s2 = content.s2Content;
  const s3 = content.s3Content;
  const s0 = content.s0Content;
  const s4 = content.s4Content;
  const s5 = content.s5Content;
  const s6 = content.s6Content;
  const bp = content.integratedSoulBlueprint;
  const birthLabel = options.birthDate ? formatBirthDateLabel(options.birthDate) : undefined;
  const preparedFor = options.preparedFor ?? "You";
  const sevenDays = buildSevenDays(content, bp, locale);

  const dashboardCards = (["s1", "s3", "s2", "s0"] as const).map((id) => {
    const meta = getSegment(id);
    const seg = content[`${id}Content`];
    const code =
      id === "s1"
        ? codes.s1Code
        : id === "s3"
          ? codes.s3Code
          : id === "s2"
            ? codes.s2Code
            : codes.s0Code;
    return {
      code,
      title: pickLocalized(meta.title, locale),
      meaning: pickLocalized(meta.shortLabel, locale),
      meta: id === "s3" ? formatS3RawLine(codes) : undefined,
    };
  });

  const archetypeKeywords = listLt(s1.soulTraits, locale).slice(0, 3);
  if (archetypeKeywords.length < 3) {
    archetypeKeywords.push(...listLt(s1.coreGifts, locale).slice(0, 3 - archetypeKeywords.length));
  }

  const byId: Record<string, FullReportBlock[]> = {
    cover: [
      { type: "text", variant: "eyebrow", text: FULL_REPORT_COVER.productTitle },
      { type: "text", variant: "title", text: FULL_REPORT_COVER.edition },
      { type: "text", variant: "label", text: FULL_REPORT_ATTRIBUTION },
      { type: "text", variant: "subtitle", text: `Prepared for ${preparedFor}` },
      ...(birthLabel ? [{ type: "text" as const, variant: "subtitle" as const, text: `Birth Date: ${birthLabel}` }] : []),
      { type: "text", variant: "code", text: formatCodeStrip(codes) },
    ],
    dashboard: [
      {
        type: "dashboard",
        cards: dashboardCards,
        sealCode: formatCodeStrip(codes),
      },
    ],
    "how-to-read": [
      {
        type: "text",
        variant: "body",
        text: `This report is designed for reflection, not prediction.\n\nRead it slowly. Notice what resonates, what challenges you, and what brings a sense of recognition.`,
      },
      {
        type: "text",
        variant: "body",
        text: `You do not need to agree with every sentence. Let this report become a mirror for self-awareness, not a fixed identity.\n\nYour code is not a sentence. It is a field of reflection, choice, and integration.`,
      },
      {
        type: "text",
        variant: "guidance",
        text: `The 1320 system does not claim objective certainty.\n\nInstead, it offers symbolic patterns intended to support reflection, awareness, and personal integration.\n\nThe value of this report comes not from prediction, but from recognition.`,
      },
      {
        type: "text",
        variant: "disclaimer",
        text: `If something feels true, let it become a mirror.\nIf something does not resonate, let it remain open.\nYou remain the authority of your own path.\n\nThis report is a symbolic self-reflection tool. It is not medical, psychological, financial, legal, or predictive advice.`,
      },
    ],
    "soul-archetype": [
      { type: "text", variant: "eyebrow", text: "Your Soul Archetype" },
      { type: "text", variant: "title", text: pickLocalized(s1.title, locale) },
      { type: "text", variant: "subtitle", text: codes.s1Code },
      { type: "text", variant: "body", text: pickLocalized(s1.fullEssence ?? s1.freeEssence, locale) },
      ...(archetypeKeywords.length ? [{ type: "chips" as const, items: archetypeKeywords.slice(0, 3) }] : []),
      {
        type: "text",
        variant: "guidance",
        text: pickLocalized(content.segmentReflections.s1, locale),
      },
    ],
    "s1-divider": [],
    "s1-content": [
      { type: "text", variant: "title", text: "Soul Frequency S1" },
      { type: "text", variant: "subtitle", text: codes.s1Code },
      fieldsBlock(
        field("Overview", pickLocalized(s1.fullEssence ?? s1.freeEssence, locale)),
        field("Soul Traits", "", listLt(s1.soulTraits, locale)),
        field("Core Gifts", "", listLt(s1.coreGifts, locale)),
      ),
    ],
    "s1-overflow": [
      { type: "text", variant: "title", text: "Soul Frequency S1" },
      { type: "text", variant: "subtitle", text: codes.s1Code },
      fieldsBlock(
        field("Shadow Pattern", "", listLt(s1.shadowPatterns, locale)),
        field("Soul Lesson", lt(s1, "lesson", locale)),
        field("Direction", "", listLt(s1.direction, locale)),
        field("Integration Guidance", lt(s1, "guidance", locale)),
      ),
    ],
    "s3-divider": [],
    "s3-content": [
      ...sectionHeaderBlocks("S3 Overview", codes.s3Code),
      fieldsBlock(
        field("Energy Expression", pickLocalized(s3.fullEssence ?? s3.freeEssence, locale)),
        field("Core Strengths", lt(s3, "expressionPattern", locale)),
        field("Growth Edge", lt(s3, "growthEdge", locale)),
        field("Alignment", lt(s3, "guidance", locale) || lt(s3, "integrationPrompt", locale)),
        field("Reflection", pickLocalized(content.segmentReflections.s3, locale)),
      ),
    ],
    "s2-divider": [],
    "s2-content": [
      ...sectionHeaderBlocks("S2 Overview", codes.s2Code),
      fieldsBlock(
        field("Overview", pickLocalized(s2.fullEssence ?? s2.freeEssence, locale)),
        field("Relationship Dynamic", lt(s2, "relationshipPattern", locale)),
      ),
    ],
    "s2-gifts": [
      ...sectionHeaderBlocks("S2 Relationship Gifts", codes.s2Code),
      fieldsBlock(
        field("Relationship Gifts", lt(s2, "integrationPrompt", locale)),
        field("Relational Strengths", pickLocalized(s2.fullEssence ?? s2.freeEssence, locale)),
      ),
    ],
    "s2-lessons": [
      ...sectionHeaderBlocks("S2 Relationship Lessons", codes.s2Code),
      fieldsBlock(
        field("Relationship Trigger Pattern", lt(s2, "relationshipPattern", locale)),
        field("Karmic Loop", lt(s2, "karmicLoop", locale)),
        field("Mirror Lesson", lt(s2, "mirrorLesson", locale)),
      ),
    ],
    "s2-alignment": [
      ...sectionHeaderBlocks("S2 Relationship Alignment", codes.s2Code),
      fieldsBlock(
        field("Healing Path", lt(s2, "integrationPrompt", locale)),
        field("Integration Guidance", lt(s2, "guidance", locale)),
        field("Reflection", pickLocalized(content.segmentReflections.s2, locale)),
      ),
    ],
    "s0-divider": [],
    "s0-overview": [
      ...sectionHeaderBlocks("S0 Overview", codes.s0Code),
      fieldsBlock(
        field("Overview", pickLocalized(s0.freeEssence, locale)),
        field("Core Illusion", lt(s0, "coreIllusion", locale)),
        field("Void Power", lt(s0, "voidPower", locale)),
      ),
    ],
    "s0-shadow": [
      ...sectionHeaderBlocks("S0 Shadow Pattern", codes.s0Code),
      fieldsBlock(
        field("Core Illusion Mechanism", lt(s0, "voidChallenge", locale) || lt(s0, "coreIllusion", locale)),
        field("Shadow Pattern", lt(s0, "voidChallenge", locale)),
      ),
    ],
    "s0-healing": [
      ...sectionHeaderBlocks("S0 Healing Path", codes.s0Code),
      fieldsBlock(
        field("Path of Return", lt(s0, "awakeningPath", locale)),
        field("Void Power", lt(s0, "voidPower", locale)),
        field("Integration Guidance", lt(s0, "guidance", locale)),
        field("Reflection", pickLocalized(content.segmentReflections.s0, locale)),
      ),
    ],
    "s4-divider": [],
    "s4-content": s4
      ? [
          ...sectionHeaderBlocks(pickLocalized(s4.title, locale), s4.segmentCode),
          fieldsBlock(
            field("Essence", pickLocalized(s4.fullEssence ?? s4.freeEssence, locale)),
            field("Core Pattern", "", listLt(s4.shadowPatterns, locale)),
            field("Integration", lt(s4, "lesson", locale)),
            field("Guidance", lt(s4, "guidance", locale)),
          ),
        ]
      : [{ type: "text", variant: "body", text: "Core Shadow Pattern content is unavailable for this code." }],
    "integrated-divider": [],
    "integrated-overview": bp
      ? [
          ...sectionHeaderBlocks(pickLocalized(content.freeResultCopy.integratedTitle, locale)),
          { type: "text", variant: "body", text: bp.integratedSummary },
          fieldsBlock(
            field("Core Essence", bp.coreEssenceSummary),
            field("Energy Expression", bp.energyExpressionSummary),
            field("Relationship Mirror", bp.relationshipMirrorSummary),
            field("Awakening Path", bp.awakeningPathSummary),
          ),
        ]
      : [],
    "integrated-pattern": bp
      ? [
          ...sectionHeaderBlocks("Pattern in Action"),
          fieldsBlock(
            field("Main Inner Conflict", bp.mainInnerConflict),
            field("Integration Theme", bp.integrationTheme ?? ""),
            field("Embodiment Practice", bp.embodimentPractice),
          ),
          ...(bullets("Reflection Questions", bp.reflectionQuestions ?? [])
            ? [bullets("Reflection Questions", bp.reflectionQuestions ?? [])!]
            : []),
        ]
      : [],
    "s5-divider": [],
    "s5-overview": [
      ...sectionHeaderBlocks("S5 Mission Overview", s5?.segmentCode),
      ...(content.s5AssemblyError
        ? [{ type: "text" as const, variant: "body" as const, text: content.s5AssemblyError }]
        : []),
      fieldsBlock(
        ...s5Sections(s5?.soulMissionSections, ["S5-1", "S5-1-keywords", "S5-2", "S5-3", "S5-4"], locale),
      ),
    ],
    "s5-roadmap": [
      ...sectionHeaderBlocks("S5 Mission Roadmap", s5?.segmentCode),
      fieldsBlock(
        ...s5Sections(
          s5?.soulMissionSections,
          ["S5-1-action", "S5-2-action", "S5-3-ground", "S5-4-gate"],
          locale,
        ),
      ),
    ],
    "s5-guidance": [
      ...sectionHeaderBlocks("S5 Mission Guidance", s5?.segmentCode),
      fieldsBlock(
        ...s5Sections(s5?.soulMissionSections, ["S5-1-shadow", "S5-2-shadow", "S5-4-return"], locale),
        field(
          "Integrated Mission",
          s5 ? pickLocalized(s5.guidance ?? s5.fullEssence ?? s5.freeEssence, locale) : "",
        ),
      ),
    ],
    "s6-divider": [],
    "s6-overview": s6
      ? [
          { type: "text", variant: "title", text: "Value & Receiving Frequency" },
          { type: "text", variant: "subtitle", text: pickLocalized(s6.title, locale) },
          { type: "text", variant: "code", text: s6.segmentCode ?? "" },
          { type: "text", variant: "disclaimer", text: S6_VALUE_DISCLAIMER },
          fieldsBlock(
            field("Core Frequency", pickLocalized(s6.fullEssence ?? s6.freeEssence, locale)),
            field("Soul–Wealth Relationship", lt(s6, "expressionPattern", locale)),
          ),
        ]
      : [],
    "s6-alignment": s6
      ? [
          ...sectionHeaderBlocks("S6 Gifts · Shadow · Alignment", s6.segmentCode),
          fieldsBlock(
            field("Shadow Frequency", lt(s6, "growthEdge", locale)),
            field("Karmic Money Lesson", lt(s6, "lesson", locale)),
            field("Grounded Guidance", lt(s6, "guidance", locale)),
          ),
          { type: "text", variant: "disclaimer", text: pickLocalized(s6.lockedPreview, locale) },
        ]
      : [],
    "practice-divider": [],
    "practice-overview": [
      ...sectionHeaderBlocks("7-Day Practice Overview"),
      {
        type: "text",
        variant: "body",
        text: bp?.integrationTheme
          ? `Theme: ${bp.integrationTheme}\n\nA one-week rhythm to embody your blueprint through observation, choice, and grounded practice.`
          : "A one-week rhythm to embody your blueprint through observation, choice, and grounded practice.",
      },
    ],
    "practice-days-1-3": [
      ...sectionHeaderBlocks("Days 1–3"),
      {
        type: "practice-days",
        days: sevenDays.slice(0, 3).map((d) => ({
          day: d.day,
          title: d.title,
          practice: `${d.practice}\n\nReflection: ${d.reflection}`,
        })),
      },
    ],
    "practice-days-4-7": [
      ...sectionHeaderBlocks("Days 4–7"),
      {
        type: "practice-days",
        days: sevenDays.slice(3, 7).map((d) => ({
          day: d.day,
          title: d.title,
          practice: `${d.practice}\n\nReflection: ${d.reflection}`,
        })),
      },
    ],
    "three-actions": [
      ...sectionHeaderBlocks("Three Actions to Begin"),
      ...(bullets(
        undefined,
        sevenDays.slice(0, 3).map((d) => `${d.title} — ${d.practice.split("\n")[0]}`),
      )
        ? [
            bullets(
              undefined,
              sevenDays.slice(0, 3).map((d) => `${d.title} — ${d.practice.split("\n")[0]}`),
            )!,
          ]
        : []),
    ],
    closing: [
      { type: "text", variant: "body", text: CLOSING_COPY },
      { type: "text", variant: "guidance", text: pickLocalized(content.reflectionQuestion, locale) },
      ...(bullets(
        "Journal Prompts",
        bp?.reflectionQuestions?.length
          ? bp.reflectionQuestions
          : [
              "What part of this report feels most true?",
              "What part feels uncomfortable or resistant?",
              "What is one small action I can take from awareness?",
            ],
      )
        ? [
            bullets(
              "Journal Prompts",
              bp?.reflectionQuestions?.length
                ? bp.reflectionQuestions
                : [
                    "What part of this report feels most true?",
                    "What part feels uncomfortable or resistant?",
                    "What is one small action I can take from awareness?",
                  ],
            )!,
          ]
        : []),
    ],
    "thank-you": [
      { type: "text", variant: "body", text: CLOSING_COPY },
      { type: "text", variant: "label", text: FULL_REPORT_ATTRIBUTION },
      { type: "text", variant: "subtitle", text: CLOSING_ATTRIBUTION },
      {
        type: "cta",
        primary: { label: "Book a Personal 1320 Reading", href: "/booking" },
        secondary: { label: "Start My 7-Day Integration Practice", href: "#fr-screen-practice-overview" },
        utility: { label: "Return to My Report", href: "/my-report" },
      },
    ],
  };

  return FULL_REPORT_SCREENS.map((screen) => screenPayload(screen, byId[screen.id] ?? []));
}
