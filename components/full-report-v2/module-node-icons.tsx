import type { ModuleWheelNode } from "@/lib/full-report-v2/module-wheel";

type ModuleNodeId = ModuleWheelNode["id"];

/**
 * Gold line-art emblem set for the 10 Soul Code dimensions.
 * Drawn on a 24×24 grid, stroked with `currentColor` so each icon
 * inherits the wheel node's gold color and scales with its font-size.
 * Shared by the Page 00 cover wheel and the Page 02 overview wheel.
 */
const MODULE_NODE_ICON_CONTENT: Record<ModuleNodeId, React.ReactNode> = {
  // S9 · Return to Source — circular return arrow
  s9: (
    <>
      <path d="M5.5 12a6.5 6.5 0 1 0 1.9-4.6" />
      <path d="M4 5v3.5h3.5" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  // S0 · Void Gate — threshold archway
  s0: (
    <>
      <path d="M5 21V11a7 7 0 0 1 14 0v10" />
      <path d="M4 21h16" />
      <path d="M9.5 21v-6a2.5 2.5 0 0 1 5 0v6" />
    </>
  ),
  // S1 · Soul Origin — chalice / grail
  s1: (
    <>
      <path d="M6.5 4h11" />
      <path d="M7 4a5 5 0 0 0 5 6 5 5 0 0 0 5-6" />
      <path d="M12 10v8" />
      <path d="M8.5 20h7" />
    </>
  ),
  // S2 · Soul Mirror — hand mirror
  s2: (
    <>
      <circle cx="12" cy="8.5" r="5" />
      <path d="M12 13.5V21" />
      <path d="M9 21h6" />
      <path d="M10 6.5a2.5 2.5 0 0 1 2.5-1.6" />
    </>
  ),
  // S3 · Soul Vibration — frequency waves
  s3: (
    <>
      <path d="M3.5 10c1.7-2.3 3.4-2.3 5.2 0s3.5 2.3 5.2 0 3.4-2.3 5.2 0" />
      <path d="M3.5 15c1.7-2.3 3.4-2.3 5.2 0s3.5 2.3 5.2 0 3.4-2.3 5.2 0" />
    </>
  ),
  // S4 · Core Shadow Pattern — nested peaks
  s4: (
    <>
      <path d="M12 4 3.5 20h17z" />
      <path d="M12 11 7.5 20h9z" />
    </>
  ),
  // S5 · Soul Mission — guiding star
  s5: (
    <path d="M12 3.2 14.5 9l6.3.5-4.8 4.1 1.5 6.2-5.5-3.4-5.5 3.4 1.5-6.2L3.2 9.5 9.5 9z" />
  ),
  // S6 · Value & Receiving — open bowl with rising spark
  s6: (
    <>
      <path d="M4 11.5h16a8 8 0 0 1-16 0z" />
      <path d="M12 3 13 6l3 1-3 1-1 3-1-3-3-1 3-1z" />
    </>
  ),
  // S7 · Soul Sovereignty — crown
  s7: (
    <>
      <path d="M4 8l3.5 3 4.5-5.5L16.5 11 20 8l-1.6 10.5H5.6z" />
      <path d="M6 21h12" />
    </>
  ),
  // S8 · Soul Contribution — radiating heart
  s8: (
    <>
      <path d="M12 20.5c-3.6-2.7-5.7-4.9-5.7-7.5A2.9 2.9 0 0 1 12 11.4a2.9 2.9 0 0 1 5.7 1.6c0 2.6-2.1 4.8-5.7 7.5z" />
      <path d="M12 7.5V4M8 8 6.4 6M16 8l1.6-2" />
    </>
  ),
};

type ModuleNodeIconProps = {
  id: ModuleNodeId;
};

export function ModuleNodeIcon({ id }: ModuleNodeIconProps) {
  return (
    <svg
      className="fr-v2-module-node__glyph"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {MODULE_NODE_ICON_CONTENT[id]}
    </svg>
  );
}
