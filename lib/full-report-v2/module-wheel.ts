/** Locked module wheel order: clockwise S9 → S0 → S1 → … → S8 */

export type ModuleWheelNode = {
  id: "s9" | "s0" | "s1" | "s2" | "s3" | "s4" | "s5" | "s6" | "s7" | "s8";
  code: string;
  label: string;
  icon: string;
  /** Short description shown inside overview wheel nodes (Page 02). */
  description: string;
};

export const MODULE_WHEEL_NODES: ModuleWheelNode[] = [
  {
    id: "s9",
    code: "S9",
    label: "Return to Source",
    icon: "◎",
    description: "Your soul's journey back to wholeness, truth, and unity.",
  },
  {
    id: "s0",
    code: "S0",
    label: "Void Gate",
    icon: "⌂",
    description: "Your soul entry point. The threshold of incarnation.",
  },
  {
    id: "s1",
    code: "S1",
    label: "Soul Origin",
    icon: "♧",
    description: "Your soul's original essence and archetype.",
  },
  {
    id: "s2",
    code: "S2",
    label: "Soul Mirror",
    icon: "◌",
    description: "How you reflect and attract your life experiences.",
  },
  {
    id: "s3",
    code: "S3",
    label: "Soul Vibration",
    icon: "≋",
    description: "Your core frequency and energetic signature.",
  },
  {
    id: "s4",
    code: "S4",
    label: "Core Shadow Pattern",
    icon: "△",
    description: "Your unconscious pattern and soul contracts.",
  },
  {
    id: "s5",
    code: "S5",
    label: "Soul Mission",
    icon: "✶",
    description: "Your soul purpose and life direction in this lifetime.",
  },
  {
    id: "s6",
    code: "S6",
    label: "Value & Receiving",
    icon: "◡",
    description: "Your relationship with worth, value, and receiving.",
  },
  {
    id: "s7",
    code: "S7",
    label: "Soul Sovereignty",
    icon: "♕",
    description: "Your inner authority, boundaries, and sovereign power.",
  },
  {
    id: "s8",
    code: "S8",
    label: "Soul Contribution",
    icon: "☄",
    description: "Your gifts, impact, and how you serve the world.",
  },
];

export const MODULE_INCLUDES_LIST: Array<{ code: string; label: string }> = [
  { code: "S0", label: "Void Gate" },
  { code: "S1", label: "Soul Origin" },
  { code: "S2", label: "Soul Mirror" },
  { code: "S3", label: "Soul Vibration" },
  { code: "S4", label: "Core Shadow Pattern" },
  { code: "S5", label: "Soul Mission" },
  { code: "S6", label: "Value & Receiving" },
  { code: "S7", label: "Soul Sovereignty" },
  { code: "S8", label: "Soul Contribution" },
  { code: "S9", label: "Return to Source" },
];
