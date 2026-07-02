import type { CSSProperties } from "react";
import { ModuleNodeIcon } from "@/components/full-report-v2/module-node-icons";
import {
  MOBILE_CODE_WHEEL_ANGLES,
  MOBILE_COVER_NODE_SHORT_LABELS,
} from "@/lib/mobile-report-v2/cover-page-static";
import { MODULE_WHEEL_NODES } from "@/lib/full-report-v2/module-wheel";

const WHEEL_RAY_ANGLES = [0, 36, 72, 108, 144];

export function MobileCodeWheel() {
  return (
    <section className="mr-v2-code-wheel" aria-label="1320 Soul Origin Code Wheel">
      {WHEEL_RAY_ANGLES.map((angle) => (
        <div
          key={angle}
          className="mr-v2-code-wheel__ray"
          style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
          aria-hidden="true"
        />
      ))}

      <div className="mr-v2-code-wheel__center">
        <strong>1320</strong>
        <span>Soul Code</span>
        <div className="mr-v2-code-wheel__center-star" aria-hidden="true">✦</div>
      </div>

      {MODULE_WHEEL_NODES.map((node) => {
        const angle = MOBILE_CODE_WHEEL_ANGLES[node.id] ?? 0;
        const label = MOBILE_COVER_NODE_SHORT_LABELS[node.id] ?? node.label;

        return (
          <div
            key={node.id}
            className={`mr-v2-code-wheel__node mr-v2-code-wheel__node--${node.id}`}
            style={{ "--mr-v2-wheel-angle": `${angle}deg` } as CSSProperties}
          >
            <div className="mr-v2-code-wheel__node-icon" aria-hidden="true">
              <ModuleNodeIcon id={node.id} />
            </div>
            <strong>{node.code}</strong>
            <span>{label}</span>
          </div>
        );
      })}
    </section>
  );
}
