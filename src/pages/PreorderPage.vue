<template>
  <q-page class="preorder-redirect-page column items-center justify-center q-pa-md">
    <p class="preorder-redirect-text">Redirecting to checkout…</p>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { isApiConfigured } from 'src/lib/api-client'
import {
  buildGumroadCheckoutUrl,
  isGumroadPreorderConfigured
} from 'src/services/preorder-gumroad'
import { PreorderCheckoutError, startPreorderCheckout } from 'src/services/preorder-checkout'

const $q = useQuasar()

onMounted(async () => {
  if (isGumroadPreorderConfigured()) {
    window.location.replace(buildGumroadCheckoutUrl())
    return
  }

  if (!isApiConfigured()) {
    $q.notify({
      type: 'warning',
      message: 'Checkout is not connected yet. Please try again soon.',
      position: 'top'
    })
    return
  }

  try {
    const checkoutUrl = await startPreorderCheckout()
    window.location.replace(checkoutUrl)
  } catch (error) {
    const message =
      error instanceof PreorderCheckoutError
        ? error.message
        : 'Could not start checkout.'
    $q.notify({ type: 'negative', message, position: 'top' })
  }
})
</script>

<style scoped>
.preorder-redirect-page {
  min-height: 50vh;
}

.preorder-redirect-text {
  color: var(--site-text-muted, #8aa0b5);
  font-size: 0.95rem;
}
</style>
