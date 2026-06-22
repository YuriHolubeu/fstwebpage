import { resolveSeoForRoute } from 'src/constants/seo'

function upsertMeta (attr, key, content) {
  if (!content) return

  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink (rel, href) {
  if (!href) return

  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function applyRouteSeo (route) {
  if (typeof document === 'undefined') return

  const seo = resolveSeoForRoute(route)
  const title = seo.title || seo.siteName

  document.title = title

  upsertMeta('name', 'description', seo.description)
  upsertMeta('name', 'robots', 'index, follow')
  upsertLink('canonical', seo.canonical)

  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:site_name', seo.siteName)
  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', seo.description)
  upsertMeta('property', 'og:url', seo.canonical)
  upsertMeta('property', 'og:image', seo.image)
  upsertMeta('property', 'og:locale', seo.locale)

  upsertMeta('name', 'twitter:card', seo.twitterCard)
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', seo.description)
  upsertMeta('name', 'twitter:image', seo.image)
}
