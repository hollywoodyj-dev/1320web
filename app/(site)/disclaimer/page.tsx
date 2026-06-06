import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/legal/legal-document";
import { DISCLAIMER_META, DISCLAIMER_SECTIONS } from "@/lib/disclaimer-content";
import { GENERATE_CODE_CTA } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: DISCLAIMER_META.title,
  description: DISCLAIMER_META.description,
};

export default function DisclaimerPage() {
  return (
    <div className="conversion-page legal-page">
      <header className="blueprint-hero glass-card">
        <p className="blueprint-eyebrow">LEGAL</p>
        <h1 className="blueprint-title">Disclaimer</h1>
        <p className="blueprint-lead">
          Important boundaries for using 1320 — self-awareness and reflection only.
        </p>
      </header>
      <LegalDocument sections={DISCLAIMER_SECTIONS} />
      <section className="blueprint-final-cta glass-card">
        <Link href={GENERATE_CODE_CTA.href} className="gold-button">
          {GENERATE_CODE_CTA.label}
        </Link>
        <Link href="/faq" className="blueprint-secondary-link block mt-3">
          READ FAQ
        </Link>
      </section>
    </div>
  );
}
