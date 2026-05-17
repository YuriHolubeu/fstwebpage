<template>
  <q-page class="ai-groups-page q-pa-md q-pb-xl">

    <section class="insights-section q-pt-lg q-mb-xl">
      <div class="text-overline ai-overline q-mb-md">AI Features / Groups</div>
      <h1 class="insights-title q-mb-xl">Getting new insites in the project with AI</h1>

      <div class="insights-grid">
        <div v-for="item in insights" :key="item.title" class="insight-card">
          <div class="insight-number">{{ item.number }}</div>
          <h2 class="insight-heading">{{ item.title }}</h2>
          <p class="insight-text">{{ item.text }}</p>
        </div>
      </div>
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

  </q-page>
</template>

<script setup>

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

const insights = [
  {
    number: '01',
    title: 'better grouping uploaded articles',
    text: 'AI automatically organizes imported papers into thematic clusters, so related work is easy to find without manual sorting.'
  },
  {
    number: '02',
    title: 'finding hidden connections in the project',
    text: 'The AI surfaces non-obvious links between formulas, concepts and methods across different documents in the project.'
  },
  {
    number: '03',
    title: 'learning how to derive equations',
    text: 'Step-by-step derivation guidance points to the exact parts of the literature that explain each transition.'
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

.ai-overline {
  color: var(--site-text-muted);
  letter-spacing: 0.12em;
}

.insights-section {
  width: 100%;
}

.insights-title {
  max-width: 44rem;
  color: var(--site-text-heading);
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 850;
  line-height: 1.04;
  letter-spacing: 0;
  margin: 0 0 2.5rem;
}

.insights-grid {
  display: flex;
  flex-direction: column;
  gap: 5cm;
  padding-top: 3cm;
  padding-bottom: 5cm;
}

.insight-card {
  padding: 0;
}

.insight-number {
  color: var(--site-text-muted);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 0.85rem;
}

.insight-heading {
  margin: 0 0 0.75rem;
  color: var(--site-text-heading);
  font-size: clamp(1.35rem, 2.4vw, 1.85rem);
  font-weight: 850;
  line-height: 1.15;
  letter-spacing: -0.01em;
}

.insight-text {
  margin: 0;
  color: rgba(207, 250, 254, 0.72);
  font-size: 17px;
  line-height: 1.55;
}

.system-map {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
  padding: 0.8rem;
  border: 1px solid rgba(94, 234, 212, 0.22);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(15, 55, 56, 0.82), rgba(10, 24, 28, 0.88)),
    rgba(26, 44, 51, 0.6);
  box-shadow: 0 22px 70px rgba(10, 24, 28, 0.28);
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
  color: var(--site-text-high);
  font-size: 23px;
  background: linear-gradient(135deg, rgba(11, 195, 171, 0.95), rgba(3, 117, 204, 0.92));
}

.map-node h2 {
  margin: 0;
  color: var(--site-text-heading);
  font-size: 20px;
  font-weight: 850;
  line-height: 1.18;
  letter-spacing: 0;
}

.map-node p {
  margin: 0.34rem 0 0;
  color: rgba(207, 250, 254, 0.76);
  line-height: 1.42;
  font-size: 17px;
}

@media (max-width: 920px) {
  .insights-grid,
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
}
</style>
