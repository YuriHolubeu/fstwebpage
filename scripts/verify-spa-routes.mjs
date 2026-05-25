/**
 * Fail the build if route folders are missing from docs/ — prevents accidental
 * commits that wipe GitHub Pages deep links (HTTP 404 in Search Console).
 */
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SPA_ROUTE_PATHS } from '../src/constants/spa-paths.js'

export function verifySpaRoutes (dist = 'docs') {
  const missing = []

  for (const routePath of SPA_ROUTE_PATHS) {
    const segments = routePath.replace(/^\//, '').split('/').filter(Boolean)
    if (segments.length === 0) continue

    const indexPath = join(dist, ...segments, 'index.html')
    if (!existsSync(indexPath)) {
      missing.push(indexPath)
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `[gh-pages] Missing route index files (run full "npm run build", then commit docs/):\n${missing.map((p) => `  - ${p}`).join('\n')}`
    )
  }

  console.log(`[gh-pages] Verified ${SPA_ROUTE_PATHS.length} route index.html files in ${dist}/.`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  verifySpaRoutes()
}
