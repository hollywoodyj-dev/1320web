import Link from "next/link";
import { InnerPageLayout } from "@/components/inner-page-layout";
import { FREE_BLUEPRINT_HREF, SEO_HUB_PATH } from "@/lib/seo/types";

export default function GuidesNotFound() {
  return (
    <InnerPageLayout className="conversion-page guides-page">
      <section className="guides-hub-panel glass-card" style={{ textAlign: "center" }}>
        <h1 className="inner-page-title text-gold-gradient">Guide Not Found</h1>
        <p>
          This guide is not published yet, or the link may be incorrect. Browse available guides or
          generate your Free Soul Blueprint.
        </p>
        <p style={{ marginTop: "1rem" }}>
          <Link href={SEO_HUB_PATH} className="gold-button">
            View Guides
          </Link>
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          <Link href={FREE_BLUEPRINT_HREF} className="blueprint-secondary-link">
            Discover Your Free Soul Blueprint
          </Link>
        </p>
      </section>
    </InnerPageLayout>
  );
}
