import {
  SUPABASE_TABLES,
  insertRow,
  isSupabaseConfigured,
  normalizeEmail
} from 'src/lib/supabase-client'

export function isContactStorageConfigured () {
  return isSupabaseConfigured()
}

export async function saveContactMessage ({ name, email, message }) {
  await insertRow({
    table: SUPABASE_TABLES.contact,
    payload: {
      name: name.trim(),
      email: normalizeEmail(email),
      message: message.trim()
    }
  })
}
