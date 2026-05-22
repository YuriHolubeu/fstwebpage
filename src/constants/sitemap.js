/**
 * Public routes for sitemap.xml — keep in sync with src/router/routes.js
 * (exclude redirects and error pages).
 */
export const SITE_URL = 'https://focusstructure.com'

export const SITEMAP_PATHS = [
  { path: '/project', changefreq: 'weekly', priority: '1.0' },
  { path: '/ai-groups', changefreq: 'monthly', priority: '0.8' },
  { path: '/explain-fragment', changefreq: 'monthly', priority: '0.8' },
  { path: '/research-mentor', changefreq: 'monthly', priority: '0.8' },
  { path: '/education', changefreq: 'monthly', priority: '0.7' },
  { path: '/future', changefreq: 'monthly', priority: '0.6' },
  { path: '/resources', changefreq: 'monthly', priority: '0.6' }
]
