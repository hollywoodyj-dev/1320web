import profileTagsData from "@/data/blueprint-experience/profile-tags-v1.json";
import type { FoundationCodes } from "@/lib/blueprint-experience-api/blueprint-id";
import type {
  BlueprintExperienceLocale,
  BlueprintExperiencePurpose,
  ExperienceProfile,
  ReadingTraits,
} from "@/lib/blueprint-experience-api/types";

type LocalizedProfilePartial = Partial<{
  essence_traits: string[];
  style_traits: string[];
  palette_traits: string[];
  texture_traits: string[];
  visual_traits: string[];
  travel_traits: string[];
  reading_traits: ReadingTraits;
  brand_affinity_traits: string[];
}>;

type TagFile = {
  defaults: Record<string, ExperienceProfile>;
  by_s1?: Record<string, Record<string, LocalizedProfilePartial>>;
  by_s3?: Record<string, Record<string, LocalizedProfilePartial>>;
  by_s2?: Record<string, Record<string, LocalizedProfilePartial>>;
  by_s0?: Record<string, Record<string, LocalizedProfilePartial>>;
};

const tags = profileTagsData as TagFile;

function mergeUnique(base: string[], extra?: string[]): string[] {
  if (!extra?.length) return [...base];
  const seen = new Set(base);
  const out = [...base];
  for (const item of extra) {
    if (!seen.has(item)) {
      seen.add(item);
      out.push(item);
    }
  }
  return out.slice(0, 6);
}

function mergeReading(base: ReadingTraits, extra?: ReadingTraits): ReadingTraits {
  if (!extra) return { ...base, core_themes: [...base.core_themes], preferred_styles: [...base.preferred_styles], learning_orientation: [...base.learning_orientation] };
  return {
    core_themes: mergeUnique(base.core_themes, extra.core_themes).slice(0, 6),
    preferred_depth: extra.preferred_depth ?? base.preferred_depth,
    preferred_styles: mergeUnique(base.preferred_styles, extra.preferred_styles).slice(0, 6),
    learning_orientation: mergeUnique(base.learning_orientation, extra.learning_orientation).slice(0, 6),
  };
}

function applyPartial(base: ExperienceProfile, partial?: LocalizedProfilePartial): ExperienceProfile {
  if (!partial) return base;
  return {
    essence_traits: mergeUnique(base.essence_traits, partial.essence_traits),
    style_traits: mergeUnique(base.style_traits, partial.style_traits),
    palette_traits: mergeUnique(base.palette_traits, partial.palette_traits),
    texture_traits: mergeUnique(base.texture_traits, partial.texture_traits),
    visual_traits: mergeUnique(base.visual_traits, partial.visual_traits),
    travel_traits: mergeUnique(base.travel_traits, partial.travel_traits),
    reading_traits: mergeReading(base.reading_traits, partial.reading_traits),
    brand_affinity_traits: mergeUnique(base.brand_affinity_traits, partial.brand_affinity_traits),
  };
}

/** Build approved external tags — never Full Report prose. */
export function buildExperienceProfile(
  codes: FoundationCodes,
  locale: BlueprintExperienceLocale,
): ExperienceProfile {
  const localeKey = locale === "zh-CN" ? "zh-CN" : "en";
  const defaults = tags.defaults[localeKey] ?? tags.defaults.en;
  let profile: ExperienceProfile = {
    essence_traits: [...defaults.essence_traits],
    style_traits: [...defaults.style_traits],
    palette_traits: [...defaults.palette_traits],
    texture_traits: [...defaults.texture_traits],
    visual_traits: [...defaults.visual_traits],
    travel_traits: [...defaults.travel_traits],
    reading_traits: mergeReading(defaults.reading_traits),
    brand_affinity_traits: [...defaults.brand_affinity_traits],
  };

  profile = applyPartial(profile, tags.by_s1?.[codes.s1Code]?.[localeKey]);
  profile = applyPartial(profile, tags.by_s3?.[codes.s3Code]?.[localeKey]);
  profile = applyPartial(profile, tags.by_s2?.[codes.s2Code]?.[localeKey]);
  profile = applyPartial(profile, tags.by_s0?.[codes.s0Code]?.[localeKey]);
  return profile;
}

/** Purpose-based field filtering — return minimum required fields for Coze. */
export function filterExperienceProfileByPurpose(
  profile: ExperienceProfile,
  purpose: BlueprintExperiencePurpose,
): ExperienceProfile {
  const emptyReading: ReadingTraits = {
    core_themes: [],
    preferred_depth: profile.reading_traits.preferred_depth,
    preferred_styles: [],
    learning_orientation: [],
  };

  switch (purpose) {
    case "lifestyle_expression":
      return {
        essence_traits: profile.essence_traits,
        style_traits: profile.style_traits,
        palette_traits: profile.palette_traits,
        texture_traits: profile.texture_traits,
        visual_traits: [],
        travel_traits: [],
        reading_traits: emptyReading,
        brand_affinity_traits: [],
      };
    case "soul_reading":
      return {
        essence_traits: profile.essence_traits,
        style_traits: [],
        palette_traits: [],
        texture_traits: [],
        visual_traits: [],
        travel_traits: [],
        reading_traits: profile.reading_traits,
        brand_affinity_traits: [],
      };
    case "visual_expression":
      return {
        essence_traits: profile.essence_traits,
        style_traits: [],
        palette_traits: profile.palette_traits,
        texture_traits: profile.texture_traits,
        visual_traits: profile.visual_traits,
        travel_traits: [],
        reading_traits: emptyReading,
        brand_affinity_traits: [],
      };
    case "travel_inspiration":
      return {
        essence_traits: profile.essence_traits,
        style_traits: [],
        palette_traits: [],
        texture_traits: [],
        visual_traits: [],
        travel_traits: profile.travel_traits,
        reading_traits: emptyReading,
        brand_affinity_traits: [],
      };
    case "brand_matching":
      return {
        essence_traits: profile.essence_traits,
        style_traits: [],
        palette_traits: [],
        texture_traits: [],
        visual_traits: [],
        travel_traits: [],
        reading_traits: emptyReading,
        brand_affinity_traits: profile.brand_affinity_traits,
      };
    case "combined":
    default:
      return profile;
  }
}
