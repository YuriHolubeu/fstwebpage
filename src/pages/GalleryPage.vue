<template>
  <q-page class="gallery-page q-pa-md q-pb-xl column items-center">
    <section class="gallery-hero q-mb-xl text-center column items-center full-width">
      <h1 class="text-h4 text-weight-bold gallery-hero__title q-mb-none">
        Gallery
      </h1>
    </section>

    <section class="gallery-grid full-width column items-center">
      <figure
        v-for="item in galleryItems"
        :key="item.caption"
        class="gallery-item q-mb-lg"
      >
        <img
          :src="item.src"
          :alt="item.caption"
          class="gallery-item__img"
          loading="lazy"
          decoding="async"
        />
        <figcaption class="gallery-item__caption text-body1 q-mt-md q-mb-none text-center">
          {{ item.caption }}
        </figcaption>
      </figure>
    </section>
  </q-page>
</template>

<script setup>
const galleryItems = [
  {
    src: `${import.meta.env.BASE_URL}images/gallery/ai-week-milan-2026.jpg`,
    caption: 'AI Week Milan 2026'
  }
]
</script>

<style scoped>
.gallery-page {
  width: 100%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  color: var(--site-text-body);
}

.gallery-hero__title {
  color: var(--site-text-heading);
  letter-spacing: -0.02em;
}

.gallery-grid {
  max-width: 820px;
}

.gallery-item {
  width: 100%;
  margin: 0;
}

.gallery-item__img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  border: 1px solid rgba(94, 234, 212, 0.22);
  box-shadow: 0 12px 40px rgba(3, 117, 204, 0.18);
}

.gallery-item__caption {
  color: var(--site-text-muted);
  font-weight: 500;
  line-height: 1.5;
}
</style>
