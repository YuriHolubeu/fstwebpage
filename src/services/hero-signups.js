import {
  SUPABASE_TABLES,
  currentSourcePath,
  insertRow,
  isSupabaseConfigured,
  normalizeEmail
} from 'src/lib/supabase-client'

export function isHeroSignupStorageConfigured () {
  return isSupabaseConfigured()
}

function heroPayload ({ name, email, message }) {
  return {
    name: name.trim(),
    email: normalizeEmail(email),
    message: message?.trim() || null,
    source_path: currentSourcePath()
  }
}

async function saveHeroSignup (table, fields) {
  return insertRow({
    table,
    payload: heroPayload(fields),
    treatConflictAsSuccess: true
  })
}

export function saveWaitlistSignup (fields) {
  return saveHeroSignup(SUPABASE_TABLES.waiters, fields)
}

export function saveVipSignup (fields) {
  return saveHeroSignup(SUPABASE_TABLES.heroVip, fields)
}

export function saveInvestorSignup (fields) {
  return saveHeroSignup(SUPABASE_TABLES.potInvestors, fields)
}
