import reflectionQuestionsData from "@/data/1320/reflection-questions.json";
import type { Locale, LocalizedText } from "@/lib/types/1320-content";
import type { SynthesisLayerInput } from "@/lib/types/integrated-soul-blueprint";

type ReflectionFile = {
  default: LocalizedText;
  bySegmentCode?: Record<string, LocalizedText>;
  byCode?: Record<string, LocalizedText>;
  bySegment?: Partial<Record<"s1" | "s2" | "s3" | "s0", Record<string, LocalizedText>>>;
};

const file = reflectionQuestionsData as ReflectionFile;

const KNOWN_BY_CODE: Record<string, LocalizedText> = {
  "S1-24": {
    en: "Where are you trying to maintain an image of light instead of allowing your light to be natural?",
    zh: "你在哪里试图维持“发光”的形象，而不是允许光自然流露？",
  },
  "S3-04": {
    en: "Where has awakening become judgment instead of grounded service?",
    zh: "你在哪里把觉醒变成了评判，而不是落地的服务？",
  },
  "S2-23": {
    en: "Where are you giving more in order to feel chosen, needed, or worthy?",
    zh: "你在哪里付出更多，只为感到被选中、被需要或有价值？",
  },
  "S0-09": {
    en: "Where are you still letting other people's opinions become louder than your own truth?",
    zh: "你在哪里仍让他人的评价比自己的真相更响亮？",
  },
  "S1-18": {
    en: "Where in your life are you being asked to transform gently rather than through force?",
    zh: "在你生命中，哪里正在邀请你温柔地转化，而不是用力逼迫？",
  },
  "S3-03": {
    en: "Where does your intensity need a clearer channel?",
    zh: "你的强度在哪里需要一个更清晰的通道？",
  },
  "S2-27": {
    en: "What relationship mirror is asking you to wake up rather than stay comfortable?",
    zh: "哪段关系镜像在邀请你觉醒，而不是停留在舒适？",
  },
  "S0-07": {
    en: "Where do you still measure your worth by results instead of presence?",
    zh: "你还在哪里用结果，而不是存在本身来衡量价值？",
  },
};

function fromFile(segmentCode: string): LocalizedText | undefined {
  return (
    file.bySegmentCode?.[segmentCode] ??
    KNOWN_BY_CODE[segmentCode] ??
    undefined
  );
}

function generateFallback(
  segment: "s1" | "s3" | "s2" | "s0",
  input: SynthesisLayerInput,
  locale: Locale,
): LocalizedText {
  const en =
    segment === "s1"
      ? `Where are you living ${input.s1.englishTitle.replace(/^The /, "").toLowerCase()} as performance instead of essence?`
      : segment === "s3"
        ? `Where does ${input.s3.englishTitle.toLowerCase()} expression need more grounded balance?`
        : segment === "s2"
          ? `Where does ${input.s2.englishTitle.replace(/^The /, "").toLowerCase()} ask you to see yourself more honestly?`
          : `Where does ${input.s0.englishTitle.toLowerCase()} still shape how you measure yourself?`;

  const zh =
    segment === "s1"
      ? `你在哪里把「${input.s1.chineseTitle}」活成了表演，而不是本质？`
      : segment === "s3"
        ? `「${input.s3.chineseTitle}」的表达在哪里需要更落地的平衡？`
        : segment === "s2"
          ? `「${input.s2.chineseTitle}」在哪里邀请你更诚实地看见自己？`
          : `「${input.s0.chineseTitle}」还在哪里影响你衡量自己的方式？`;

  return locale === "zh" ? { en, zh } : { en, zh };
}

export function resolveSegmentReflectionQuestion(
  segment: "s1" | "s3" | "s2" | "s0",
  segmentCode: string,
  input: SynthesisLayerInput,
  locale: Locale,
): LocalizedText {
  const known = fromFile(segmentCode);
  if (known) return known;
  return generateFallback(segment, input, locale);
}

export function resolveAllSegmentReflections(
  input: SynthesisLayerInput,
  codes: { s1Code: string; s3Code: string; s2Code: string; s0Code: string },
  locale: Locale,
): Record<"s1" | "s3" | "s2" | "s0", LocalizedText> {
  return {
    s1: resolveSegmentReflectionQuestion("s1", codes.s1Code, input, locale),
    s3: resolveSegmentReflectionQuestion("s3", codes.s3Code, input, locale),
    s2: resolveSegmentReflectionQuestion("s2", codes.s2Code, input, locale),
    s0: resolveSegmentReflectionQuestion("s0", codes.s0Code, input, locale),
  };
}
