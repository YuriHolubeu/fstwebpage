/**
 * GitHub Pages returns HTTP 404 for SPA history routes unless each path has index.html.
 * Copy the built index.html into every public route folder.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SPA_ROUTE_PATHS } from '../src/constants/spa-paths.js'

export function copySpaRoutes (dist = 'docs') {
  const indexPath = join(dist, 'index.html')

  if (!existsSync(indexPath)) {
    throw new Error(`[gh-pages] Missing ${indexPath}. Run npm run build first.`)
  }

  const html = readFileSync(indexPath, 'utf8')
  let written = 0

  for (const routePath of SPA_ROUTE_PATHS) {
    const segments = routePath.replace(/^\//, '').split('/').filter(Boolean)
    if (segments.length === 0) continue

    const dir = join(dist, ...segments)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), html)
    written += 1
  }

  console.log(
    `[gh-pages] Wrote index.html for ${written} routes (direct reloads return HTTP 200).`
  )
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  copySpaRoutes()
}
