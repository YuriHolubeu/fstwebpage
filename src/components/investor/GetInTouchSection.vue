<template>
  <section class="get-in-touch q-pt-xl q-mt-lg q-mb-md column items-center">
    <div class="get-in-touch__heading text-center q-mb-lg full-width">
      <div class="get-in-touch__overline text-overline q-mb-xs">Contact</div>
      <h2 class="text-h5 text-weight-bold q-mb-sm">
        Get in touch
      </h2>
      <p class="text-caption q-mb-none get-in-touch__intro">
        Questions, demos, or partnership inquiries — we are happy to hear from you.
      </p>
    </div>

    <div class="get-in-touch__panel column items-center text-center">
      <q-icon name="mail" size="28px" class="get-in-touch__icon q-mb-sm" />
      <a
        :href="contactMailto"
        class="get-in-touch__email text-body1 text-weight-medium"
      >
        {{ SITE.contactEmail }}
      </a>
    </div>
  </section>
</template>

<script setup>
import { SITE } from 'src/constants/site'

const contactMailto = `mailto:${SITE.contactEmail}`
</script>

<style scoped>
.get-in-touch {
  width: 100%;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  scroll-margin-top: 96px;
}

.get-in-touch__overline {
  color: var(--site-text-soft);
  letter-spacing: 0.12em;
}

.get-in-touch__heading h2 {
  color: var(--site-text-heading);
}

.get-in-touch__intro {
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
  color: var(--site-text-muted);
  line-height: 1.5;
}

.get-in-touch__panel {
  width: 100%;
  padding: 1.5rem 1.75rem;
  border-radius: 18px;
  border: 1px solid rgba(11, 195, 171, 0.22);
  background: rgba(26, 44, 51, 0.55);
}

.get-in-touch__icon {
  color: var(--site-text-soft);
}

.get-in-touch__email {
  color: var(--site-text-accent);
  text-decoration: none;
  word-break: break-word;
  transition: color 0.2s ease;
}

.get-in-touch__email:hover {
  color: var(--site-text-accent-soft);
  text-decoration: underline;
}
</style>
