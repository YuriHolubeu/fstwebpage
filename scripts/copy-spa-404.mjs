/**
 * GitHub Pages has no SPA fallback. Serving 404.html for unknown paths
 * lets Vue Router (history mode) handle /project, /invest, etc.
 */
import { copyFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'docs'
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))
