<template>
  <q-btn
    unelevated
    no-caps
    :padding="padding"
    :class="btnClass"
    :label="label"
    :icon="icon"
    @click="openCheckout"
  />
</template>

<script setup>
import { buildGumroadCheckoutUrl } from 'src/services/preorder-gumroad'

defineProps({
  label: { type: String, required: true },
  icon: { type: String, default: 'payments' },
  btnClass: { type: [String, Array, Object], default: '' },
  padding: { type: String, default: 'sm lg' }
})

function openCheckout () {
  window.location.assign(buildGumroadCheckoutUrl())
}
</script>
