import {
  currentSourcePath,
  isApiConfigured,
  normalizeEmail,
  postJson
} from 'src/lib/api-client'

export function isContactStorageConfigured () {
  return isApiConfigured()
}

export async function saveContactMessage ({ name, email, message }) {
  await postJson('/api/leads/contact/', {
    name: name.trim(),
    email: normalizeEmail(email),
    message: message.trim(),
    source_path: currentSourcePath()
  })
}
