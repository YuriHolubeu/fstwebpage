#!/usr/bin/env node
/**
 * Ensures Supabase env vars exist before production builds.
 * Loads .env.local when present (local dev). In CI, use repository secrets.
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const ENV_LOCAL = path.join(ROOT, '.env.local')

function loadEnvFile (filePath) {
  if (!fs.existsSync(filePath)) return

  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const eq = trimmed.indexOf('=')
    if (eq === -1) continue

    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}

loadEnvFile(ENV_LOCAL)

const REQUIRED = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY']
const missing = REQUIRED.filter((key) => !process.env[key]?.trim())

if (missing.length === 0) {
  const url = process.env.VITE_SUPABASE_URL.trim()
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(url)) {
    console.warn(`[supabase-env] Unexpected VITE_SUPABASE_URL format: ${url}`)
  }
  process.exit(0)
}

const message = `[supabase-env] Missing: ${missing.join(', ')}`

if (process.env.CI === 'true' || process.env.REQUIRE_SUPABASE_ENV === '1') {
  console.error(message)
  console.error('Set GitHub Actions secrets or create .env.local from .env.example.')
  process.exit(1)
}

console.warn(`${message} (build continues; forms will not persist until configured)`)
