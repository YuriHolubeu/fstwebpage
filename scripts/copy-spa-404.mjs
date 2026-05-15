/**
 * GitHub Pages has no SPA fallback. For history-mode routes (/project, …),
 * GitHub must serve docs/404.html (a copy of index.html) for missing paths.
 */
import { copyFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

export function copySpa404 (dist = 'docs') {
  const index = join(dist, 'index.html')
  const notFound = join(dist, '404.html')

  if (!existsSync(index)) {
    throw new Error(`[gh-pages] Missing ${index}. Build the app before copying 404.html.`)
  }

  copyFileSync(index, notFound)
  console.log(`[gh-pages] Wrote ${notFound} — commit and push this file with each production build.`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  copySpa404()
}
