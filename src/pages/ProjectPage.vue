<template>
  <q-page class="project-page q-pa-md q-pb-xl">
    <section
      class="hero-stack text-center q-pt-lg q-pb-md column items-center"
      :class="{ 'hero-stack--ready': heroEntered }"
    >
      <div class="hero-headline-column">
        <div class="hero-tagline-row row q-col-gutter-lg items-center q-mb-lg">
          <div class="col-12 col-md-6 hero-tagline-copy">
            <h1 class="mega-title">
              {{ SITE.heroHeadline }}
            </h1>
            <p class="tagline pp-body text-body1 q-ma-none">
              {{ SITE.tagline }}
            </p>
            <HeroSignupActions />
          </div>
          <div class="col-12 col-md-6 flex flex-center">
            <figure class="hero-tagline-figure">
              <img
                :src="heroTaglineVisualUrl"
                alt="Researcher viewing a holographic data network"
                class="hero-tagline-img"
                width="960"
                height="540"
                loading="eager"
                decoding="async"
              />
              <figcaption class="image-figure-caption">Film Iron Man 2</figcaption>
            </figure>
          </div>
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
        <h2 class="screenshot-title text-h4 text-weight-bold pp-heading q-mb-sm">
          Complete professional research environment
        </h2>
        <p class="workspace-section-lead workspace-feature__text text-caption pp-muted q-mt-none q-mb-md">
          Our application makes theoretical research faster, more efficient, and more comfortable. We promise:
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










    <section
      ref="applicationEl"
      class="screenshot-showcase q-pt-xl q-mt-lg"
    >
      <div
        class="application-section-inner workspace-row reveal-on-scroll"
        :class="{ 'is-visible': applicationVisible }"
      >
        <h2 class="screenshot-title text-h4 text-weight-bold pp-heading q-mb-sm application-section-title">
          The application
        </h2>

        <p class="application-section-lead workspace-section-lead workspace-feature__text text-caption pp-muted q-mt-none q-mb-md">
          A dedicated application structure makes this environment possible. This format is key to enabling the AI tools, as explained below.
        </p>

        <div class="row q-col-gutter-lg items-start application-content-row">
          <div class="col-12 col-md-6 application-features-col">
            <ul class="workspace-features application-features-list q-pl-none q-ma-none">
              <li
                v-for="feature in applicationFeatures"
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
          <div class="col-12 col-md-6 application-screenshot-col">
            <button
              type="button"
              class="application-screenshot-trigger"
              aria-label="Open full-size application screenshot"
              @click="openApplicationPreview"
            >
              <figure class="application-screenshot-figure">
                <img
                  :src="applicationScreenshot.src"
                  alt="Focus Structure Tool workspace with a structured outline and linked document views"
                  class="application-screenshot-img"
                  :width="applicationScreenshot.width"
                  :height="applicationScreenshot.height"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </button>
          </div>
        </div>
      </div>
    </section>










    <section
      ref="keyToolsEl"
      class="gallery-block gallery-block--tools q-pt-xl q-mt-lg column items-center"
    >
      <div
        class="gallery-heading text-center q-mb-lg reveal-on-scroll full-width"
        :class="{ 'is-visible': keyToolsVisible }"
      >
        <h2 class="text-h5 text-weight-bold pp-heading q-mb-xs">
          Product preview
        </h2>
        <p class="text-caption pp-muted q-mb-none contacts-intro">
          The product is still under development, but we can share screenshots of some of its components.
        </p>
      </div>

      <div class="tool-shot-grid row q-col-gutter-xl justify-center full-width">
        <div
          v-for="(item, i) in keyTools"
          :key="item.title"
          class="col-12 col-sm-6"
        >
          <article
            class="tool-shot-card reveal-on-scroll"
            :class="{ 'is-visible': keyToolsVisible }"
            :style="{ transitionDelay: keyToolsDelay(i) }"
          >
            <button
              type="button"
              class="application-screenshot-trigger"
              :aria-label="`Open ${item.title} screenshot`"
              @click="openToolPreview(item)"
            >
              <figure class="application-screenshot-figure">
                <img
                  :src="item.src"
                  :alt="item.title"
                  class="application-screenshot-img"
                  :width="item.width"
                  :height="item.height"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </button>
            <div class="tool-shot-card__body">
              <h3 class="tool-shot-card__title">{{ item.title }}</h3>
            </div>
          </article>
        </div>
      </div>
    </section>



    <section
      ref="aiToolsEl"
      class="screenshot-showcase q-pt-xl q-mt-lg"
    >
      <div
        class="row q-col-gutter-xl items-center workspace-row reveal-on-scroll"
        :class="{ 'is-visible': aiToolsVisible }"
      >
        <div class="col-12 workspace-copy">
          <h2 class="screenshot-title text-h4 text-weight-bold pp-heading q-mb-sm">
            AI tools
          </h2>

          <ul class="workspace-features q-pl-none q-ma-none">
            <li
              v-for="feature in aiToolsFeatures"
              :key="feature.title"
              class="workspace-feature row no-wrap items-start"
            >
              <q-icon :name="feature.icon" size="22px" class="workspace-feature__icon q-mr-md" />
              <div>
                <div class="workspace-feature__title text-subtitle2 text-weight-medium pp-title q-mb-xs">
                  {{ feature.title }}
                </div>
                <p
                  v-if="feature.descriptionHtml"
                  class="workspace-feature__text text-caption pp-muted q-mb-none"
                  v-html="feature.descriptionHtml"
                />
                <p v-else class="workspace-feature__text text-caption pp-muted q-mb-none">
                  {{ feature.description }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section ref="previewsEl" class="results-preview-block q-pt-xl q-mt-lg column items-center">
      <div
        class="gallery-heading text-center q-mb-lg reveal-on-scroll full-width"
        :class="{ 'is-visible': previewsVisible }"
      >
        <h2 class="text-h5 text-weight-bold pp-heading q-mb-sm">
          Examples of research environments 
        </h2>
        <p class="text-caption pp-muted q-mb-none preview-env-intro">
          Research environments can be exported as structured PDFs, making all information easy to access anywhere. Below are several examples.
        </p>
      </div>

      <q-list
        class="preview-pdf-list reveal-on-scroll"
        :class="{ 'is-visible': previewsVisible }"
      >
        <q-item
          v-for="pdf in basicPhysicsPreviews"
          :key="pdf.file"
          tag="a"
          :href="previewPdfUrl(pdf)"
          class="preview-pdf-item"
          target="_blank"
          rel="noopener noreferrer"
          :download="pdf.file"
        >
          <q-item-section avatar>
            <q-icon name="picture_as_pdf" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="preview-pdf-item__title">{{ pdf.title }}</q-item-label>
            <q-item-label class="preview-pdf-item__size">{{ pdf.sizeLabel }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="download" class="preview-pdf-item__download-icon" />
          </q-item-section>
        </q-item>
      </q-list>
    </section>

    <section ref="teamEl" class="team-block q-pt-xl q-mt-lg column items-center">
      <div
        class="gallery-heading text-center q-mb-lg reveal-on-scroll full-width"
        :class="{ 'is-visible': teamVisible }"
      >
        <h2 class="text-h5 text-weight-bold pp-heading q-mb-none">
          People behind the product
        </h2>
      </div>

      <div
        class="row no-wrap justify-center q-col-gutter-md full-width team-grid reveal-on-scroll"
        :class="{ 'is-visible': teamVisible }"
      >
        <div
          v-for="member in team"
          :key="member.name"
          class="team-grid__col"
        >
          <div class="team-member text-center column items-center">
            <q-avatar class="q-mb-md team-avatar text-weight-bold">
              <img
                v-if="member.photo"
                :src="member.photo"
                :alt="member.name"
                class="team-avatar__img"
              >
              <template v-else>{{ member.initials }}</template>
            </q-avatar>
            <div class="team-member__name text-weight-medium">{{ member.name }}</div>
            <div class="team-member__role text-caption q-mb-sm">{{ member.role }}</div>
            <p class="team-member__bio text-caption q-mb-none">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <section ref="faqEl" class="faq-block q-pt-xl q-mt-lg column items-center">
      <div
        class="gallery-heading text-center q-mb-lg reveal-on-scroll full-width"
        :class="{ 'is-visible': faqVisible }"
      >
        <h2 class="text-h5 text-weight-bold pp-heading q-mb-none">
          Frequently asked questions
        </h2>
      </div>

      <FaqList
        class="reveal-on-scroll"
        :class="{ 'is-visible': faqVisible }"
        :items="FAQ_ITEMS"
      />
    </section>

    <section ref="workshopEl" class="workshop-block q-pt-xl q-mt-lg column items-center">
      <div
        class="workshop-block__inner column items-center reveal-on-scroll"
        :class="{ 'is-visible': workshopVisible }"
      >
        <p class="workshop-image-caption text-body1 q-mb-lg q-mt-none text-center">
          {{ SITE.heroImageCaption }}
        </p>
        <figure class="workshop-figure">
          <img
            :src="heroWorkshopUrl"
            alt="Scholar's study with desk, books, and chalkboard"
            class="workshop-hero-img"
            width="1024"
            height="1024"
            loading="lazy"
            decoding="async"
          />
          <figcaption class="image-figure-caption image-figure-caption--subtle">
            Real photo of Albert Einstein's office. Photographer: Ralph Morse
          </figcaption>
        </figure>
      </div>
    </section>

    <q-dialog
      v-model="toolPreviewOpen"
      no-refocus
      transition-show="scale"
      transition-hide="fade"
      content-class="tool-preview-dialog"
      @before-hide="onToolPreviewBeforeHide"
      @hide="onToolPreviewAfterHide"
    >
      <q-card
        v-if="selectedTool"
        class="tool-preview-card"
        :class="{ 'tool-preview-card--native': selectedTool.nativeWidth }"
        :style="nativePreviewStyle(selectedTool)"
      >
        <div class="tool-preview-bar">
          <h3 class="tool-preview-title q-mb-none">{{ selectedTool.title }}</h3>
          <q-btn
            class="tool-preview-close"
            dense
            round
            flat
            size="sm"
            icon="close"
            text-color="white"
            aria-label="Close screenshot preview"
            @click="toolPreviewOpen = false"
          />
        </div>

        <div
          class="tool-preview-image-wrap"
          :class="{ 'tool-preview-image-wrap--native': selectedTool.nativeWidth }"
        >
          <img
            :src="selectedTool.src"
            :alt="selectedTool.title"
            class="tool-preview-image"
            :class="{ 'tool-preview-image--native': selectedTool.nativeWidth }"
            :width="selectedTool.nativeWidth"
            :height="selectedTool.nativeHeight"
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import heroWorkshopUrl from 'src/assets/hero-workshop.png'
import heroTaglineVisualUrl from 'src/assets/hero-tagline-visual.png'
import HeroSignupActions from 'src/components/investor/HeroSignupActions.vue'
import FaqList from 'src/components/investor/FaqList.vue'
import { FAQ_ITEMS } from 'src/constants/faqs'
import { SITE } from 'src/constants/site'
import {
  BASIC_PHYSICS_PREVIEW_BASE,
  basicPhysicsPreviews
} from 'src/constants/basicPhysicsPreviews'

const applicationScreenshot = {
  title: 'Focus Structure Tool',
  src: `${import.meta.env.BASE_URL}images/application-workspace.jpg`,
  width: 1917,
  height: 1132
}

const applicationScreenshotPreview = {
  title: applicationScreenshot.title,
  src: applicationScreenshot.src,
  nativeWidth: applicationScreenshot.width,
  nativeHeight: applicationScreenshot.height
}

function nativePreviewStyle (item) {
  if (!item?.nativeWidth || !item?.nativeHeight) {
    return undefined
  }

  return {
    '--preview-native-width': `${item.nativeWidth}px`,
    '--preview-native-height': `${item.nativeHeight}px`
  }
}

const heroEntered = ref(false)
const screenshotsVisible = ref(false)
const applicationVisible = ref(false)
const aiToolsVisible = ref(false)
const keyToolsVisible = ref(false)
const previewsVisible = ref(false)
const teamVisible = ref(false)
const faqVisible = ref(false)
const workshopVisible = ref(false)
const selectedTool = ref(null)
const toolPreviewOpen = ref(false)
let toolPreviewScrollY = 0
let toolPreviewScrollBehavior = ''
const screenshotsEl = ref(null)
const applicationEl = ref(null)
const aiToolsEl = ref(null)
const keyToolsEl = ref(null)
const previewsEl = ref(null)
const teamEl = ref(null)
const faqEl = ref(null)
const workshopEl = ref(null)


function previewPdfUrl (pdf) {
  return `${BASIC_PHYSICS_PREVIEW_BASE}/${pdf.file}`
}

const team = [
  {
    initials: 'YH',
    name: 'Yury Holubeu',
    role: 'Founder / CEO',
    photo: '/team/yury-holubeu.png',
    bio: 'Master of Physics'
  },
    {
    initials: 'JP',
    name: 'Jevgenij Posashkov',
    role: 'Leader of AI development',
    photo: '/team/jevgenij-posashkov.png',
    bio: 'Master of Data Science '
  },
  {
    initials: 'ER',
    name: 'Egor Riter',
    role: 'Main Software Engineer',
    photo: '/team/egor-riter.png',
    bio: 'Experienced backend and frontend specialist'
  }
]

const workspaceFeatures = [
  {
    icon: 'track_changes',
    title: 'Enhanced focus on key information',
    description: 'Focusing on the right topic is key in science. Our tools allow one to instantly extract key information from books and articles and to create notes with it without LaTeX struggles. An environment with focus tools make possible to work with thousands of pages of information.'
  },  
  {
    icon: 'account_tree',
    title: 'Inherent structuring of information',
    description: 'Structuring allows working with thousands of pages of information with comfort. This makes it possible to access and modify information way faster.'
  },
  {
    icon: 'compare',
    title: 'Deeper understanding with special AI tools',
    description: 'The main problem with ChatGPT is that information quickly becomes disorganized and hard to access. Our application solves this and adds a visual environment for discovering connections between topics.'
  }
]

const applicationFeatures = [
  {
    icon: 'account_tree',
    title: 'Advanced PDF format with fast graphical access',
    description: 'Our tools extract LaTeX codes from books and articles in seconds and combine them into a single PDF. Access to its sections and modification are accelerated through an improved structure panel.'
  },
  {
    icon: 'track_changes',
    title: 'Tools for focusing and managing the project',
    description: 'The PDF begins with a part of key information used to understand all other important content and solve problems for practice. After, there is a part with goals, progress, open questions, and ways forward to help avoid getting lost in information.'
  },
  {
    icon: 'bolt',
    title: 'Tools for a really fast text modification',
    description: 'Hotkeys for common commands, adding comments in the graphical environment, extracting key information, and restructuring books.'
  },
  {
    icon: 'download_for_offline',
    title: 'Downloading all cited papers',
    description: 'Understanding a scientific paper often requires reading most of its cited works. Our tool allows you to download all referenced papers at once, saving hours when studying a single article.'
  },
  {
    icon: 'functions',
    title: 'Integrated LaTeX workflow',
    description: 'All essential LaTeX editing tools are integrated for fast and efficient work. The system is designed to function as a full-featured desktop LaTeX editor.'
  }
]




const aiToolsFeatures = [
  {
    icon: 'hub',
    title: 'AI for finding extra connections between articles',
    description:
      'Suppose one has used our application for downloading 200 cited articles from 10 relevant papers. It would take some weeks to grasp the main ideas of them to make sure that none of the relevant information would be missed. Our AI tool can analyse it and give proposals for relevant connections in minutes.'
  },
  {
    icon: 'highlight',
    title: 'AI derivation guidance',
    description:
      'Our application will not only provide answers to the questions but also highlight parts of a book in the project that a researcher could use to find these answers on their own.'
  },
  {
    icon: 'account_tree',
    title: 'AI explanation tree',
    description:
      'Chat-based interfaces are inefficient for retrieving information because data is stored without structure. Our graphical environment provides a more natural way to access knowledge, making interaction with AI faster and significantly more productive.'
  },
  {
    icon: 'supervisor_account',
    title: 'AI for supervising research',
    descriptionHtml:
      'Many researchers would value guidance from figures like Albert Einstein. Our AI tool analyzes the working styles and problem-solving approaches of Einstein and other prominent scientists to create an AI-driven representation of their methods, functioning as a virtual supervisor that suggests possible directions for solving a given problem.<br>Users can also ask why a suggestion was made, and the system will explain it by linking to similar decisions in the scientist’s past work and reasoning.'
  }
]





const keyTools = [
  {
    title: 'A PDF viewer, a LaTeX editor, and a file explorer in one application',
    src: `${import.meta.env.BASE_URL}screenshots/prv3.png`,
    width: 1917,
    height: 1132
  },
  {
    title: 'Download tens of articles and extract Latex in minutes',
    src: `${import.meta.env.BASE_URL}screenshots/upl.png`,
    width: 1037,
    height: 627
  },
  {
    title: 'Displaying connections between pieces of information',
    src: `${import.meta.env.BASE_URL}screenshots/cnn.png`
  },
  {
    title: 'Research roadmap and tips',
    src: `${import.meta.env.BASE_URL}screenshots/guide.png`
  }
]

let keyToolsObserver
let screenshotsObserver
let applicationObserver
let aiToolsObserver
let previewsObserver
let teamObserver
let faqObserver
let workshopObserver

function keyToolsDelay (index) {
  return `${120 + index * 100}ms`
}

function openToolPreview (item) {
  toolPreviewScrollY = window.scrollY
  selectedTool.value = {
    ...item,
    nativeWidth: item.nativeWidth ?? item.width,
    nativeHeight: item.nativeHeight ?? item.height
  }
  toolPreviewOpen.value = true
}

function openApplicationPreview () {
  openToolPreview(applicationScreenshotPreview)
}

function restoreToolPreviewScroll () {
  window.scrollTo({ left: 0, top: toolPreviewScrollY, behavior: 'instant' })
}

function onToolPreviewBeforeHide () {
  const html = document.documentElement
  toolPreviewScrollBehavior = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  restoreToolPreviewScroll()
}

function onToolPreviewAfterHide () {
  restoreToolPreviewScroll()
  requestAnimationFrame(() => {
    restoreToolPreviewScroll()
    document.documentElement.style.scrollBehavior = toolPreviewScrollBehavior
    toolPreviewScrollBehavior = ''
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

  applicationObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          applicationVisible.value = true
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
  )
  if (applicationEl.value) {
    applicationObserver.observe(applicationEl.value)
  }

  aiToolsObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          aiToolsVisible.value = true
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
  )
  if (aiToolsEl.value) {
    aiToolsObserver.observe(aiToolsEl.value)
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

  previewsObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          previewsVisible.value = true
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  )
  if (previewsEl.value) {
    previewsObserver.observe(previewsEl.value)
  }

  teamObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          teamVisible.value = true
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  )
  if (teamEl.value) {
    teamObserver.observe(teamEl.value)
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

  workshopObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          workshopVisible.value = true
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  )
  if (workshopEl.value) {
    workshopObserver.observe(workshopEl.value)
  }

})

onUnmounted(() => {
  screenshotsObserver?.disconnect()
  applicationObserver?.disconnect()
  aiToolsObserver?.disconnect()
  keyToolsObserver?.disconnect()
  previewsObserver?.disconnect()
  teamObserver?.disconnect()
  faqObserver?.disconnect()
  workshopObserver?.disconnect()
})
</script>

<style scoped>
/*
 * Text on slate + teal surfaces: cool mint highlights (aligned with app icon palette).
 */
.project-page {
  --pp-high: var(--site-text-high);
  --pp-body: var(--site-text-body);
  --pp-heading: var(--site-text-heading);
  --pp-muted: var(--site-text-muted);
  --pp-soft: var(--site-text-soft);
  --pp-code-fg: var(--site-text-high);
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
  font-size: 15px;
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
  max-width: min(920px, 100%);
  padding: 0 0.75rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.hero-tagline-row {
  width: 100%;
  text-align: left;
}

.hero-tagline-figure {
  position: relative;
  margin: 0;
  width: 100%;
  max-width: 480px;
}

.hero-tagline-img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  border: 1px solid rgba(11, 195, 171, 0.28);
  box-shadow:
    0 0 0 1px rgba(3, 117, 204, 0.12),
    0 12px 40px rgba(6, 15, 20, 0.65);
  object-fit: cover;
}

.image-figure-caption {
  position: absolute;
  right: 8px;
  bottom: 8px;
  margin: 0;
  padding: 2px 6px;
  max-width: 75%;
  font-size: 7px;
  line-height: 1.2;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-align: right;
  color: rgba(255, 255, 255, 0.78);
  background: rgba(6, 15, 20, 0.35);
  border-radius: 4px;
  pointer-events: none;
}

.image-figure-caption--subtle {
  color: rgba(255, 255, 255, 0.48);
  background: rgba(6, 15, 20, 0.2);
}

@media (min-width: 960px) {
  .hero-tagline-figure {
    max-width: min(100%, 36rem);
  }
}

.hero-tagline-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
}

.mega-title {
  font-size: clamp(1.65rem, 4.8vw, 2.75rem);
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

.hero-stack .hero-tagline-row {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-stack--ready .hero-tagline-row {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.12s;
}

.hero-headline-column .tagline.pp-body {
  max-width: none;
  width: 100%;
  text-align: left;
}

@media (max-width: 1023px) {
  .hero-tagline-row {
    text-align: center;
  }

  .hero-tagline-copy {
    align-items: center;
  }

  .hero-headline-column .tagline.pp-body {
    text-align: center;
  }

  .hero-tagline-copy :deep(.hero-signup-actions) {
    justify-content: center;
  }

  .hero-headline-column .mega-title {
    text-align: center;
    width: 100%;
  }
}

.workshop-block {
  scroll-margin-top: 96px;
  width: 100%;
}

.workshop-block__inner {
  width: 100%;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 0.5rem;
}

.workshop-figure {
  position: relative;
  margin: 0;
  width: min(62%, 920px);
  margin-left: auto;
  margin-right: auto;
}

.workshop-hero-img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 16px;
  border: 1px solid rgba(11, 195, 171, 0.28);
  box-shadow:
    0 0 0 1px rgba(3, 117, 204, 0.12),
    0 20px 56px rgba(10, 24, 28, 0.55);
}

.workshop-image-caption {
  color: var(--pp-muted);
  font-size: 0.5rem;
  line-height: 1.5;
  font-weight: 500;
  letter-spacing: 0.01em;
  max-width: 36rem;
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
  width: min(1040px, 100%);
  height: min(360px, 70%);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(
    ellipse 85% 75% at 50% 50%,
    rgba(11, 195, 171, 0.18) 10%,
    rgba(3, 117, 204, 0.1) 40%,
    transparent 90%
  );
  filter: blur(18px);
  opacity: 0.65;
  pointer-events: none;
  z-index: 0;
}

.workspace-row {
  position: relative;
  z-index: 1;
}

.workspace-copy {
  text-align: left;
  max-width: min(920px, 100%);
  margin-left: auto;
  margin-right: auto;
}

.application-section-inner {
  text-align: left;
  max-width: min(920px, 100%);
  margin-left: auto;
  margin-right: auto;
}

.application-section-title {
  max-width: none;
}

.application-section-lead {
  max-width: none;
  line-height: 1.65;
  margin-bottom: calc(35px) !important;
}

.application-content-row {
  align-items: stretch;
}

.application-features-col,
.application-screenshot-col {
  min-width: 0;
}

.application-features-list {
  max-width: none;
}

@media (min-width: 1024px) {
  .application-section-inner {
    max-width: none;
    margin-left: 0;
    margin-right: 0;
  }

  .application-content-row {
    align-items: stretch;
  }

  .application-screenshot-col {
    display: flex;
    flex-direction: column;
  }

  .application-screenshot-trigger {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    height: 100%;
  }

  .application-screenshot-figure {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    min-height: 0;
  }

  .application-screenshot-img {
    max-height: 100%;
    object-fit: contain;
  }
}

.application-screenshot-trigger {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  color: inherit;
  text-align: inherit;
  background: transparent;
  cursor: zoom-in;
  border-radius: 12px;
}

.application-screenshot-trigger:focus-visible {
  outline: 2px solid rgba(94, 234, 212, 0.9);
  outline-offset: 3px;
}

.application-screenshot-trigger:hover .application-screenshot-img {
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow:
    0 0 0 1px rgba(3, 117, 204, 0.2),
    0 16px 48px rgba(6, 15, 20, 0.75);
}

.application-screenshot-figure {
  margin: 0;
  width: 100%;
}

.application-screenshot-img {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 0 0 1px rgba(3, 117, 204, 0.12),
    0 12px 40px rgba(6, 15, 20, 0.65);
  object-fit: contain;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.screenshot-title {
  letter-spacing: 0;
  line-height: 1.14;
}

@media (min-width: 600px) {
  .screenshot-title {
    white-space: nowrap;
  }
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

.workspace-section-lead {
  max-width: none;
}

.workspace-feature__text {
  line-height: 1.5;
}

.gallery-block {
  scroll-margin-top: 96px;
  width: 100%;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
}

.results-preview-block {
  scroll-margin-top: 96px;
  width: 100%;
  max-width: min(920px, 100%);
  margin-left: auto;
  margin-right: auto;
}

.preview-env-intro {
  margin-left: auto;
  margin-right: auto;
  max-width: min(882px, calc(100% - 38px));
  text-align: center;
}

.gallery-block--tools {
  max-width: 1080px;
}

.tool-shot-grid {
  width: 100%;
}

.preview-pdf-list {
  width: 100%;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 16px;
  border: 1px solid rgba(11, 195, 171, 0.22);
  background: rgba(26, 44, 51, 0.45);
  overflow: hidden;
}

.preview-pdf-item {
  color: var(--pp-body);
  text-decoration: none;
  transition: background 0.2s ease;
}

.preview-pdf-item:hover {
  background: rgba(11, 195, 171, 0.1);
}

.preview-pdf-item__title {
  color: var(--pp-heading);
  font-weight: 600;
}

.preview-pdf-item__size {
  color: #fbbf24;
  font-size: 16px;
  font-weight: 500;
}

.preview-pdf-item__download-icon {
  color: var(--pp-soft);
  opacity: 0.85;
}

.team-block,
.faq-block {
  scroll-margin-top: 96px;
}

.team-grid {
  flex-wrap: nowrap !important;
  width: 100%;
  max-width: 1040px;
  margin-left: auto;
  margin-right: auto;
}

.team-grid__col {
  flex: 1 1 0;
  min-width: 0;
  max-width: 33.333%;
  display: flex;
  justify-content: center;
}

.team-member {
  width: 100%;
  max-width: none;
  padding: clamp(0.5rem, 1.5vw, 1rem);
}

.team-member__name {
  color: #e0f2fe;
  font-size: 22px;
  line-height: 1.25;
  text-shadow: 0 1px 14px rgba(3, 117, 204, 0.45);
}

@media (min-width: 600px) {
  .team-member__name {
    font-size: 26px;
  }
}

.team-member__role {
  color: var(--site-text-accent);
  font-size: clamp(15px, 1.45vw, 16px);
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.02em;
  text-shadow: 0 1px 12px rgba(3, 117, 204, 0.4);
}

.team-member__bio {
  color: var(--site-text-accent-soft);
  font-size: clamp(15px, 1.35vw, 16px);
  line-height: 1.45;
  text-shadow: 0 1px 10px rgba(3, 117, 204, 0.35);
}

.team-avatar {
  width: clamp(72px, 14vw, 152px) !important;
  height: clamp(72px, 14vw, 152px) !important;
  font-size: clamp(18px, 2vw, 24px);
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: linear-gradient(135deg, #0375cc, #0bc3ab);
  color: #133031;
}

.team-avatar__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.faq-block {
  width: 100%;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
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

.tool-shot-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tool-shot-card__body {
  padding: 1rem 0.35rem 0.25rem;
}

.tool-shot-card__title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--pp-heading);
}

:global(.tool-preview-dialog) {
  max-height: 100vh;
  overflow: hidden;
}

:global(.tool-preview-dialog:has(.tool-preview-card--native)) {
  overflow: hidden;
}

.tool-preview-card {
  display: flex;
  flex-direction: column;
  width: min(1180px, calc(100vw - 32px));
  max-width: none;
  max-height: calc(100vh - 32px);
  overflow: hidden;
  color: var(--site-text-body);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: #0a181c;
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.52);
}

.tool-preview-bar {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 2.5rem 1fr 2.5rem;
  align-items: center;
  padding: 0.65rem 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.tool-preview-title {
  grid-column: 2;
  margin: 0;
  text-align: center;
  color: var(--site-text-heading);
  font-size: clamp(1.15rem, 2.4vw, 1.55rem);
  font-weight: 700;
  line-height: 1.25;
}

.tool-preview-close {
  grid-column: 3;
  justify-self: end;
}

.tool-preview-image-wrap {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  overflow: hidden;
  background: rgba(5, 20, 28, 0.9);
}

.tool-preview-image {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 6px;
  box-shadow: 0 18px 58px rgba(0, 0, 0, 0.38);
}

.tool-preview-card--native {
  width: fit-content;
  max-width: min(var(--preview-native-width), calc(100vw - 32px));
  max-height: calc(100vh - 32px);
  border: none;
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.52);
}

.tool-preview-card--native .tool-preview-image-wrap {
  flex: 0 0 auto;
}

.tool-preview-image-wrap--native {
  padding: 0;
  overflow: hidden;
  background: transparent;
}

.tool-preview-image--native {
  display: block;
  width: auto;
  height: auto;
  max-width: min(var(--preview-native-width), calc(100vw - 32px));
  max-height: calc(100vh - 3.25rem);
  object-fit: contain;
  border-radius: 0;
  box-shadow: none;
}

@media (prefers-reduced-motion: reduce) {
  .mega-title,
  .hero-stack .hero-tagline-row,
  .reveal-on-scroll {
    transition-duration: 0.01ms !important;
    animation: none !important;
  }

  .hero-stack--ready .mega-title {
    filter: none;
  }

}

@media (max-width: 620px) {
  .tool-preview-card {
    width: calc(100vw - 16px);
    max-height: calc(100vh - 16px);
  }

  .tool-preview-bar {
    padding: 0.55rem 0.4rem;
  }

  .tool-preview-title {
    font-size: clamp(1.15rem, 4.5vw, 1.55rem);
  }
}
</style>
