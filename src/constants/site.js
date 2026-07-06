/**
 * Central copy and links — adjust for your pitch.
 */
export const SITE = {
  projectName: 'Focus Structure Tool',
  /** Django API for forms and billing — override with VITE_API_BASE_URL if needed */
  apiBaseUrl: 'https://api.focusstructure.com',
  /** Main headline on the Project page hero */
  heroHeadline: 'Environment for Real Breakthroughs',
  tagline: 'The application keeps researchers focused, structures information, and uses AI for deeper insights',
  /** Line shown directly under the hero workshop image */
  heroImageCaption:
    "In conclusion, we propose a tool that brings your own version of Albert Einstein's office into your home.",
  /** Full YouTube embed URL, e.g. https://www.youtube.com/embed/VIDEO_ID — leave empty for placeholder */
  projectDemoVideoEmbedUrl: '',
  contactEmail: 'focus.structure.tool@gmail.com',
  /** Shown in the site footer on every page */
  contactIntro:
    'We welcome your questions, demo requests, and partnership inquiries.',
  /** Founder pre-order landing (/preorder) */
  preorder: {
    headline: 'Founder pre-order',
    priceLabel: '$7 + VAT',
    priceTotalHint: '',
    priceNote: 'Exact total shown before you pay.',
    cta: 'Continue to checkout',
    /** Public Gumroad product link — override with VITE_GUMROAD_PREORDER_URL if needed */
    gumroadUrl: 'https://structfocus.gumroad.com/l/focus-preorder',
    successTitle: 'Thank you — you are in!',
    successBody:
      'Your founder pre-order is confirmed. We will email you when your 3 months of Pro access are ready.',
    successPending:
      'Payment is processing. If you completed checkout, we will confirm by email shortly.'
  },
  social: {
    linkedin: 'https://www.linkedin.com/',
    x: 'https://twitter.com/',
    instagram: 'https://www.instagram.com/focus.structure/',
    youtube: 'https://www.youtube.com/@focusstructure'
  }
}
