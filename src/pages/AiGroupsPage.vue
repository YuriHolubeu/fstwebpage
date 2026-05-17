<template>
  <q-page class="ai-groups-page q-pa-md q-pb-xl">
    <section class="hero-section q-pt-lg q-mb-lg">
      <div class="hero-copy">
        <div class="text-overline ai-overline q-mb-sm">AI Features / Groups</div>
        <h1 class="hero-title">Getting new insights in the project with AI</h1>
        <p class="hero-lead">
          AI Groups turns uploaded papers, notes and formulas into a structured research map. It
          helps users find related work, reveal hidden connections and understand how equations move
          across the project.
        </p>
        <div class="hero-points">
          <div v-for="point in heroPoints" :key="point" class="hero-point">
            <q-icon name="check_circle" />
            <span>{{ point }}</span>
          </div>
        </div>
      </div>

      <q-card flat bordered class="map-mock">
        <div class="mock-top row items-center justify-between no-wrap">
          <div class="row items-center no-wrap">
            <span class="dot" />
            <span class="dot" />
            <span class="dot" />
            <span class="mock-path">AI Research Map</span>
          </div>
          <q-chip dense outline color="cyan-4" text-color="grey-3">semantic layer</q-chip>
        </div>

        <div class="map-body">
          <div class="source-column">
            <span class="column-label">Imported material</span>
            <div v-for="source in sources" :key="source" class="source-file">
              <q-icon name="article" />
              <span>{{ source }}</span>
            </div>
          </div>

          <div class="map-center">
            <div class="ai-core">
              <q-icon name="auto_awesome" />
              <strong>AI groups by meaning</strong>
              <span>not only file names</span>
            </div>
          </div>

          <div class="theme-column">
            <span class="column-label">Project structure</span>
            <div v-for="theme in themes" :key="theme.title" class="theme-pill">
              <strong>{{ theme.title }}</strong>
              <span>{{ theme.caption }}</span>
            </div>
          </div>
        </div>

        <div class="connection-strip">
          <q-icon name="hub" />
          <span>Formula sources, reused methods and related claims become visible links.</span>
        </div>
      </q-card>
    </section>

    <section class="value-grid q-mb-lg">
      <article v-for="item in values" :key="item.title" class="value-card">
        <div class="value-head">
          <span>{{ item.number }}</span>
          <q-icon :name="item.icon" />
        </div>
        <h2>{{ item.title }}</h2>
        <p>{{ item.text }}</p>
        <div class="value-example">
          <strong>{{ item.exampleTitle }}</strong>
          <span>{{ item.example }}</span>
        </div>
      </article>
    </section>

    <section class="investor-line q-pa-lg q-mb-lg">
      <q-icon name="insights" class="investor-icon" />
      <div>
        <h2>Why it is attractive</h2>
        <p>
          Researchers do not just need another place to store PDFs. They need a workspace that
          understands what is inside the project, shows how ideas are connected, and helps them
          return to the right paper, formula or derivation at the right moment.
        </p>
      </div>
    </section>
  </q-page>
</template>

<script setup>
const heroPoints = [
  'group uploaded articles by research meaning',
  'surface hidden links between formulas and papers',
  'turn scattered files into project memory'
]

const sources = ['arXiv paper', 'LaTeX notes', 'book chapter']

const themes = [
  { title: 'Core theory', caption: 'foundations and assumptions' },
  { title: 'Methods', caption: 'tools and derivations' },
  { title: 'Experiments', caption: 'data and evidence' },
  { title: 'Open questions', caption: 'what remains unclear' }
]

const values = [
  {
    number: '01',
    icon: 'category',
    title: 'Better grouping of uploaded articles',
    text: 'AI automatically organizes imported papers into meaningful themes, so related work becomes easy to find without manual folders.',
    exampleTitle: 'User value',
    example: 'The researcher sees theory, methods, experiments and open questions immediately.'
  },
  {
    number: '02',
    icon: 'account_tree',
    title: 'Hidden connections become visible',
    text: 'The system can reveal non-obvious relationships between formulas, concepts, methods and claims across different documents.',
    exampleTitle: 'Product value',
    example: 'The app becomes a knowledge map, not only a PDF reader or file manager.'
  },
  {
    number: '03',
    icon: 'functions',
    title: 'Derivations become easier to follow',
    text: 'AI can point to the exact literature fragments that explain a transition between equations or a missing conceptual step.',
    exampleTitle: 'Research value',
    example: 'Users can return to the source, save the explanation and continue from the same place.'
  }
]
</script>

<style scoped>
.ai-groups-page {
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
  color: var(--site-text-body);
}

.hero-section {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(24rem, 0.86fr);
  gap: clamp(1rem, 4vw, 2.5rem);
  align-items: center;
}

.ai-overline {
  color: var(--site-text-muted);
  letter-spacing: 0.12em;
}

.hero-title {
  max-width: 44rem;
  margin: 0;
  color: var(--site-text-heading);
  font-size: clamp(2.4rem, 5.6vw, 4.6rem);
  font-weight: 850;
  line-height: 1.02;
  letter-spacing: 0;
}

.hero-lead {
  max-width: 42rem;
  margin: 1.15rem 0 0;
  color: rgba(207, 250, 254, 0.76);
  font-size: clamp(1rem, 1.8vw, 1.18rem);
  line-height: 1.6;
}

.hero-points {
  display: grid;
  gap: 0.55rem;
  margin-top: 1.25rem;
  max-width: 36rem;
}

.hero-point {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: rgba(236, 254, 255, 0.88);
  font-size: 0.92rem;
  font-weight: 750;
}

.hero-point .q-icon {
  color: #5eead4;
  font-size: 1.1rem;
}

.map-mock,
.value-card,
.investor-line {
  border: 1px solid rgba(94, 234, 212, 0.22);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(15, 55, 56, 0.82), rgba(10, 24, 28, 0.88)),
    rgba(26, 44, 51, 0.6);
  box-shadow: 0 22px 70px rgba(10, 24, 28, 0.28);
}

.map-mock {
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

.map-body {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(8rem, 0.5fr) minmax(0, 1fr);
  gap: 0.75rem;
  padding: 1rem;
}

.column-label {
  display: block;
  margin-bottom: 0.55rem;
  color: #5eead4;
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.source-column,
.theme-column {
  display: grid;
  gap: 0.55rem;
  align-content: start;
}

.source-file,
.theme-pill,
.ai-core {
  border: 1px solid rgba(94, 234, 212, 0.14);
  border-radius: 8px;
  background: rgba(5, 20, 28, 0.38);
}

.source-file {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 3rem;
  padding: 0.65rem;
  color: rgba(236, 254, 255, 0.86);
  font-size: 0.82rem;
  font-weight: 750;
}

.source-file .q-icon {
  color: #5eead4;
  font-size: 1.15rem;
}

.map-center {
  position: relative;
  display: grid;
  place-items: center;
}

.map-center::before,
.map-center::after {
  content: '';
  position: absolute;
  left: -0.75rem;
  right: -0.75rem;
  top: 50%;
  height: 1px;
  background: rgba(94, 234, 212, 0.42);
}

.ai-core {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  gap: 0.25rem;
  min-height: 8rem;
  padding: 0.8rem;
  text-align: center;
  background:
    radial-gradient(circle at center, rgba(94, 234, 212, 0.18), transparent 65%),
    rgba(5, 20, 28, 0.68);
}

.ai-core .q-icon {
  color: #5eead4;
  font-size: 1.8rem;
}

.ai-core strong {
  color: var(--site-text-heading);
  font-size: 0.95rem;
  line-height: 1.18;
}

.ai-core span,
.theme-pill span {
  color: rgba(207, 250, 254, 0.68);
  font-size: 0.78rem;
  line-height: 1.25;
}

.theme-pill {
  padding: 0.62rem 0.72rem;
}

.theme-pill strong {
  display: block;
  color: rgba(236, 254, 255, 0.92);
  font-size: 0.9rem;
  line-height: 1.18;
}

.connection-strip {
  display: flex;
  align-items: center;
  gap: 0.62rem;
  margin: 0 1rem 1rem;
  padding: 0.78rem;
  border: 1px solid rgba(216, 180, 254, 0.32);
  border-radius: 8px;
  color: rgba(236, 254, 255, 0.9);
  font-size: 0.88rem;
  font-weight: 750;
  line-height: 1.32;
  background: linear-gradient(135deg, rgba(11, 195, 171, 0.14), rgba(168, 85, 247, 0.16));
}

.connection-strip .q-icon {
  color: #d8b4fe;
  font-size: 1.3rem;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.value-card {
  padding: 1rem;
}

.value-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.85rem;
}

.value-head span {
  color: var(--site-text-muted);
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.14em;
}

.value-head .q-icon,
.investor-icon {
  width: 2.25rem;
  height: 2.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--site-text-high);
  font-size: 1.25rem;
  background: linear-gradient(135deg, rgba(11, 195, 171, 0.95), rgba(3, 117, 204, 0.92));
}

.value-card h2,
.investor-line h2 {
  margin: 0;
  color: var(--site-text-heading);
  font-size: 1.15rem;
  font-weight: 850;
  line-height: 1.2;
  letter-spacing: 0;
}

.value-card p,
.investor-line p {
  margin: 0.65rem 0 0;
  color: rgba(207, 250, 254, 0.74);
  font-size: 0.92rem;
  line-height: 1.48;
}

.value-example {
  margin-top: 0.9rem;
  padding: 0.7rem;
  border: 1px solid rgba(94, 234, 212, 0.14);
  border-radius: 8px;
  background: rgba(204, 251, 241, 0.055);
}

.value-example strong {
  display: block;
  color: #5eead4;
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.value-example span {
  display: block;
  margin-top: 0.28rem;
  color: rgba(236, 254, 255, 0.84);
  font-size: 0.84rem;
  line-height: 1.35;
}

.investor-line {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.9rem;
  align-items: center;
}

@media (max-width: 920px) {
  .hero-section,
  .value-grid {
    grid-template-columns: 1fr;
  }

  .map-body {
    grid-template-columns: 1fr;
  }

  .map-center::before,
  .map-center::after {
    display: none;
  }
}

@media (max-width: 560px) {
  .ai-groups-page {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}
</style>
