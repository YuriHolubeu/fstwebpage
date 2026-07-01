/**
 * Founder pre-order via Gumroad (real payments without own Stripe Live account).
 *
 * Env:
 * - VITE_GUMROAD_PREORDER_URL — product link (permalink in path), e.g. …/l/focus-preorder
 * - VITE_GUMROAD_PRODUCT_CODE — optional short product id from Gumroad (often differs from permalink)
 * - VITE_GUMROAD_PREORDER_PRICE_CENTS — optional, default 700 ($7)
 */
const GUMROAD_CHECKOUT_ORIGIN = 'https://gumroad.com'

export function getGumroadPreorderUrl () {
  return (import.meta.env.VITE_GUMROAD_PREORDER_URL || '').trim()
}

export function isGumroadPreorderConfigured () {
  return Boolean(getGumroadPreorderUrl())
}

function parsePermalink (raw) {
  const url = new URL(raw)
  const parts = url.pathname.split('/').filter(Boolean)
  const linkIndex = parts.indexOf('l')
  if (linkIndex >= 0 && parts[linkIndex + 1]) {
    return parts[linkIndex + 1]
  }
  return parts.at(-1) || ''
}

/**
 * Direct Gumroad checkout URL — skips product landing page.
 * @param {{ email?: string }} options — Gumroad pre-fills checkout email when supported
 */
export function buildGumroadCheckoutUrl ({ email } = {}) {
  const raw = getGumroadPreorderUrl()
  if (!raw) {
    return raw
  }

  try {
    const permalink = parsePermalink(raw)
    const productCode =
      (import.meta.env.VITE_GUMROAD_PRODUCT_CODE || '').trim() || permalink
    const priceCents = String(
      import.meta.env.VITE_GUMROAD_PREORDER_PRICE_CENTS || '700'
    ).trim()

    const checkout = new URL(`${GUMROAD_CHECKOUT_ORIGIN}/checkout`)
    checkout.searchParams.set('action', 'show')
    checkout.searchParams.set('controller', 'links')
    checkout.searchParams.set('format', 'html')
    checkout.searchParams.set('id', permalink)
    checkout.searchParams.set('product', productCode)
    checkout.searchParams.set('price', priceCents)
    checkout.searchParams.set('rent', 'false')
    checkout.searchParams.set('wanted', 'true')

    if (email?.trim()) {
      checkout.searchParams.set('email', email.trim())
    }

    return checkout.toString()
  } catch {
    return raw
  }
}
