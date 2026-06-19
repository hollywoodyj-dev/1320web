import { MODULE_WHEEL_NODES } from "@/lib/full-report-v2/module-wheel";
import {
  MODULE_WHEEL_LAYOUT_COVER,
  MODULE_WHEEL_LAYOUT_OVERVIEW,
  type ModuleWheelLayout,
} from "@/lib/full-report-v2/module-wheel-layouts";

type ModuleWheelVariant = "cover" | "overview";

const LAYOUTS: Record<ModuleWheelVariant, ModuleWheelLayout> = {
  cover: MODULE_WHEEL_LAYOUT_COVER,
  overview: MODULE_WHEEL_LAYOUT_OVERVIEW,
};

type ModuleWheelProps = {
  /** `cover` = Page 00 (620px). `overview` = Page 02 dimensions (520px). */
  variant?: ModuleWheelVariant;
};

export function ModuleWheel({ variant = "cover" }: ModuleWheelProps) {
  const layout = LAYOUTS[variant];
  const { wheelSize, nodeSize, positions } = layout;
  const center = wheelSize / 2;

  const nodeCenters = MODULE_WHEEL_NODES.map((node) => {
    const pos = positions[node.id];
    return { x: pos.left + nodeSize / 2, y: pos.top + nodeSize / 2 };
  });

  const orbitRadius = nodeSize / 2 + 8;
  const polygonPoints = nodeCenters.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div
      className={[
        "fr-v2-module-wheel",
        variant === "overview" ? "fr-v2-module-wheel--overview" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ width: wheelSize, height: wheelSize }}
      aria-label="1320 Soul Code module wheel"
    >
      <svg
        className="fr-v2-module-wheel__links"
        viewBox={`0 0 ${wheelSize} ${wheelSize}`}
        aria-hidden="true"
      >
        {nodeCenters.map((p, i) => (
          <line
            key={`spoke-${i}`}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            className="fr-v2-module-wheel__spoke"
          />
        ))}
        <polygon points={polygonPoints} className="fr-v2-module-wheel__orbit-line" />
        {nodeCenters.map((p, i) => (
          <circle
            key={`halo-${i}`}
            cx={p.x}
            cy={p.y}
            r={orbitRadius}
            className="fr-v2-module-wheel__node-halo"
          />
        ))}
      </svg>

      <div className="fr-v2-module-wheel__ring" />
      <div className="fr-v2-module-wheel__ring fr-v2-module-wheel__ring--r2" />
      <div className="fr-v2-module-wheel__ring fr-v2-module-wheel__ring--r3" />
      <div className="fr-v2-module-wheel__ring fr-v2-module-wheel__ring--r4" />
      {variant === "cover" && (
        <>
          <div className="fr-v2-module-wheel__axis" />
          <div className="fr-v2-module-wheel__axis fr-v2-module-wheel__axis--horizontal" />
        </>
      )}
      <div className="fr-v2-module-wheel__center">
        <div className="fr-v2-module-wheel__center-number">1320</div>
        <div className="fr-v2-module-wheel__center-label">Soul Code</div>
      </div>
      {MODULE_WHEEL_NODES.map((node) => {
        const pos = positions[node.id];
        return (
          <div
            key={node.id}
            className={[
              "fr-v2-module-node",
              variant === "cover" ? `fr-v2-module-node--${node.id}` : "",
              variant === "overview" ? "fr-v2-module-node--overview" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              width: nodeSize,
              height: nodeSize,
              left: pos.left,
              top: pos.top,
              transform: pos.transform,
            }}
          >
            <div className="fr-v2-module-node__icon">{node.icon}</div>
            <div className="fr-v2-module-node__code">{node.code}</div>
            <div className="fr-v2-module-node__name">{node.label}</div>
            {variant === "overview" && (
              <div className="fr-v2-module-node__desc">{node.description}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
