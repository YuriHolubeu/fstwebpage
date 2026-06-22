import {
  currentSourcePath,
  isApiConfigured,
  normalizeEmail,
  postJson
} from 'src/lib/api-client'

const INTEREST_TO_KIND = Object.freeze({
  waitlist: 'waitlist',
  vip: 'vip',
  newsletter: 'newsletter',
  sponsor: 'sponsor'
})

const KIND_TO_INTEREST = Object.freeze({
  waitlist: 'waitlist',
  vip: 'vip',
  newsletter: 'newsletter',
  sponsor: 'sponsor'
})

export const INTEREST_LABELS = Object.freeze({
  waitlist: 'Join the app waitlist',
  vip: 'Become a VIP user',
  newsletter: 'Subscribe to the newsletter',
  sponsor: 'Sponsor project'
})

export function isAudienceStorageConfigured () {
  return isApiConfigured()
}

export async function saveAudienceSubscriptions ({
  name,
  email,
  message,
  sourcePath,
  interests
}) {
  const kinds = interests
    .map((interest) => INTEREST_TO_KIND[interest])
    .filter(Boolean)

  if (kinds.length === 0) {
    return { saved: [], errors: [] }
  }

  const result = await postJson('/api/leads/signups/', {
    name: name.trim(),
    email: normalizeEmail(email),
    message: message?.trim() || '',
    source_path: sourcePath || currentSourcePath(),
    kinds
  })

  const saved = (result.saved || []).map((kind) => KIND_TO_INTEREST[kind] || kind)
  const duplicates = (result.duplicates || []).map((kind) => KIND_TO_INTEREST[kind] || kind)
  const errors = (result.errors || []).map((entry) => ({
    interest: KIND_TO_INTEREST[entry.kind] || entry.kind,
    message: entry.message
  }))

  duplicates.forEach((interest) => {
    if (!saved.includes(interest)) {
      saved.push(interest)
    }
  })

  return { saved, errors }
}

/** Email notifications via Supabase Edge Function — replaced by Django admin for now. */
export async function notifyAudienceSignup () {
  return undefined
}
