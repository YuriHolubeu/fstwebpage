<template>
  <q-list class="faq-list">
    <q-expansion-item
      v-for="item in items"
      :key="item.question"
      expand-separator
      :label="item.question"
      header-class="faq-item__header"
      class="faq-item"
      :default-opened="defaultOpened"
    >
      <div
        v-if="item.answerHtml"
        class="faq-item__answer text-body2"
        v-html="item.answerHtml"
      />
      <div v-else class="faq-item__answer text-body2">
        {{ item.answer }}
      </div>
    </q-expansion-item>
  </q-list>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  },
  defaultOpened: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.faq-list {
  width: 100%;
  border-radius: 18px;
  border: 1px solid rgba(11, 195, 171, 0.22);
  background: rgba(26, 44, 51, 0.55);
  overflow: hidden;
}

.faq-list :deep(.faq-item) {
  color: var(--site-text-body);
}

.faq-list :deep(.faq-item__header) {
  color: var(--site-text-heading);
  font-weight: 600;
  padding: 1rem 1.15rem;
}

.faq-list :deep(.q-item__label) {
  line-height: 1.45;
}

.faq-list :deep(.q-expansion-item__toggle-icon) {
  color: var(--site-text-soft);
}

.faq-list :deep(.q-separator) {
  background: rgba(11, 195, 171, 0.15);
}

.faq-item__answer {
  padding: 0 1.15rem 1.1rem;
  max-width: none;
  margin: 0;
  line-height: 1.65;
  color: var(--site-text-body);
}

.faq-item__answer :deep(.faq-item__link) {
  color: var(--site-text-accent);
  text-decoration: underline;
  text-underline-offset: 0.14em;
  transition: color 0.2s ease;
}

.faq-item__answer :deep(.faq-item__link:hover) {
  color: var(--site-text-accent-soft);
}
</style>
