<template>
  <q-page class="preorder-success-page q-pa-md q-pb-xl column items-center justify-center">
    <section class="preorder-success-card full-width text-center column items-center">
      <q-icon name="check_circle" size="64px" color="positive" class="q-mb-md" />
      <h1 class="text-h5 text-weight-bold q-mb-sm">
        {{ title }}
      </h1>
      <p class="preorder-success-body q-mb-lg">
        {{ body }}
      </p>
      <q-btn
        unelevated
        no-caps
        padding="sm lg"
        class="preorder-success-cta"
        label="Back to home"
        to="/"
      />
    </section>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { SITE } from 'src/constants/site'
import { fetchPreorderStatus } from 'src/services/preorder-checkout'

const route = useRoute()
const paid = ref(false)

onMounted(async () => {
  const sessionId = typeof route.query.session_id === 'string' ? route.query.session_id : ''
  if (!sessionId) {
    return
  }
  const status = await fetchPreorderStatus(sessionId)
  paid.value = status?.status === 'paid'
})

const title = computed(() => SITE.preorder.successTitle)

const body = computed(() =>
  paid.value ? SITE.preorder.successBody : SITE.preorder.successPending
)
</script>

<style scoped>
.preorder-success-page {
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  min-height: 60vh;
}

.preorder-success-card {
  padding: 2rem 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(8, 20, 36, 0.55);
}

.preorder-success-body {
  color: var(--site-text-body, #c5d4e3);
  line-height: 1.6;
  max-width: 28rem;
}

.preorder-success-cta {
  border-radius: 12px;
  font-weight: 600;
}
</style>
