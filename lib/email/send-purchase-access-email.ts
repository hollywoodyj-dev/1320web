type PurchaseAccessEmailInput = {
  email: string;
  reportId: string;
  loginUrl: string;
  signupUrl: string;
};

/** Purchase confirmation — sign in with password to return to Full Report. */
export async function sendPurchaseAccessEmail(
  input: PurchaseAccessEmailInput,
): Promise<{ sent: boolean }> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim() || "1320 Soul Code <noreply@1320soulcode.com>";

  const subject = "Your 1320 Full Report is unlocked";
  const text = [
    "Thank you — your Full Soul Origin Report is ready.",
    "",
    "Sign in anytime with your email and password:",
    input.loginUrl,
    "",
    "First time signing in? Create your password with the same email you used at checkout:",
    input.signupUrl,
    "",
    "If you did not make this purchase, you can ignore this email.",
  ].join("\n");

  if (process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true") {
    console.info("[email:purchase-access]", {
      to: input.email,
      reportId: input.reportId,
      loginUrl: input.loginUrl,
    });
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
    body: JSON.stringify({
      from,
      to: [input.email],
      subject,
      text,
    }),
  });

  if (!response.ok) {
    console.error("[email:purchase-access] Resend error", await response.text());
    return { sent: false };
  }

  return { sent: true };
}
