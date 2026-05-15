<template>
  <q-page class="ai-groups-page q-pa-md q-pb-xl">
    <section class="hero-grid q-pt-lg q-mb-lg">
      <div class="hero-copy">
        <div class="text-overline ai-overline q-mb-sm">AI Features / Groups</div>
        <h1 class="hero-title q-mb-md">AI semantic clustering for research projects</h1>
        <p class="hero-lead q-mb-lg">
          AI Groups reads the project outline, classifies section-level units, and proposes
          reviewable research themes.
        </p>

        <div class="hero-metrics">
          <div v-for="metric in metrics" :key="metric.label" class="metric-tile">
            <strong>{{ metric.value }}</strong>
            <span>{{ metric.label }}</span>
          </div>
        </div>
      </div>

      <q-card flat bordered class="groups-mock">
        <div class="mock-top row items-center justify-between no-wrap">
          <div class="row items-center no-wrap">
            <span class="dot" />
            <span class="dot" />
            <span class="dot" />
            <span class="mock-path">Research Tools / Groups</span>
          </div>
          <q-chip dense outline color="cyan-4" text-color="grey-3">AI layer</q-chip>
        </div>

        <div class="mock-summary">
          <div>
            <span>Suggested grouping</span>
            <strong>459 sections</strong>
          </div>
          <p>organized into 5 research themes</p>
        </div>

        <div class="theme-list">
          <article
            v-for="theme in themes"
            :key="theme.name"
            class="theme-card"
            :style="{ '--accent': theme.color }"
          >
            <div class="row items-center justify-between no-wrap">
              <strong>{{ theme.name }}</strong>
              <span>{{ theme.count }}</span>
            </div>
            <p>{{ theme.signals }}</p>
            <div class="meter"><span :style="{ width: theme.width }" /></div>
          </article>
        </div>
      </q-card>
    </section>

    <section class="system-map q-mb-lg">
      <article v-for="step in flow" :key="step.title" class="map-node">
        <q-icon :name="step.icon" class="map-icon" />
        <div>
          <h2>{{ step.title }}</h2>
          <p>{{ step.text }}</p>
        </div>
      </article>
    </section>

    <section class="compact-grid q-mb-lg">
      <q-card flat bordered class="panel term-panel">
        <div class="panel-head">
          <div class="text-overline ai-overline">Core objects</div>
          <h2>What AI Groups classifies</h2>
        </div>
        <div class="object-list">
          <div v-for="term in terms" :key="term.title" class="object-row">
            <q-icon :name="term.icon" />
            <div>
              <strong>{{ term.title }}</strong>
              <span>{{ term.text }}</span>
            </div>
          </div>
        </div>
      </q-card>

      <q-card flat bordered class="panel pipeline-panel">
        <div class="panel-head">
          <div class="text-overline ai-overline">Technical pipeline</div>
          <h2>Batch-based, explainable output</h2>
        </div>
        <div class="pipeline-rail">
          <div v-for="(item, index) in pipeline" :key="item" class="rail-step">
            <span>{{ index + 1 }}</span>
            {{ item }}
          </div>
        </div>
      </q-card>
    </section>

    <section class="bottom-grid">
      <q-card flat bordered class="panel schema-panel">
        <div class="panel-head">
          <div class="text-overline ai-overline">Data model</div>
          <h2>Minimal MVP schema</h2>
        </div>
        <div class="schema-stack">
          <div v-for="model in models" :key="model.name" class="schema-card">
            <strong>{{ model.name }}</strong>
            <code>{{ model.fields }}</code>
          </div>
        </div>
      </q-card>

      <q-card flat bordered class="panel review-panel">
        <div class="panel-head">
          <div class="text-overline ai-overline">User control</div>
          <h2>AI suggests, researcher decides</h2>
        </div>
        <p>
          Grouping is never applied blindly. Users can inspect signals, move sections,
          rename groups, reject output, or regenerate.
        </p>
        <div class="action-chips row q-gutter-sm">
          <q-chip v-for="action in actions" :key="action" outline color="cyan-4" text-color="grey-3">
            {{ action }}
          </q-chip>
        </div>
        <div class="review-buttons row q-col-gutter-sm q-mt-md">
          <div class="col-12 col-sm-4">
            <q-btn unelevated no-caps class="full-width action-primary" label="Apply" />
          </div>
          <div class="col-12 col-sm-4">
            <q-btn outline no-caps color="cyan-4" class="full-width" label="Review" />
          </div>
          <div class="col-12 col-sm-4">
            <q-btn outline no-caps color="purple-4" class="full-width" label="Regenerate" />
          </div>
        </div>
      </q-card>
    </section>
  </q-page>
</template>

<script setup>
const metrics = [
  { value: '459', label: 'visible sections' },
  { value: '5', label: 'research themes' },
  { value: 'JSON', label: 'LLM output' }
]

const themes = [
  {
    name: 'Open Questions',
    count: '313',
    signals: 'problem, question, puzzle',
    width: '86%',
    color: '#ef4444'
  },
  {
    name: 'Core Theory',
    count: '89',
    signals: 'theory, model, hamiltonian',
    width: '58%',
    color: '#8b5cf6'
  },
  {
    name: 'Experiments',
    count: '32',
    signals: 'measurement, material, sample',
    width: '35%',
    color: '#38bdf8'
  },
  {
    name: 'Methods',
    count: '14',
    signals: 'derivation, formula, equation',
    width: '24%',
    color: '#22c55e'
  }
]

const flow = [
  {
    title: 'Input',
    text: 'LaTeX files, PDF pages, folder structure, headings.',
    icon: 'description'
  },
  {
    title: 'Semantic units',
    text: 'Section objects with title, level, source, preview, formulas.',
    icon: 'segment'
  },
  {
    title: 'AI classifier',
    text: 'Batched LLM classification into stable predefined themes.',
    icon: 'auto_awesome'
  },
  {
    title: 'Reviewable groups',
    text: 'Themes with counts, confidence, signals, examples, actions.',
    icon: 'hub'
  }
]

const terms = [
  {
    title: 'Document Unit',
    text: 'A meaningful section-level piece of the project.',
    icon: 'article'
  },
  {
    title: 'Section Index',
    text: 'Machine-readable outline of all extracted sections.',
    icon: 'account_tree'
  },
  {
    title: 'Research Theme',
    text: 'A high-level AI grouping such as Core Theory or Experiments.',
    icon: 'category'
  },
  {
    title: 'Classification Signal',
    text: 'The reason behind the assignment: theory, model, measurement.',
    icon: 'verified'
  }
]

const pipeline = [
  'Parse project',
  'Build section objects',
  'Classify in batches',
  'Aggregate themes',
  'Save results',
  'Show review UI'
]

const models = [
  {
    name: 'Section',
    fields: 'section_id, title, level, source_file, parent_id, preview, pdf_page'
  },
  {
    name: 'AI Group',
    fields: 'group_id, name, description, section_count, signals'
  },
  {
    name: 'Classification',
    fields: 'section_id, group_id, confidence, reason, signals, model'
  }
]

const actions = ['Move section', 'Rename group', 'Reject group', 'Regenerate']
</script>

<style scoped>
.ai-groups-page {
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
  color: #cffafe;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(20rem, 0.78fr);
  gap: clamp(1rem, 3vw, 2rem);
  align-items: center;
}

.ai-overline {
  color: #5eead4;
  letter-spacing: 0.12em;
}

.hero-title {
  max-width: 44rem;
  color: #f0fdfa;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 850;
  line-height: 1.04;
  letter-spacing: 0;
}

.hero-lead {
  max-width: 40rem;
  color: #cffafe;
  font-size: clamp(1rem, 2vw, 1.15rem);
  line-height: 1.62;
}

.hero-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
  max-width: 34rem;
}

.metric-tile,
.groups-mock,
.system-map,
.panel {
  border: 1px solid rgba(94, 234, 212, 0.22);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(15, 55, 56, 0.82), rgba(10, 24, 28, 0.88)),
    rgba(26, 44, 51, 0.6);
  box-shadow: 0 22px 70px rgba(10, 24, 28, 0.28);
}

.metric-tile {
  padding: 0.85rem;
}

.metric-tile strong {
  display: block;
  color: #f0fdfa;
  font-size: 1.35rem;
  line-height: 1;
}

.metric-tile span {
  display: block;
  margin-top: 0.32rem;
  color: rgba(207, 250, 254, 0.76);
  font-size: 0.78rem;
  line-height: 1.25;
}

.groups-mock {
  overflow: hidden;
}

.mock-top {
  gap: 0.4rem;
  padding: 0.72rem;
  border-bottom: 1px solid rgba(94, 234, 212, 0.14);
  background: rgba(10, 24, 28, 0.58);
}

.dot {
  width: 0.55rem;
  height: 0.55rem;
  margin-right: 0.35rem;
  border-radius: 999px;
  background: #5eead4;
}

.dot:nth-child(2) {
  background: #38bdf8;
}

.dot:nth-child(3) {
  background: #8b5cf6;
}

.mock-path {
  margin-left: 0.3rem;
  color: rgba(236, 254, 255, 0.74);
  font-size: 0.82rem;
}

.mock-summary {
  padding: 1rem 1rem 0.5rem;
}

.mock-summary span {
  display: block;
  color: #5eead4;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.mock-summary strong {
  display: block;
  color: #f0fdfa;
  font-size: 2.35rem;
  line-height: 1.05;
}

.mock-summary p {
  margin: 0.2rem 0 0;
  color: rgba(207, 250, 254, 0.72);
}

.theme-list {
  display: grid;
  gap: 0.6rem;
  padding: 0.5rem 1rem 1rem;
}

.theme-card {
  padding: 0.72rem;
  border: 1px solid rgba(94, 234, 212, 0.14);
  border-left: 4px solid var(--accent);
  border-radius: 8px;
  background: rgba(5, 20, 28, 0.36);
}

.theme-card strong {
  color: #f0fdfa;
}

.theme-card span,
.theme-card p {
  color: rgba(207, 250, 254, 0.75);
}

.theme-card p {
  margin: 0.2rem 0 0.52rem;
  font-size: 0.82rem;
}

.meter {
  height: 0.4rem;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(204, 251, 241, 0.1);
}

.meter span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #0bc3ab, #38bdf8);
}

.system-map {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
  padding: 0.8rem;
}

.map-node {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.75rem;
  min-height: 7.2rem;
  padding: 0.85rem;
  border: 1px solid rgba(94, 234, 212, 0.14);
  border-radius: 8px;
  background: rgba(204, 251, 241, 0.055);
}

.map-node:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -0.75rem;
  top: 50%;
  width: 0.75rem;
  height: 1px;
  background: rgba(94, 234, 212, 0.45);
}

.map-icon {
  width: 2.2rem;
  height: 2.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #ecfeff;
  font-size: 1.25rem;
  background: linear-gradient(135deg, rgba(11, 195, 171, 0.95), rgba(3, 117, 204, 0.92));
}

.map-node h2,
.panel-head h2 {
  margin: 0;
  color: #f0fdfa;
  font-size: 1.08rem;
  font-weight: 850;
  line-height: 1.18;
  letter-spacing: 0;
}

.map-node p,
.review-panel p {
  margin: 0.34rem 0 0;
  color: rgba(207, 250, 254, 0.76);
  line-height: 1.42;
  font-size: 0.88rem;
}

.compact-grid,
.bottom-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: 1rem;
}

.panel {
  padding: 1rem;
}

.panel-head {
  margin-bottom: 0.85rem;
}

.object-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
}

.object-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.65rem;
  padding: 0.72rem;
  border: 1px solid rgba(94, 234, 212, 0.14);
  border-radius: 8px;
  background: rgba(5, 20, 28, 0.34);
}

.object-row .q-icon {
  color: #5eead4;
  font-size: 1.35rem;
}

.object-row strong {
  display: block;
  color: #f0fdfa;
  font-size: 0.9rem;
  line-height: 1.2;
}

.object-row span {
  display: block;
  margin-top: 0.22rem;
  color: rgba(207, 250, 254, 0.72);
  font-size: 0.8rem;
  line-height: 1.35;
}

.pipeline-rail {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.55rem;
}

.rail-step {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  min-height: 3.2rem;
  padding: 0.65rem;
  border: 1px solid rgba(94, 234, 212, 0.14);
  border-radius: 8px;
  color: rgba(236, 254, 255, 0.88);
  font-size: 0.84rem;
  font-weight: 750;
  background: rgba(5, 20, 28, 0.34);
}

.rail-step span {
  width: 1.6rem;
  height: 1.6rem;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  color: #133031;
  font-weight: 850;
  background: #5eead4;
}

.schema-stack {
  display: grid;
  gap: 0.55rem;
}

.schema-card {
  padding: 0.72rem;
  border: 1px solid rgba(94, 234, 212, 0.14);
  border-radius: 8px;
  background: rgba(5, 20, 28, 0.34);
}

.schema-card strong {
  display: block;
  color: #f0fdfa;
  margin-bottom: 0.35rem;
}

.schema-card code {
  color: #a7f3d0;
  white-space: normal;
  line-height: 1.45;
}

.action-primary {
  color: #133031;
  font-weight: 850;
  background: linear-gradient(135deg, #ccfbf1, #5eead4);
}

@media (max-width: 920px) {
  .hero-grid,
  .compact-grid,
  .bottom-grid {
    grid-template-columns: 1fr;
  }

  .system-map {
    grid-template-columns: 1fr;
  }

  .map-node {
    min-height: 0;
  }

  .map-node:not(:last-child)::after {
    left: 1.9rem;
    right: auto;
    top: auto;
    bottom: -0.75rem;
    width: 1px;
    height: 0.75rem;
  }
}

@media (max-width: 560px) {
  .ai-groups-page {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .hero-metrics,
  .object-list,
  .pipeline-rail {
    grid-template-columns: 1fr;
  }

  .mock-top {
    align-items: flex-start;
  }
}
</style>
