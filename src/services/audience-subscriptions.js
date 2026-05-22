import {
  SIGNUP_NOTIFICATION_FUNCTION,
  SUPABASE_TABLES,
  currentSourcePath,
  insertRow,
  invokeEdgeFunction,
  isSupabaseConfigured,
  normalizeEmail
} from 'src/lib/supabase-client'

const INTEREST_TO_TABLE = Object.freeze({
  waitlist: SUPABASE_TABLES.waitlist,
  vip: SUPABASE_TABLES.vip,
  newsletter: SUPABASE_TABLES.newsletter,
  sponsor: SUPABASE_TABLES.sponsor
})

export const INTEREST_LABELS = Object.freeze({
  waitlist: 'Join the app waitlist',
  vip: 'Become a VIP user',
  newsletter: 'Subscribe to the newsletter',
  sponsor: 'Sponsor project'
})

export function isAudienceStorageConfigured () {
  return isSupabaseConfigured()
}

export async function saveAudienceSubscriptions ({
  name,
  email,
  message,
  sourcePath,
  interests
}) {
  const normalizedEmail = normalizeEmail(email)
  const basePayload = {
    name: name.trim(),
    email: normalizedEmail,
    source_path: sourcePath || currentSourcePath(),
    status: 'active'
  }

  const saved = []
  const errors = []

  for (const interest of interests) {
    const table = INTEREST_TO_TABLE[interest]
    if (!table) continue

    try {
      await insertRow({
        table,
        payload: {
          ...basePayload,
          message: message.trim() || null
        },
        treatConflictAsSuccess: true
      })
      saved.push(interest)
    } catch (error) {
      console.warn(`Subscription save failed for ${interest}`, error)
      errors.push({
        interest,
        message: error?.message || `Failed to save ${interest}.`
      })
    }
  }

  return { saved, errors }
}

export async function notifyAudienceSignup ({
  name,
  email,
  message,
  sourcePath,
  interests
}) {
  if (!SIGNUP_NOTIFICATION_FUNCTION || !isSupabaseConfigured() || interests.length === 0) {
    return
  }

  try {
    await invokeEdgeFunction(SIGNUP_NOTIFICATION_FUNCTION, {
      name: name.trim(),
      email: normalizeEmail(email),
      message: message.trim(),
      source_path: sourcePath || currentSourcePath(),
      interests: interests.map((interest) => INTEREST_LABELS[interest] || interest)
    })
  } catch (error) {
    console.warn('Signup notification failed', error)
  }
}
