<template>
  <q-page class="save-note-page q-pa-md q-pb-xl">
    <section class="hero-grid q-pt-lg q-mb-lg">
      <div class="hero-copy">
        <div class="text-overline page-overline q-mb-sm">AI Features / Save AI Note</div>
        <h1 class="hero-title q-mb-md">AI answers become structured research memory</h1>
        <p class="hero-lead q-mb-lg">
          Save an AI explanation as a project note attached to the exact paper, section, PDF page,
          LaTeX file, selected fragment, formula, and tags.
        </p>

        <div class="memory-line">
          <q-icon name="forum" />
          <span>Chat history disappears. Project knowledge stays attached.</span>
        </div>
      </div>

      <q-card flat bordered class="note-mock">
        <div class="mock-top row items-center justify-between no-wrap">
          <div class="row items-center no-wrap">
            <span class="dot" />
            <span class="dot" />
            <span class="dot" />
            <span class="mock-path">Knowledge / AI Note</span>
          </div>
          <q-chip dense outline color="cyan-4" text-color="grey-3">research memory</q-chip>
        </div>

        <div class="note-card">
          <div class="note-type">Explanation</div>
          <h2>Why 1D electron gas matters for CDW</h2>
          <p>
            This section explains why reducing a system to one dimension changes electron behavior
            and makes charge-density-wave states easier to understand.
          </p>
          <div class="attachment-grid">
            <span>Section</span><strong>The One-Dimensional Electron Gas</strong>
            <span>Source</span><strong>1.1 Density Waves in Solids by Gruner.tex</strong>
            <span>PDF page</span><strong>11</strong>
          </div>
          <div class="tag-row">
            <q-chip v-for="tag in tags" :key="tag" dense outline color="cyan-4" text-color="grey-3">
              {{ tag }}
            </q-chip>
          </div>
        </div>

        <div class="note-actions row q-col-gutter-sm">
          <div v-for="action in actions" :key="action" class="col-6">
            <q-btn outline no-caps color="cyan-4" class="full-width" :label="action" />
          </div>
        </div>
      </q-card>
    </section>

    <section class="compact-map q-mb-lg">
      <article v-for="step in flow" :key="step.title" class="map-node">
        <q-icon :name="step.icon" class="map-icon" />
        <div>
          <h2>{{ step.title }}</h2>
          <p>{{ step.text }}</p>
        </div>
      </article>
    </section>

    <section class="bottom-grid">
      <q-card flat bordered class="panel knowledge-panel">
        <div class="panel-head">
          <div class="text-overline page-overline">Knowledge UI</div>
          <h2>AI Knowledge Base</h2>
          <p>Saved explanations become searchable project structure.</p>
        </div>

        <div class="search-bar">
          <q-icon name="search" />
          <span>Search AI memory</span>
        </div>

        <div class="knowledge-grid">
          <div v-for="item in knowledgeTypes" :key="item.label" class="knowledge-type">
            <q-icon :name="item.icon" />
            <span>{{ item.label }}</span>
          </div>
        </div>
      </q-card>

      <q-card flat bordered class="panel storage-panel">
        <div class="panel-head">
          <div class="text-overline page-overline">MVP storage</div>
          <h2>JSON beside the project</h2>
        </div>
        <div class="json-card">
          <code>{
  "note_id": "note_001",
  "type": "ai_explanation",
  "title": "Why 1D electron gas matters",
  "source": {
    "section_id": "sec_001",
    "pdf_page": 11,
    "selected_text_hash": "abc123"
  },
  "tags": ["core theory", "CDW"]
}</code>
        </div>
      </q-card>
    </section>

    <section class="investor-line q-mt-lg q-pa-lg">
      <q-icon name="psychology_alt" class="investor-icon" />
      <div>
        <h2>ChatGPT answers disappear in chat history.</h2>
        <p>
          Our AI answers become structured research memory attached to papers, formulas,
          fragments and sections.
        </p>
      </div>
    </section>

    <GetInTouchSection />
  </q-page>
</template>

<script setup>
import GetInTouchSection from 'src/components/investor/GetInTouchSection.vue'

const tags = ['core theory', 'CDW', 'formula', '1D systems']

const actions = ['Open source', 'Edit note', 'Link section', 'Generate LaTeX']

const flow = [
  {
    title: 'AI explains',
    text: 'The user receives a clear answer from a selected research fragment.',
    icon: 'auto_awesome'
  },
  {
    title: 'Save note',
    text: 'The answer becomes a typed project note instead of chat history.',
    icon: 'bookmark_add'
  },
  {
    title: 'Attach source',
    text: 'The note stores file, section, page, fragment hash, formula and tags.',
    icon: 'attachment'
  },
  {
    title: 'Search memory',
    text: 'The note appears in Knowledge and can be reused later.',
    icon: 'manage_search'
  }
]

const knowledgeTypes = [
  { label: 'Paper Link', icon: 'article' },
  { label: 'Formula Explanation', icon: 'functions' },
  { label: 'Research Question', icon: 'help' },
  { label: 'Open Problem', icon: 'error_outline' },
  { label: 'Claim', icon: 'verified' },
  { label: 'Method Note', icon: 'science' }
]
</script>

<style scoped>
.save-note-page {
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
  color: #cffafe;
}

.hero-grid,
.bottom-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(20rem, 0.82fr);
  gap: clamp(1rem, 3vw, 2rem);
  align-items: center;
}

.page-overline {
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
  max-width: 42rem;
  color: #cffafe;
  font-size: clamp(1rem, 2vw, 1.15rem);
  line-height: 1.62;
}

.memory-line,
.note-mock,
.compact-map,
.panel,
.investor-line {
  border: 1px solid rgba(94, 234, 212, 0.22);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(15, 55, 56, 0.82), rgba(10, 24, 28, 0.88)),
    rgba(26, 44, 51, 0.6);
  box-shadow: 0 22px 70px rgba(10, 24, 28, 0.28);
}

.memory-line {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.75rem 0.9rem;
  color: #ecfeff;
  font-weight: 800;
}

.memory-line .q-icon {
  color: #5eead4;
  font-size: 1.35rem;
}

.note-mock {
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

.note-card {
  margin: 1rem;
  padding: 1rem;
  border: 1px solid rgba(94, 234, 212, 0.16);
  border-radius: 8px;
  background: rgba(5, 20, 28, 0.42);
}

.note-type {
  color: #5eead4;
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.note-card h2,
.map-node h2,
.panel-head h2,
.investor-line h2 {
  margin: 0.28rem 0 0;
  color: #f0fdfa;
  font-size: 1.08rem;
  font-weight: 850;
  line-height: 1.18;
  letter-spacing: 0;
}

.note-card p,
.map-node p,
.panel-head p,
.investor-line p {
  margin: 0.42rem 0 0;
  color: rgba(207, 250, 254, 0.76);
  line-height: 1.42;
  font-size: 0.88rem;
}

.attachment-grid {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.42rem 0.7rem;
  margin-top: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(94, 234, 212, 0.14);
}

.attachment-grid span {
  color: #5eead4;
  font-size: 0.78rem;
  font-weight: 800;
}

.attachment-grid strong {
  color: #ecfeff;
  font-size: 0.82rem;
  line-height: 1.3;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.8rem;
}

.note-actions {
  padding: 0 1rem 1rem;
}

.compact-map {
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

.map-icon,
.investor-icon {
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

.panel {
  align-self: stretch;
  padding: 1rem;
}

.panel-head {
  margin-bottom: 0.85rem;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.72rem;
  border: 1px solid rgba(94, 234, 212, 0.16);
  border-radius: 8px;
  color: rgba(207, 250, 254, 0.68);
  background: rgba(5, 20, 28, 0.42);
}

.knowledge-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.55rem;
  margin-top: 0.75rem;
}

.knowledge-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.68rem;
  border: 1px solid rgba(94, 234, 212, 0.14);
  border-radius: 8px;
  color: rgba(236, 254, 255, 0.86);
  font-weight: 800;
  background: rgba(5, 20, 28, 0.34);
}

.knowledge-type .q-icon {
  color: #5eead4;
  font-size: 1.2rem;
}

.json-card {
  overflow: auto;
  padding: 0.85rem;
  border: 1px solid rgba(94, 234, 212, 0.16);
  border-radius: 8px;
  background: rgba(5, 20, 28, 0.58);
}

.json-card code {
  color: #a7f3d0;
  white-space: pre;
  line-height: 1.5;
}

.investor-line {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.85rem;
  align-items: center;
}

@media (max-width: 920px) {
  .hero-grid,
  .bottom-grid {
    grid-template-columns: 1fr;
  }

  .compact-map {
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
  .save-note-page {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .attachment-grid,
  .knowledge-grid {
    grid-template-columns: 1fr;
  }
}
</style>
