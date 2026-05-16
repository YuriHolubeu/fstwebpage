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

        <q-btn-dropdown
          flat
          dense
          no-caps
          rounded
          auto-close
          dropdown-icon="expand_more"
          class="nav-btn ai-features-btn"
          :class="{ 'nav-btn--active': isAiFeaturesActive }"
          content-class="ai-features-menu"
        >
          <template #label>
            <q-icon name="auto_awesome" size="18px" class="q-mr-xs" />
            AI Features
          </template>

          <q-list dense class="ai-features-list">
            <q-item
              v-for="item in aiFeatures"
              :key="item.to"
              clickable
              :to="item.to"
              class="ai-feature-item"
              :class="{ 'ai-feature-item--active': isActive(item.to) }"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
                <q-item-label caption>{{ item.caption }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn
          v-for="item in tailNav"
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import brandIconUrl from 'src/assets/app-icon.svg'
import { SITE } from 'src/constants/site'
import { useContactUiStore } from 'src/stores/contact-ui'

const route = useRoute()
const contact = useContactUiStore()

const nav = []

const tailNav = [
  { to: '/education', label: 'Education', icon: 'school' },
  { to: '/future', label: 'Roadmap', icon: 'map' }
]

const aiFeatures = [
  {
    to: '/ai-groups',
    label: 'AI Groups',
    icon: 'hub',
    caption: 'Semantic clustering for research themes'
  },
  {
    to: '/explain-fragment',
    label: 'Explain Fragment',
    icon: 'psychology',
    caption: 'Attach explanations to selected text'
  },
  {
    to: '/save-ai-note',
    label: 'Save AI Note',
    icon: 'bookmark_add',
    caption: 'Turn AI answers into project memory'
  }
]

const isAiFeaturesActive = computed(() => aiFeatures.some((item) => isActive(item.to)))

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

:global(.ai-features-menu) {
  border: 1px solid rgba(94, 234, 212, 0.24);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(15, 55, 56, 0.98), rgba(10, 24, 28, 0.98)),
    #0a181c;
  box-shadow: 0 18px 48px rgba(3, 117, 204, 0.22);
}

:global(.ai-features-list) {
  min-width: 250px;
  padding: 6px;
}

:global(.ai-feature-item) {
  border-radius: 6px;
  color: rgba(204, 251, 241, 0.9);
}

:global(.ai-feature-item:hover),
:global(.ai-feature-item--active) {
  background: rgba(11, 195, 171, 0.14);
}

:global(.ai-feature-item .q-item__label--caption) {
  color: rgba(94, 234, 212, 0.72);
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