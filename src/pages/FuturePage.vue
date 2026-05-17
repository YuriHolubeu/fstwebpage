<template>
  <q-page class="future-page q-pa-md q-pb-xl">
    <section class="hero q-mb-xl text-center column items-center">
      <h1 class="text-h3 text-weight-bold text-white q-mb-md">
        Where the product goes next
      </h1>
      <p class="text-body1 text-grey-4 hero-lead">
        Show investors you think in releases, not vibes. Each item should map to revenue,
        retention, or a defensible data asset.
      </p>
    </section>

    <div class="roadmap-wrap column items-center">
      <q-card flat bordered class="timeline-card q-pa-xl">
        <q-timeline color="primary" layout="comfortable" dark class="roadmap-timeline">
          <q-timeline-entry
            v-for="item in roadmap"
            :key="item.title"
            :title="item.title"
            :subtitle="item.window"
            :icon="item.icon"
            :color="item.color"
          >
            <div class="text-body1 text-grey-4 timeline-detail">{{ item.detail }}</div>
            <div class="q-mt-sm">
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
          </q-timeline-entry>
        </q-timeline>
      </q-card>
    </div>

  </q-page>
</template>

<script setup>
const roadmap = [
  {
    title: 'The idea appeared',
    window: '2019',
    detail: 'The concept for a structured research environment took shape.',
    icon: 'lightbulb',
    color: 'grey-5',
    tags: ['Origin']
  },
  {
    title: 'The project was formulated',
    window: 'October 2025 – April 2026',
    detail: 'Scope, goals, and product direction were defined for the first release.',
    icon: 'description',
    color: 'grey-5',
    tags: ['Foundation']
  },
  {
    title: 'Minimal team was found',
    window: 'April 2026',
    detail: 'A small core team came together to build the first version.',
    icon: 'groups',
    color: 'grey-5',
    tags: ['Team']
  },
  {
    title: 'Enterprise controls',
    window: '2026 · Near term',
    detail: 'SSO, audit trails, and role-based access aligned to your buyer.',
    icon: 'verified_user',
    color: 'primary',
    tags: ['Security', 'RevOps']
  },
  {
    title: 'Integrations hub',
    window: '2028 · Mid term',
    detail: 'First-party connectors plus webhook platform for ecosystem pull-through.',
    icon: 'extension',
    color: 'secondary',
    tags: ['Platform', 'Partners']
  },
  {
    title: 'Intelligence layer',
    window: '2030 · Longer arc',
    detail: 'Signals that compound with usage — the reason customers stay and expand.',
    icon: 'psychology',
    color: 'accent',
    tags: ['Moat', 'Data']
  }
]
</script>

<style scoped>
.future-page {
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}

.hero-lead {
  max-width: 720px;
}

.roadmap-wrap {
  width: 100%;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
}

.timeline-card {
  width: 100%;
  border-radius: 20px;
  background: rgba(26, 44, 51, 0.55);
  border-color: rgba(11, 195, 171, 0.22);
}

.roadmap-timeline :deep(.q-timeline__title) {
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.roadmap-timeline :deep(.q-timeline__subtitle) {
  font-size: 19px;
  opacity: 0.95;
}

.roadmap-timeline :deep(.q-timeline__dot) {
  transform: scale(1.08);
}

.timeline-detail {
  line-height: 1.55;
  max-width: 52rem;
}

</style>
