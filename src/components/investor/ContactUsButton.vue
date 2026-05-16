<template>
  <q-btn
    unelevated
    no-caps
    padding="sm lg"
    class="contact-inline-btn"
    :class="{ 'contact-inline-btn--solid': !outline && !flat }"
    :outline="outline"
    :flat="flat"
    :size="size"
    :label="label"
    :color="outline ? 'primary' : flat ? undefined : 'primary'"
    :text-color="outline || flat ? undefined : 'white'"
    icon-right="arrow_forward"
    @click="contact.openDialog()"
  />
</template>

<script setup>
import { useContactUiStore } from 'src/stores/contact-ui'

defineProps({
  label: { type: String, default: 'Contact us' },
  outline: { type: Boolean, default: false },
  flat: { type: Boolean, default: false },
  size: { type: String, default: 'md' }
})

const contact = useContactUiStore()
</script>

<style scoped>
/* Solid CTA tuned for slate + teal palette */
.contact-inline-btn {
  border-radius: 12px;
  font-weight: 600;
}

.contact-inline-btn--solid {
  background: linear-gradient(135deg, #0bc3ab 0%, #0375cc 48%, #0660a8 100%) !important;
  color: var(--site-text-high) !important;
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 4px 16px rgba(3, 117, 204, 0.4);
  text-shadow: 0 1px 2px rgba(19, 48, 49, 0.45);
}

.contact-inline-btn--solid :deep(.q-btn__wrapper) {
  color: var(--site-text-high) !important;
}

.contact-inline-btn--solid :deep(.q-icon) {
  color: var(--site-text-body) !important;
  opacity: 0.95;
}

.contact-inline-btn--solid:hover :deep(.q-focus-helper) {
  opacity: 0.18 !important;
}

.contact-inline-btn.q-btn--outline {
  color: var(--site-text-body) !important;
  border-color: rgba(11, 195, 171, 0.55) !important;
  background: rgba(3, 117, 204, 0.14) !important;
}

.contact-inline-btn.q-btn--outline :deep(.q-btn__wrapper),
.contact-inline-btn.q-btn--outline :deep(.q-icon) {
  color: var(--site-text-body) !important;
}

.contact-inline-btn.q-btn--flat {
  color: #a5f3fc !important;
}

.contact-inline-btn.q-btn--flat :deep(.q-icon) {
  color: var(--site-text-muted) !important;
}
</style>
