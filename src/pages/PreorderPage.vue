<template>
  <q-page class="preorder-page q-pa-md q-pb-xl column items-center">
    <section class="preorder-hero full-width column items-center text-center">
      <p class="preorder-eyebrow q-mb-sm">Limited founder spots</p>
      <h1 class="preorder-title text-h4 text-weight-bold q-mb-sm">
        {{ SITE.preorder.headline }}
      </h1>
      <div class="preorder-price-block q-mb-md column items-center">
        <div class="preorder-price">{{ SITE.preorder.priceLabel }}</div>
        <p v-if="SITE.preorder.priceTotalHint" class="preorder-price-hint q-mb-xs">
          {{ SITE.preorder.priceTotalHint }}
        </p>
        <p v-if="SITE.preorder.priceNote" class="preorder-price-note">
          {{ SITE.preorder.priceNote }}
        </p>
      </div>
      <p class="preorder-subtitle q-mb-lg">
        {{ SITE.preorder.subtitle }}
      </p>
    </section>

    <section class="preorder-card full-width">
      <ul class="preorder-benefits q-mb-lg">
        <li v-for="(item, index) in SITE.preorder.benefits" :key="index">
          {{ item }}
        </li>
      </ul>

      <q-input
        v-if="isPreorderConfigured()"
        v-model="email"
        outlined
        dense
        type="email"
        class="preorder-email q-mb-md"
        :label="SITE.preorder.emailLabel"
        color="primary"
      />

      <p v-if="SITE.preorder.checkoutNote" class="preorder-checkout-note text-center q-mb-md">
        {{ SITE.preorder.checkoutNote }}
      </p>

      <q-btn
        unelevated
        no-caps
        padding="sm lg"
        class="preorder-cta full-width q-mb-md"
        :label="SITE.preorder.cta"
        icon="payments"
        :loading="submitting"
        :disable="submitting"
        @click="onPreorder"
      />

      <p v-if="!isPreorderConfigured()" class="preorder-api-hint text-center q-mb-md">
        Payment is not configured in this build. Set
        <code>VITE_GUMROAD_PREORDER_URL</code> or <code>VITE_API_BASE_URL</code> and redeploy.
      </p>

      <p class="preorder-disclaimer text-center q-mb-lg">
        {{ SITE.preorder.disclaimer }}
      </p>

      <div class="text-center">
        <q-btn
          flat
          no-caps
          color="primary"
          :label="SITE.preorder.waitlistCta"
          @click="waitlistOpen = true"
        />
      </div>
    </section>

    <HeroWaitlistDialog v-model="waitlistOpen" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import HeroWaitlistDialog from 'src/components/investor/HeroWaitlistDialog.vue'
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
const email = ref('')
const submitting = ref(false)
const waitlistOpen = ref(false)

async function onPreorder () {
  if (isGumroadPreorderConfigured()) {
    window.location.href = buildGumroadCheckoutUrl({ email: email.value })
    return
  }

  if (!isApiConfigured()) {
    $q.notify({
      type: 'warning',
      message: 'Checkout is not connected yet. Please try again soon or join the waitlist.',
      position: 'top'
    })
    return
  }

  submitting.value = true
  try {
    const checkoutUrl = await startPreorderCheckout({ email: email.value })
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
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

.preorder-eyebrow {
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: var(--site-text-muted, #8aa0b5);
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
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0.35rem 0 0;
}

.preorder-price-note,
.preorder-checkout-note {
  color: var(--site-text-muted, #8aa0b5);
  font-size: 0.9rem;
  line-height: 1.5;
  max-width: 34rem;
  margin-left: auto;
  margin-right: auto;
}

.preorder-checkout-note {
  font-size: 0.85rem;
}

.preorder-subtitle {
  color: var(--site-text-body, #c5d4e3);
  font-size: 1.05rem;
  line-height: 1.5;
  max-width: 36rem;
}

.preorder-card {
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(8, 20, 36, 0.55);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
}

.preorder-benefits {
  margin: 0;
  padding-left: 1.2rem;
  color: var(--site-text-body, #c5d4e3);
  line-height: 1.6;
}

.preorder-cta {
  border-radius: 12px;
  font-weight: 600;
  color: var(--site-text-high) !important;
  background: linear-gradient(135deg, #0bc3ab 0%, #0375cc 48%, #0660a8 100%) !important;
}

.preorder-disclaimer,
.preorder-api-hint {
  color: var(--site-text-muted, #8aa0b5);
  font-size: 0.85rem;
  line-height: 1.5;
}

.preorder-api-hint code {
  font-size: 0.8rem;
}
</style>
