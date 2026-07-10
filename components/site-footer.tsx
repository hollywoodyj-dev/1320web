import Image from "next/image";
import Link from "next/link";
import { FooterSubscribeSlot } from "@/components/footer-subscribe-slot";
import { FOOTER_ORIGIN } from "@/lib/homepage-content";
import { FOOTER_COLUMNS, FOOTER_LEGAL_LINKS } from "@/lib/site-nav";

type SiteFooterProps = {
  leadsEnabled?: boolean;
};

export function SiteFooter({ leadsEnabled }: SiteFooterProps) {
  return (
    <footer className="inner-site-footer">
      <div className="inner-footer-brand">
        <div className="brand-lockup">
          <div className="brand-image-shell brand-image-shell-small">
            <Image
              src="/1320-logo.jpeg"
              alt=""
              width={56}
              height={56}
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
        <p className="footer-copy">
          1320 is a reflective intelligence platform built around the Soul Blueprint. It offers symbolic
          reflection for self-awareness and integration. It does not provide prediction, diagnosis,
          therapy, legal, financial, medical, or crisis advice.
        </p>
        <p className="footer-copy text-sm opacity-80 mt-2">{FOOTER_ORIGIN.microcopy}</p>
        <p className="footer-copy text-sm opacity-80 mt-2">{FOOTER_ORIGIN.founderLine}</p>
        <nav className="footer-legal-nav" aria-label="Legal and support">
          <Link href={FOOTER_ORIGIN.originHref}>{FOOTER_ORIGIN.originLabel}</Link>
          {FOOTER_LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="footer-meta">© 2026 1320 Soul Origin Code System</p>
      </div>

      {FOOTER_COLUMNS.map((column) => (
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

      <p className="footer-mantra inner-footer-mantra">
        YOUR CODE IS A MIRROR — NOT A SENTENCE.
      </p>
    </footer>
  );
}
