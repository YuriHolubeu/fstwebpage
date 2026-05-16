const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const CONTACT_TABLE = import.meta.env.VITE_SUPABASE_CONTACT_TABLE || 'contact_messages'

export function isContactStorageConfigured () {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
}

export async function saveContactMessage ({ name, email, message }) {
  if (!isContactStorageConfigured()) {
    throw new Error('Supabase is not configured.')
  }

  const endpoint = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${CONTACT_TABLE}`
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
      email: email.trim(),
      message: message.trim()
    })
  })

  if (!response.ok) {
    const details = await response.text()
    throw new Error(details || 'Failed to save contact message.')
  }
}
