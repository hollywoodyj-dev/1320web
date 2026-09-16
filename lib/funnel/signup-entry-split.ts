/** Footer subscribe rows are stored under signup_completed until catalog rename. */
export const NEWSLETTER_SIGNUP_ENTRY = "footer_subscribe";

export function isNewsletterSignupEntry(entry: string | null | undefined): boolean {
  return entry === NEWSLETTER_SIGNUP_ENTRY;
}
