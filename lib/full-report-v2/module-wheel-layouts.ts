/** Wheel geometry for cover (620) vs dimensions overview (520). */

export type ModuleWheelLayout = {
  wheelSize: number;
  nodeSize: number;
  positions: Record<string, { left: number; top: number; transform?: string }>;
};

export const MODULE_WHEEL_LAYOUT_COVER: ModuleWheelLayout = {
  wheelSize: 620,
  nodeSize: 118,
  positions: {
    s9: { left: 251, top: 6 },
    s0: { left: 395, top: 53 },
    s1: { left: 484, top: 175 },
    s2: { left: 484, top: 327 },
    s3: { left: 395, top: 449 },
    s4: { left: 251, top: 496 },
    s5: { left: 107, top: 449 },
    s6: { left: 18, top: 327 },
    s7: { left: 18, top: 175 },
    s8: { left: 107, top: 53 },
  },
};

/** Locked order positions for Page 02 overview wheel (even decagon, S9 at top). */
export const MODULE_WHEEL_LAYOUT_OVERVIEW: ModuleWheelLayout = {
  wheelSize: 600,
  nodeSize: 124,
  positions: {
    s9: { left: 238, top: 4 },
    s0: { left: 375, top: 49 },
    s1: { left: 460, top: 166 },
    s2: { left: 460, top: 310 },
    s3: { left: 375, top: 427 },
    s4: { left: 238, top: 472 },
    s5: { left: 100, top: 427 },
    s6: { left: 15, top: 310 },
    s7: { left: 15, top: 166 },
    s8: { left: 100, top: 49 },
  },
};
