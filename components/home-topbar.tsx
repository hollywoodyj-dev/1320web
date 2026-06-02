"use client";

import Image from "next/image";
import { HOMEPAGE_HERO, HOMEPAGE_NAV } from "@/lib/homepage-content";
import { TopbarShell } from "@/components/topbar-shell";

export function HomeTopbar() {
  return (
    <TopbarShell
      brand={
        <div className="brand-lockup">
          <div className="brand-image-shell">
            <Image
              src="/1320-logo.jpeg"
              alt="1320 logo"
              width={86}
              height={86}
              className="brand-image"
              priority
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
        </div>
      }
      nav={HOMEPAGE_NAV}
      linkClassName={(item) =>
        item.href === "/" && item.label === "HOME" ? "active" : undefined
      }
      ctaHref="/your-code"
      ctaLabel={HOMEPAGE_HERO.primaryCta}
    />
  );
}
