import Image from "next/image";
import Link from "next/link";
import { FooterSubscribeSlot } from "@/components/footer-subscribe-slot";
import { FOOTER_ORIGIN, HOMEPAGE_FOOTER_BRAND, HOMEPAGE_FINAL_CTA } from "@/lib/homepage-content";
import { FOOTER_LEGAL_LINKS, HOMEPAGE_FOOTER_COLUMNS } from "@/lib/site-nav";

type SiteFooterProps = {
  leadsEnabled?: boolean;
};

/** Shared footer — aligned with homepage refinement (short brand + same columns + mantra). */
export function SiteFooter({ leadsEnabled }: SiteFooterProps) {
  return (
    <>
      <footer className="site-footer">
        <div className="footer-brand">
          <div className="brand-lockup">
            <div className="brand-image-shell brand-image-shell-small">
              <Image
                src="/1320-logo.jpeg"
                alt="1320 logo"
                width={72}
                height={72}
                className="brand-image brand-image-small"
              />
              <span className="brand-image-cover" aria-hidden="true" />
            </div>
            <div>
              <p className="brand-number">1320</p>
              <p className="brand-name">
                <span>SOUL ORIGIN</span>
                <span>CODE SYSTEM</span>
              </p>
            </div>
          </div>
          <p className="footer-copy">{HOMEPAGE_FOOTER_BRAND}</p>
          <nav className="footer-legal-nav" aria-label="Legal and support">
            <Link href={FOOTER_ORIGIN.originHref}>{FOOTER_ORIGIN.originLabel}</Link>
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="footer-meta">© 2026 1320 Soul Origin Code System. All Rights Reserved.</p>
        </div>

        {HOMEPAGE_FOOTER_COLUMNS.map((column) => (
          <div key={column.title} className="footer-column">
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={`${column.title}-${link.href}-${link.label}`}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <FooterSubscribeSlot variant="inner" enabled={leadsEnabled} />
      </footer>

      <p className="footer-mantra">{HOMEPAGE_FINAL_CTA.mantra}</p>
    </>
  );
}
