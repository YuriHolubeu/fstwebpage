import {
  currentSourcePath,
  isApiConfigured,
  normalizeEmail,
  postJson
} from 'src/lib/api-client'

const HERO_ROLE_TO_KIND = Object.freeze({
  waitlist: 'hero_waitlist',
  vip: 'hero_vip',
  investor: 'hero_investor'
})

export function isHeroSignupStorageConfigured () {
  return isApiConfigured()
}

async function saveHeroSignup (role, fields) {
  const kind = HERO_ROLE_TO_KIND[role]
  const result = await postJson('/api/leads/signups/', {
    name: fields.name.trim(),
    email: normalizeEmail(fields.email),
    message: fields.message?.trim() || '',
    source_path: currentSourcePath(),
    kinds: [kind]
  })

  return {
    duplicate: (result.duplicates || []).includes(kind)
  }
}

export function saveWaitlistSignup (fields) {
  return saveHeroSignup('waitlist', fields)
}

export function saveVipSignup (fields) {
  return saveHeroSignup('vip', fields)
}

export function saveInvestorSignup (fields) {
  return saveHeroSignup('investor', fields)
}
