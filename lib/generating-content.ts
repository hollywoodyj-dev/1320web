import type { SegmentId } from "@/lib/segments";

export const GENERATING_COPY = {
  secured: "Secured & Private",
  eyebrow: "YOUR CODE IS FORMING",
  titleLine1: "Opening Your",
  titleLine2: "1320 Soul Blueprint",
  body: "We are mapping your four-part Soul Code through your Origin Frequency, Vibration Tier, Mirror Path, and Void Gate.",
  currentStepLabel: "CURRENT STEP",
  boundary:
    "This is not a prediction. It is a mirror for awareness, reflection, and conscious choice.",
  cta: "VIEW MY RESULT",
  encryption: "Your data is encrypted and never stored",
  completeTitle: "Your 1320 Soul Code is ready.",
  completeBody: "Origin · Vibration · Mirror · Void Gate — aligned.",
};

export type GeneratingStep = {
  index: number;
  segmentId: SegmentId;
  title: string;
  subcopy: string;
  railLabel: string;
  nodeTitle: string;
  nodeDesc: string;
};

export const GENERATING_STEPS: GeneratingStep[] = [
  {
    index: 1,
    segmentId: "s1",
    title: "Reading your Origin Frequency…",
    subcopy: "Recognizing the original pattern beneath your life expression.",
    railLabel: "01 Reading your Origin Frequency…",
    nodeTitle: "ORIGIN FREQUENCY",
    nodeDesc: "Your original pattern.",
  },
  {
    index: 2,
    segmentId: "s3",
    title: "Mapping your Vibration Tier…",
    subcopy: "Tracing how your energy expresses in the world.",
    railLabel: "02 Mapping your Vibration Tier…",
    nodeTitle: "VIBRATION TIER",
    nodeDesc: "Your energetic expression.",
  },
  {
    index: 3,
    segmentId: "s2",
    title: "Revealing your Mirror Path…",
    subcopy: "Illuminating the relationships that mirror your growth.",
    railLabel: "03 Revealing your Mirror Path…",
    nodeTitle: "MIRROR PATH",
    nodeDesc: "Your relational mirrors.",
  },
  {
    index: 4,
    segmentId: "s0",
    title: "Opening your Void Gate…",
    subcopy: "Returning to the clarity beneath illusion.",
    railLabel: "04 Opening your Void Gate…",
    nodeTitle: "VOID GATE",
    nodeDesc: "Your path of return.",
  },
];

/** ~1.2s per step → ~5.4s total before redirect (13/15: 4–6s). */
export const GENERATING_STEP_MS = 1200;
export const GENERATING_REDIRECT_DELAY_MS = 600;
