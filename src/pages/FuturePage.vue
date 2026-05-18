<template>
  <q-page class="future-page q-pa-md q-pb-xl">
    <section class="hero q-mb-xl text-center column items-center">
      <h1 class="text-h3 text-weight-bold text-white q-mb-md">
        History of the project and plans for success
      </h1>
    </section>

    <div class="roadmap-wrap column items-center">
      <q-card flat bordered class="timeline-card q-pa-xl">
        <div class="roadmap-list">
          <article
            v-for="item in roadmap"
            :key="item.title"
            class="roadmap-item"
          >
            <p class="roadmap-item__date q-ma-none">{{ item.window }}</p>
            <div
              class="roadmap-item__icon flex flex-center"
              :class="`roadmap-item__icon--${item.color}`"
            >
              <q-icon :name="item.icon" size="20px" />
            </div>
            <div class="roadmap-item__body">
              <h3 class="roadmap-item__title q-ma-none">{{ item.title }}</h3>
              <p class="roadmap-item__detail q-ma-none">{{ item.detail }}</p>
              <div v-if="item.tags.length" class="q-mt-sm">
                <q-chip
                  v-for="tag in item.tags"
                  :key="tag"
                  dense
                  outline
                  color="cyan-4"
                  text-color="grey-3"
                  class="q-mr-xs q-mb-xs"
                >
                  {{ tag }}
                </q-chip>
              </div>
            </div>
          </article>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
const roadmap = [
  {
    title: 'Appearance of a general idea',
    window: '2019',
    detail: 'The concept for a structured research environment took shape.',
    icon: 'emoji_objects',
    color: 'primary',
    tags: []
  },
  {
    title: 'Formulation of the project, formation of a  minimal team',
    window: 'October 2025 – April 2026',
    detail: 'The project was written clearly, a social survey was made, and a minimal number of specialists were found.',
    icon: 'edit_note',
    color: 'primary',
    tags: []
  },
  {
    title: 'Start of the prototype development',
    window: 'April 2026',
    detail: 'A small core team came together to build the first version.',
    icon: 'engineering',
    color: 'primary',
    tags: []
  },
  {
    title: 'First release',
    window: '2026 August',
    detail: 'The first release will have a fully functioning structure panel, all Latex tools, extraction of Latex from Arxiv and from scanned PDFs, downloading all cited articles, AI grouping feature.',
    icon: 'rocket_launch',
    color: 'secondary',
    tags: []
  },
  {
    title: 'Release with all promised AI features',
    window: '2026 November – 2027 February',
    detail: 'Creation of all AI features. Such a wide range is because the speed of the develpment strongly depends on funding.',
    icon: 'auto_awesome',
    color: 'secondary',
    tags: []
  },
  {
    title: 'Stable company with well-developed AI tools',
    window: '2027 August',
    detail: 'Have 10 000 active users, have a community of programmers who develop custom AI agents for the application, have our own scientific conferences for answering purely scientific questions that were not touched before.',
    icon: 'corporate_fare',
    color: 'accent',
    tags: []
  },
  {
    title: 'Best application for science in the world',
    window: '2028 August',
    detail: 'Have 500 000 active users. Make science affordable for more people and become a table tool for the majority of scientists.',
    icon: 'public',
    color: 'accent',
    tags: []
  }
]
</script>

<style scoped>
.future-page {
  max-width: calc(1100px + 3cm);
  margin-left: auto;
  margin-right: auto;
}

.roadmap-wrap {
  width: 100%;
  max-width: calc(960px + 3cm);
  margin-left: auto;
  margin-right: auto;
}

.timeline-card {
  width: 100%;
  border-radius: 20px;
  background: rgba(26, 44, 51, 0.55);
  border-color: rgba(11, 195, 171, 0.22);
}

.roadmap-list {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.roadmap-item {
  display: grid;
  grid-template-columns: minmax(7.5rem, 30%) 2.25rem minmax(0, 1fr);
  column-gap: 1rem;
  row-gap: 0.35rem;
  align-items: start;
}

.roadmap-item__date {
  grid-column: 1;
  text-align: right;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.3;
}

.roadmap-item__icon {
  grid-column: 2;
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  margin-top: 0.2rem;
  border-radius: 50%;
  border: 2px solid transparent;
}

.roadmap-item__icon--primary {
  color: #5eead4;
  background: rgba(11, 195, 171, 0.22);
  border-color: #5eead4;
}

.roadmap-item__icon--primary :deep(.q-icon) {
  color: #5eead4 !important;
}

.roadmap-item__icon--secondary {
  color: #7dd3fc;
  background: rgba(3, 117, 204, 0.26);
  border-color: #7dd3fc;
}

.roadmap-item__icon--secondary :deep(.q-icon) {
  color: #7dd3fc !important;
}

.roadmap-item__icon--accent {
  color: #c4b5fd;
  background: rgba(167, 139, 250, 0.2);
  border-color: #a78bfa;
}

.roadmap-item__icon--accent :deep(.q-icon) {
  color: #c4b5fd !important;
}

.roadmap-item__body {
  grid-column: 3;
  min-width: 0;
}

.roadmap-item__title {
  color: var(--site-text-heading, #fff);
  font-size: 1.55rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.roadmap-item__detail {
  margin-top: 0.35rem;
  color: var(--site-text-muted, #7dceb8);
  font-size: 15px;
  line-height: 1.55;
}

@media (max-width: 599px) {
  .roadmap-item {
    grid-template-columns: 2.25rem minmax(0, 1fr);
    align-items: start;
  }

  .roadmap-item__date {
    grid-column: 2;
    grid-row: 1;
    text-align: left;
    font-size: 1rem;
    margin-bottom: 0.15rem;
  }

  .roadmap-item__icon {
    grid-column: 1;
    grid-row: 1 / span 2;
    align-self: center;
  }

  .roadmap-item__body {
    grid-column: 2;
    grid-row: 2;
  }
}
</style>
