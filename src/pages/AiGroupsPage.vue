<template>
  <q-page class="ai-groups-page q-pa-md q-pb-xl">
    <section class="hero-grid q-pt-lg q-mb-lg">
      <div class="hero-copy">
        <div class="text-overline ai-overline q-mb-sm">AI Features / Groups</div>
        <h1 class="hero-title q-mb-md">AI Groups: from papers to a connected research map</h1>
        <p class="hero-lead q-mb-lg">
          Researchers can import papers from arXiv or upload their own PDFs and LaTeX files. The
          AI analyzes titles, abstracts, sections, formulas and key terms, then turns scattered
          research files into an organized knowledge map.
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
          <span>Connected knowledge map</span>
          <strong>The product does not just store papers.</strong>
          <p>It helps users understand how papers, formulas and ideas are organized and connected.</p>
        </div>

        <div class="research-map-preview">
          <article v-for="node in previewNodes" :key="node.title" class="preview-node">
            <q-icon :name="node.icon" />
            <div>
              <strong>{{ node.title }}</strong>
              <span>{{ node.text }}</span>
            </div>
          </article>
          <div class="preview-link">
            <q-icon name="functions" />
            <span>Formula source, reused method and related claim are linked across documents</span>
          </div>
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

    <section class="value-grid q-mb-lg">
      <q-card v-for="benefit in benefits" :key="benefit.title" flat bordered class="panel value-panel">
        <div class="panel-head">
          <q-icon :name="benefit.icon" class="value-icon" />
          <div>
            <div class="text-overline ai-overline">{{ benefit.kicker }}</div>
            <h2>{{ benefit.title }}</h2>
          </div>
        </div>
        <p>{{ benefit.text }}</p>
      </q-card>
    </section>

    <section class="story-grid">
      <q-card flat bordered class="panel import-panel">
        <div class="panel-head">
          <div class="text-overline ai-overline">Why it matters</div>
          <h2>From scattered files to research memory</h2>
        </div>
        <div class="story-copy">
          <p>
            Researchers often collect papers, books, notes and LaTeX files for one project. Over
            time, the project becomes difficult to navigate: important ideas are hidden across
            PDFs, formulas are reused without context, and related papers stay disconnected.
          </p>
          <p>
            AI Groups gives the user a structured view of the project: core theory, methods,
            experiments, applications, open questions and related results. The researcher can
            review suggestions, rename groups, move materials manually and keep control.
          </p>
        </div>
      </q-card>

      <q-card flat bordered class="panel relation-panel">
        <div class="panel-head">
          <div class="text-overline ai-overline">AI research layer</div>
          <h2>More than a PDF reader or LaTeX editor</h2>
        </div>
        <p>
          The next layer is connection discovery. AI can show where a concept was introduced, where
          it is reused, which methods are shared, and how different results support or extend each
          other.
        </p>
        <div class="tech-tags">
          <q-chip v-for="tech in technologies" :key="tech" outline color="cyan-4" text-color="grey-3">
            {{ tech }}
          </q-chip>
        </div>
        <div class="review-buttons row q-col-gutter-sm q-mt-md">
          <div class="col-12 col-sm-4">
            <q-btn unelevated no-caps class="full-width action-primary" label="Import papers" />
          </div>
          <div class="col-12 col-sm-4">
            <q-btn outline no-caps color="cyan-4" class="full-width" label="Explore groups" />
          </div>
          <div class="col-12 col-sm-4">
            <q-btn outline no-caps color="purple-4" class="full-width" label="Trace sources" />
          </div>
        </div>
      </q-card>
    </section>

    <GetInTouchSection />
  </q-page>
</template>

<script setup>
import GetInTouchSection from 'src/components/investor/GetInTouchSection.vue'

const metrics = [
  { value: 'Import', label: 'arXiv, PDFs and LaTeX files' },
  { value: 'Organize', label: 'themes, methods and questions' },
  { value: 'Connect', label: 'papers, formulas and ideas' }
]

const previewNodes = [
  {
    title: 'Core theory',
    text: 'Foundational concepts and assumptions',
    icon: 'hub'
  },
  {
    title: 'Methods',
    text: 'Models, derivations and shared techniques',
    icon: 'schema'
  },
  {
    title: 'Experiments',
    text: 'Measurements, datasets and evidence',
    icon: 'science'
  },
  {
    title: 'Open questions',
    text: 'Gaps, contradictions and next steps',
    icon: 'psychology'
  }
]

const flow = [
  {
    title: 'Import research materials',
    text: 'Users can download papers from arXiv or upload PDFs, books, notes and LaTeX sources.',
    icon: 'description'
  },
  {
    title: 'AI groups by meaning',
    text: 'The AI analyzes titles, abstracts, sections, formulas and key terms to form themes.',
    icon: 'segment'
  },
  {
    title: 'AI reveals connections',
    text: 'The system suggests links between formulas, concepts, methods, claims and sources.',
    icon: 'auto_awesome'
  },
  {
    title: 'Research becomes memory',
    text: 'Users navigate a searchable map instead of a folder of disconnected files.',
    icon: 'hub'
  }
]

const benefits = [
  {
    kicker: 'User problem',
    title: 'Research projects become hard to navigate',
    text: 'Important ideas, formulas and notes are spread across PDFs, folders and LaTeX files, so users lose context while working.',
    icon: 'folder_open'
  },
  {
    kicker: 'AI solution',
    title: 'The AI creates meaningful structure',
    text: 'Materials are grouped into core theory, methods, experiments, applications, open questions and related results.',
    icon: 'travel_explore'
  },
  {
    kicker: 'Connection layer',
    title: 'Ideas become linked, not isolated',
    text: 'AI can suggest where a formula came from, where a method is reused, and which articles support or extend each other.',
    icon: 'verified'
  },
  {
    kicker: 'Product value',
    title: 'A stronger AI workspace',
    text: 'The product becomes more than storage: it helps researchers understand, revisit and write about their project faster.',
    icon: 'tune'
  }
]

const technologies = [
  'LLMs',
  'NLP',
  'Text embeddings',
  'Semantic clustering',
  'Information extraction',
  'Citation and formula linking',
  'Knowledge graph',
  'RAG'
]
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
  max-width: 26rem;
  margin-top: 0.22rem;
  font-size: clamp(1.55rem, 3vw, 2.15rem);
  line-height: 1.12;
}

.mock-summary p {
  margin: 0.2rem 0 0;
  color: rgba(207, 250, 254, 0.72);
}

.research-map-preview {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
  padding: 0.5rem 1rem 1rem;
}

.research-map-preview::before {
  content: '';
  position: absolute;
  inset: 17% 18% 28%;
  border: 1px solid rgba(94, 234, 212, 0.18);
  border-radius: 999px;
  transform: rotate(-8deg);
}

.preview-node {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.62rem;
  min-height: 5.7rem;
  padding: 0.78rem;
  border: 1px solid rgba(94, 234, 212, 0.14);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(7, 35, 39, 0.9), rgba(5, 20, 28, 0.82)),
    rgba(5, 20, 28, 0.36);
}

.preview-node .q-icon {
  color: #5eead4;
  font-size: 1.35rem;
}

.preview-node strong {
  display: block;
  color: #f0fdfa;
  line-height: 1.2;
}

.preview-node span {
  display: block;
  margin-top: 0.24rem;
  color: rgba(207, 250, 254, 0.75);
  font-size: 0.82rem;
  line-height: 1.35;
}

.preview-link {
  position: relative;
  z-index: 1;
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.78rem;
  border: 1px solid rgba(216, 180, 254, 0.34);
  border-radius: 8px;
  color: rgba(236, 254, 255, 0.86);
  background: linear-gradient(135deg, rgba(11, 195, 171, 0.16), rgba(168, 85, 247, 0.18));
}

.preview-link .q-icon {
  color: #d8b4fe;
  font-size: 1.35rem;
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

.map-node p {
  margin: 0.34rem 0 0;
  color: rgba(207, 250, 254, 0.76);
  line-height: 1.42;
  font-size: 0.88rem;
}

.value-grid,
.story-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: 1rem;
}

.value-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.panel {
  padding: 1rem;
}

.panel-head {
  margin-bottom: 0.85rem;
}

.value-panel .panel-head {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.value-icon {
  width: 2.25rem;
  height: 2.25rem;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #102c2d;
  font-size: 1.25rem;
  background: linear-gradient(135deg, #ccfbf1, #5eead4);
}

.value-panel p,
.story-copy p,
.relation-panel p {
  margin: 0;
  color: rgba(207, 250, 254, 0.76);
  line-height: 1.5;
  font-size: 0.9rem;
}

.story-copy {
  display: grid;
  gap: 0.8rem;
}

.story-copy p {
  padding: 0.82rem;
  border: 1px solid rgba(94, 234, 212, 0.14);
  border-radius: 8px;
  background: rgba(5, 20, 28, 0.34);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1rem;
}

.action-primary {
  color: #133031;
  font-weight: 850;
  background: linear-gradient(135deg, #ccfbf1, #5eead4);
}

@media (max-width: 920px) {
  .hero-grid,
  .value-grid,
  .story-grid {
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
  .research-map-preview {
    grid-template-columns: 1fr;
  }

  .research-map-preview::before {
    display: none;
  }

  .mock-top {
    align-items: flex-start;
  }
}
</style>
