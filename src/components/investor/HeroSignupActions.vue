<template>
  <div class="hero-signup-actions row q-gutter-sm q-mt-md">
    <q-btn
      unelevated
      no-caps
      padding="sm lg"
      class="hero-cta-btn"
      label="Join waitlist"
      icon="how_to_reg"
      @click="openWaitlist"
    />
    <q-btn
      unelevated
      no-caps
      padding="sm lg"
      class="hero-cta-btn hero-cta-btn--alt"
      label="VIP or invest"
      icon="diamond"
      @click="openVipInvest"
    />

    <HeroWaitlistDialog v-model="waitlistOpen" />
    <HeroVipInvestDialog v-model="vipInvestOpen" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { openDialogWithScroll } from 'src/composables/useDialogScrollRestore'
import HeroWaitlistDialog from 'src/components/investor/HeroWaitlistDialog.vue'
import HeroVipInvestDialog from 'src/components/investor/HeroVipInvestDialog.vue'

const waitlistOpen = ref(false)
const vipInvestOpen = ref(false)

function openWaitlist () {
  openDialogWithScroll(waitlistOpen)
}

function openVipInvest () {
  openDialogWithScroll(vipInvestOpen)
}
</script>

<style scoped>
.hero-signup-actions {
  flex-wrap: wrap;
}

.hero-cta-btn {
  border-radius: 12px;
  font-weight: 600;
  color: var(--site-text-high) !important;
  background: linear-gradient(135deg, #0bc3ab 0%, #0375cc 48%, #0660a8 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 4px 16px rgba(3, 117, 204, 0.4);
}

.hero-cta-btn--alt {
  background: linear-gradient(135deg, #7c3aed 0%, #0375cc 55%, #0f766e 100%) !important;
}

.hero-cta-btn :deep(.q-btn__wrapper),
.hero-cta-btn :deep(.q-icon) {
  color: var(--site-text-high) !important;
}
</style>
