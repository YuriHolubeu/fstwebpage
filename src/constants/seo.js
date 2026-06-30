import { SITE } from 'src/constants/site'
import { SITE_URL } from 'src/constants/sitemap'

export const SEO_DEFAULTS = {
  siteName: SITE.projectName,
  siteUrl: SITE_URL,
  title: `${SITE.projectName} — Environment for Real Breakthroughs`,
  description: SITE.tagline,
  image: `${SITE_URL}/icons/favicon-512x512.png`,
  locale: 'en_US',
  twitterCard: 'summary_large_image'
}

/** Per-route SEO — keys match route `name` in src/router/routes.js */
export const SEO_BY_ROUTE = {
  'investor-project': {
    title: `${SITE.projectName} — Research workspace with AI`,
    description:
      'Professional research environment: structure papers, citations, LaTeX, PDFs, and AI features for deeper insights.',
    path: '/project'
  },
  'investor-ai-groups': {
    title: `AI grouping — ${SITE.projectName}`,
    description: 'Organize your whole research project by meaning with AI-powered grouping.',
    path: '/ai-groups'
  },
  'investor-explain-fragment': {
    title: `Tree of AI explanation — ${SITE.projectName}`,
    description: 'Zoom into one fragment, ask questions, and build an explanation tree with AI.',
    path: '/explain-fragment'
  },
  'investor-research-mentor': {
    title: `AI research mentor — ${SITE.projectName}`,
    description: 'AI mentor for research direction, methods, and structured thinking.',
    path: '/research-mentor'
  },
  'investor-education': {
    title: `Education — ${SITE.projectName}`,
    description: 'Structured learning for students and schools with the same research-grade workflow.',
    path: '/education'
  },
  'investor-careers': {
    title: `Careers — ${SITE.projectName}`,
    description: 'Join the team building the research environment of the future. Engineering, AI, UX, and growth.',
    path: '/careers'
  },
  'investor-future': {
    title: `Roadmap — ${SITE.projectName}`,
    description: 'Project history, milestones, and plans for releases and growth.',
    path: '/future'
  },
  'investor-resources': {
    title: `FAQ — ${SITE.projectName}`,
    description: 'Answers to common questions about the product, waitlist, VIP, and partnerships.',
    path: '/resources'
  },
  'investor-preorder': {
    title: `Founder pre-order — ${SITE.projectName}`,
    description:
      'Founder pre-order $7 + VAT. From ~$8.50 total in the EU. Exact total shown before you pay.',
    path: '/preorder'
  },
  'investor-preorder-success': {
    title: `Pre-order confirmed — ${SITE.projectName}`,
    description: 'Thank you for your founder pre-order.',
    path: '/preorder/success'
  }
}

export function resolveSeoForRoute (route) {
  const named = route.name && SEO_BY_ROUTE[route.name]
  if (named) {
    return {
      ...SEO_DEFAULTS,
      ...named,
      canonical: `${SEO_DEFAULTS.siteUrl}${named.path}`
    }
  }

  return {
    ...SEO_DEFAULTS,
    path: route.path || '/project',
    canonical: `${SEO_DEFAULTS.siteUrl}${route.path || '/project'}`
  }
}
