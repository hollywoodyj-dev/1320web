import type { LocalizedText } from "@/lib/types/1320-content";

export type SegmentId = "s1" | "s3" | "s2" | "s0";

export type SegmentMeta = {
  id: SegmentId;
  code: "S1" | "S3" | "S2" | "S0";
  /** Display order in blueprint + report (S1 → S3 → S2 → S0). */
  order: number;
  title: LocalizedText;
  shortLabel: LocalizedText;
  blueprintAnchor: string;
  learnMoreHref: string;
  /** Phase 2 deep-education routes (not built in Phase 1). */
  phase2Slug: string;
  color: string;
  colorRgb: string;
  cssVar: `--segment-${SegmentId}`;
};

export const SEGMENTS: readonly SegmentMeta[] = [
  {
    id: "s1",
    code: "S1",
    order: 1,
    title: { en: "Origin Frequency", zh: "原频" },
    shortLabel: { en: "Who You Are", zh: "你是谁" },
    blueprintAnchor: "s1",
    learnMoreHref: "/blueprint#s1",
    phase2Slug: "/blueprint/s1-origin-frequency",
    color: "#d8b15c",
    colorRgb: "216, 177, 92",
    cssVar: "--segment-s1",
  },
  {
    id: "s3",
    code: "S3",
    order: 2,
    title: { en: "Vibration Tier", zh: "振动层级" },
    shortLabel: { en: "How You Express", zh: "你如何表达" },
    blueprintAnchor: "s3",
    learnMoreHref: "/blueprint#s3",
    phase2Slug: "/blueprint/s3-vibration-tier",
    color: "#9b6edb",
    colorRgb: "155, 110, 219",
    cssVar: "--segment-s3",
  },
  {
    id: "s2",
    code: "S2",
    order: 3,
    title: { en: "Mirror Path", zh: "镜像路径" },
    shortLabel: { en: "Who You Attract", zh: "你吸引谁" },
    blueprintAnchor: "s2",
    learnMoreHref: "/blueprint#s2",
    phase2Slug: "/blueprint/s2-mirror-path",
    color: "#4b8fe8",
    colorRgb: "75, 143, 232",
    cssVar: "--segment-s2",
  },
  {
    id: "s0",
    code: "S0",
    order: 4,
    title: { en: "Void Gate", zh: "空门" },
    shortLabel: { en: "How You Awaken", zh: "你如何觉醒" },
    blueprintAnchor: "s0",
    learnMoreHref: "/blueprint#s0",
    phase2Slug: "/blueprint/s0-void-gate",
    color: "#2ec4b6",
    colorRgb: "46, 196, 182",
    cssVar: "--segment-s0",
  },
] as const;

export function getSegment(id: SegmentId): SegmentMeta {
  const segment = SEGMENTS.find((item) => item.id === id);
  if (!segment) throw new Error(`Unknown segment: ${id}`);
  return segment;
}

export function getSegmentByOrder(order: number): SegmentMeta | undefined {
  return SEGMENTS.find((item) => item.order === order);
}

export function formatSegmentCode(prefix: "S1" | "S3" | "S2" | "S0", value: number): string {
  if (prefix === "S0") return `S0-${String(value).padStart(2, "0")}`;
  return `${prefix}-${value}`;
}

export function segmentAccentClass(id: SegmentId): string {
  return `segment-accent-${id}`;
}
