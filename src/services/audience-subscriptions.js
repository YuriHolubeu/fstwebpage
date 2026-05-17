const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const TABLES = {
  waitlist: import.meta.env.VITE_SUPABASE_WAITLIST_TABLE || 'waitlist_subscriptions',
  vip: import.meta.env.VITE_SUPABASE_VIP_TABLE || 'vip_subscription_requests',
  newsletter: import.meta.env.VITE_SUPABASE_NEWSLETTER_TABLE || 'newsletter_subscriptions'
}

const LABELS = {
  waitlist: 'app waitlist',
  vip: 'VIP subscription request',
  newsletter: 'newsletter subscription'
}

export function isAudienceStorageConfigured () {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
}

async function insertSubscription ({ table, payload }) {
  const endpoint = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${table}`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify(payload)
  })

  if (response.status === 409) return

  if (!response.ok) {
    const details = await response.text()
    throw new Error(details || `Failed to save subscription in ${table}.`)
  }
}

export async function saveAudienceSubscriptions ({ name, email, message, sourcePath, interests }) {
  if (!isAudienceStorageConfigured()) {
    throw new Error('Supabase is not configured.')
  }

  const normalizedEmail = email.trim().toLowerCase()
  const basePayload = {
    name: name.trim(),
    email: normalizedEmail,
    source_path: sourcePath || window.location.pathname,
    status: 'active'
  }

  const savedInterests = []

  for (const interest of interests) {
    const table = TABLES[interest]
    if (!table) continue

    await insertSubscription({
      table,
      payload: {
        ...basePayload,
        message: message.trim() || null
      }
    })

    savedInterests.push(interest)
  }

  return savedInterests
}

export async function notifyAudienceSignup ({ name, email, message, sourcePath, interests }) {
  const functionName = import.meta.env.VITE_SUPABASE_SIGNUP_NOTIFICATION_FUNCTION
  if (!functionName || !isAudienceStorageConfigured() || interests.length === 0) return

  try {
    await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/functions/v1/${functionName}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        source_path: sourcePath || window.location.pathname,
        interests: interests.map((interest) => LABELS[interest] || interest)
      })
    })
  } catch (error) {
    console.warn('Signup notification failed', error)
  }
}
