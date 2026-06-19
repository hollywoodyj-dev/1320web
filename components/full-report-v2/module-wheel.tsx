import { MODULE_WHEEL_NODES } from "@/lib/full-report-v2/module-wheel";

const WHEEL_SIZE = 620;
const NODE_SIZE = 118;
const CENTER = WHEEL_SIZE / 2;

/** Top-left positions mirror the .fr-v2-module-node--* CSS classes. */
const NODE_POSITIONS: Record<string, { left: number; top: number }> = {
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
};

const NODE_CENTERS = MODULE_WHEEL_NODES.map((node) => {
  const pos = NODE_POSITIONS[node.id];
  return { x: pos.left + NODE_SIZE / 2, y: pos.top + NODE_SIZE / 2 };
});

const ORBIT_RADIUS = NODE_SIZE / 2 + 8;

export function ModuleWheel() {
  const polygonPoints = NODE_CENTERS.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="fr-v2-module-wheel" aria-label="1320 Soul Code module wheel">
      <svg
        className="fr-v2-module-wheel__links"
        viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
        aria-hidden="true"
      >
        {NODE_CENTERS.map((p, i) => (
          <line
            key={`spoke-${i}`}
            x1={CENTER}
            y1={CENTER}
            x2={p.x}
            y2={p.y}
            className="fr-v2-module-wheel__spoke"
          />
        ))}
        <polygon points={polygonPoints} className="fr-v2-module-wheel__orbit-line" />
        {NODE_CENTERS.map((p, i) => (
          <circle
            key={`halo-${i}`}
            cx={p.x}
            cy={p.y}
            r={ORBIT_RADIUS}
            className="fr-v2-module-wheel__node-halo"
          />
        ))}
      </svg>

      <div className="fr-v2-module-wheel__ring" />
      <div className="fr-v2-module-wheel__ring fr-v2-module-wheel__ring--r2" />
      <div className="fr-v2-module-wheel__ring fr-v2-module-wheel__ring--r3" />
      <div className="fr-v2-module-wheel__ring fr-v2-module-wheel__ring--r4" />
      <div className="fr-v2-module-wheel__axis" />
      <div className="fr-v2-module-wheel__axis fr-v2-module-wheel__axis--horizontal" />
      <div className="fr-v2-module-wheel__center">
        <div className="fr-v2-module-wheel__center-number">1320</div>
        <div className="fr-v2-module-wheel__center-label">Soul Code</div>
      </div>
      {MODULE_WHEEL_NODES.map((node) => (
        <div
          key={node.id}
          className={`fr-v2-module-node fr-v2-module-node--${node.id}`}
        >
          <div className="fr-v2-module-node__icon">{node.icon}</div>
          <div className="fr-v2-module-node__code">{node.code}</div>
          <div className="fr-v2-module-node__name">{node.label}</div>
        </div>
      ))}
    </div>
  );
}
