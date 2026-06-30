/**
 * Founder pre-order via Gumroad (real payments without own Stripe Live account).
 * Set VITE_GUMROAD_PREORDER_URL in .env.local / GitHub Actions secrets.
 *
 * Example: https://yourname.gumroad.com/l/founder-preorder
 */
export function getGumroadPreorderUrl () {
  return (import.meta.env.VITE_GUMROAD_PREORDER_URL || '').trim()
}

export function isGumroadPreorderConfigured () {
  return Boolean(getGumroadPreorderUrl())
}

/**
 * @param {{ email?: string }} options — Gumroad pre-fills checkout email when supported
 */
export function buildGumroadCheckoutUrl ({ email } = {}) {
  const raw = getGumroadPreorderUrl()
  try {
    const url = new URL(raw)
    // Skip Gumroad product landing page → open payment form directly.
    // https://gumroad.com/help/article/144-send-customers-directly-to-your-payment-form
    url.searchParams.set('wanted', 'true')
    if (email?.trim()) {
      url.searchParams.set('email', email.trim())
    }
    return url.toString()
  } catch {
    return raw
  }
}
