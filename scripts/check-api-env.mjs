#!/usr/bin/env node
/**
 * Ensures VITE_API_BASE_URL exists before production builds.
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

const REQUIRED = ['VITE_API_BASE_URL']
const missing = REQUIRED.filter((key) => !process.env[key]?.trim())

if (missing.length === 0) {
  const url = process.env.VITE_API_BASE_URL.trim()
  if (!/^https?:\/\//i.test(url)) {
    console.warn(`[api-env] Unexpected VITE_API_BASE_URL format: ${url}`)
  }
  process.exit(0)
}

const message = `[api-env] Missing: ${missing.join(', ')}`

if (process.env.CI === 'true' || process.env.REQUIRE_API_ENV === '1') {
  console.error(message)
  console.error('Set GitHub Actions secrets or create .env.local from .env.example.')
  process.exit(1)
}

console.warn(`${message} (build continues; forms and checkout will not work until configured)`)
