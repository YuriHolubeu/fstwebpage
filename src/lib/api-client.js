/**
 * Django API client for focusstructure.com (forms, billing).
 * Set VITE_API_BASE_URL in .env.local to override the production default.
 */
import { SITE } from 'src/constants/site'

export function getApiBaseUrl () {
  return (
    import.meta.env.VITE_API_BASE_URL ||
    SITE.apiBaseUrl ||
    ''
  ).trim().replace(/\/$/, '')
}

export function isApiConfigured () {
  return Boolean(getApiBaseUrl())
}

export function currentSourcePath () {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname || '/'
}

export function normalizeEmail (email) {
  return email.trim().toLowerCase()
}

export class ApiRequestError extends Error {
  constructor (message, { status, code } = {}) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
    this.code = code
  }
}

/**
 * @param {string} path — e.g. /api/leads/contact/
 * @param {object} body
 */
export async function postJson (path, body) {
  const base = getApiBaseUrl()
  if (!base) {
    throw new ApiRequestError('Form API is not configured yet.')
  }

  const response = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body)
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message =
      payload?.error?.message ||
      payload?.detail ||
      'Request failed. Please try again.'
    throw new ApiRequestError(message, {
      status: response.status,
      code: payload?.error?.code
    })
  }

  return payload
}
