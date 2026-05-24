<template>
  <q-page class="careers-page q-pa-md q-pb-xl column items-center">
    <section class="careers-hero q-mb-xl text-center column items-center">
      <h1 class="text-h3 text-weight-bold text-white q-mb-md">
        Careers at {{ SITE.projectName }}
      </h1>
      <p class="text-body1 text-grey-4 careers-hero__lead">
        Join a small, ambitious team at an early stage and help shape how scientists
        work for the next decade.
      </p>
    </section>

    <section class="careers-section careers-positions column items-center text-center q-mb-xl">
      <h2 class="careers-section__title text-h5 text-weight-bold q-mb-md">
        Open Positions
      </h2>

      <div class="careers-positions__list">
        <article
          v-for="position in openPositions"
          :key="position.title"
          class="careers-position-card"
        >
          <div class="careers-position-card__header row no-wrap items-center">
            <div
              class="careers-card__icon-wrap flex flex-center"
              :class="`careers-card__icon-wrap--${position.tone}`"
            >
              <q-icon :name="position.icon" size="20px" :color="position.iconColor" />
            </div>
            <div class="careers-position-card__heading text-left">
              <h3 class="careers-position-card__title q-ma-none">{{ position.title }}</h3>
              <p class="careers-position-card__levels q-ma-none">{{ position.levelsLabel }}</p>
            </div>
          </div>
          

          <div class="careers-position-card__requirements row q-col-gutter-lg">
            <div class="col-12 col-md-6">
              <h4 class="careers-requirements__label q-ma-none">Must have</h4>
              <ul class="careers-requirements__list q-pl-md q-ma-none">
                <li
                  v-for="item in position.mustHave"
                  :key="item"
                  class="careers-requirements__item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="col-12 col-md-6">
              <h4 class="careers-requirements__label careers-requirements__label--optional q-ma-none">
                Nice to have
              </h4>
              <ul class="careers-requirements__list q-pl-md q-ma-none">
                <li
                  v-for="item in position.niceToHave"
                  :key="item"
                  class="careers-requirements__item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>

      <p class="careers-positions__note text-body1 q-mt-lg q-mb-none">
        If you think that you can contribute to {{ SITE.projectName }} in another way that's not listed here, please reach out!
      </p>
    </section>

    <section class="careers-section column items-center text-center q-mb-xl">
      <h2 class="careers-section__title text-h5 text-weight-bold q-mb-md">
        Why work with us
      </h2>
      <div class="careers-cards">
        <article
          v-for="item in whyJoin"
          :key="item.title"
          class="careers-card"
        >
          <div class="careers-card__header row no-wrap items-center">
            <div
              class="careers-card__icon-wrap flex flex-center"
              :class="`careers-card__icon-wrap--${item.tone}`"
            >
              <q-icon :name="item.icon" size="20px" :color="item.iconColor" />
            </div>
            <h3 class="careers-card__title q-ma-none">{{ item.title }}</h3>
          </div>
          <p class="careers-card__text q-mb-none">{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="careers-cta column items-center text-center">
      <h2 class="careers-section__title text-h5 text-weight-bold q-mb-md">
        How to apply
      </h2>
      <p class="careers-cta__text text-body1 q-mb-md">
        To apply, please send your resume, cover letter, portfolio (if applicable), and Github profile (if applicable) to 
        <a :href="contactMailto" class="careers-cta__link">{{ SITE.contactEmail }}</a>
      </p>
    </section>
  </q-page>
</template>

<script setup>
import { SITE } from 'src/constants/site'
import { useContactUiStore } from 'src/stores/contact-ui'

const contact = useContactUiStore()
const contactMailto = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent('Careers — Focus Structure Tool')}`

const whyJoin = [
  {
    icon: 'science',
    tone: 'teal',
    iconColor: 'teal-3',
    title: 'Real improvement of science',
    text:
      'We have a clear plan to improve how science is done. Your work here will matter for researchers worldwide.'
  },
  {
    icon: 'trending_up',
    tone: 'mint',
    iconColor: 'light-green-3',
    title: 'Fast growth for early joiners',
    text:
      'We are still a small startup, and that is the opportunity. Join now and you can grow with the company quickly — within six months, strong contributors can move into leading, well-paid roles as we ship results and scale.'
  }
]

const openPositions = [
  {
    icon: 'web',
    tone: 'teal',
    iconColor: 'teal-3',
    title: 'Front-end developer',
    levelsLabel: 'Mid-level (3+ years) or senior (5+ years)',
    mustHave: [
      'Strong experience with modern front-end frameworks, especially React and Vue',
      'Experience building desktop apps with Electron or a comparable cross-platform framework',
      'Comfortable with mathematics at a basic level',
      'Experience implementing graph and tree-based structures in application UI or logic',
      'Knowledge of front-end performance optimization techniques',
      'Fluent written and spoken English'
    ],
    niceToHave: [
      'Russian language skills',
      'Some backend development experience',
      'Experience working alongside senior developers',
      'Strong sense of visual design and UI polish'
    ]
  },
  {
    icon: 'manage_accounts',
    tone: 'blue',
    iconColor: 'light-blue-3',
    title: 'Project manager',
    levelsLabel: '3+ years of startup management experience',
    mustHave: [
      '3+ years of experience managing startups',
      'Proven ability to scale a startup through growth stages',
      'Experience hiring, onboarding, and managing new programmers',
      'Strong planning, prioritization, and delivery skills',
      'Fluent written and spoken English'
    ],
    niceToHave: [
      'Experience in early-stage product or SaaS companies',
      'Technical background or strong comfort working with engineering teams',
      'Russian language skills',
      'Experience coordinating remote or distributed teams'
    ]
  }
]
</script>

<style scoped>
.careers-page {
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  color: var(--site-text-body);
}

.careers-hero {
  width: 100%;
  max-width: 820px;
}

.careers-hero__lead {
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.62;
}

.careers-section {
  width: 100%;
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
}

.careers-section__title {
  width: 100%;
  color: var(--site-text-heading);
  letter-spacing: -0.01em;
}

.careers-section__intro {
  max-width: 640px;
  color: var(--site-text-muted);
  line-height: 1.62;
}

.careers-cards {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.careers-card {
  padding: 0.85rem 0;
}

.careers-card__header {
  gap: 0.75rem;
  margin-bottom: 0.35rem;
}

.careers-card__icon-wrap {
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: 1.5px solid transparent;
}

.careers-card__icon-wrap--teal {
  background: rgba(11, 195, 171, 0.22) !important;
  border-color: #5eead4 !important;
}

.careers-card__icon-wrap--blue {
  background: rgba(3, 117, 204, 0.28) !important;
  border-color: #7dd3fc !important;
}

.careers-card__icon-wrap--mint {
  background: rgba(125, 206, 184, 0.2) !important;
  border-color: #7dceb8 !important;
}

.careers-card__icon-wrap--cyan {
  background: rgba(34, 211, 238, 0.18) !important;
  border-color: #67e8f9 !important;
}

.careers-card__title {
  flex: 1;
  min-width: 0;
  color: var(--site-text-heading);
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
}

.careers-card__text {
  margin-left: calc(2.25rem + 0.75rem);
  color: var(--site-text-muted);
  font-size: 1.05rem;
  line-height: 1.55;
}

.careers-positions__note {
  max-width: 640px;
  color: var(--site-text-muted);
  line-height: 1.62;
  text-align: center;
}

.careers-positions {
  max-width: 900px;
}

.careers-positions__list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  text-align: left;
}

.careers-position-card {
  width: 100%;
  padding: 1.25rem 1.35rem;
  border-radius: 12px;
  border: 1px solid rgba(94, 234, 212, 0.22);
  background: rgba(8, 24, 30, 0.55);
}

.careers-position-card__header {
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.careers-position-card__heading {
  flex: 1;
  min-width: 0;
}

.careers-position-card__title {
  color: var(--site-text-heading);
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.3;
}

.careers-position-card__levels {
  margin-top: 0.25rem;
  color: var(--site-text-soft);
  font-size: 0.95rem;
  line-height: 1.4;
}

.careers-position-card__requirements {
  width: 100%;
}

.careers-requirements__label {
  margin-bottom: 0.5rem;
  color: var(--site-text-heading);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.careers-requirements__label--optional {
  color: var(--site-text-soft);
}

.careers-requirements__list {
  color: var(--site-text-muted);
  font-size: 1.02rem;
  line-height: 1.55;
}

.careers-requirements__item + .careers-requirements__item {
  margin-top: 0.35rem;
}

.careers-cta {
  width: 100%;
  max-width: 640px;
  margin-top: 0.5rem;
}

.careers-cta__text {
  color: var(--site-text-muted);
  line-height: 1.62;
}

.careers-cta__text strong {
  color: var(--site-text-accent-soft);
}

.careers-cta__btn {
  border-radius: 10px;
  font-weight: 600;
}

.careers-cta__email {
  color: var(--site-text-soft);
}

.careers-cta__link {
  color: var(--site-text-accent);
  font-weight: 600;
  text-decoration: none;
}

.careers-cta__link:hover {
  text-decoration: underline;
}

@media (max-width: 599px) {
  .careers-card__text {
    margin-left: calc(2.25rem + 0.75rem);
    font-size: 1rem;
  }

  .careers-position-card {
    padding: 1rem 1.05rem;
  }
}
</style>
