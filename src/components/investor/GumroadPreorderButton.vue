<template>
  <q-btn
    unelevated
    no-caps
    tag="a"
    class="gumroad-button"
    :class="btnClass"
    :padding="padding"
    :href="checkoutHref"
    :label="label"
    :icon="icon"
    data-gumroad-single-product="true"
  />
</template>

<script setup>
import { computed } from 'vue'
import { buildGumroadCheckoutUrl } from 'src/services/preorder-gumroad'

defineProps({
  label: { type: String, required: true },
  icon: { type: String, default: 'payments' },
  btnClass: { type: [String, Array, Object], default: '' },
  padding: { type: String, default: 'sm lg' }
})

const checkoutHref = computed(() => buildGumroadCheckoutUrl())
</script>
