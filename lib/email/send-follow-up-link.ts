type FollowUpLinkEmailInput = {
  email: string;
  clientName: string;
  followUpUrl: string;
};

/** Sends post-session follow-up link when Resend is configured; logs in dev. */
export async function sendFollowUpLinkEmail(input: FollowUpLinkEmailInput): Promise<{ sent: boolean }> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim() || "1320 Soul Code <noreply@1320soulcode.com>";

  const subject = "Your Personal Integration Session — follow-up reflection";
  const text = [
    `Hello ${input.clientName},`,
    "",
    "Thank you for your Personal Integration Session.",
    "",
    "When you are ready, capture what landed — one integration note or reflection:",
    input.followUpUrl,
    "",
    "This is symbolic reflection support, not therapy or prediction. You remain the author of your choices.",
    "",
    "If you did not attend a session, you can ignore this email.",
  ].join("\n");

  if (process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true") {
    console.info("[email:follow-up-link]", { to: input.email, url: input.followUpUrl });
  }

  if (!resendKey) {
    return { sent: false };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [input.email], subject, text }),
  });

  if (!response.ok) {
    console.error("[email:follow-up-link] Resend error", await response.text());
    return { sent: false };
  }

  return { sent: true };
}
