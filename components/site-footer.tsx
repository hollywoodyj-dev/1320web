import Image from "next/image";
import Link from "next/link";
import { FooterSubscribeSlot } from "@/components/footer-subscribe-slot";
import { FOOTER_COLUMNS, FOOTER_LEGAL_LINKS } from "@/lib/site-nav";

export function SiteFooter() {
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
          A symbolic tool for self-awareness and reflection — not prediction or professional
          advice. You remain the authority of your own path.
        </p>
        <nav className="footer-legal-nav" aria-label="Legal and support">
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

      <FooterSubscribeSlot variant="inner" />

      <p className="footer-mantra inner-footer-mantra">
        YOUR CODE IS A MIRROR — NOT A SENTENCE.
      </p>
    </footer>
  );
}
