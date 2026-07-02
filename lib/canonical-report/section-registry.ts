import type { CanonicalSectionDef } from "@/lib/canonical-report/types";

function req(path: string, description: string) {
  return { path, kind: "required" as const, description };
}

function opt(path: string, description: string) {
  return { path, kind: "optional" as const, description };
}

function reloc(path: string, description: string) {
  return { path, kind: "relocatable" as const, description };
}

function deco(path: string, description: string) {
  return { path, kind: "decorative" as const, description };
}

/**
 * Canonical section map — product structure shared by desktop and mobile.
 * Mobile uses more pages; content may relocate but substantive insight must remain.
 */
export const CANONICAL_SECTION_REGISTRY: CanonicalSectionDef[] = [
  {
    id: "cover",
    label: "Cover",
    desktopPageIds: ["page-00-cover"],
    mobilePageIds: ["mobile-page-00-cover"],
    fixPriority: 4,
    payloadFields: [
      req("client.name", "Prepared-for name"),
      req("client.birth_date_display", "Birth date label"),
      req("calculation.combination_signature", "Four-part signature string"),
      deco("report.generated_date", "Generated date stamp"),
      deco("report.generated_time", "Generated time stamp"),
    ],
  },
  {
    id: "opening",
    label: "Opening",
    desktopPageIds: ["page-01-opening"],
    mobilePageIds: ["mobile-page-01-opening", "mobile-page-05-how-to-read"],
    fixPriority: 4,
    payloadFields: [],
  },
  {
    id: "dimensions",
    label: "Dimensions",
    desktopPageIds: ["page-02-dimensions"],
    mobilePageIds: ["mobile-page-04-code-map", "mobile-page-05-how-to-read"],
    fixPriority: 4,
    payloadFields: [],
  },
  {
    id: "signature",
    label: "Signature",
    desktopPageIds: ["page-03-signature"],
    mobilePageIds: ["mobile-page-03-signature", "mobile-page-04-code-map"],
    fixPriority: 4,
    payloadFields: [
      req("calculation.s1.code", "S1 code"),
      req("calculation.s3.code", "S3 code"),
      req("calculation.s2.code", "S2 code"),
      req("calculation.s0.code", "S0 code"),
      req("calculation.s1.title", "S1 title"),
      req("calculation.s3.title", "S3 title"),
      req("calculation.s2.title", "S2 title"),
      req("calculation.s0.title", "S0 title"),
    ],
  },
  {
    id: "s1",
    label: "S1 Origin Frequency",
    desktopPageIds: ["page-04-s1"],
    mobilePageIds: ["mobile-page-06-s1-reveal", "mobile-page-07-s1-essence"],
    fixPriority: 4,
    payloadFields: [
      req("modules.s1.code", "S1 module code"),
      req("modules.s1.title", "S1 module title"),
      opt("modules.s1.essence", "S1 essence copy"),
      opt("modules.s1.core_gifts", "S1 gifts"),
      opt("modules.s1.shadow_patterns", "S1 shadow patterns"),
    ],
  },
  {
    id: "s3",
    label: "S3 Vibration Tier",
    desktopPageIds: ["page-05-s3"],
    mobilePageIds: ["mobile-page-08-s3-reveal", "mobile-page-09-s3-expression"],
    fixPriority: 4,
    payloadFields: [
      req("modules.s3.code", "S3 module code"),
      req("modules.s3.title", "S3 module title"),
      opt("modules.s3.essence", "S3 essence copy"),
    ],
  },
  {
    id: "s2",
    label: "S2 Mirror Path",
    desktopPageIds: ["page-06-s2"],
    mobilePageIds: ["mobile-page-10-s2-reveal", "mobile-page-11-s2-mirror-lesson"],
    fixPriority: 4,
    payloadFields: [
      req("modules.s2.code", "S2 module code"),
      req("modules.s2.title", "S2 module title"),
      opt("modules.s2.essence", "S2 essence copy"),
    ],
  },
  {
    id: "s0",
    label: "S0 Void Gate",
    desktopPageIds: ["page-07-s0"],
    mobilePageIds: ["mobile-page-12-s0-reveal", "mobile-page-13-s0-void-gate-integration"],
    fixPriority: 4,
    payloadFields: [
      req("modules.s0.code", "S0 module code"),
      req("modules.s0.title", "S0 module title"),
      opt("modules.s0.essence", "S0 essence copy"),
    ],
  },
  {
    id: "integrated_blueprint",
    label: "Integrated Blueprint",
    desktopPageIds: ["page-08-integrated"],
    mobilePageIds: ["mobile-page-14-integrated-blueprint", "mobile-page-15-integrated-pattern-action"],
    fixPriority: 4,
    payloadFields: [
      req("integrated_blueprint.combination_signature", "Integrated signature"),
      opt("integrated_blueprint.integration_theme", "Integration theme"),
      opt("integrated_blueprint.final_remembrance", "Final remembrance"),
      opt("integrated_action.affirmation", "Integrated affirmation"),
    ],
  },
  {
    id: "s4",
    label: "S4 Shadow Pattern",
    desktopPageIds: ["page-09-s4"],
    mobilePageIds: ["mobile-page-16-s4-shadow-reveal", "mobile-page-17-s4-shadow-loop-growth-edge"],
    fixPriority: 4,
    payloadFields: [
      req("modules.s4.code", "S4 module code"),
      opt("modules.s4.core_loop", "S4 core loop"),
      opt("modules.s4.growth_edge", "S4 growth edge"),
    ],
  },
  {
    id: "s5",
    label: "S5 Soul Mission",
    desktopPageIds: ["page-10-s5"],
    mobilePageIds: ["mobile-page-18-s5-soul-mission-reveal", "mobile-page-19-s5-mission-pathway-icon"],
    fixPriority: 4,
    payloadFields: [
      req("modules.s5.code", "S5 module code"),
      opt("modules.s5.mission_essence", "S5 mission essence"),
    ],
  },
  {
    id: "s6",
    label: "S6 Value & Receiving",
    desktopPageIds: ["page-11-s6"],
    mobilePageIds: ["mobile-page-20-s6-value-receiving-reveal", "mobile-page-21-s6-receiving-pattern-map"],
    fixPriority: 3,
    payloadFields: [
      req("modules.s6.code", "S6 module code"),
      opt("modules.s6.value_essence", "S6 value essence"),
      opt("modules.s6.receiving_pattern", "S6 receiving pattern"),
    ],
  },
  {
    id: "s7",
    label: "S7 Soul Sovereignty",
    desktopPageIds: ["page-12-s7"],
    mobilePageIds: ["mobile-page-22-s7-soul-sovereignty-reveal", "mobile-page-23-s7-sovereignty-alignment-map"],
    fixPriority: 3,
    payloadFields: [
      req("modules.s7.code", "S7 module code"),
      opt("modules.s7.sovereignty_essence", "S7 sovereignty essence"),
    ],
  },
  {
    id: "s8",
    label: "S8 Soul Contribution",
    desktopPageIds: ["page-13-s8"],
    mobilePageIds: ["mobile-page-24-s8-soul-contribution-reveal", "mobile-page-25-s8-contribution-pathway"],
    fixPriority: 3,
    payloadFields: [
      req("modules.s8.code", "S8 module code"),
      opt("modules.s8.contribution_essence", "S8 contribution essence"),
    ],
  },
  {
    id: "s9",
    label: "S9 Return to Source",
    desktopPageIds: ["page-14-s9"],
    mobilePageIds: ["mobile-page-26-s9-return-to-source-reveal", "mobile-page-27-s9-return-pathway-remembrance"],
    fixPriority: 3,
    payloadFields: [
      req("modules.s9.code", "S9 module code"),
      opt("modules.s9.return_essence", "S9 return essence"),
    ],
  },
  {
    id: "practice",
    label: "7-Day Integration Practice",
    desktopPageIds: ["page-15-practice"],
    mobilePageIds: [
      "mobile-page-28-7-day-integration-practice-overview",
      "mobile-page-29-7-day-practice-cards",
    ],
    fixPriority: 2,
    payloadFields: [
      req("integration_practice.days", "Seven personalized practice days"),
      opt("integration_practice.days.0.theme", "Day 1 theme"),
      opt("integration_practice.days.0.practice", "Day 1 practice"),
      opt("integration_practice.days.0.reflection", "Day 1 reflection"),
    ],
  },
  {
    id: "journal",
    label: "Reflection Journal",
    desktopPageIds: ["page-16-journal"],
    mobilePageIds: ["mobile-page-30-reflection-journal"],
    fixPriority: 2,
    payloadFields: [
      reloc("reflection_journal.prompt", "Journal opening prompt"),
      reloc("reflection_journal.quote", "Journal quote"),
    ],
  },
  {
    id: "closing",
    label: "Closing Reflection",
    desktopPageIds: ["page-17-closing"],
    mobilePageIds: ["mobile-page-31-closing-reflection"],
    fixPriority: 2,
    payloadFields: [
      reloc("closing_reflection.message", "Closing message"),
      reloc("closing_reflection.quote", "Closing quote"),
      reloc("closing_reflection.thank_you_message", "Thank-you message"),
    ],
  },
  {
    id: "disclaimer",
    label: "Final Disclaimer",
    desktopPageIds: ["page-18-disclaimer"],
    mobilePageIds: ["mobile-page-02-disclaimer", "mobile-page-32-final-disclaimer"],
    fixPriority: 2,
    payloadFields: [
      reloc("final_disclaimer.hero_note", "Disclaimer hero note"),
      reloc("final_disclaimer.remember_copy", "Remember copy"),
      reloc("final_disclaimer.thank_you_line", "Disclaimer thank-you line"),
    ],
  },
];

export function getCanonicalSection(id: CanonicalSectionDef["id"]): CanonicalSectionDef {
  const section = CANONICAL_SECTION_REGISTRY.find((entry) => entry.id === id);
  if (!section) {
    throw new Error(`Unknown canonical section: ${id}`);
  }
  return section;
}
