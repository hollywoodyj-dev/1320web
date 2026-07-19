/** User-facing Expression Framework™ state labels (never show raw enum values). */

export const EXPRESSION_STATES = [
  "dormant",
  "emerging",
  "active",
  "embodied",
  "integrated",
] as const;

export type ExpressionStateValue = (typeof EXPRESSION_STATES)[number];

export const EXPRESSION_STATE_LABELS: Record<ExpressionStateValue, string> = {
  dormant: "Dormant",
  emerging: "Emerging",
  active: "Active",
  embodied: "Embodied",
  integrated: "Integrated",
};

export function expressionStateLabel(state: string): string {
  const key = state.toLowerCase() as ExpressionStateValue;
  return EXPRESSION_STATE_LABELS[key] ?? state.charAt(0).toUpperCase() + state.slice(1);
}

export const JOURNEY_STATUS_LABELS: Record<string, string> = {
  active: "In motion",
  paused: "Paused",
  complete: "Complete",
};

export function journeyStatusLabel(status: string): string {
  const key = status.toLowerCase();
  return JOURNEY_STATUS_LABELS[key] ?? status.charAt(0).toUpperCase() + status.slice(1);
}
