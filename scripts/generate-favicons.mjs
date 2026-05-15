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

const sizes = [16, 32, 96, 128]
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

console.log('[favicons] Generated from src/assets/app-icon.svg')
