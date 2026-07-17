import type { SegmentId } from "@/lib/segments";

export type BlueprintGenerationState = "loading" | "complete" | "error";

export const GENERATING_COPY = {
  secured: "Secured & Private",
  eyebrow: "Your Code Is Forming",
  titleLine1: "Opening Your",
  titleLine2: "1320 Soul Blueprint",
  body: "We are mapping your four foundation mirrors: Origin, Vibration, Mirror, and Void.",
  currentStepLabel: "Current Step",
  boundaryLine1: "This is not a prediction.",
  boundaryLine2: "It is a mirror for awareness, reflection, and conscious choice.",
  ctaLoading: "Forming Your Blueprint…",
  ctaComplete: "View My Result",
  ctaError: "Try Again",
  privacy: "Your birth data is handled securely and used to generate your blueprint.",
  completeTitle: "Your Blueprint Is Ready",
  completeBody: "Your four foundation mirrors have been opened.",
  errorTitle: "Something interrupted the generation.",
  errorBody: "Your birth date was not processed successfully. Please try again.",
  errorInvalidTitle: "Something interrupted the generation.",
  errorInvalidBody: "Your birth date was not processed successfully. Please try again.",
};

export type GeneratingStep = {
  id: string;
  index: number;
  segmentId: SegmentId;
  label: string;
  /** Shown in current-step title while this step is active */
  activeLabel: string;
  /** Short supporting line under current step */
  subcopy: string;
  /** Status verb while this step is the active one */
  statusActive: string;
  /** Node title around the mandala */
  nodeTitle: string;
  /** Node description around the mandala */
  nodeDesc: string;
};

/** Symbolic UX sequence only — not four separate calculation engines. Order: S1 → S3 → S2 → S0 */
export const GENERATING_STEPS: GeneratingStep[] = [
  {
    id: "origin",
    index: 1,
    segmentId: "s1",
    label: "Origin",
    activeLabel: "Mapping Your Origin",
    subcopy: "Recognizing the original pattern beneath adaptation.",
    statusActive: "Reading",
    nodeTitle: "01 Origin",
    nodeDesc: "Original pattern",
  },
  {
    id: "vibration",
    index: 2,
    segmentId: "s3",
    label: "Vibration",
    activeLabel: "Mapping Your Vibration",
    subcopy: "Tracing how your energy expresses in life.",
    statusActive: "Mapping",
    nodeTitle: "02 Vibration",
    nodeDesc: "Energetic expression",
  },
  {
    id: "mirror",
    index: 3,
    segmentId: "s2",
    label: "Mirror",
    activeLabel: "Revealing Your Mirror",
    subcopy: "Illuminating what relationships reflect back to you.",
    statusActive: "Revealing",
    nodeTitle: "03 Mirror",
    nodeDesc: "Relational reflection",
  },
  {
    id: "void",
    index: 4,
    segmentId: "s0",
    label: "Void",
    activeLabel: "Opening Your Void Gate",
    subcopy: "Returning to clarity beneath uncertainty.",
    statusActive: "Opening",
    nodeTitle: "04 Void",
    nodeDesc: "Path of return",
  },
];

export function getStepStatus(
  stepIndex: number,
  activeStep: number,
  complete: boolean,
): "complete" | "active" | "waiting" {
  if (complete || activeStep > stepIndex) return "complete";
  if (activeStep === stepIndex) return "active";
  return "waiting";
}

export function getStepStatusLabel(
  step: GeneratingStep,
  activeStep: number,
  complete: boolean,
): string {
  const status = getStepStatus(step.index, activeStep, complete);
  if (status === "complete") return "Complete";
  if (status === "active") return step.statusActive;
  return "Waiting";
}

/** ~1.2s per step → ~5.4s total before redirect (13/15: 4–6s). */
export const GENERATING_STEP_MS = 1200;
export const GENERATING_REDIRECT_DELAY_MS = 600;
