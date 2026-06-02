import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  id?: string;
};

export function SectionCard({ title, subtitle, children, id }: SectionCardProps) {
  return (
    <section id={id} className="glass-card inner-section-card p-5 sm:p-6 scroll-mt-28">
      <h2 className="inner-section-title">{title}</h2>
      {subtitle ? <p className="inner-section-subtitle">{subtitle}</p> : null}
      <div className="inner-section-body">{children}</div>
    </section>
  );
}
