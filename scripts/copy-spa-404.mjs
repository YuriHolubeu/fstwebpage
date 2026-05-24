/**
 * GitHub Pages has no native SPA fallback. For history-mode routes (/careers, …),
 * serve a 404.html that redirects to /?/<path> so index.html can restore the URL.
 * https://github.com/rafgraph/spa-github-pages
 */
import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const SEGMENT_COUNT = 0 // custom domain at site root (focusstructure.com)

const REDIRECT_404_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Focus Structure Tool</title>
    <script type="text/javascript">
      var segmentCount = ${SEGMENT_COUNT};
      var locationRef = window.location;
      locationRef.replace(
        locationRef.protocol + '//' + locationRef.hostname + (locationRef.port ? ':' + locationRef.port : '') +
        locationRef.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?/' +
        locationRef.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
        (locationRef.search ? '&' + locationRef.search.slice(1).replace(/&/g, '~and~') : '') +
        locationRef.hash
      );
    </script>
  </head>
  <body></body>
</html>
`

export function copySpa404 (dist = 'docs') {
  const index = join(dist, 'index.html')
  const notFound = join(dist, '404.html')

  if (!existsSync(index)) {
    throw new Error(`[gh-pages] Missing ${index}. Build the app before copying 404.html.`)
  }

  writeFileSync(notFound, REDIRECT_404_HTML)
  console.log(`[gh-pages] Wrote ${notFound} (SPA redirect for direct URL reloads).`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  copySpa404()
}
