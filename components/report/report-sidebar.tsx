"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ReportNavItem, ReportSectionId } from "@/lib/report/report-nav";

type ReportSidebarProps = {
  navItems: ReportNavItem[];
  activeSection: ReportSectionId;
  onNavigate: (id: ReportSectionId) => void;
};

export function ReportSidebar({ navItems, activeSection, onNavigate }: ReportSidebarProps) {
  return (
    <aside className="report-sidebar report-sidebar--desktop glass-card">
      <div className="report-sidebar-brand">
        <Link href="/" className="brand-lockup-link">
          <div className="brand-image-shell brand-image-shell-small">
            <Image
              src="/1320-logo.jpeg"
              alt="1320 Soul Origin Code System"
              width={72}
              height={72}
              className="brand-image brand-image-small"
            />
            <span className="brand-image-cover" aria-hidden="true" />
          </div>
          <div className="entry-copy">
            <p className="brand-number">1320</p>
            <p className="brand-name">
              <span>SOUL ORIGIN</span>
              <span>CODE SYSTEM</span>
            </p>
          </div>
        </Link>
      </div>
      <nav className="report-sidebar-nav" aria-label="Report sections">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeSection === item.id ? "is-active" : undefined}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="report-sidebar-journey glass-card">
        <p className="report-sidebar-journey-title">Your Soul Journey</p>
        <p>
          This report is a mirror for awareness — read slowly, integrate gently, and return when
          you are ready.
        </p>
      </div>
    </aside>
  );
}

export function useReportScrollSpy(sectionIds: ReportSectionId[]) {
  const [active, setActive] = useState<ReportSectionId>(sectionIds[0] ?? "overview");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id as ReportSectionId);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
