/**
 * Supabase REST client for the public marketing site.
 * Uses the anon key only; row-level security enforces insert-only access.
 */

const PROJECT_URL = (import.meta.env.VITE_SUPABASE_URL || '').trim()
const ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim()

/** Table names — override via VITE_SUPABASE_*_TABLE in .env.local / CI secrets. */
export const SUPABASE_TABLES = Object.freeze({
  contact: import.meta.env.VITE_SUPABASE_CONTACT_TABLE || 'contact_messages',
  waitlist: import.meta.env.VITE_SUPABASE_WAITLIST_TABLE || 'waitlist_subscriptions',
  vip: import.meta.env.VITE_SUPABASE_VIP_TABLE || 'vip_subscription_requests',
  newsletter: import.meta.env.VITE_SUPABASE_NEWSLETTER_TABLE || 'newsletter_subscriptions',
  sponsor: import.meta.env.VITE_SUPABASE_SPONSOR_TABLE || 'sponsor_inquiries',
  waiters: import.meta.env.VITE_SUPABASE_WAITERS_TABLE || 'waiters',
  heroVip: import.meta.env.VITE_SUPABASE_VIPS_TABLE || 'vips',
  potInvestors: import.meta.env.VITE_SUPABASE_POT_INVESTORS_TABLE || 'pot-investors'
})

export const SIGNUP_NOTIFICATION_FUNCTION =
  (import.meta.env.VITE_SUPABASE_SIGNUP_NOTIFICATION_FUNCTION || '').trim()

export function isSupabaseConfigured () {
  return Boolean(PROJECT_URL && ANON_KEY)
}

function assertConfigured () {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.')
  }
}

function restEndpoint (table) {
  return `${PROJECT_URL.replace(/\/$/, '')}/rest/v1/${encodeURIComponent(table)}`
}

function authHeaders (extra = {}) {
  return {
    apikey: ANON_KEY,
    Authorization: `Bearer ${ANON_KEY}`,
    'Content-Type': 'application/json',
    ...extra
  }
}

function parseApiError (raw) {
  if (!raw?.trim()) return null
  try {
    const data = JSON.parse(raw)
    return data.message || data.error_description || data.error || data.hint || null
  } catch {
    return raw.trim()
  }
}

/**
 * Insert one row via PostgREST. When treatConflictAsSuccess is true, HTTP 409 is ignored
 * (useful for unique email constraints on subscription tables).
 */
export async function insertRow ({
  table,
  payload,
  treatConflictAsSuccess = false
}) {
  assertConfigured()

  const response = await fetch(restEndpoint(table), {
    method: 'POST',
    headers: authHeaders({ Prefer: 'return=minimal' }),
    body: JSON.stringify(payload)
  })

  if (treatConflictAsSuccess && response.status === 409) {
    return { duplicate: true }
  }

  if (!response.ok) {
    const details = await response.text()
    throw new Error(parseApiError(details) || `Failed to save record in "${table}".`)
  }

  return { duplicate: false }
}

export async function invokeEdgeFunction (functionName, body) {
  if (!functionName?.trim() || !isSupabaseConfigured()) {
    return
  }

  const url = `${PROJECT_URL.replace(/\/$/, '')}/functions/v1/${encodeURIComponent(functionName.trim())}`
  const response = await fetch(url, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    const details = await response.text()
    throw new Error(parseApiError(details) || `Edge function "${functionName}" failed.`)
  }
}

export function currentSourcePath () {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname || '/'
}

export function normalizeEmail (email) {
  return email.trim().toLowerCase()
}
