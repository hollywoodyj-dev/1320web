import type { Metadata } from "next";
import { CheckoutSuccessClient } from "@/components/checkout/checkout-success-client";
import { CHECKOUT_SUCCESS_COPY, CHECKOUT_SUCCESS_META } from "@/lib/checkout/success-content";
import "@/styles/checkout-success-v1.css";

export const metadata: Metadata = {
  title: CHECKOUT_SUCCESS_META.title,
  description: CHECKOUT_SUCCESS_META.description,
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === "string" ? params.session_id : undefined;

  return (
    <div className="checkout-success-page checkout-success-page--refined">
      <section className="checkout-success-card glass-card" aria-labelledby="checkout-success-title">
        <p className="checkout-success-eyebrow">Purchase confirmed</p>
        <h1 id="checkout-success-title" className="checkout-success-title">
          {CHECKOUT_SUCCESS_COPY.title}
        </h1>
        <p className="checkout-success-reassure">{CHECKOUT_SUCCESS_COPY.reassurance}</p>
        <p className="checkout-success-body">{CHECKOUT_SUCCESS_COPY.body}</p>
        <CheckoutSuccessClient sessionId={sessionId} />
      </section>
    </div>
  );
}
