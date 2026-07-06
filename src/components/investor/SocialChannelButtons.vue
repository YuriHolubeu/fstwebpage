<template>
  <div class="social-channel-actions row q-gutter-sm items-center">
    <q-btn
      type="a"
      :href="SITE.social.instagram"
      target="_blank"
      rel="noopener noreferrer"
      unelevated
      no-caps
      padding="sm md"
      class="social-channel-btn"
      label="Instagram"
      :icon="instagramIcon"
    />
    <q-btn
      type="a"
      :href="SITE.social.youtube"
      target="_blank"
      rel="noopener noreferrer"
      unelevated
      no-caps
      padding="sm md"
      class="social-channel-btn"
      label="YouTube"
      icon="smart_display"
    />
  </div>
</template>

<script setup>
import instagramIconUrl from 'src/assets/icons/instagram.svg'
import { SITE } from 'src/constants/site'

const instagramIcon = `img:${instagramIconUrl}`
</script>

<style scoped>
.social-channel-actions {
  flex-wrap: wrap;
}

.social-channel-btn {
  border-radius: 12px;
  font-weight: 600;
  color: var(--site-text-high) !important;
  background: rgba(6, 15, 20, 0.55) !important;
  border: 1px solid rgba(11, 195, 171, 0.35);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 4px 14px rgba(3, 117, 204, 0.22);
}

.social-channel-btn:hover {
  background: linear-gradient(135deg, rgba(11, 195, 171, 0.22) 0%, rgba(3, 117, 204, 0.28) 100%) !important;
}

.social-channel-btn :deep(.q-btn__wrapper),
.social-channel-btn :deep(.q-icon) {
  color: var(--site-text-high) !important;
}

.social-channel-btn :deep(.q-icon img) {
  width: 1.15em;
  height: 1.15em;
  object-fit: contain;
  filter: brightness(0) invert(1);
}
</style>
