"use client";

import Link from "next/link";
import { useId, type ReactNode } from "react";

export type TopbarNavItem = {
  href: string;
  label: string;
};

type TopbarShellProps = {
  brand: ReactNode;
  nav: readonly TopbarNavItem[];
  linkClassName?: (item: TopbarNavItem) => string | undefined;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

/** Responsive top bar — full nav on desktop; CSS checkbox hamburger on mobile (no JS required). */
export function TopbarShell({
  brand,
  nav,
  linkClassName,
  ctaHref,
  ctaLabel,
  className,
}: TopbarShellProps) {
  const toggleId = useId().replace(/:/g, "");

  return (
    <header className={className ? `topbar ${className}` : "topbar"}>
      <input
        type="checkbox"
        id={toggleId}
        className="topbar-nav-checkbox"
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className="topbar-head">
        {brand}
        <label htmlFor={toggleId} className="topbar-menu-toggle">
          <span className="sr-only">Open menu</span>
          <span className="topbar-menu-bar" aria-hidden="true" />
          <span className="topbar-menu-bar" aria-hidden="true" />
          <span className="topbar-menu-bar" aria-hidden="true" />
        </label>
      </div>

      <div className="topbar-menu-panel">
        <nav className="topnav" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={linkClassName?.(item)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {ctaHref && ctaLabel ? (
        <Link href={ctaHref} className="gold-button topbar-cta">
          {ctaLabel}
        </Link>
      ) : null}
    </header>
  );
}
