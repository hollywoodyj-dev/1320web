"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TopbarShell } from "@/components/topbar-shell";
import { GENERATE_CODE_CTA, isNavActive, PRIMARY_NAV } from "@/lib/site-nav";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <TopbarShell
      className="inner-topbar"
      brand={
        <div className="brand-lockup">
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
      }
      nav={PRIMARY_NAV}
      linkClassName={(item) => (isNavActive(pathname, item) ? "active" : undefined)}
      ctaHref={GENERATE_CODE_CTA.href}
      ctaLabel={GENERATE_CODE_CTA.label}
    />
  );
}
