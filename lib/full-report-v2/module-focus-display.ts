/**
 * Full Report v2 — percentage vs qualitative display rules.
 * See: docs/specs/full-report/ui/PERCENTAGE_DISPLAY_RULES.md
 */

export const INTEGRATION_FOCUS_SECTION_TITLE = "Integration Focus";

export type IntegrationFocusLabel =
  | "Strong Focus"
  | "Active Focus"
  | "Emerging Focus"
  | "Supportive Focus";

export type IntegrationFocusItem = {
  label: string;
  focus: IntegrationFocusLabel;
};

/** Page 09 · S4 only — symbolic intensity levels map to display percentages. */
export const S4_INTENSITY_MAP: Readonly<Record<number, number>> = {
  1: 60,
  2: 70,
  3: 80,
  4: 85,
  5: 90,
};

export const S4_PATTERN_INTENSITY_TITLE = "Pattern Intensity in Your Life";

export const S4_PATTERN_INTENSITY_NOTE =
  "Symbolic intensity indicator. Not a clinical, diagnostic, or predictive score.";

export const S4_PATTERN_INTENSITY_MAPPING_TITLE = "Pattern Intensity Mapping";

export const S4_LIFE_INFLUENCE_TITLE = "How S4 Influences Your Life";

export type S4PatternIntensityKey =
  | "relationships"
  | "daily_choices"
  | "emotional_repetition"
  | "energy_wellbeing";

export const S4_PATTERN_INTENSITY_LABELS: Record<S4PatternIntensityKey, string> = {
  relationships: "Influence on Relationships",
  daily_choices: "Impact on Daily Choices",
  emotional_repetition: "Emotional Repetition",
  energy_wellbeing: "Energy & Well-Being",
};

export const DEFAULT_S4_PATTERN_INTENSITY: Record<S4PatternIntensityKey, number> = {
  relationships: 5,
  daily_choices: 4,
  emotional_repetition: 5,
  energy_wellbeing: 4,
};

export function mapIntensityLevelToPercent(level: number): number {
  return S4_INTENSITY_MAP[level] ?? S4_INTENSITY_MAP[3];
}

export function resolveS4IntensityScores(
  levels: Partial<Record<S4PatternIntensityKey, number>>,
): Array<{ key: S4PatternIntensityKey; label: string; percent: number; level: number }> {
  return (Object.keys(S4_PATTERN_INTENSITY_LABELS) as S4PatternIntensityKey[]).map((key) => {
    const level = levels[key] ?? DEFAULT_S4_PATTERN_INTENSITY[key];
    return {
      key,
      label: S4_PATTERN_INTENSITY_LABELS[key],
      percent: mapIntensityLevelToPercent(level),
      level,
    };
  });
}

export function asPatternIntensityLevels(
  value: unknown,
): Partial<Record<S4PatternIntensityKey, number>> {
  if (!value || typeof value !== "object") return {};
  const record = value as Record<string, unknown>;
  const result: Partial<Record<S4PatternIntensityKey, number>> = {};
  for (const key of Object.keys(S4_PATTERN_INTENSITY_LABELS) as S4PatternIntensityKey[]) {
    const raw = record[key];
    if (typeof raw === "number" && raw >= 1 && raw <= 5) {
      result[key] = raw;
    }
  }
  return result;
}
