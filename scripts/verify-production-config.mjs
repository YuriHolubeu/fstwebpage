#!/usr/bin/env node
/**
 * Fail the build if production bundles are missing API / Gumroad defaults.
 */
import fs from 'node:fs'
import path from 'node:path'

const DOCS_ASSETS = path.join(process.cwd(), 'docs', 'assets')

function readSiteChunk () {
  if (!fs.existsSync(DOCS_ASSETS)) {
    throw new Error('[verify-production-config] docs/assets/ not found. Run npm run build first.')
  }

  const siteChunk = fs
    .readdirSync(DOCS_ASSETS)
    .find((name) => /^site-.*\.js$/.test(name))

  if (!siteChunk) {
    throw new Error('[verify-production-config] No site-*.js chunk in docs/assets/.')
  }

  return fs.readFileSync(path.join(DOCS_ASSETS, siteChunk), 'utf8')
}

const siteSource = readSiteChunk()
const checks = [
  {
    label: 'apiBaseUrl',
    pattern: /apiBaseUrl:\s*`https:\/\/api\.focusstructure\.com`/
  },
  {
    label: 'gumroadUrl',
    pattern: /gumroadUrl:\s*`https:\/\/structfocus\.gumroad\.com\/l\/focus-preorder`/
  }
]

const missing = checks.filter(({ pattern }) => !pattern.test(siteSource)).map(({ label }) => label)

if (missing.length > 0) {
  console.error(
    `[verify-production-config] Production build is missing: ${missing.join(', ')}`
  )
  console.error('Forms and pre-order will not work until site.js defaults are baked into docs/.')
  process.exit(1)
}

console.log('[verify-production-config] API and Gumroad URLs present in docs/assets site chunk.')
