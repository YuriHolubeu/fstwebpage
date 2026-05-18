const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const TABLES = {
  waitlist: import.meta.env.VITE_SUPABASE_WAITERS_TABLE || 'waiters',
  vip: import.meta.env.VITE_SUPABASE_VIPS_TABLE || 'vips',
  investor: import.meta.env.VITE_SUPABASE_POT_INVESTORS_TABLE || 'pot-investors'
}

export function isHeroSignupStorageConfigured () {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
}

async function insertHeroSignup ({ table, name, email, message }) {
  const endpoint = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${encodeURIComponent(table)}`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message?.trim() || null,
      source_path: window.location.pathname
    })
  })

  if (response.status === 409) return

  if (!response.ok) {
    const details = await response.text()
    throw new Error(details || `Failed to save signup in ${table}.`)
  }
}

export async function saveWaitlistSignup ({ name, email, message }) {
  if (!isHeroSignupStorageConfigured()) {
    throw new Error('Supabase is not configured.')
  }
  await insertHeroSignup({ table: TABLES.waitlist, name, email, message })
}

export async function saveVipSignup ({ name, email, message }) {
  if (!isHeroSignupStorageConfigured()) {
    throw new Error('Supabase is not configured.')
  }
  await insertHeroSignup({ table: TABLES.vip, name, email, message })
}

export async function saveInvestorSignup ({ name, email, message }) {
  if (!isHeroSignupStorageConfigured()) {
    throw new Error('Supabase is not configured.')
  }
  await insertHeroSignup({ table: TABLES.investor, name, email, message })
}
