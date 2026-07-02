/**
 * Fixed UI chrome for Page 17 — Closing Reflection.
 * Mostly static; resolver may personalize from integrated blueprint.
 */

export const CLOSING_PAGE_HERO = {
  pageNumber: "17",
  title: "Closing Reflection",
  subtitle: "A Gentle Completion · A New Beginning · A Return to Yourself",
  description:
    "You have walked through your soul codes, patterns, gifts, mission, sovereignty, contribution, and return. This is not the end of your journey. It is an invitation to live with deeper awareness.",
} as const;

export const CLOSING_SHOWN_TITLE = "What This Report Has Shown You";

export const CLOSING_SHOWN_COPY = [
  "This report has reflected your soul’s symbolic blueprint — your essence, vibration, mirrors, void gate, shadow pattern, mission, receiving frequency, sovereignty, contribution, and return path.",
  "It is not meant to define you. It is meant to help you see yourself with more clarity, compassion, and courage.",
] as const;

export const CLOSING_REMEMBER_TITLE = "What to Remember";

export const CLOSING_REMEMBER_ITEMS = [
  "You are more than any code, title, or archetype.",
  "Your patterns are not punishments; they are invitations.",
  "Your gifts become stronger when they are embodied gently.",
  "Your mission is not pressure; it is alignment in motion.",
  "Your return is not somewhere far away; it begins here.",
] as const;

export const CLOSING_BEFORE_FORWARD_TITLE = "Before You Move Forward";

export const CLOSING_BEFORE_FORWARD_COPY =
  "Pause for a moment. Breathe. Let what resonates stay. Let what does not resonate soften. You do not need to understand everything today.";

export const CLOSING_SEAL_TITLE = "Your Closing Integration Seal";

export const CLOSING_SEAL_NODES = [
  {
    position: "top" as const,
    title: "Remember",
    copy: "Return to the truth beneath every role.",
    icon: "☉",
  },
  {
    position: "right" as const,
    title: "Integrate",
    copy: "Let insight become daily embodiment.",
    icon: "✶",
  },
  {
    position: "bottom" as const,
    title: "Live",
    copy: "Choose from truth, love, and inner clarity.",
    icon: "♡",
  },
  {
    position: "left" as const,
    title: "Return",
    copy: "Come home to Source within yourself.",
    icon: "∞",
  },
] as const;

export const CLOSING_STATEMENT_LINES = [
  "I remember who I am.",
  "I choose to live from truth.",
] as const;

export const CLOSING_BLESSING_TITLE = "Your Completion Blessing";

export const CLOSING_BLESSING_LINES = [
  "May you walk forward with clarity.",
  "May you trust your path.",
  "May you remember that your life is sacred.",
] as const;

export const CLOSING_FINAL_REFLECTION_TITLE = "Final Reflection";

export const CLOSING_FINAL_REFLECTION_PROMPT =
  "What is the one truth from this report that you want to carry into your life?";

export const CLOSING_NEXT_STEP_TITLE = "Your Next Step";

export const CLOSING_NEXT_STEP_DEFAULT =
  "Choose one small aligned action. Let it be simple. Let it be honest. Let it come from your deeper self rather than from fear or pressure.";

export const CLOSING_GENTLE_INTEGRATION_TITLE = "Gentle Integration";

export const CLOSING_GENTLE_INTEGRATION_COPY =
  "Give yourself time to absorb this report. Revisit the pages slowly. Let the insights meet you differently as your awareness deepens.";

export const CLOSING_LIVING_BLUEPRINT_TITLE = "Living the Blueprint";

export const CLOSING_LIVING_BLUEPRINT_COPY =
  "Your blueprint becomes meaningful when it is lived through kindness, honest choices, and embodied awareness.";

export const CLOSING_INSIGHT_TITLE = "Closing Insight";

export const CLOSING_INSIGHT_LEAD = "Your soul code is not a limitation. It is a mirror.";

export const CLOSING_INSIGHT_DEFAULT =
  "You are here to remember, integrate, and become more whole.";

export const CLOSING_REFLECTION_LINE_COUNT = 4;

export const CLOSING_FOOTER_MANTRA = [
  "You are here to remember.",
  "You are here to integrate.",
  "You are here to embody your light.",
] as const;
