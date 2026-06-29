<template>
  <q-page class="preorder-page q-pa-md q-pb-xl column items-center justify-center">
    <section class="preorder-card full-width column items-center text-center">
      <h1 class="preorder-title text-h4 text-weight-bold q-mb-md">
        {{ SITE.preorder.headline }}
      </h1>

      <div class="preorder-price-block q-mb-lg column items-center">
        <div class="preorder-price">{{ SITE.preorder.priceLabel }}</div>
        <p v-if="SITE.preorder.priceTotalHint" class="preorder-price-hint q-mb-xs">
          {{ SITE.preorder.priceTotalHint }}
        </p>
        <p v-if="SITE.preorder.priceNote" class="preorder-price-note">
          {{ SITE.preorder.priceNote }}
        </p>
      </div>

      <q-btn
        unelevated
        no-caps
        padding="sm lg"
        class="preorder-cta full-width"
        :label="SITE.preorder.cta"
        icon="payments"
        :loading="submitting"
        :disable="submitting"
        @click="onPreorder"
      />

      <p v-if="!isPreorderConfigured()" class="preorder-api-hint text-center q-mt-md">
        Payment is not configured in this build. Set
        <code>VITE_GUMROAD_PREORDER_URL</code> or <code>VITE_API_BASE_URL</code> and redeploy.
      </p>
    </section>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { SITE } from 'src/constants/site'
import { isApiConfigured } from 'src/lib/api-client'
import {
  buildGumroadCheckoutUrl,
  isGumroadPreorderConfigured
} from 'src/services/preorder-gumroad'
import { PreorderCheckoutError, startPreorderCheckout } from 'src/services/preorder-checkout'

function isPreorderConfigured () {
  return isGumroadPreorderConfigured() || isApiConfigured()
}

const $q = useQuasar()
const submitting = ref(false)

async function onPreorder () {
  if (isGumroadPreorderConfigured()) {
    window.location.href = buildGumroadCheckoutUrl()
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

  submitting.value = true
  try {
    const checkoutUrl = await startPreorderCheckout()
    window.location.href = checkoutUrl
  } catch (error) {
    const message =
      error instanceof PreorderCheckoutError
        ? error.message
        : 'Could not start checkout.'
    $q.notify({ type: 'negative', message, position: 'top' })
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.preorder-page {
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
  min-height: 60vh;
}

.preorder-title {
  color: var(--site-text-heading);
  letter-spacing: -0.02em;
}

.preorder-price {
  font-size: 3rem;
  line-height: 1;
  font-weight: 800;
  background: linear-gradient(135deg, #0bc3ab 0%, #0375cc 55%, #7c3aed 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.preorder-price-hint {
  color: var(--site-text-body, #c5d4e3);
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0.5rem 0 0;
}

.preorder-price-note {
  color: var(--site-text-muted, #8aa0b5);
  font-size: 0.85rem;
  line-height: 1.5;
  max-width: 20rem;
  margin: 0.35rem auto 0;
}

.preorder-card {
  padding: 2rem 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(8, 20, 36, 0.55);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
}

.preorder-cta {
  border-radius: 12px;
  font-weight: 600;
  color: var(--site-text-high) !important;
  background: linear-gradient(135deg, #0bc3ab 0%, #0375cc 48%, #0660a8 100%) !important;
}

.preorder-api-hint {
  color: var(--site-text-muted, #8aa0b5);
  font-size: 0.85rem;
  line-height: 1.5;
}

.preorder-api-hint code {
  font-size: 0.8rem;
}
</style>
