/**
 * Source photo may be HEIC with a .jpg extension (common from phones).
 * Browsers cannot render HEIC in <img>, so convert to real JPEG for the site.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import convert from 'heic-convert'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, 'IMG_20260521_201720_976.jpg')
const targets = [
  join(root, 'public/images/gallery/ai-week-milan-2026.jpg')
]

function isJpeg (buffer) {
  return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
}

async function main () {
  if (!existsSync(source)) {
    console.log('[gallery] Source image missing; skipping conversion.')
    return
  }

  const input = await readFile(source)

  if (isJpeg(input)) {
    console.log('[gallery] Source is already JPEG; skipping conversion.')
    return
  }

  const output = await convert({
    buffer: input,
    format: 'JPEG',
    quality: 0.92
  })
  const jpeg = Buffer.from(output)

  for (const target of targets) {
    mkdirSync(dirname(target), { recursive: true })
    await writeFile(target, jpeg)
  }

  console.log(`[gallery] Converted HEIC source to JPEG (${jpeg.length} bytes).`)
}

main().catch((error) => {
  console.error('[gallery] Conversion failed:', error.message)
  process.exit(1)
})
