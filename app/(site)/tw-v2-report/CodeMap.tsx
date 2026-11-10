import type { CodeNode } from "@/lib/gzh/tw-v2-blueprint";

export function CodeMap({ nodes, title }: { nodes: CodeNode[]; title: string }) {
  return (
    <section className="v2-code-map" aria-label={title}>
      <h2>{title}</h2>
      <div className="v2-code-grid">
        {nodes.map((node) => (
          <div key={node.code} className={`v2-code-node v2-code-node--${node.layer}`}>
            <p className="v2-code-id">{node.code}</p>
            {node.name ? <p className="v2-code-name">{node.name}</p> : null}
            {node.mirror ? <p className="v2-code-mirror">{node.mirror}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
