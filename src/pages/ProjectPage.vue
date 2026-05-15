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
      class="screenshot-showcase q-pt-xl q-mt-lg"
    >
      <div
        class="row q-col-gutter-xl items-center workspace-row reveal-on-scroll"
        :class="{ 'is-visible': screenshotsVisible }"
      >
        <div class="col-12 workspace-copy">
        <div class="text-overline pp-overline q-mb-xs">Product preview</div>
        <h2 class="screenshot-title text-h4 text-weight-bold pp-heading q-mb-sm">
          Research workspace, fully connected
        </h2>
        <p class="screenshot-caption pp-body text-body1 q-mb-lg">
          One workspace for papers, PDFs, LaTeX and research structure.
        </p>

        <ul class="workspace-features q-pl-none q-ma-none">
          <li
            v-for="feature in workspaceFeatures"
            :key="feature.title"
            class="workspace-feature row no-wrap items-start"
          >
            <q-icon :name="feature.icon" size="22px" class="workspace-feature__icon q-mr-md" />
            <div>
              <div class="workspace-feature__title text-subtitle2 text-weight-medium pp-title q-mb-xs">
                {{ feature.title }}
              </div>
              <p class="workspace-feature__text text-caption pp-muted q-mb-none">
                {{ feature.description }}
              </p>
            </div>
          </li>
        </ul>
        </div>
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

    <section ref="faqEl" class="faq-block q-pt-xl q-mt-lg column items-center">
      <div
        class="gallery-heading text-center q-mb-lg reveal-on-scroll full-width"
        :class="{ 'is-visible': faqVisible }"
      >
        <div class="text-overline pp-overline q-mb-xs">Support</div>
        <h2 class="text-h5 text-weight-bold pp-heading q-mb-none">
          Frequently asked questions
        </h2>
      </div>

      <q-list class="faq-list reveal-on-scroll" :class="{ 'is-visible': faqVisible }">
        <q-expansion-item
          v-for="item in faqs"
          :key="item.question"
          expand-separator
          :label="item.question"
          header-class="faq-item__header"
          class="faq-item"
        >
          <div class="faq-item__answer pp-body text-body2">
            {{ item.answer }}
          </div>
        </q-expansion-item>
      </q-list>
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
import heroWorkshopUrl from 'src/assets/hero-workshop.png'
import { SITE } from 'src/constants/site'

const heroEntered = ref(false)
const screenshotsVisible = ref(false)
const keyToolsVisible = ref(false)
const faqVisible = ref(false)
const selectedTool = ref(null)
const toolPreviewOpen = ref(false)
const screenshotsEl = ref(null)
const keyToolsEl = ref(null)
const faqEl = ref(null)

const workspaceFeatures = [
  {
    icon: 'library_books',
    title: 'Unified research library',
    description: 'Keep papers, PDFs, and sources organized in one project library.'
  },
  {
    icon: 'code',
    title: 'Integrated LaTeX workflow',
    description: 'Write and edit LaTeX alongside your outline without switching tools.'
  },
  {
    icon: 'account_tree',
    title: 'Structured outline',
    description: 'See sections, arguments, and dependencies as a connected research map.'
  },
  {
    icon: 'compare',
    title: 'Side-by-side reading',
    description: 'Open sources next to notes for comparison, citation, and explanation.'
  }
]

const faqs = [
  {
    question: `What is ${SITE.projectName}?`,
    answer:
      'It is a research workspace that connects papers, PDFs, LaTeX, and project structure in one place, with AI to help you analyze and organize what you are working on.'
  },
  {
    question: 'What can I bring into a project?',
    answer:
      'You can work with common research materials such as PDFs, documents, and LaTeX sources. The workspace keeps them linked so you can move between reading, writing, and outlining without losing context.'
  },
  {
    question: 'How does AI fit into the workflow?',
    answer:
      'AI helps surface themes, explain fragments, and connect related pieces of your project. You stay in control: outputs are tied to your sources so you can review, compare, and reuse them in your own work.'
  },
  {
    question: 'Is my research data private?',
    answer:
      'Your project content is yours. We design the product so analysis and organization happen in your workspace; contact us if you need details on deployment, retention, or enterprise requirements.'
  },
  {
    question: 'Who is this for?',
    answer:
      'Researchers, students, and teams who manage large or long-running projects and want one structured environment instead of scattered files and notes.'
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

let keyToolsObserver
let screenshotsObserver
let faqObserver

function keyToolsDelay (index) {
  return `${120 + index * 100}ms`
}

function openToolPreview (item) {
  selectedTool.value = item
  toolPreviewOpen.value = true
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

  faqObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          faqVisible.value = true
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  )
  if (faqEl.value) {
    faqObserver.observe(faqEl.value)
  }
})

onUnmounted(() => {
  screenshotsObserver?.disconnect()
  keyToolsObserver?.disconnect()
  faqObserver?.disconnect()
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
  top: 50%;
  width: min(640px, 92vw);
  height: 220px;
  transform: translate(-50%, -50%);
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

.workspace-row {
  position: relative;
  z-index: 1;
}

.workspace-copy {
  text-align: left;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

.screenshot-title {
  letter-spacing: 0;
  line-height: 1.14;
}

.screenshot-caption.pp-body {
  max-width: none;
  margin-left: 0;
  margin-right: 0;
}

.workspace-features {
  list-style: none;
}

.workspace-feature + .workspace-feature {
  margin-top: 1rem;
}

.workspace-feature__icon {
  flex-shrink: 0;
  margin-top: 0.1rem;
  color: var(--pp-soft);
}

.workspace-feature__text {
  line-height: 1.5;
}

.gallery-block,
.faq-block {
  scroll-margin-top: 96px;
}

.faq-block {
  width: 100%;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}

.faq-list {
  width: 100%;
  border-radius: 18px;
  border: 1px solid rgba(11, 195, 171, 0.22);
  background: rgba(26, 44, 51, 0.55);
  overflow: hidden;
}

.faq-list :deep(.faq-item) {
  color: var(--pp-body);
}

.faq-list :deep(.faq-item__header) {
  color: var(--pp-heading);
  font-weight: 600;
  padding: 1rem 1.15rem;
}

.faq-list :deep(.q-item__label) {
  line-height: 1.45;
}

.faq-list :deep(.q-expansion-item__toggle-icon) {
  color: var(--pp-soft);
}

.faq-list :deep(.q-separator) {
  background: rgba(11, 195, 171, 0.15);
}

.faq-item__answer {
  padding: 0 1.15rem 1.1rem;
  max-width: none;
  margin: 0;
  line-height: 1.65;
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

@media (prefers-reduced-motion: reduce) {
  .mega-title,
  .hero-stack .tagline,
  .hero-stack .hero-stagger-btn,
  .reveal-on-scroll {
    transition-duration: 0.01ms !important;
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
