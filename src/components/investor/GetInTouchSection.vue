<template>
  <footer class="site-footer-menu">
    <div class="site-footer-menu__inner">
      <router-link to="/project" class="site-footer-menu__brand row items-center no-wrap">
        <img
          class="site-footer-menu__emblem"
          :src="brandIconUrl"
          width="44"
          height="44"
          alt=""
          decoding="async"
        />
        <span class="site-footer-menu__title">{{ SITE.projectName }}</span>
      </router-link>

      <div class="site-footer-menu__center column">
        <p class="site-footer-menu__intro q-ma-none">
          {{ SITE.contactIntro }}
        </p>
        <div class="site-footer-menu__links row items-center no-wrap">
          <a
            :href="contactMailto"
            class="site-footer-menu__email"
          >
            {{ SITE.contactEmail }}
          </a>
          <slot name="actions" />
        </div>
      </div>

      <div class="site-footer-menu__resources column">
        <div class="site-footer-menu__resources-title">
          Resources
        </div>
        <router-link
          :to="{ name: 'investor-resources' }"
          class="site-footer-menu__resources-link"
        >
          Answers to other questions
        </router-link>
      </div>
    </div>

    <p class="site-footer-menu__copyright q-ma-none">
      © 2026 Focus Structure Tool. All rights reserved.
    </p>
  </footer>
</template>

<script setup>
import brandIconUrl from 'src/assets/app-icon.svg'
import { SITE } from 'src/constants/site'

const contactMailto = `mailto:${SITE.contactEmail}`
</script>

<style scoped>
.site-footer-menu {
  position: relative;
  width: 100%;
  flex-shrink: 0;
  margin: 0;
  margin-top: 2.5rem;
  padding-top: 1.25rem;
  padding-right: max(12px, env(safe-area-inset-right, 0px));
  padding-bottom: max(3cm, env(safe-area-inset-bottom, 0px));
  padding-left: max(12px, env(safe-area-inset-left, 0px));
  border-top: 1px solid rgba(11, 195, 171, 0.28);
  background: rgba(8, 20, 26, 0.96);
}

.site-footer-menu__copyright {
  position: absolute;
  left: max(12px, env(safe-area-inset-left, 0px));
  bottom: max(12px, env(safe-area-inset-bottom, 0px));
  font-size: 0.8rem;
  line-height: 1.4;
  color: var(--site-text-soft);
  opacity: 0.85;
}

.site-footer-menu__inner {
  display: grid;
  grid-template-columns: minmax(0, max-content) minmax(0, 1fr) minmax(0, max-content);
  align-items: start;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  gap: 1.5rem 2rem;
}

.site-footer-menu__brand {
  grid-column: 1;
  grid-row: 1;
  align-self: start;
  justify-self: start;
  gap: 0.9rem;
  min-width: 0;
  color: inherit;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.site-footer-menu__brand:hover {
  opacity: 0.9;
}

.site-footer-menu__emblem {
  flex-shrink: 0;
  display: block;
  border-radius: 10px;
}

.site-footer-menu__title {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--site-text-heading);
}

.site-footer-menu__center {
  grid-column: 2;
  grid-row: 1;
  align-self: start;
  align-items: flex-start;
  min-width: 0;
  text-align: left;
  gap: 0.55rem;
}

.site-footer-menu__resources {
  grid-column: 3;
  grid-row: 1;
  align-self: start;
  justify-self: end;
  align-items: flex-start;
  text-align: left;
  gap: 0.2rem;
  margin-right: 3cm;
}

.site-footer-menu__resources-title {
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.25;
  color: var(--site-text-heading);
}

.site-footer-menu__resources-link {
  display: inline-block;
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--site-text-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.site-footer-menu__resources-link:hover {
  color: var(--site-text-body);
}

.site-footer-menu__intro {
  max-width: 100%;
  font-size: 1.05rem;
  line-height: 1.45;
  font-weight: 500;
  color: var(--site-text-body);
  overflow-wrap: anywhere;
}

.site-footer-menu__links {
  gap: 0.85rem 1.25rem;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.site-footer-menu__email {
  font-size: 1rem;
  font-weight: 600;
  color: var(--site-text-accent);
  text-decoration: none;
  word-break: break-word;
  transition: color 0.2s ease;
}

.site-footer-menu__email:hover {
  color: var(--site-text-accent-soft);
  text-decoration: underline;
}

@media (max-width: 1099px) {
  .site-footer-menu__resources {
    margin-right: 0;
  }
}

@media (max-width: 899px) {
  .site-footer-menu__inner {
    grid-template-columns: 1fr;
  }

  .site-footer-menu__brand,
  .site-footer-menu__center,
  .site-footer-menu__resources {
    grid-column: 1;
    grid-row: auto;
  }

  .site-footer-menu__resources {
    justify-self: start;
    align-items: flex-start;
    text-align: left;
    margin-right: 0;
  }
}

</style>
