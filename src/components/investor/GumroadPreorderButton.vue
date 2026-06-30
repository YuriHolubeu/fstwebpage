<template>
  <a
    class="gumroad-preorder-btn"
    :class="[
      variant === 'hero' ? 'gumroad-preorder-btn--hero' : 'gumroad-preorder-btn--preorder',
      btnClass
    ]"
    :href="overlayHref"
    data-gumroad-single-product="true"
  >
    <q-icon v-if="icon" :name="icon" size="1.25em" class="gumroad-preorder-btn__icon" />
    <span>{{ label }}</span>
  </a>
</template>

<script setup>
import { computed } from 'vue'
import { buildGumroadOverlayUrl } from 'src/services/preorder-gumroad'

defineProps({
  label: { type: String, required: true },
  icon: { type: String, default: 'payments' },
  variant: {
    type: String,
    default: 'preorder',
    validator: (v) => ['preorder', 'hero'].includes(v)
  },
  btnClass: { type: [String, Array, Object], default: '' }
})

const overlayHref = computed(() => buildGumroadOverlayUrl())
</script>

<style scoped>
.gumroad-preorder-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.2;
  border-radius: 12px;
  padding: 0.65rem 1.5rem;
  color: var(--site-text-high, #fff) !important;
  transition: filter 0.15s ease, transform 0.15s ease;
}

.gumroad-preorder-btn:hover {
  filter: brightness(1.06);
}

.gumroad-preorder-btn:active {
  transform: scale(0.99);
}

.gumroad-preorder-btn--preorder {
  width: 100%;
  background: linear-gradient(135deg, #0bc3ab 0%, #0375cc 48%, #0660a8 100%) !important;
}

.gumroad-preorder-btn--hero {
  background: linear-gradient(135deg, #7c3aed 0%, #0375cc 55%, #0f766e 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 4px 16px rgba(3, 117, 204, 0.4);
}

.gumroad-preorder-btn__icon {
  color: inherit;
}
</style>
