<template>
  <q-page class="resources-page q-pa-md q-pb-xl column items-center">
    <section class="resources-hero q-mb-xl text-center column items-center full-width">
      <h1 class="text-h4 text-weight-bold resources-hero__title q-mb-none">
        Answers to other questions
      </h1>
    </section>

    <section class="resources-faq-wrap full-width column items-center">
      <FaqList :items="RESOURCE_FAQ_ITEMS" />
    </section>
  </q-page>
</template>

<script setup>
import FaqList from 'src/components/investor/FaqList.vue'
import { RESOURCE_FAQ_ITEMS } from 'src/constants/faqs'
</script>

<style scoped>
.resources-page {
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}

.resources-hero__title {
  color: var(--site-text-heading);
  letter-spacing: -0.02em;
}

.resources-faq-wrap {
  max-width: 720px;
}
</style>
