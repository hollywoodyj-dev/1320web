import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/legal-document";
import { TERMS_META, TERMS_SECTIONS } from "@/lib/terms-content";

export const metadata: Metadata = {
  title: TERMS_META.title,
  description: TERMS_META.description,
};

export default function TermsPage() {
  return (
    <div className="conversion-page legal-page">
      <header className="blueprint-hero glass-card">
        <p className="blueprint-eyebrow">LEGAL</p>
        <h1 className="blueprint-title">Terms of Service</h1>
        <p className="blueprint-lead">
          Terms for using the 1320 website and Phase 1 experiences — waitlist and booking request
          only, no checkout.
        </p>
      </header>
      <LegalDocument sections={TERMS_SECTIONS} />
    </div>
  );
}
