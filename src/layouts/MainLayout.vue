<template>
  <q-layout view="hHh lpR lfr" class="investor-layout">
    <div class="digital-bg" aria-hidden="true" />

    <InvestorNavBar />

    <q-page-container class="layout-surface">
      <div class="site-page-shell column">
        <main class="site-page-shell__main page-container">
          <router-view v-slot="{ Component }">
            <transition name="fade-slide" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>
        <GetInTouchSection />
      </div>
    </q-page-container>

    <div class="fab-contact-wrap row items-center no-wrap">
      <span class="fab-contact-label">Contact us</span>
      <q-btn
        fab
        icon="mail"
        color="primary"
        text-color="white"
        class="fab-contact shadow-lg"
        aria-label="Contact us"
        @click="contact.openDialog()"
      >
        <q-tooltip anchor="center left" self="center right" :offset="[8, 0]">
          Contact us
        </q-tooltip>
      </q-btn>
    </div>

    <ContactUsDialog v-model="dialogOpen" />
  </q-layout>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import GetInTouchSection from 'src/components/investor/GetInTouchSection.vue'
import InvestorNavBar from 'src/components/investor/InvestorNavBar.vue'
import ContactUsDialog from 'src/components/investor/ContactUsDialog.vue'
import { useContactUiStore } from 'src/stores/contact-ui'

const contact = useContactUiStore()
const { dialogOpen } = storeToRefs(contact)
</script>

<style scoped>
.investor-layout {
  position: relative;
  isolation: isolate;
  background: radial-gradient(
      120% 55% at 50% -8%,
      rgba(11, 195, 171, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      90% 45% at 100% 20%,
      rgba(3, 117, 204, 0.08) 0%,
      transparent 45%
    ),
    linear-gradient(
      180deg,
      var(--site-bg-base) 0%,
      var(--site-bg-mid) 38%,
      var(--site-bg-deep) 100%
    );
  min-height: 100vh;
}

/* Full-viewport tech grid behind content (pointer-events none) */
.digital-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  background-image:
    repeating-linear-gradient(
      90deg,
      transparent 0,
      transparent 31px,
      rgba(11, 195, 171, 0.085) 31px,
      rgba(11, 195, 171, 0.085) 32px
    ),
    repeating-linear-gradient(
      0deg,
      transparent 0,
      transparent 31px,
      rgba(3, 117, 204, 0.065) 31px,
      rgba(3, 117, 204, 0.065) 32px
    );
}

.digital-bg::before {
  content: '';
  position: absolute;
  inset: -10%;
  opacity: 0.55;
  background: repeating-linear-gradient(
    122deg,
    transparent 0,
    transparent 52px,
    rgba(31, 202, 121, 0.055) 52px,
    rgba(31, 202, 121, 0.055) 53px
  );
  animation: digital-bg-drift 72s linear infinite;
}

.digital-bg::after {
  content: '';
  position: absolute;
  left: -8%;
  top: -5%;
  width: 116%;
  height: 110%;
  opacity: 0.45;
  background: repeating-linear-gradient(
    0deg,
    transparent 0,
    transparent 11px,
    rgba(204, 251, 241, 0.05) 11px,
    rgba(204, 251, 241, 0.05) 12px,
    transparent 12px,
    transparent 28px
  );
  mask-image: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 0, 0, 0.35) 12%,
    #000 35%,
    #000 65%,
    rgba(0, 0, 0, 0.35) 88%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 0, 0, 0.35) 12%,
    #000 35%,
    #000 65%,
    rgba(0, 0, 0, 0.35) 88%,
    transparent 100%
  );
  animation: digital-bg-float 22s ease-in-out infinite alternate;
}

@keyframes digital-bg-drift {
  to {
    transform: translate3d(-36px, 24px, 0);
  }
}

@keyframes digital-bg-float {
  from {
    transform: translateY(-2%);
    opacity: 0.28;
  }
  to {
    transform: translateY(2%);
    opacity: 0.52;
  }
}

.layout-surface {
  position: relative;
  z-index: 1;
}

@media (prefers-reduced-motion: reduce) {
  .digital-bg::before,
  .digital-bg::after {
    animation: none !important;
  }
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.site-page-shell {
  width: 100%;
  min-height: 100%;
}

.site-page-shell__main {
  flex: 1 0 auto;
  width: 100%;
}

.fab-contact {
  box-shadow: 0 12px 40px rgba(3, 117, 204, 0.45);
}
.fab-contact-wrap {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 6000;
  gap: 12px;
}
.fab-contact-label {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--site-text-body);
  text-shadow:
    0 0 12px rgba(10, 24, 28, 0.9),
    0 1px 2px rgba(19, 48, 49, 0.95);
  user-select: none;
  pointer-events: none;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
