<template>
  <q-header class="investor-header" elevated reveal reveal-offset="80">
    <div class="header-glow" aria-hidden="true" />

    <q-toolbar class="toolbar-inner q-px-md q-py-sm">
      <router-link to="/project" class="brand-link row items-center no-wrap">
        <img
          class="brand-icon"
          :src="brandIconUrl"
          width="36"
          height="36"
          alt=""
          decoding="async"
        />
        <span class="brand-text text-weight-bold">{{ SITE.projectName }}</span>
      </router-link>

      <q-space />

      <nav class="nav-pills row items-center no-wrap q-gutter-xs">
        <q-btn
          v-for="item in nav"
          :key="item.to"
          flat
          dense
          no-caps
          rounded
          class="nav-btn"
          :class="{ 'nav-btn--active': isActive(item.to) }"
          :to="item.to"
        >
          <q-icon :name="item.icon" size="18px" class="q-mr-xs" />
          {{ item.label }}
        </q-btn>
      </nav>

      <q-space class="gt-xs" />

      <q-btn
        round
        flat
        dense
        icon="mail"
        class="gt-xs mail-icon-btn"
        aria-label="Contact"
        @click="contact.openDialog()"
      />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import brandIconUrl from 'src/assets/app-icon.svg'
import { SITE } from 'src/constants/site'
import { useContactUiStore } from 'src/stores/contact-ui'

const route = useRoute()
const contact = useContactUiStore()

const nav = [
  { to: '/invest', label: 'Invest', icon: 'trending_up' },
  { to: '/future', label: 'Roadmap', icon: 'map' }
]

function isActive (path) {
  return route.path === path || route.path === `${path}/`
}
</script>

<style scoped>
.investor-header {
  position: relative;
  background: linear-gradient(
    120deg,
    rgba(26, 44, 51, 0.98) 0%,
    rgba(19, 48, 49, 0.97) 42%,
    rgba(15, 36, 42, 0.98) 100%
  );
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(11, 195, 171, 0.22);
}
.header-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    120% 80% at 12% 0%,
    rgba(11, 195, 171, 0.22) 0%,
    rgba(3, 117, 204, 0.12) 35%,
    transparent 58%
  );
  animation: header-shimmer 8s ease-in-out infinite alternate;
}
@keyframes header-shimmer {
  from {
    opacity: 0.55;
    transform: translateX(0);
  }
  to {
    opacity: 1;
    transform: translateX(12px);
  }
}
.toolbar-inner {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
.brand-link {
  text-decoration: none;
  color: inherit;
  gap: 10px;
}
.brand-icon {
  display: block;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  object-fit: contain;
  box-shadow: 0 0 18px rgba(11, 195, 171, 0.35);
}
.brand-text {
  font-size: 1.35rem;
  letter-spacing: 0.04em;
  background: linear-gradient(90deg, #ccfbf1 0%, #5eead4 40%, #38bdf8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.nav-btn {
  color: rgba(204, 251, 241, 0.88);
  font-weight: 600;
  padding: 6px 14px;
  transition:
    color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}
.nav-btn:hover {
  color: #fff;
  background: rgba(11, 195, 171, 0.12);
}
.nav-btn--active {
  color: #133031 !important;
  background: linear-gradient(135deg, #ccfbf1 0%, #5eead4 100%) !important;
  box-shadow: 0 8px 28px rgba(3, 117, 204, 0.28);
}
.mail-icon-btn {
  color: #a5f3fc;
}

@media (max-width: 599px) {
  .nav-pills {
    flex-wrap: wrap;
    justify-content: flex-end;
    max-width: 58vw;
  }
  .nav-btn {
    font-size: 0.78rem;
    padding: 4px 8px;
  }
  .brand-text {
    font-size: 1.1rem;
  }
}
</style>
