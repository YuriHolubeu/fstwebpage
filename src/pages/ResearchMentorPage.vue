<template>
  <q-page class="mentor-page q-pa-md q-pb-xl">
    <section class="hero-section q-pt-lg q-mb-lg">
      <div class="hero-copy">
        <div class="text-overline page-overline q-mb-sm">AI Features / Research Mentor</div>
        <h1 class="hero-title">AI mentor for the next research move</h1>
        <p class="hero-lead">
          Researchers often get stuck not because they need one more answer, but because they do
          not know what to do next. The mentor reads the project state and suggests concrete,
          evidence-based steps: what to derive, compare, read, ask or write.
        </p>

        <div class="hero-points">
          <div v-for="point in heroPoints" :key="point" class="hero-point">
            <q-icon name="check_circle" />
            <span>{{ point }}</span>
          </div>
        </div>
      </div>

      <q-card flat bordered class="mentor-console">
        <div class="mock-top row items-center justify-between no-wrap">
          <div class="row items-center no-wrap">
            <span class="dot" />
            <span class="dot" />
            <span class="dot" />
            <span class="mock-path">Research Mentor / Next Moves</span>
          </div>
          <q-chip dense outline color="cyan-4" text-color="grey-3">guided research</q-chip>
        </div>

        <div class="state-panel">
          <div>
            <span>Current project state</span>
            <strong>1D electron gas · response function · CDW transition</strong>
            <p>
              Detected gap: notes contain the formula, but the reasoning path to the instability
              is not explained yet.
            </p>
          </div>
          <q-icon name="route" />
        </div>

        <div class="advice-stack">
          <article v-for="advice in advices" :key="advice.title" class="advice-card">
            <div class="advice-index">{{ advice.number }}</div>
            <div>
              <strong>{{ advice.title }}</strong>
              <p>{{ advice.reason }}</p>
              <div class="advice-actions">
                <span>{{ advice.action }}</span>
                <q-icon name="arrow_forward" />
              </div>
            </div>
          </article>
        </div>

        <div class="why-strip">
          <q-icon name="psychology_alt" />
          <span>Every suggestion can answer: why this advice, from which project evidence?</span>
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
        <div class="value-note">
          <strong>{{ item.noteTitle }}</strong>
          <span>{{ item.note }}</span>
        </div>
      </article>
    </section>

    <section class="evidence-section q-pa-lg q-mb-lg">
      <div class="evidence-copy">
        <div class="text-overline page-overline q-mb-sm">Why this advice?</div>
        <h2>Recommendations are grounded in the user’s own research map</h2>
        <p>
          The mentor does not give generic productivity tips. It uses AI Groups, anchored
          explanations, saved notes, open questions and linked sources to explain what is missing
          and what action should move the project forward.
        </p>
      </div>

      <div class="evidence-card">
        <div v-for="item in evidence" :key="item.label" class="evidence-row">
          <span>{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
        </div>
      </div>
    </section>

    <section class="persona-section q-mb-lg">
      <div class="persona-copy">
        <div class="text-overline page-overline q-mb-sm">Research strategy styles</div>
        <h2>Different mentor modes for different moments</h2>
        <p>
          The user can ask for intuition, strict derivation, weekly planning or critical review.
          This makes the guidance feel less like a chatbot and more like a research workspace that
          adapts to how the user is stuck.
        </p>
      </div>
      <div class="persona-grid">
        <article v-for="persona in personas" :key="persona.name" class="persona-card">
          <q-icon :name="persona.icon" />
          <strong>{{ persona.name }}</strong>
          <span>{{ persona.focus }}</span>
        </article>
      </div>
    </section>

    <section class="investor-line q-pa-lg">
      <q-icon name="school" class="investor-icon" />
      <div>
        <h2>The product does not only explain research. It helps users continue it.</h2>
        <p>
          This is attractive because weak research guidance is a real pain for students and young
          researchers. The mentor turns project context into clear next actions, with reasons and
          sources attached.
        </p>
      </div>
    </section>

  </q-page>
</template>

<script setup>

const heroPoints = [
  'suggests concrete next steps from the current project state',
  'explains the reason and project evidence behind each recommendation',
  'supports different research styles: intuition, rigor, planning and review'
]

const advices = [
  {
    number: '01',
    title: 'Derive χ(q) near 2kF',
    reason: 'This is the missing bridge between the current formula and CDW instability.',
    action: 'Open derivation path'
  },
  {
    number: '02',
    title: 'Compare with Peierls transition',
    reason: 'Two saved sections describe the same mechanism from different angles.',
    action: 'Open related source'
  },
  {
    number: '03',
    title: 'Ask a sharper question',
    reason: 'The project lacks a note explaining why susceptibility diverges in 1D.',
    action: 'Create mentor prompt'
  }
]

const values = [
  {
    number: '01',
    icon: 'travel_explore',
    title: 'Turns confusion into direction',
    text: 'Instead of asking an empty chatbot prompt, the user gets several concrete research moves based on their actual materials.',
    noteTitle: 'User value',
    note: 'Less staring at PDFs. More clear next actions.'
  },
  {
    number: '02',
    icon: 'fact_check',
    title: 'Advice comes with evidence',
    text: 'Every suggestion shows which sections, formulas, notes or open questions triggered it.',
    noteTitle: 'Trust value',
    note: 'The user can judge the advice instead of blindly accepting it.'
  },
  {
    number: '03',
    icon: 'route',
    title: 'Research becomes a guided workflow',
    text: 'The workspace can recommend reading, deriving, comparing, writing or reviewing as the project evolves.',
    noteTitle: 'Product value',
    note: 'The app moves from storage and chat into research guidance.'
  }
]

const evidence = [
  { label: 'Advice', value: 'Work through the response-function derivation near 2kF.' },
  { label: 'Reason', value: 'The project has the formula, but not the transition mechanism.' },
  { label: 'Evidence', value: '1D Electron Gas · Response Function · CDW Transition · saved note #03.' },
  { label: 'Expected outcome', value: 'Understand why instability naturally appears in 1D systems.' },
  { label: 'Next action', value: 'Open derivation, create exercise note, or ask mentor to explain.' }
]

const personas = [
  {
    name: 'Intuition mentor',
    focus: 'Simple language, physical meaning, mental models.',
    icon: 'lightbulb'
  },
  {
    name: 'Strict derivation',
    focus: 'Mathematical steps, assumptions, missing transitions.',
    icon: 'functions'
  },
  {
    name: 'PhD supervisor',
    focus: 'Weekly plan, reading priorities, concrete deliverables.',
    icon: 'event_note'
  },
  {
    name: 'Skeptical reviewer',
    focus: 'Weak assumptions, missing evidence, hard questions.',
    icon: 'gavel'
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

.hero-section {
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(24rem, 0.94fr);
  gap: clamp(1rem, 4vw, 2.6rem);
  align-items: center;
}

.page-overline {
  color: var(--site-text-muted);
  letter-spacing: 0.12em;
}

.hero-title {
  max-width: 42rem;
  margin: 0;
  color: var(--site-text-heading);
  font-size: clamp(2.35rem, 5.5vw, 4.55rem);
  font-weight: 850;
  line-height: 1.02;
  letter-spacing: 0;
}

.hero-lead {
  max-width: 43rem;
  margin: 1.2rem 0 0;
  color: var(--site-text-body);
  font-size: clamp(18px, 2vw, 21px);
  line-height: 1.62;
}

.hero-points {
  display: grid;
  gap: 0.55rem;
  margin-top: 1.25rem;
}

.hero-point {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: var(--site-text-high);
  font-weight: 800;
  line-height: 1.35;
}

.hero-point .q-icon {
  flex: 0 0 auto;
  margin-top: 0.08rem;
  color: var(--site-text-muted);
  font-size: 20px;
}

.mentor-console,
.value-card,
.evidence-section,
.persona-section,
.investor-line {
  border: 1px solid rgba(94, 234, 212, 0.22);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(15, 55, 56, 0.82), rgba(10, 24, 28, 0.9)),
    rgba(26, 44, 51, 0.62);
  box-shadow: 0 22px 70px rgba(10, 24, 28, 0.3);
}

.mentor-console {
  overflow: hidden;
}

.mock-top {
  gap: 0.4rem;
  padding: 0.78rem;
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

.state-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.9rem;
  align-items: center;
  margin: 1rem;
  padding: 0.95rem;
  border: 1px solid rgba(94, 234, 212, 0.16);
  border-radius: 8px;
  background: rgba(5, 20, 28, 0.42);
}

.state-panel span,
.evidence-row span {
  display: block;
  color: var(--site-text-muted);
  font-size: 14px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.state-panel strong,
.advice-card strong,
.value-card h2,
.evidence-copy h2,
.persona-copy h2,
.persona-card strong,
.investor-line h2 {
  color: var(--site-text-heading);
  font-weight: 850;
  line-height: 1.18;
  letter-spacing: 0;
}

.state-panel strong {
  display: block;
  margin-top: 0.25rem;
  font-size: 20px;
}

.state-panel p {
  margin: 0.35rem 0 0;
  color: rgba(207, 250, 254, 0.76);
  line-height: 1.45;
}

.state-panel > .q-icon {
  width: 2.9rem;
  height: 2.9rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--site-text-high);
  font-size: 26px;
  background: linear-gradient(135deg, rgba(11, 195, 171, 0.95), rgba(3, 117, 204, 0.92));
}

.advice-stack {
  display: grid;
  gap: 0.65rem;
  padding: 0 1rem 1rem;
}

.advice-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.75rem;
  padding: 0.85rem;
  border: 1px solid rgba(94, 234, 212, 0.16);
  border-radius: 8px;
  background: rgba(204, 251, 241, 0.055);
}

.advice-index {
  width: 2.1rem;
  height: 2.1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  color: #052326;
  font-weight: 900;
  background: #5eead4;
}

.advice-card p {
  margin: 0.25rem 0 0;
  color: rgba(207, 250, 254, 0.76);
  line-height: 1.4;
}

.advice-actions {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.55rem;
  color: var(--site-text-muted);
  font-weight: 850;
}

.why-strip,
.value-note {
  border: 1px solid rgba(216, 180, 254, 0.45);
  border-radius: 8px;
  background: linear-gradient(120deg, rgba(15, 118, 110, 0.3), rgba(88, 28, 135, 0.34));
}

.why-strip {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin: 0 1rem 1rem;
  padding: 0.85rem;
  color: var(--site-text-high);
  font-weight: 850;
}

.why-strip .q-icon {
  color: #d8b4fe;
  font-size: 24px;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
}

.value-card {
  padding: 1rem;
}

.value-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.value-head span {
  color: var(--site-text-muted);
  font-weight: 900;
  letter-spacing: 0.12em;
}

.value-head .q-icon,
.persona-card .q-icon,
.investor-icon {
  width: 2.35rem;
  height: 2.35rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--site-text-high);
  font-size: 23px;
  background: linear-gradient(135deg, rgba(11, 195, 171, 0.95), rgba(3, 117, 204, 0.92));
}

.value-card h2,
.evidence-copy h2,
.persona-copy h2,
.investor-line h2 {
  margin: 0;
  font-size: 24px;
}

.value-card p,
.evidence-copy p,
.persona-copy p,
.investor-line p {
  margin: 0.7rem 0 0;
  color: rgba(207, 250, 254, 0.76);
  font-size: 17px;
  line-height: 1.48;
}

.value-note {
  display: grid;
  gap: 0.25rem;
  margin-top: 0.9rem;
  padding: 0.75rem;
}

.value-note strong {
  color: var(--site-text-muted);
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.value-note span {
  color: var(--site-text-high);
  line-height: 1.35;
}

.evidence-section,
.persona-section {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(24rem, 1fr);
  gap: clamp(1rem, 3vw, 2rem);
  align-items: center;
}

.evidence-card {
  display: grid;
  gap: 0.58rem;
}

.evidence-row {
  padding: 0.78rem;
  border: 1px solid rgba(94, 234, 212, 0.16);
  border-radius: 8px;
  background: rgba(5, 20, 28, 0.42);
}

.evidence-row strong {
  display: block;
  margin-top: 0.22rem;
  color: var(--site-text-heading);
  font-size: 17px;
  line-height: 1.28;
}

.persona-section {
  padding: 1rem;
}

.persona-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
}

.persona-card {
  display: grid;
  gap: 0.45rem;
  min-height: 9.5rem;
  padding: 0.9rem;
  border: 1px solid rgba(94, 234, 212, 0.16);
  border-radius: 8px;
  background: rgba(204, 251, 241, 0.055);
}

.persona-card span {
  color: rgba(207, 250, 254, 0.76);
  font-size: 16px;
  line-height: 1.36;
}

.investor-line {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.9rem;
  align-items: center;
}

@media (max-width: 940px) {
  .hero-section,
  .evidence-section,
  .persona-section,
  .value-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .mentor-page {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .state-panel,
  .investor-line {
    grid-template-columns: 1fr;
  }

  .persona-grid {
    grid-template-columns: 1fr;
  }
}
</style>
