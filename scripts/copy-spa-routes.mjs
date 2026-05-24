/**
 * GitHub Pages returns HTTP 404 for SPA history routes when only 404.html exists.
 * Copy index.html into each public route folder so /project/ etc. return 200 for Google.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITEMAP_PATHS } from '../src/constants/sitemap.js'

export function copySpaRoutes (dist = 'docs') {
  const indexPath = join(dist, 'index.html')

  if (!existsSync(indexPath)) {
    throw new Error(`[gh-pages] Missing ${indexPath}. Run npm run build first.`)
  }

  const html = readFileSync(indexPath, 'utf8')

  for (const routePath of [...SITEMAP_PATHS.map(({ path }) => path), '/project']) {
    const segments = routePath.replace(/^\//, '').split('/').filter(Boolean)
    if (segments.length === 0) continue
    const dir = join(dist, ...segments)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), html)
  }

  console.log(
    `[gh-pages] Wrote index.html for ${SITEMAP_PATHS.length + 1} routes (HTTP 200 for Search Console).`
  )
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  copySpaRoutes()
}
