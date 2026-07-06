import Link from "next/link";

/** Return access for existing purchasers — password sign-in, not magic link. */
export function PurchaserSignInPrompt() {
  return (
    <div className="purchaser-access-prompt">
      <p>
        Sign in with the email and password for your account. Purchased before passwords were added?
        Use signup with the same email to set a password — your Full Report stays linked.
      </p>
      <div className="purchaser-access-actions">
        <Link href="/login?next=/my-report" className="gold-button">
          SIGN IN
        </Link>
        <Link href="/signup?next=/my-report" className="blueprint-secondary-link">
          SET PASSWORD
        </Link>
      </div>
    </div>
  );
}
