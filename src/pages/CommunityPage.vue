<template>
  <q-page class="community-page q-pa-md q-pb-xl column items-center">
    <section class="community-hero q-mb-xl text-center column items-center full-width">
      <h1 class="text-h4 text-weight-bold community-hero__title q-mb-md">
        Community
      </h1>
      <p class="community-hero__lead text-body1 q-ma-none">
        This app is a platform—but its real value lies in the people who use it.
      </p>
    </section>

    <section class="community-list full-width column items-center">
      <div class="community-list__items">
        <article
          v-for="item in communityPoints"
          :key="item.title"
          class="community-item"
        >
          <div class="community-item__header row no-wrap items-center">
            <div
              class="community-item__icon-wrap flex flex-center"
              :class="`community-item__icon-wrap--${item.tone}`"
            >
              <q-icon :name="item.icon" size="20px" :color="item.iconColor" />
            </div>
            <h2 class="community-item__title q-ma-none">{{ item.title }}</h2>
          </div>
          <p class="community-item__text q-mb-none">{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="community-cta column items-center text-center q-mt-xl">
      <h2 class="community-cta__title text-h5 text-weight-bold q-mb-md">
        Get involved
      </h2>
      <p class="community-cta__text text-body1 q-mb-md">
        If this resonates with you, we would love to hear from you. Follow us on social media to stay
        updated, or write to us if you would like to contribute to the project.
      </p>
      <SocialChannelButtons class="community-cta__social q-mb-lg" />
      <p class="community-cta__text text-body1 q-mb-none">
        Email us at
        <a :href="contactMailto" class="community-cta__link">{{ SITE.contactEmail }}</a>
      </p>
    </section>
  </q-page>
</template>

<script setup>
import SocialChannelButtons from 'src/components/investor/SocialChannelButtons.vue'
import { SITE } from 'src/constants/site'

const contactMailto = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent('Community — Focus Structure Tool')}`

const communityPoints = [
  {
    icon: 'groups',
    tone: 'teal',
    iconColor: 'teal-3',
    title: 'People who love science',
    text:
      'We want to build a community of people who enjoy doing science and take pride in being professionals in their fields.'
  },
  {
    icon: 'construction',
    tone: 'blue',
    iconColor: 'light-blue-3',
    title: 'Growing soon',
    text:
      'The app is still in development, so this community does not exist yet—but we expect it to start growing soon.'
  }
]
</script>

<style scoped>
.community-page {
  width: 100%;
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
  color: var(--site-text-body);
}

.community-hero {
  max-width: 720px;
}

.community-hero__title {
  color: var(--site-text-heading);
  letter-spacing: -0.02em;
}

.community-hero__lead {
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  color: var(--site-text-muted);
  line-height: 1.62;
}

.community-list {
  max-width: 820px;
}

.community-list__items {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.community-item {
  padding: 0.85rem 0;
}

.community-item__header {
  gap: 0.75rem;
  margin-bottom: 0.35rem;
}

.community-item__icon-wrap {
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: 1.5px solid transparent;
}

.community-item__icon-wrap--teal {
  background: rgba(11, 195, 171, 0.22) !important;
  border-color: #5eead4 !important;
}

.community-item__icon-wrap--blue {
  background: rgba(3, 117, 204, 0.28) !important;
  border-color: #7dd3fc !important;
}

.community-item__title {
  flex: 1;
  min-width: 0;
  color: var(--site-text-heading);
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
}

.community-item__text {
  margin-left: calc(2.25rem + 0.75rem);
  color: var(--site-text-muted);
  font-size: 1.05rem;
  line-height: 1.55;
}

.community-cta {
  max-width: 640px;
}

.community-cta__title {
  color: var(--site-text-heading);
}

.community-cta__text {
  color: var(--site-text-muted);
  line-height: 1.62;
}

.community-cta__social {
  justify-content: center;
}

.community-cta__link {
  color: var(--site-text-accent);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.community-cta__link:hover {
  color: var(--site-text-accent-soft);
  text-decoration: underline;
}

@media (max-width: 599px) {
  .community-item__text {
    font-size: 1rem;
  }
}
</style>
