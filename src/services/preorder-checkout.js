import { getApiBaseUrl } from 'src/lib/api-client'

export class PreorderCheckoutError extends Error {
  constructor (message, { status, code } = {}) {
    super(message)
    this.name = 'PreorderCheckoutError'
    this.status = status
    this.code = code
  }
}

/**
 * Start founder pre-order ($5) — returns Stripe Checkout URL.
 * @param {{ email?: string }} options
 */
export async function startPreorderCheckout ({ email } = {}) {
  const base = getApiBaseUrl()
  if (!base) {
    throw new PreorderCheckoutError('Payment API is not configured yet.')
  }

  const body = {}
  if (email?.trim()) {
    body.email = email.trim()
  }

  const response = await fetch(`${base}/api/billing/preorder/checkout/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body)
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message =
      payload?.error?.message ||
      payload?.detail ||
      'Could not start checkout. Please try again or contact us.'
    throw new PreorderCheckoutError(message, {
      status: response.status,
      code: payload?.error?.code
    })
  }

  if (!payload?.checkout_url) {
    throw new PreorderCheckoutError('Checkout URL missing in server response.')
  }

  return payload.checkout_url
}

export async function fetchPreorderStatus (sessionId) {
  const base = getApiBaseUrl()
  if (!base || !sessionId?.trim()) {
    return null
  }

  const params = new URLSearchParams({ session_id: sessionId.trim() })
  const response = await fetch(`${base}/api/billing/preorder/status/?${params}`, {
    headers: { Accept: 'application/json' }
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}
