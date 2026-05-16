<template>
  <q-page class="mentor-page q-pa-md q-pb-xl">
    <section class="hero-grid q-pt-lg q-mb-lg">
      <div class="hero-copy">
        <div class="text-overline page-overline q-mb-sm">AI Features / Research Mentor</div>
        <h1 class="hero-title q-mb-md">AI guidance for the next research move</h1>
        <p class="hero-lead q-mb-lg">
          Many researchers do not only need answers. They need guidance: what to read next, what to
          derive, what to compare, which question to ask, and how to move when they are stuck.
        </p>

        <div class="value-line">
          <q-icon name="explore" />
          <span>The mentor analyzes the research map and suggests grounded next steps.</span>
        </div>
      </div>

      <q-card flat bordered class="mentor-mock">
        <div class="mock-top row items-center justify-between no-wrap">
          <div class="row items-center no-wrap">
            <span class="dot" />
            <span class="dot" />
            <span class="dot" />
            <span class="mock-path">Research Mentor / Next Steps</span>
          </div>
          <q-chip dense outline color="cyan-4" text-color="grey-3">guided research</q-chip>
        </div>

        <div class="state-card">
          <span>Current research state</span>
          <strong>Response function in a one-dimensional electron gas</strong>
          <p>Detected gap: the link between susceptibility divergence and CDW transition is not clear yet.</p>
        </div>

        <div class="advice-list">
          <article v-for="advice in advices" :key="advice.title" class="advice-card">
            <q-icon :name="advice.icon" />
            <div>
              <strong>{{ advice.title }}</strong>
              <span>{{ advice.reason }}</span>
            </div>
          </article>
        </div>
      </q-card>
    </section>

    <section class="mentor-grid q-mb-lg">
      <q-card flat bordered class="panel why-panel">
        <div class="panel-head">
          <div class="text-overline page-overline">Why this advice?</div>
          <h2>Every recommendation has evidence</h2>
        </div>
        <div class="evidence-stack">
          <div v-for="item in evidence" :key="item.label" class="evidence-row">
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
          </div>
        </div>
      </q-card>

      <q-card flat bordered class="panel persona-panel">
        <div class="panel-head">
          <div class="text-overline page-overline">Research strategy personas</div>
          <h2>Different styles for different blocks</h2>
        </div>
        <div class="persona-grid">
          <div v-for="persona in personas" :key="persona.name" class="persona-card">
            <q-icon :name="persona.icon" />
            <div>
              <strong>{{ persona.name }}</strong>
              <span>{{ persona.focus }}</span>
            </div>
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

    <section class="investor-line q-mt-lg q-pa-lg">
      <q-icon name="school" class="investor-icon" />
      <div>
        <h2>The product does not just explain research.</h2>
        <p>
          It helps users continue research: derive a missing equation, compare papers, read a
          simpler source, or formulate the next sharp question.
        </p>
      </div>
    </section>

    <GetInTouchSection />
  </q-page>
</template>

<script setup>
import GetInTouchSection from 'src/components/investor/GetInTouchSection.vue'

const advices = [
  {
    title: 'Derive χ(q) near 2kF',
    reason: 'Missing bridge between the current formula and CDW instability.',
    icon: 'functions'
  },
  {
    title: 'Compare with Peierls transition',
    reason: 'Related section explains the same mechanism from another angle.',
    icon: 'compare_arrows'
  },
  {
    title: 'Ask a senior-style explanation',
    reason: 'Use a selected mentor style to turn confusion into a concrete question.',
    icon: 'record_voice_over'
  }
]

const evidence = [
  { label: 'Advice', value: 'Work through the response-function derivation near 2kF.' },
  { label: 'Reason', value: 'Your notes contain the formula, but not the divergence mechanism.' },
  { label: 'Evidence', value: 'Sections: 1D Electron Gas, Response Function, CDW Transition.' },
  { label: 'Expected outcome', value: 'Understand why instability naturally appears in 1D systems.' },
  { label: 'Next action', value: 'Open derivation, create exercise note, or ask mentor to explain.' }
]

const personas = [
  {
    name: 'Feynman-style mentor',
    focus: 'Intuition, simple language, physical examples.',
    icon: 'lightbulb'
  },
  {
    name: 'Landau-style mentor',
    focus: 'Principles, compact structure, mathematical depth.',
    icon: 'architecture'
  },
  {
    name: 'Modern PhD supervisor',
    focus: 'Weekly plan, reading priorities, concrete deliverables.',
    icon: 'event_note'
  },
  {
    name: 'Skeptical reviewer',
    focus: 'Weak assumptions, missing evidence, hard questions.',
    icon: 'fact_check'
  }
]

const flow = [
  {
    title: 'Read state',
    text: 'Mentor sees groups, notes, open questions, recent actions and linked sources.',
    icon: 'travel_explore'
  },
  {
    title: 'Detect gap',
    text: 'It identifies what is not yet understood or connected in the project.',
    icon: 'leak_add'
  },
  {
    title: 'Suggest moves',
    text: 'It proposes 3-5 next steps: derive, compare, read, ask, write or pause.',
    icon: 'route'
  },
  {
    title: 'Explain why',
    text: 'Each suggestion shows reason, project evidence, expected outcome and action.',
    icon: 'help'
  }
]
</script>

<style scoped>
.mentor-page {
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
  color: var(--site-text-body);
}

.hero-grid,
.mentor-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(20rem, 0.9fr);
  gap: clamp(1rem, 3vw, 2rem);
  align-items: center;
}

.page-overline {
  color: var(--site-text-muted);
  letter-spacing: 0.12em;
}

.hero-title {
  max-width: 44rem;
  color: var(--site-text-heading);
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 850;
  line-height: 1.04;
  letter-spacing: 0;
}

.hero-lead {
  max-width: 42rem;
  color: var(--site-text-body);
  font-size: clamp(19px, 2vw, 21px);
  line-height: 1.62;
}

.value-line,
.mentor-mock,
.panel,
.compact-map,
.investor-line {
  border: 1px solid rgba(94, 234, 212, 0.22);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(15, 55, 56, 0.82), rgba(10, 24, 28, 0.88)),
    rgba(26, 44, 51, 0.6);
  box-shadow: 0 22px 70px rgba(10, 24, 28, 0.28);
}

.value-line {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.75rem 0.9rem;
  color: var(--site-text-high);
  font-weight: 800;
}

.value-line .q-icon {
  color: var(--site-text-muted);
  font-size: 24px;
}

.mentor-mock {
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
  color: rgba(255, 255, 255, 0.88);
  font-size: 16px;
}

.state-card,
.advice-card,
.evidence-row,
.persona-card {
  border: 1px solid rgba(94, 234, 212, 0.16);
  border-radius: 8px;
  background: rgba(5, 20, 28, 0.42);
}

.state-card {
  margin: 1rem;
  padding: 0.85rem;
}

.state-card span,
.evidence-row span {
  display: block;
  color: var(--site-text-muted);
  font-size: 15px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.state-card strong {
  display: block;
  margin-top: 0.25rem;
  color: var(--site-text-heading);
  line-height: 1.2;
}

.state-card p {
  margin: 0.28rem 0 0;
  color: rgba(207, 250, 254, 0.76);
  line-height: 1.42;
}

.advice-list {
  display: grid;
  gap: 0.6rem;
  padding: 0 1rem 1rem;
}

.advice-card,
.persona-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.65rem;
  padding: 0.78rem;
}

.advice-card .q-icon,
.persona-card .q-icon {
  color: var(--site-text-muted);
  font-size: 23px;
}

.advice-card strong,
.persona-card strong,
.evidence-row strong {
  display: block;
  color: var(--site-text-heading);
  line-height: 1.22;
}

.advice-card span,
.persona-card span {
  display: block;
  margin-top: 0.22rem;
  color: rgba(207, 250, 254, 0.74);
  font-size: 16px;
  line-height: 1.36;
}

.panel {
  padding: 1rem;
  align-self: stretch;
}

.panel-head {
  margin-bottom: 0.85rem;
}

.panel-head h2,
.map-node h2,
.investor-line h2 {
  margin: 0;
  color: var(--site-text-heading);
  font-size: 20px;
  font-weight: 850;
  line-height: 1.18;
  letter-spacing: 0;
}

.evidence-stack,
.persona-grid {
  display: grid;
  gap: 0.58rem;
}

.evidence-row {
  padding: 0.75rem;
}

.evidence-row strong {
  margin-top: 0.22rem;
  font-size: 17px;
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
  color: var(--site-text-high);
  font-size: 23px;
  background: linear-gradient(135deg, rgba(11, 195, 171, 0.95), rgba(3, 117, 204, 0.92));
}

.map-node p,
.investor-line p {
  margin: 0.34rem 0 0;
  color: rgba(207, 250, 254, 0.76);
  line-height: 1.42;
  font-size: 17px;
}

.investor-line {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.85rem;
  align-items: center;
}

@media (max-width: 920px) {
  .hero-grid,
  .mentor-grid,
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
  .mentor-page {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}
</style>
