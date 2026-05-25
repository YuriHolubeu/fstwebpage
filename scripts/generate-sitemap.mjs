/**
 * Writes public/sitemap.xml and public/robots.txt for GitHub Pages / focusstructure.com
 */
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_URL, SITEMAP_PATHS } from '../src/constants/sitemap.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const baseUrl = (process.env.SITEMAP_BASE_URL || SITE_URL).replace(/\/$/, '')
const lastmod = new Date().toISOString().slice(0, 10)

const urlEntries = SITEMAP_PATHS.map(({ path, changefreq, priority }) => {
  const loc = path === '/' ? `${baseUrl}/` : `${baseUrl}${path}/`
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}).join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap)
writeFileSync(join(publicDir, 'robots.txt'), robots)

console.log(`[sitemap] Wrote ${SITEMAP_PATHS.length} URLs to public/sitemap.xml (${baseUrl})`)
