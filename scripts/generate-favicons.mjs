/**
 * Build favicons from src/assets/app-icon.svg (same asset as the navbar logo).
 */
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import toIco from 'to-ico'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, 'src/assets/app-icon.svg')
const publicDir = join(root, 'public')
const iconsDir = join(publicDir, 'icons')

const sizes = [16, 32, 48, 96, 128, 192, 512]
const icoSizes = [16, 32, 48]

mkdirSync(iconsDir, { recursive: true })
copyFileSync(source, join(publicDir, 'favicon.svg'))

function renderIcon (size) {
  return sharp(source, { density: 300 })
    .resize(size, size, { fit: 'contain', background: { r: 26, g: 44, b: 51, alpha: 1 } })
    .png()
}

for (const size of sizes) {
  await renderIcon(size).toFile(join(iconsDir, `favicon-${size}x${size}.png`))
}

const icoBuffers = await Promise.all(icoSizes.map((size) => renderIcon(size).toBuffer()))
writeFileSync(join(publicDir, 'favicon.ico'), await toIco(icoBuffers))

const manifest = {
  name: 'Focus Structure Tool',
  short_name: 'Focus Structure',
  icons: [
    { src: '/icons/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icons/favicon-512x512.png', sizes: '512x512', type: 'image/png' }
  ],
  theme_color: '#1a2c33',
  background_color: '#1a2c33',
  display: 'standalone'
}

writeFileSync(
  join(publicDir, 'site.webmanifest'),
  `${JSON.stringify(manifest, null, 2)}\n`
)

console.log('[favicons] Generated from src/assets/app-icon.svg')
