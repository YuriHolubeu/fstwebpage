/**
 * Django API base URL for billing (pre-order checkout).
 * Set VITE_API_BASE_URL in .env.local and GitHub Actions secrets.
 */
export function getApiBaseUrl () {
  return (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/$/, '')
}

export function isApiConfigured () {
  return Boolean(getApiBaseUrl())
}
