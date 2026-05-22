<template>
  <q-page class="careers-page q-pa-md q-pb-xl column items-center">
    <section class="careers-hero q-mb-xl text-center column items-center">
      <h1 class="text-h3 text-weight-bold text-white q-mb-md">
        Careers at {{ SITE.projectName }}
      </h1>
      <p class="text-body1 text-grey-4 careers-hero__lead">
        We are building a professional research environment where structure, focus, and AI work
        together. Join a small, ambitious team at an early stage and help shape how scientists
        work for the next decade.
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

    <section class="careers-section column items-center text-center q-mb-xl">
      <h2 class="careers-section__title text-h5 text-weight-bold q-mb-md">
        Areas we are growing in
      </h2>
      <p class="careers-section__intro text-body1 q-mb-lg">
        We do not always have a fixed job post open. If your profile fits one of these areas,
        send us a short note — we read every message.
      </p>
      <div class="careers-roles row wrap justify-center q-gutter-md">
        <q-card
          v-for="role in openAreas"
          :key="role.title"
          flat
          bordered
          class="careers-role-card"
        >
          <q-card-section class="column items-center text-center">
            <q-icon :name="role.icon" size="32px" color="cyan-4" class="q-mb-sm" />
            <div class="text-subtitle1 text-weight-bold careers-role-card__title">
              {{ role.title }}
            </div>
            <p class="text-body2 text-grey-5 q-ma-none careers-role-card__text">
              {{ role.summary }}
            </p>
            <q-chip dense outline color="cyan-4" text-color="grey-3" class="q-mt-sm">
              {{ role.status }}
            </q-chip>
          </q-card-section>
        </q-card>
      </div>
    </section>

    <section class="careers-cta column items-center text-center">
      <h2 class="careers-section__title text-h5 text-weight-bold q-mb-md">
        How to apply
      </h2>
      <p class="careers-cta__text text-body1 q-mb-md">
        Email us your CV or LinkedIn, what you want to work on, and links to code or projects
        (if any). Use the contact form and mention <strong>Careers</strong> in your message.
      </p>
      <div class="row q-gutter-sm justify-center">
        <q-btn
          unelevated
          no-caps
          color="primary"
          icon="mail"
          label="Contact us"
          class="careers-cta__btn"
          @click="contact.openDialog()"
        />
        <q-btn
          outline
          no-caps
          color="cyan-4"
          icon="send"
          label="Email directly"
          class="careers-cta__btn"
          :href="contactMailto"
          tag="a"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
      <p class="careers-cta__email text-body2 q-mt-md q-mb-none">
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
    title: 'Hard problems that matter',
    text:
      'Research workflows, LaTeX, citations, PDFs, and AI that respects structure — not another generic chat wrapper.'
  },
  {
    icon: 'groups',
    tone: 'blue',
    iconColor: 'light-blue-3',
    title: 'Small team, real ownership',
    text:
      'Early-stage means your decisions shape the product, stack, and culture — not a ticket queue in a giant org.'
  },
  {
    icon: 'public',
    tone: 'cyan',
    iconColor: 'cyan-3',
    title: 'Remote-friendly, mission-first',
    text:
      'We care about output and clarity. Location is flexible; communication and craft are not.'
  },
  {
    icon: 'trending_up',
    tone: 'mint',
    iconColor: 'light-green-3',
    title: 'Room to grow with the company',
    text:
      'As we ship releases and grow users, strong contributors can take on more scope and leadership.'
  }
]

const openAreas = [
  {
    icon: 'code',
    title: 'Software engineering',
    summary: 'Frontend (Vue/Quasar), backend, DevOps, and product-quality tooling.',
    status: 'Open to inquiries'
  },
  {
    icon: 'psychology',
    title: 'AI / ML',
    summary: 'LLM integrations, retrieval, and features that fit real research workflows.',
    status: 'Open to inquiries'
  },
  {
    icon: 'design_services',
    title: 'Product & UX',
    summary: 'Complex scientific UIs, onboarding, and clarity for power users.',
    status: 'Open to inquiries'
  },
  {
    icon: 'campaign',
    title: 'Growth & partnerships',
    summary: 'Research communities, universities, labs, and go-to-market experiments.',
    status: 'Open to inquiries'
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

.careers-roles {
  width: 100%;
  max-width: 900px;
}

.careers-role-card {
  width: 100%;
  max-width: 260px;
  background: rgba(8, 24, 30, 0.55);
  border-color: rgba(94, 234, 212, 0.22) !important;
  border-radius: 12px;
}

.careers-role-card__title {
  color: var(--site-text-heading);
}

.careers-role-card__text {
  line-height: 1.5;
  min-height: 3.5rem;
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

  .careers-role-card {
    max-width: 100%;
  }
}
</style>
