<template>
  <q-page class="project-page q-pa-md q-pb-xl">
    <section
      class="hero-stack text-center q-pt-lg q-pb-md column items-center"
      :class="{ 'hero-stack--ready': heroEntered }"
    >
      <div class="hero-headline-column">
        <h1 class="mega-title">
          {{ SITE.heroHeadline }}
        </h1>
        <p class="tagline pp-body text-body1 q-mt-sm q-mb-lg">
          {{ SITE.tagline }}
        </p>

        <div class="hero-stagger-btn hero-workshop-slot">
          <img
            :src="heroWorkshopUrl"
            alt="Scholar's study with desk, books, and chalkboard"
            class="hero-workshop-img"
            width="1024"
            height="1024"
            loading="eager"
            decoding="async"
          />
          <p class="hero-image-caption text-body2 q-mt-md q-mb-none">
            {{ SITE.heroImageCaption }}
          </p>
        </div>
      </div>
    </section>

    <section
      ref="screenshotsEl"
      class="screenshot-showcase q-pt-xl q-mt-lg reveal-on-scroll"
      :class="{ 'is-visible': screenshotsVisible }"
    >
      <div class="screenshot-copy text-center q-mb-lg">
        <div class="text-overline pp-overline q-mb-xs">Product preview</div>
        <h2 class="screenshot-title text-h4 text-weight-bold pp-heading q-mb-sm">
          Research workspace, fully connected
        </h2>
        <p class="screenshot-caption pp-body text-body1 q-mb-none">
          One workspace for papers, PDFs, LaTeX and research structure.
        </p>
      </div>

      <div class="screenshot-frame">
        <img
          src="/screenshots/screen1.png"
          alt="Focus Structure Tool workspace with papers, PDF viewer, LaTeX editor, and research outline"
          class="screenshot-image"
          width="2912"
          height="1814"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>

    <section ref="keyToolsEl" class="gallery-block q-pt-xl q-mt-lg column items-center">
      <div
        class="gallery-heading text-center q-mb-lg reveal-on-scroll full-width"
        :class="{ 'is-visible': keyToolsVisible }"
      >
        <div class="text-overline pp-overline q-mb-xs">Toolkit</div>
        <h2 class="text-h5 text-weight-bold pp-heading q-mb-xs">
          Key tools that boost research
        </h2>
        <p class="text-caption pp-muted q-mb-none" style="max-width: 520px; margin: 0 auto">
          Focused capabilities that keep context, speed synthesis, and make findings reusable.
        </p>
      </div>

      <div class="row q-col-gutter-lg justify-center full-width" style="max-width: 1000px">
        <div
          v-for="(item, i) in keyTools"
          :key="item.title"
          class="col-12 col-sm-6"
        >
          <q-card
            flat
            bordered
            class="photo-card overflow-hidden reveal-on-scroll"
            :class="{ 'is-visible': keyToolsVisible }"
            :style="{ transitionDelay: keyToolsDelay(i) }"
          >
            <div class="photo-shine" aria-hidden="true" />
            <button
              type="button"
              class="tool-shot-trigger"
              :aria-label="`Open ${item.title} screenshot`"
              @click="openToolPreview(item)"
            >
              <q-img
                :src="item.src"
                :ratio="item.ratio || 4 / 3"
                class="photo-img tool-shot-img"
                spinner-color="primary"
                loading="lazy"
              >
                <div class="absolute-bottom photo-gradient" />
                <div class="tool-shot-overlay row items-center justify-center">
                  <q-icon name="open_in_full" size="22px" />
                </div>
              </q-img>
            </button>
            <q-card-section class="q-pt-md">
              <div class="text-subtitle1 text-weight-medium pp-title">
                {{ item.title }}
              </div>
              <p class="text-caption pp-muted q-mb-none q-mt-xs">
                {{ item.caption }}
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <section ref="galleryEl" class="gallery-block q-pt-xl q-mt-lg column items-center">
      <div
        class="gallery-heading text-center q-mb-lg reveal-on-scroll full-width"
        :class="{ 'is-visible': galleryVisible }"
      >
        <div class="text-overline pp-overline q-mb-xs">How we help</div>
        <h2 class="text-h5 text-weight-bold pp-heading q-mb-xs">
          How our project can help you
        </h2>
        <p class="text-caption pp-muted q-mb-none" style="max-width: 520px; margin: 0 auto">
          A quick visual overview — each tile maps to a real outcome for your team.
        </p>
      </div>

      <div class="row q-col-gutter-lg justify-center full-width" style="max-width: 1000px">
        <div
          v-for="(item, i) in gallery"
          :key="item.title"
          class="col-12 col-sm-6"
        >
          <q-card
            flat
            bordered
            class="photo-card overflow-hidden reveal-on-scroll"
            :class="{ 'is-visible': galleryVisible }"
            :style="{ transitionDelay: galleryDelay(i) }"
          >
            <div class="photo-shine" aria-hidden="true" />
            <q-img
              :src="item.src"
              :ratio="4 / 3"
              class="photo-img"
              spinner-color="primary"
              loading="lazy"
            >
              <div class="absolute-bottom photo-gradient" />
            </q-img>
            <q-card-section class="q-pt-md">
              <div class="text-subtitle1 text-weight-medium pp-title">
                {{ item.title }}
              </div>
              <p class="text-caption pp-muted q-mb-none q-mt-xs">
                {{ item.caption }}
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <section ref="featuresEl" class="features-block column items-center full-width q-pt-xl q-mt-md">
      <div
        v-for="(fn, i) in appFunctions"
        :key="fn.title"
        class="feature-showcase column items-center full-width reveal-on-scroll"
        :class="{ 'is-visible': featuresVisible }"
        :style="{ transitionDelay: featureDelay(i) }"
      >
        <h2 class="feature-title text-h4 text-weight-bold pp-heading text-center q-mb-md">
          {{ fn.title }}
        </h2>

        <div class="feature-video-outer row justify-center full-width q-mb-lg">
          <q-card flat bordered class="video-card feature-video-card overflow-hidden">
            <div v-if="fn.embedUrl?.trim()" class="video-ratio">
              <iframe
                :src="fn.embedUrl.trim()"
                :title="fn.title"
                class="video-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              />
            </div>
            <div v-else class="video-ratio">
              <div class="video-placeholder video-placeholder--compact column flex-center">
                <div class="placeholder-inner column flex-center q-pa-md text-center">
                  <q-btn
                    round
                    size="lg"
                    color="primary"
                    text-color="white"
                    icon="play_arrow"
                    class="play-btn-animated"
                    @click="openFeatureVideoHint"
                  />
                  <div class="text-caption pp-muted q-mt-sm pp-hint">
                    Add an embed URL for this clip in
                    <code class="pp-code">appFunctions</code>
                    in <code class="pp-code">ProjectPage.vue</code>.
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </div>

        <p class="feature-copy pp-body text-body1 text-center q-mb-none">
          {{ fn.description }}
        </p>
      </div>
    </section>

    <q-dialog v-model="toolPreviewOpen" transition-show="scale" transition-hide="fade">
      <q-card v-if="selectedTool" class="tool-preview-card">
        <div class="tool-preview-bar row items-center justify-between no-wrap">
          <div class="tool-preview-copy">
            <div class="text-overline pp-overline q-mb-xs">Screenshot preview</div>
            <h3 class="tool-preview-title q-mb-xs">{{ selectedTool.title }}</h3>
            <p class="tool-preview-caption q-mb-none">{{ selectedTool.caption }}</p>
          </div>
          <q-btn
            round
            flat
            icon="close"
            text-color="white"
            aria-label="Close screenshot preview"
            @click="toolPreviewOpen = false"
          />
        </div>

        <div class="tool-preview-image-wrap">
          <img
            :src="selectedTool.src"
            :alt="selectedTool.caption"
            class="tool-preview-image"
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import heroWorkshopUrl from 'src/assets/hero-workshop.png'
import { SITE } from 'src/constants/site'

const $q = useQuasar()

const heroEntered = ref(false)
const screenshotsVisible = ref(false)
const keyToolsVisible = ref(false)
const galleryVisible = ref(false)
const featuresVisible = ref(false)
const selectedTool = ref(null)
const toolPreviewOpen = ref(false)
const screenshotsEl = ref(null)
const keyToolsEl = ref(null)
const galleryEl = ref(null)
const featuresEl = ref(null)

/** Two product functions: set title, description, and optional embed URL per clip. */
const appFunctions = [
  {
    title: 'Live insight rollups',
    description:
      'Pulls the latest signals into one view so you can brief the room in minutes, not hours.',
    embedUrl: ''
  },
  {
    title: 'Decision trails',
    description:
      'Every recommendation keeps its sources attached — easy to audit, easy to trust when stakes are high.',
    embedUrl: ''
  }
]

const keyTools = [
  {
    title: 'Interactive knowledge maps',
    caption: 'Large research projects become interactive knowledge maps.',
    src: '/screenshots/screen2.png',
    ratio: 16 / 10
  },
  {
    title: 'AI research themes',
    caption: 'AI automatically organizes hundreds of sections into meaningful research themes.',
    src: '/screenshots/screen3.png',
    ratio: 16 / 10
  },
  {
    title: 'Reusable project knowledge',
    caption: 'AI explanations, formulas and claims become reusable project knowledge.',
    src: '/screenshots/screen4.png',
    ratio: 16 / 10
  },
  {
    title: 'Side-by-side comparison',
    caption: 'Connected fragments open side-by-side for comparison and explanation.',
    src: '/screenshots/screen5.png',
    ratio: 16 / 10
  }
]

const gallery = [
  {
    title: 'See the full picture',
    caption: 'Bring scattered updates into one calm view your stakeholders can trust.',
    src: 'https://picsum.photos/seed/rac-a/960/720'
  },
  {
    title: 'Turn insight into action',
    caption: 'Move from signals to next steps without losing context in another thread.',
    src: 'https://picsum.photos/seed/rac-b/960/720'
  },
  {
    title: 'Work in the open',
    caption: 'Shared language for teams and partners — fewer opaque status meetings.',
    src: 'https://picsum.photos/seed/rac-c/960/720'
  },
  {
    title: 'Stay close to reality',
    caption: 'Field-ready views when decisions cannot wait until you are back at a desk.',
    src: 'https://picsum.photos/seed/rac-d/960/720'
  }
]

let keyToolsObserver
let screenshotsObserver
let galleryObserver
let featuresObserver

function keyToolsDelay (index) {
  return `${120 + index * 100}ms`
}

function galleryDelay (index) {
  return `${120 + index * 100}ms`
}

function featureDelay (index) {
  return `${100 + index * 140}ms`
}

function openToolPreview (item) {
  selectedTool.value = item
  toolPreviewOpen.value = true
}

function openFeatureVideoHint () {
  $q.notify({
    type: 'info',
    message: 'Set embedUrl on each item in appFunctions (ProjectPage.vue) to show these clips.',
    position: 'top'
  })
}

onMounted(() => {
  requestAnimationFrame(() => {
    heroEntered.value = true
  })

  screenshotsObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          screenshotsVisible.value = true
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
  )
  if (screenshotsEl.value) {
    screenshotsObserver.observe(screenshotsEl.value)
  }

  keyToolsObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          keyToolsVisible.value = true
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  )
  if (keyToolsEl.value) {
    keyToolsObserver.observe(keyToolsEl.value)
  }

  galleryObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          galleryVisible.value = true
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  )
  if (galleryEl.value) {
    galleryObserver.observe(galleryEl.value)
  }

  featuresObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          featuresVisible.value = true
        }
      }
    },
    { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
  )
  if (featuresEl.value) {
    featuresObserver.observe(featuresEl.value)
  }
})

onUnmounted(() => {
  screenshotsObserver?.disconnect()
  keyToolsObserver?.disconnect()
  galleryObserver?.disconnect()
  featuresObserver?.disconnect()
})
</script>

<style scoped>
/*
 * Text on slate + teal surfaces: cool mint highlights (aligned with app icon palette).
 */
.project-page {
  --pp-high: #ecfeff;
  --pp-body: #cffafe;
  --pp-heading: #f0fdfa;
  --pp-muted: #5eead4;
  --pp-soft: #2dd4bf;
  --pp-code-fg: #ecfeff;
  --pp-code-bg: rgba(3, 117, 204, 0.28);
  --pp-code-border: rgba(11, 195, 171, 0.35);

  max-width: 1040px;
  margin-left: auto;
  margin-right: auto;
}

.pp-high {
  color: var(--pp-high);
}
.pp-body {
  color: var(--pp-body);
  line-height: 1.65;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
}
.pp-heading {
  color: var(--pp-heading);
}
.pp-title {
  color: var(--pp-heading);
}
.pp-muted {
  color: var(--pp-muted);
  line-height: 1.5;
}
.pp-overline {
  color: var(--pp-soft);
  letter-spacing: 0.12em;
}
.pp-code {
  display: inline;
  padding: 0.1rem 0.35rem;
  border-radius: 6px;
  font-size: 0.75em;
  color: var(--pp-code-fg);
  background: var(--pp-code-bg);
  border: 1px solid var(--pp-code-border);
}
.pp-hint {
  max-width: 22rem;
  margin-left: auto;
  margin-right: auto;
}

.hero-headline-column {
  width: 100%;
  max-width: 38rem;
  padding: 0 0.75rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.mega-title {
  font-size: clamp(1.2rem, 3.2vw, 1.85rem);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
  margin: 0;
  max-width: none;
  padding: 0;
  opacity: 0;
  transform: translateY(36px) scale(0.96);
  filter: blur(10px);
  transition:
    opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.85s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.85s cubic-bezier(0.22, 1, 0.36, 1);
  background: linear-gradient(
    115deg,
    #5eead4 0%,
    #22d3ee 22%,
    #38bdf8 48%,
    #1fca79 78%,
    #5eead4 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-stack--ready .mega-title {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
  animation: gradient-flow 10s ease-in-out infinite alternate;
}

@keyframes gradient-flow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.hero-stack .tagline,
.hero-stack .hero-stagger-btn {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-stack--ready .tagline {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.12s;
}

.hero-headline-column .tagline.pp-body {
  max-width: none;
  width: 100%;
}

.hero-workshop-slot {
  margin-bottom: 2.5rem;
}

.hero-workshop-img {
  display: block;
  width: 50%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  border-radius: 14px;
  border: 1px solid rgba(11, 195, 171, 0.28);
  box-shadow:
    0 0 0 1px rgba(3, 117, 204, 0.12),
    0 16px 48px rgba(10, 24, 28, 0.55);
}

.hero-image-caption {
  color: var(--pp-muted);
  line-height: 1.5;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.hero-stack--ready .hero-stagger-btn {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.24s;
}

.screenshot-showcase {
  position: relative;
  scroll-margin-top: 96px;
}

.screenshot-showcase::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 9.5rem;
  width: min(880px, 92vw);
  height: 220px;
  transform: translateX(-50%);
  border-radius: 8px;
  background: radial-gradient(
    60% 100% at 50% 0%,
    rgba(11, 195, 171, 0.36) 0%,
    rgba(3, 117, 204, 0.2) 42%,
    transparent 72%
  );
  filter: blur(14px);
  opacity: 0.9;
  pointer-events: none;
  z-index: 0;
}

.screenshot-copy,
.screenshot-frame {
  position: relative;
  z-index: 1;
}

.screenshot-title {
  letter-spacing: 0;
  line-height: 1.14;
}

.screenshot-caption.pp-body {
  max-width: 42rem;
}

.screenshot-frame {
  overflow: hidden;
  border-radius: 8px;
  padding: 0.5rem;
  border: 1px solid rgba(94, 234, 212, 0.28);
  background:
    linear-gradient(135deg, rgba(94, 234, 212, 0.16), rgba(56, 189, 248, 0.08)),
    rgba(10, 24, 28, 0.78);
  box-shadow:
    0 26px 80px rgba(3, 117, 204, 0.22),
    0 0 0 1px rgba(204, 251, 241, 0.06) inset;
}

.screenshot-image {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 6px;
  border: 1px solid rgba(204, 251, 241, 0.1);
  box-shadow: 0 16px 52px rgba(10, 24, 28, 0.5);
}

/* Center video block horizontally; clip glow overflow */
.video-outer {
  max-width: 920px;
}

.video-demo-wrap {
  position: relative;
  width: 100%;
  max-width: 880px;
  margin-left: auto;
  margin-right: auto;
}

.video-frame-glow {
  position: absolute;
  left: 50%;
  top: -8px;
  transform: translateX(-50%);
  width: calc(100% + 4px);
  max-width: 900px;
  height: 120px;
  border-radius: 22px;
  background: radial-gradient(
    65% 100% at 50% 0%,
    rgba(11, 195, 171, 0.45) 0%,
    rgba(3, 117, 204, 0.18) 45%,
    transparent 70%
  );
  opacity: 0.9;
  animation: glow-breathe 4s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}

@keyframes glow-breathe {
  0%,
  100% {
    opacity: 0.55;
    transform: translateX(-50%) scale(0.98);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
}

.video-card {
  position: relative;
  z-index: 1;
  width: 100%;
  margin: 0 auto;
  border-radius: 18px;
  border-color: rgba(11, 195, 171, 0.35);
  background: rgba(19, 48, 49, 0.72);
}

.video-ratio {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}

.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

.video-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: radial-gradient(
      85% 65% at 50% 18%,
      rgba(3, 117, 204, 0.28) 0%,
      transparent 52%
    ),
    linear-gradient(168deg, rgba(26, 44, 51, 0.96) 0%, rgba(19, 48, 49, 0.98) 100%);
}

.placeholder-inner {
  width: 100%;
  max-width: 26rem;
}

.play-btn-animated {
  box-shadow: 0 12px 40px rgba(3, 117, 204, 0.45);
  animation: play-pulse 2.2s ease-in-out infinite;
}

@keyframes play-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.06);
  }
}

.gallery-block {
  scroll-margin-top: 96px;
}

.reveal-on-scroll {
  opacity: 0;
  transform: translateY(36px) scale(0.98);
  filter: blur(4px);
  transition:
    opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.75s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.photo-card {
  position: relative;
  border-radius: 18px;
  border-color: rgba(11, 195, 171, 0.22);
  background: rgba(26, 44, 51, 0.55);
  transition:
    transform 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease,
    background 0.35s ease;
}

.photo-card.is-visible:hover {
  transform: translateY(-6px);
  border-color: rgba(94, 234, 212, 0.4);
  background: rgba(26, 44, 51, 0.68);
  box-shadow:
    0 20px 50px rgba(3, 117, 204, 0.28),
    0 0 0 1px rgba(94, 234, 212, 0.12) inset;
}

.photo-shine {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    115deg,
    transparent 40%,
    rgba(255, 255, 255, 0.06) 48%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.06) 52%,
    transparent 60%
  );
  transform: translateX(-100%);
  transition: transform 0s;
}

.photo-card.is-visible:hover .photo-shine {
  transform: translateX(100%);
  transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
}

.photo-img {
  border-radius: 0;
}

.tool-shot-trigger {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  color: inherit;
  background: transparent;
  cursor: zoom-in;
  text-align: inherit;
}

.tool-shot-trigger:focus-visible {
  outline: 2px solid rgba(94, 234, 212, 0.9);
  outline-offset: -4px;
}

.tool-shot-img {
  transform: translateZ(0);
}

.tool-shot-overlay {
  position: absolute;
  inset: 0;
  color: #ecfeff;
  background:
    radial-gradient(circle at 50% 44%, rgba(11, 195, 171, 0.22), transparent 32%),
    linear-gradient(180deg, rgba(10, 24, 28, 0.04), rgba(10, 24, 28, 0.34));
  opacity: 0;
  transition: opacity 0.28s ease;
}

.tool-shot-overlay .q-icon {
  width: 3.1rem;
  height: 3.1rem;
  border: 1px solid rgba(204, 251, 241, 0.32);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 24, 28, 0.72);
  box-shadow: 0 14px 34px rgba(3, 117, 204, 0.35);
  transform: translateY(8px);
  transition: transform 0.28s ease;
}

.photo-card.is-visible:hover .tool-shot-overlay,
.tool-shot-trigger:focus-visible .tool-shot-overlay {
  opacity: 1;
}

.photo-card.is-visible:hover .tool-shot-overlay .q-icon,
.tool-shot-trigger:focus-visible .tool-shot-overlay .q-icon {
  transform: translateY(0);
}

.photo-gradient {
  height: 40%;
  background: linear-gradient(to top, rgba(19, 48, 49, 0.9), transparent);
}

.tool-preview-card {
  width: min(1180px, calc(100vw - 32px));
  max-width: none;
  max-height: calc(100vh - 32px);
  overflow: hidden;
  color: #cffafe;
  border: 1px solid rgba(94, 234, 212, 0.28);
  border-radius: 8px;
  background:
    linear-gradient(150deg, rgba(15, 55, 56, 0.96), rgba(8, 20, 29, 0.98)),
    #0a181c;
  box-shadow:
    0 28px 90px rgba(0, 0, 0, 0.52),
    0 0 80px rgba(3, 117, 204, 0.22);
}

.tool-preview-bar {
  gap: 1rem;
  padding: 1rem 1.1rem;
  border-bottom: 1px solid rgba(94, 234, 212, 0.16);
}

.tool-preview-copy {
  min-width: 0;
}

.tool-preview-title {
  color: #f0fdfa;
  font-size: clamp(1.05rem, 2vw, 1.45rem);
  font-weight: 800;
  line-height: 1.2;
}

.tool-preview-caption {
  color: #cffafe;
  font-size: 0.95rem;
  line-height: 1.45;
}

.tool-preview-image-wrap {
  max-height: calc(100vh - 9.5rem);
  padding: 0.55rem;
  overflow: auto;
  background:
    linear-gradient(rgba(204, 251, 241, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(204, 251, 241, 0.035) 1px, transparent 1px),
    rgba(5, 20, 28, 0.9);
  background-size: 32px 32px;
}

.tool-preview-image {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 6px;
  border: 1px solid rgba(204, 251, 241, 0.12);
  box-shadow: 0 18px 58px rgba(0, 0, 0, 0.38);
}

.features-block {
  scroll-margin-top: 88px;
  max-width: 1040px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.feature-showcase + .feature-showcase {
  margin-top: 3.25rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(11, 195, 171, 0.15);
}

.feature-title {
  letter-spacing: -0.02em;
  max-width: 22rem;
}

.feature-video-outer {
  width: 100%;
  display: flex;
  justify-content: center;
}

.feature-video-card {
  max-width: 920px;
  width: 100%;
}

.feature-copy {
  max-width: 34rem;
  margin-left: auto;
  margin-right: auto;
}

.video-placeholder--compact .placeholder-inner {
  max-width: 20rem;
}

@media (prefers-reduced-motion: reduce) {
  .mega-title,
  .hero-stack .tagline,
  .hero-stack .hero-stagger-btn,
  .reveal-on-scroll {
    transition-duration: 0.01ms !important;
    animation: none !important;
  }

  .video-frame-glow,
  .play-btn-animated {
    animation: none !important;
  }

  .hero-stack--ready .mega-title {
    filter: none;
  }

  .photo-card.is-visible:hover {
    transform: none;
  }

  .photo-card.is-visible:hover .photo-shine {
    transform: none;
    transition: none;
  }

  .tool-shot-overlay,
  .tool-shot-overlay .q-icon {
    transition: none;
  }
}

@media (max-width: 620px) {
  .tool-shot-overlay {
    opacity: 1;
    background: linear-gradient(180deg, transparent 48%, rgba(10, 24, 28, 0.28));
  }

  .tool-shot-overlay .q-icon {
    width: 2.45rem;
    height: 2.45rem;
    transform: none;
  }

  .tool-preview-card {
    width: calc(100vw - 16px);
    max-height: calc(100vh - 16px);
  }

  .tool-preview-bar {
    align-items: flex-start;
    padding: 0.85rem;
  }

  .tool-preview-caption {
    font-size: 0.86rem;
  }

  .tool-preview-image-wrap {
    max-height: calc(100vh - 8.5rem);
  }
}
</style>
