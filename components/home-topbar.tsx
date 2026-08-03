"use client";

import Image from "next/image";
import { GENERATE_CODE_CTA, HOMEPAGE_PRIMARY_NAV } from "@/lib/site-nav";
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
      nav={HOMEPAGE_PRIMARY_NAV}
      linkClassName={(item) =>
        item.href === "/" && item.label === "HOME" ? "active" : undefined
      }
      ctaHref={GENERATE_CODE_CTA.href}
      ctaLabel={GENERATE_CODE_CTA.label}
      ctaClassName="gold-button topbar-cta"
    />
  );
}
