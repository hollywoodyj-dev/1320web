/** 50-Minute Facilitator Script v1.0 — collapsible Session Guide. */

export type SessionGuideStage = {
  id: string;
  timeRange: string;
  title: string;
  purpose: string;
  suggestedLanguage: string[];
  keyQuestions: string[];
  boundaryWatchpoint: string;
};

export const SESSION_GUIDE_VERSION = "50-minute-facilitator-script-v1.0" as const;

export const SESSION_GUIDE_INTRO = {
  title: "50-Minute Session Guide",
  lead: "Use this as structural support — not a script to recite. Stay with the client’s authorship and keep the Blueprint as a mirror.",
  boundary:
    "Do not diagnose, predict, or assign fixed identity. Suggest at most two advanced layers as possible relevance only.",
};

export const SESSION_GUIDE_STAGES: SessionGuideStage[] = [
  {
    id: "arrival",
    timeRange: "0–5",
    title: "Arrival & Boundary",
    purpose: "Settle presence, confirm consent and scope, and set a clear container for the Session.",
    suggestedLanguage: [
      "Welcome. This Session is a space for symbolic integration with your Soul Blueprint — not therapy or prediction.",
      "You remain the author of your choices. I am here to help you see and integrate, not to decide for you.",
    ],
    keyQuestions: [
      "What would help you feel settled enough to begin?",
      "Is there anything we should keep outside the scope of today’s Session?",
    ],
    boundaryWatchpoint: "If crisis or clinical need appears, pause Session work and refer to appropriate support.",
  },
  {
    id: "present_reality",
    timeRange: "5–12",
    title: "Present Reality",
    purpose: "Hear the client’s current lived experience in their own words before opening the Blueprint.",
    suggestedLanguage: [
      "Let’s start with what is true for you right now — not what the codes might say.",
    ],
    keyQuestions: [
      "What is most alive in your experience this week?",
      "Where do you feel movement, and where do you feel stuck?",
    ],
    boundaryWatchpoint: "Do not leap to codes before the client’s present reality is named.",
  },
  {
    id: "foundation_reflection",
    timeRange: "12–25",
    title: "Foundation Reflection",
    purpose: "Reflect with Foundation layers in locked order: S1 → S3 → S2 → S0.",
    suggestedLanguage: [
      "We will stay with Foundation first — S1, then S3, then S2, then S0 — as mirrors, not verdicts.",
    ],
    keyQuestions: [
      "Which Foundation layer feels closest to what you just described?",
      "What changes when you hear this as a mirror rather than a fixed identity?",
    ],
    boundaryWatchpoint: "Preserve S1 → S3 → S2 → S0. Do not reorder Foundation for convenience.",
  },
  {
    id: "advanced_layer",
    timeRange: "25–35",
    title: "Advanced Layer",
    purpose: "Open at most one or two advanced layers (S4–S9) only if clearly relevant to today’s focus.",
    suggestedLanguage: [
      "Possible relevance — not a conclusion: we might gently look at …",
    ],
    keyQuestions: [
      "Does this advanced layer feel useful for today’s intention, or shall we stay with Foundation?",
      "What feels true here, and what does not?",
    ],
    boundaryWatchpoint: "Maximum two advanced layers in a standard Session. Never present suggestions as diagnosis.",
  },
  {
    id: "integration_synthesis",
    timeRange: "35–43",
    title: "Integration Synthesis",
    purpose: "Gather core recognition, inner tension, and existing resource in the client’s language.",
    suggestedLanguage: [
      "Let us name what is becoming clearer — in your words.",
    ],
    keyQuestions: [
      "What feels like the core recognition from today?",
      "Where is the inner tension, and what resource is already present?",
    ],
    boundaryWatchpoint: "Keep synthesis client-authored. Do not overwrite with Facilitator interpretation.",
  },
  {
    id: "choice_practice",
    timeRange: "43–48",
    title: "Choice & Practice",
    purpose: "Name one conscious choice and one small 7-day practice tied to the growth edge.",
    suggestedLanguage: [
      "One choice. One practice. Small enough to live.",
    ],
    keyQuestions: [
      "What is one conscious choice you want to practise this week?",
      "What simple daily notice would support that choice?",
    ],
    boundaryWatchpoint: "Avoid spiritual mandates or pressure language. Keep practice low-pressure and reflective.",
  },
  {
    id: "closing",
    timeRange: "48–50",
    title: "Closing",
    purpose: "Close the container, reaffirm agency, and point to Summary / practice follow-through.",
    suggestedLanguage: [
      "Your Blueprint remains a mirror. Your next steps remain yours.",
      "I will prepare a client-facing Integration Summary from what we named together — for your review in your account.",
    ],
    keyQuestions: ["Is there anything you want held outside today’s Summary?"],
    boundaryWatchpoint: "Private Facilitator notes stay private. Only reviewed Summary content is shared with the client.",
  },
];
