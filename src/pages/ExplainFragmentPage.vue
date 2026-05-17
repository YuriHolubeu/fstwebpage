<template>
  <q-page class="tree-page q-pa-md q-pb-xl">
    <section class="hero-section q-pt-lg q-mb-lg">
      <div class="hero-copy">
        <div class="text-overline page-overline q-mb-sm">AI Features / Explanation Tree</div>
        <h1 class="hero-title">AI explanations anchored to the exact source</h1>
        <p class="hero-lead">
          Instead of copying formulas into a separate chatbot, users explain a selected fragment
          directly inside the paper. Every answer stays attached to the formula, page and section
          where the question started.
        </p>
        <div class="hero-points">
          <div v-for="point in heroPoints" :key="point" class="hero-point">
            <q-icon name="check_circle" />
            <span>{{ point }}</span>
          </div>
        </div>
      </div>

      <q-card flat bordered class="tree-mock">
        <div class="mock-top row items-center justify-between no-wrap">
          <div class="row items-center no-wrap">
            <span class="dot" />
            <span class="dot" />
            <span class="dot" />
            <span class="mock-path">Formula Understanding Tree</span>
          </div>
          <q-chip dense outline color="cyan-4" text-color="grey-3">source anchored</q-chip>
        </div>

        <div class="source-card">
          <div>
            <span>Selected source</span>
            <strong>χ(q) response function</strong>
            <p>Gruner.tex · The One-Dimensional Electron Gas · page 11</p>
          </div>
          <q-btn outline no-caps dense color="cyan-4" label="Back to source" />
        </div>

        <div class="tree-body">
          <div class="root-node">
            <q-icon name="functions" />
            <div>
              <strong>AI explanation</strong>
              <span>What the formula means and why it matters for CDW</span>
            </div>
          </div>

          <div class="branch-grid">
            <div v-for="branch in branches" :key="branch.title" class="branch-node">
              <q-icon :name="branch.icon" />
              <div>
                <strong>{{ branch.title }}</strong>
                <span>{{ branch.text }}</span>
              </div>
            </div>
          </div>

          <div class="follow-up-path">
            <q-icon name="account_tree" />
            <span>Follow-up questions grow as branches, not as a lost chat history.</span>
          </div>
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

    <section class="compare-section q-pa-lg q-mb-lg">
      <div class="compare-copy">
        <div class="text-overline page-overline q-mb-sm">Why it beats normal chat</div>
        <h2>This is research memory, not another conversation</h2>
        <p>
          ChatGPT answers drift down a linear thread. Here, every explanation knows the selected
          text, formula, paper, section and page. Users can return to the original place, continue
          a branch, or reuse the answer inside notes and drafts.
        </p>
      </div>
      <div class="compare-list">
        <div v-for="item in compare" :key="item" class="compare-item">
          <q-icon name="keyboard_return" />
          <span>{{ item }}</span>
        </div>
      </div>
    </section>

    <GetInTouchSection />
  </q-page>
</template>

<script setup>
import GetInTouchSection from 'src/components/investor/GetInTouchSection.vue'

const heroPoints = [
  'explanations stay tied to the exact formula or paragraph',
  'follow-up questions become a branching understanding tree',
  'answers become searchable project memory, not lost chat'
]

const branches = [
  {
    title: 'Symbols',
    text: 'χ(q), q, response function, divergence',
    icon: 'data_object'
  },
  {
    title: 'Why it matters',
    text: 'Connects the formula to CDW instability',
    icon: 'priority_high'
  },
  {
    title: 'Used later',
    text: 'Links to related fragments and papers',
    icon: 'link'
  },
  {
    title: 'Next question',
    text: 'How is this connected to Fermi surface?',
    icon: 'help'
  }
]

const values = [
  {
    number: '01',
    icon: 'push_pin',
    title: 'Anchored to the source',
    text: 'Every AI explanation is attached to the selected formula, paragraph, paper, page and section.',
    exampleTitle: 'User value',
    example: 'A week later, the user can jump back to the exact place where the question started.'
  },
  {
    number: '02',
    icon: 'account_tree',
    title: 'Research thinking is branching',
    text: 'Follow-ups grow as a tree around the original source instead of disappearing inside a linear chat.',
    exampleTitle: 'Product value',
    example: 'The interface follows how researchers actually explore ideas: symbols, intuition, proof, usage.'
  },
  {
    number: '03',
    icon: 'bookmark_added',
    title: 'Answers become project memory',
    text: 'Explanations can be searched, reopened, linked to notes and reused in LaTeX drafts later.',
    exampleTitle: 'Research value',
    example: 'The workspace accumulates understanding instead of producing disposable AI answers.'
  }
]

const compare = [
  'Back to source fragment',
  'Continue a specific branch',
  'Save as note or LaTeX paragraph',
  'Link to related formulas and papers'
]
</script>

<style scoped>
.tree-page {
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
  color: var(--site-text-body);
}

.hero-section {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(24rem, 0.9fr);
  gap: clamp(1rem, 4vw, 2.5rem);
  align-items: center;
}

.page-overline {
  color: var(--site-text-muted);
  letter-spacing: 0.12em;
}

.hero-title {
  max-width: 44rem;
  margin: 0;
  color: var(--site-text-heading);
  font-size: clamp(2.3rem, 5.4vw, 4.4rem);
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
  max-width: 38rem;
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

.tree-mock,
.value-card,
.compare-section {
  border: 1px solid rgba(94, 234, 212, 0.22);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(15, 55, 56, 0.82), rgba(10, 24, 28, 0.88)),
    rgba(26, 44, 51, 0.6);
  box-shadow: 0 22px 70px rgba(10, 24, 28, 0.28);
}

.tree-mock {
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

.source-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  margin: 1rem;
  padding: 0.85rem;
  border: 1px solid rgba(94, 234, 212, 0.16);
  border-radius: 8px;
  background: rgba(5, 20, 28, 0.42);
}

.source-card span {
  display: block;
  color: #5eead4;
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.source-card strong {
  display: block;
  margin-top: 0.25rem;
  color: var(--site-text-heading);
  line-height: 1.2;
}

.source-card p {
  margin: 0.25rem 0 0;
  color: rgba(207, 250, 254, 0.72);
  font-size: 0.82rem;
  line-height: 1.3;
}

.tree-body {
  padding: 0 1rem 1rem;
}

.root-node,
.branch-node,
.follow-up-path {
  border: 1px solid rgba(94, 234, 212, 0.16);
  border-radius: 8px;
  background: rgba(5, 20, 28, 0.42);
}

.root-node {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.65rem;
  padding: 0.8rem;
  border-color: rgba(94, 234, 212, 0.38);
}

.root-node .q-icon,
.branch-node .q-icon,
.follow-up-path .q-icon {
  color: #5eead4;
  font-size: 1.35rem;
}

.root-node strong,
.branch-node strong {
  display: block;
  color: var(--site-text-heading);
  line-height: 1.2;
}

.root-node span,
.branch-node span,
.follow-up-path span {
  display: block;
  margin-top: 0.22rem;
  color: rgba(207, 250, 254, 0.72);
  font-size: 0.82rem;
  line-height: 1.35;
}

.branch-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.55rem;
  margin: 0.75rem 0;
  padding-left: 1rem;
  border-left: 1px solid rgba(94, 234, 212, 0.35);
}

.branch-node {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.55rem;
  min-height: 4.25rem;
  padding: 0.7rem;
}

.follow-up-path {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.75rem;
  border-color: rgba(216, 180, 254, 0.34);
  background: linear-gradient(135deg, rgba(11, 195, 171, 0.14), rgba(168, 85, 247, 0.16));
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

.value-head .q-icon {
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
.compare-section h2 {
  margin: 0;
  color: var(--site-text-heading);
  font-size: 1.15rem;
  font-weight: 850;
  line-height: 1.2;
  letter-spacing: 0;
}

.value-card p,
.compare-section p {
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

.compare-section {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.7fr);
  gap: 1rem;
  align-items: center;
}

.compare-list {
  display: grid;
  gap: 0.55rem;
}

.compare-item {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.65rem;
  border: 1px solid rgba(94, 234, 212, 0.14);
  border-radius: 8px;
  color: rgba(236, 254, 255, 0.86);
  font-size: 0.86rem;
  font-weight: 750;
  background: rgba(204, 251, 241, 0.055);
}

.compare-item .q-icon {
  color: #5eead4;
  font-size: 1.12rem;
}

@media (max-width: 920px) {
  .hero-section,
  .value-grid,
  .compare-section {
    grid-template-columns: 1fr;
  }

  .branch-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .tree-page {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .source-card {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
