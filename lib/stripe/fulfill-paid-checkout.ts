import { BOOKING_PRODUCT } from "@/lib/platform-config";
import { fulfillBookingCheckoutSession } from "@/lib/stripe/fulfill-booking-checkout";
import { fulfillCheckoutSession } from "@/lib/stripe/fulfill-checkout";
import type Stripe from "stripe";

export async function fulfillPaidCheckout(session: Stripe.Checkout.Session) {
  const product = session.metadata?.product;
  if (product === BOOKING_PRODUCT) {
    return fulfillBookingCheckoutSession(session);
  }
  return fulfillCheckoutSession(session);
}
