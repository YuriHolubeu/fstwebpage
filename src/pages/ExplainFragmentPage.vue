<template>
  <q-page class="explain-page q-pa-md q-pb-xl">
    <section class="hero-grid q-pt-lg q-mb-lg">
      <div class="hero-copy">
        <div class="text-overline page-overline q-mb-sm">AI Features / Explain Fragment</div>
        <h1 class="hero-title q-mb-md">Explain the exact fragment inside the research project</h1>
        <p class="hero-lead q-mb-lg">
          Select text, a formula, or a paragraph in PDF/LaTeX. AI explains it in the right mode
          and saves the explanation back to the source section.
        </p>

        <div class="scenario-strip">
          <div v-for="step in scenario" :key="step" class="scenario-step">{{ step }}</div>
        </div>
      </div>

      <q-card flat bordered class="explain-mock">
        <div class="mock-top row items-center justify-between no-wrap">
          <div class="row items-center no-wrap">
            <span class="dot" />
            <span class="dot" />
            <span class="dot" />
            <span class="mock-path">AI Explanation</span>
          </div>
          <q-chip dense outline color="cyan-4" text-color="grey-3">selected fragment</q-chip>
        </div>

        <div class="source-box">
          <span>Source</span>
          <strong>1.1 Density Waves in Solids by Gruner.tex</strong>
          <p>The One-Dimensional Electron Gas</p>
        </div>

        <div class="mode-grid">
          <button
            v-for="mode in modes"
            :key="mode.label"
            type="button"
            class="mode-btn"
            :class="{ 'is-active': mode.active }"
          >
            <q-icon :name="mode.icon" />
            {{ mode.label }}
          </button>
        </div>

        <div class="answer-card">
          <div class="answer-label">Simple explanation</div>
          <p>
            Reducing a system from three dimensions to one dimension makes interactions and
            fluctuations much more important, which helps explain charge-density-wave behavior.
          </p>
          <div class="answer-label q-mt-sm">Why it matters</div>
          <p>
            This fragment introduces why one-dimensional materials are central to the project.
          </p>
        </div>

        <div class="mock-actions row q-col-gutter-sm">
          <div class="col-6">
            <q-btn unelevated no-caps class="full-width action-primary" label="Save note" />
          </div>
          <div class="col-6">
            <q-btn outline no-caps color="cyan-4" class="full-width" label="Attach to section" />
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
      <q-card flat bordered class="panel">
        <div class="panel-head">
          <div class="text-overline page-overline">MVP context</div>
          <h2>What gets sent to AI</h2>
        </div>
        <div class="context-list">
          <div v-for="item in contextItems" :key="item" class="context-chip">
            <q-icon name="check_circle" />
            {{ item }}
          </div>
        </div>
      </q-card>

      <q-card flat bordered class="panel">
        <div class="panel-head">
          <div class="text-overline page-overline">Structured output</div>
          <h2>JSON-ready response</h2>
        </div>
        <div class="json-card">
          <code>{
  "title": "Why 1D electron gas matters",
  "short_explanation": "...",
  "why_it_matters": "...",
  "key_terms": ["1D electron gas", "CDW"],
  "suggested_tags": ["core theory"]
}</code>
        </div>
      </q-card>
    </section>

    <section class="investor-line q-mt-lg q-pa-lg">
      <q-icon name="link" class="investor-icon" />
      <div>
        <h2>AI does not just answer.</h2>
        <p>
          It attaches understanding to the exact place in the research project.
        </p>
      </div>
    </section>

    <GetInTouchSection />
  </q-page>
</template>

<script setup>
import GetInTouchSection from 'src/components/investor/GetInTouchSection.vue'

const scenario = ['Open PDF/LaTeX', 'Select fragment', 'Explain', 'Save note']

const modes = [
  { label: 'Explain simply', icon: 'lightbulb', active: true },
  { label: 'Explain technically', icon: 'school', active: false },
  { label: 'Explain formula', icon: 'functions', active: false },
  { label: 'Why important?', icon: 'priority_high', active: false }
]

const flow = [
  {
    title: 'Select',
    text: 'User highlights text, formula, or paragraph in PDF/LaTeX.',
    icon: 'select_all'
  },
  {
    title: 'Choose mode',
    text: 'Simple, technical, formula breakdown, or project importance.',
    icon: 'tune'
  },
  {
    title: 'Explain',
    text: 'AI uses only the selected fragment and nearby section context.',
    icon: 'auto_awesome'
  },
  {
    title: 'Attach',
    text: 'Save the explanation as a note connected to the exact section.',
    icon: 'attachment'
  }
]

const contextItems = [
  'selected text',
  'section title',
  'source file',
  'previous paragraphs',
  'next paragraphs',
  'LaTeX formula',
  'explanation mode'
]
</script>

<style scoped>
.explain-page {
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
  color: #cffafe;
}

.hero-grid,
.bottom-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(20rem, 0.8fr);
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

.scenario-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.55rem;
  max-width: 42rem;
}

.scenario-step,
.explain-mock,
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

.scenario-step {
  position: relative;
  padding: 0.85rem;
  color: #ecfeff;
  font-size: 0.82rem;
  font-weight: 800;
  text-align: center;
}

.scenario-step:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -0.55rem;
  top: 50%;
  width: 0.55rem;
  height: 1px;
  background: rgba(94, 234, 212, 0.42);
}

.explain-mock {
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

.source-box,
.answer-card {
  margin: 1rem;
  padding: 0.85rem;
  border: 1px solid rgba(94, 234, 212, 0.16);
  border-radius: 8px;
  background: rgba(5, 20, 28, 0.42);
}

.source-box span,
.answer-label {
  display: block;
  color: #5eead4;
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.source-box strong {
  display: block;
  margin-top: 0.25rem;
  color: #f0fdfa;
  line-height: 1.2;
}

.source-box p,
.answer-card p {
  margin: 0.28rem 0 0;
  color: rgba(207, 250, 254, 0.76);
  line-height: 1.42;
}

.mode-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  padding: 0 1rem;
}

.mode-btn {
  min-height: 3rem;
  display: flex;
  align-items: center;
  gap: 0.48rem;
  padding: 0.58rem;
  border: 1px solid rgba(94, 234, 212, 0.16);
  border-radius: 8px;
  color: rgba(236, 254, 255, 0.82);
  font-weight: 800;
  background: rgba(204, 251, 241, 0.055);
}

.mode-btn.is-active {
  color: #133031;
  border-color: rgba(94, 234, 212, 0.9);
  background: linear-gradient(135deg, #ccfbf1, #5eead4);
}

.mock-actions {
  padding: 0 1rem 1rem;
}

.action-primary {
  color: #133031;
  font-weight: 850;
  background: linear-gradient(135deg, #ccfbf1, #5eead4);
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
.panel-head h2,
.investor-line h2 {
  margin: 0;
  color: #f0fdfa;
  font-size: 1.08rem;
  font-weight: 850;
  line-height: 1.18;
  letter-spacing: 0;
}

.map-node p,
.investor-line p {
  margin: 0.34rem 0 0;
  color: rgba(207, 250, 254, 0.76);
  line-height: 1.42;
  font-size: 0.88rem;
}

.panel {
  align-self: stretch;
  padding: 1rem;
}

.panel-head {
  margin-bottom: 0.85rem;
}

.context-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.context-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
  padding: 0.5rem 0.62rem;
  border: 1px solid rgba(94, 234, 212, 0.16);
  border-radius: 999px;
  color: rgba(236, 254, 255, 0.86);
  font-size: 0.82rem;
  font-weight: 750;
  background: rgba(5, 20, 28, 0.36);
}

.context-chip .q-icon {
  color: #5eead4;
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

.investor-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ecfeff;
  font-size: 1.35rem;
  background: linear-gradient(135deg, rgba(11, 195, 171, 0.95), rgba(3, 117, 204, 0.92));
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
  .explain-page {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .scenario-strip,
  .mode-grid {
    grid-template-columns: 1fr;
  }

  .scenario-step:not(:last-child)::after {
    left: 50%;
    right: auto;
    top: auto;
    bottom: -0.55rem;
    width: 1px;
    height: 0.55rem;
  }
}
</style>
