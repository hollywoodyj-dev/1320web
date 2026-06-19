import { MODULE_WHEEL_NODES } from "@/lib/full-report-v2/module-wheel";

export function ModuleWheel() {
  return (
    <div className="fr-v2-module-wheel" aria-label="1320 Soul Code module wheel">
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
