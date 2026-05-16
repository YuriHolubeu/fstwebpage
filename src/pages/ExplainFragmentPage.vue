<template>
  <q-page class="tree-page q-pa-md q-pb-xl">
    <section class="hero-grid q-pt-lg q-mb-lg">
      <div class="hero-copy">
        <div class="text-overline page-overline q-mb-sm">AI Features / Explanation Tree</div>
        <h1 class="hero-title q-mb-md">Source-Anchored AI Explanation Tree</h1>
        <p class="hero-lead q-mb-lg">
          AI explanations are not lost in chat. They stay anchored to exact formulas, sections and
          papers, while follow-up questions grow into a branching tree of understanding.
        </p>

        <div class="difference-grid">
          <div v-for="item in differences" :key="item.title" class="difference-card">
            <q-icon :name="item.icon" />
            <strong>{{ item.title }}</strong>
            <span>{{ item.text }}</span>
          </div>
        </div>
      </div>

      <q-card flat bordered class="tree-mock">
        <div class="mock-top row items-center justify-between no-wrap">
          <div class="row items-center no-wrap">
            <span class="dot" />
            <span class="dot" />
            <span class="dot" />
            <span class="mock-path">Formula / Understanding Tree</span>
          </div>
          <q-chip dense outline color="cyan-4" text-color="grey-3">source anchored</q-chip>
        </div>

        <div class="source-anchor">
          <span>Anchor</span>
          <strong>χ(q) response function</strong>
          <p>Gruner.tex · The One-Dimensional Electron Gas · page 11</p>
        </div>

        <div class="tree-view">
          <div class="tree-root">
            <q-icon name="functions" />
            <div>
              <strong>AI explanation</strong>
              <span>What the formula means and why it matters for CDW</span>
            </div>
          </div>

          <div class="tree-branches">
            <div v-for="branch in branches" :key="branch.title" class="tree-branch">
              <q-icon :name="branch.icon" />
              <div>
                <strong>{{ branch.title }}</strong>
                <span>{{ branch.text }}</span>
              </div>
            </div>
          </div>

          <div class="follow-up">
            <q-icon name="account_tree" />
            <span>Follow-up grows sideways: Fermi surface clarification → usage in Paper B → open related fragment</span>
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
      <q-icon name="psychology_alt" class="investor-icon" />
      <div>
        <h2>This is not another AI chat.</h2>
        <p>
          It becomes project memory: searchable, source-linked, reusable in notes, and easy to
          return to from the original formula, page or section.
        </p>
      </div>
    </section>

    <GetInTouchSection />
  </q-page>
</template>

<script setup>
import GetInTouchSection from 'src/components/investor/GetInTouchSection.vue'

const differences = [
  {
    title: 'Anchored to source',
    text: 'Every answer knows the paper, page, section and selected formula.',
    icon: 'push_pin'
  },
  {
    title: 'Branching, not linear',
    text: 'Follow-ups become a tree around the original research fragment.',
    icon: 'account_tree'
  },
  {
    title: 'Project memory',
    text: 'Explanations stay inside the workspace and can be reused later.',
    icon: 'bookmark_added'
  }
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
    title: 'Where used later',
    text: 'Links to related sections and papers',
    icon: 'link'
  }
]

const flow = [
  {
    title: 'Highlight',
    text: 'User selects a formula, paragraph or claim directly inside PDF/LaTeX.',
    icon: 'select_all'
  },
  {
    title: 'Explain',
    text: 'AI explains with nearby project context instead of a detached chat prompt.',
    icon: 'auto_awesome'
  },
  {
    title: 'Branch',
    text: 'Each follow-up grows as a connected clarification from the same source.',
    icon: 'account_tree'
  },
  {
    title: 'Return',
    text: 'Back to source opens the exact paper, page, section and selected fragment.',
    icon: 'keyboard_return'
  }
]
</script>

<style scoped>
.tree-page {
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
  color: #cffafe;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(20rem, 0.86fr);
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

.difference-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
}

.difference-card,
.tree-mock,
.compact-map,
.investor-line {
  border: 1px solid rgba(94, 234, 212, 0.22);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(15, 55, 56, 0.82), rgba(10, 24, 28, 0.88)),
    rgba(26, 44, 51, 0.6);
  box-shadow: 0 22px 70px rgba(10, 24, 28, 0.28);
}

.difference-card {
  padding: 0.85rem;
}

.difference-card .q-icon {
  color: #5eead4;
  font-size: 1.35rem;
}

.difference-card strong {
  display: block;
  margin-top: 0.42rem;
  color: #f0fdfa;
  line-height: 1.18;
}

.difference-card span {
  display: block;
  margin-top: 0.28rem;
  color: rgba(207, 250, 254, 0.74);
  font-size: 0.82rem;
  line-height: 1.35;
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

.source-anchor,
.tree-root,
.tree-branch,
.follow-up {
  border: 1px solid rgba(94, 234, 212, 0.16);
  border-radius: 8px;
  background: rgba(5, 20, 28, 0.42);
}

.source-anchor {
  margin: 1rem;
  padding: 0.85rem;
}

.source-anchor span {
  display: block;
  color: #5eead4;
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.source-anchor strong {
  display: block;
  margin-top: 0.25rem;
  color: #f0fdfa;
  line-height: 1.2;
}

.source-anchor p {
  margin: 0.28rem 0 0;
  color: rgba(207, 250, 254, 0.76);
  line-height: 1.42;
}

.tree-view {
  padding: 0 1rem 1rem;
}

.tree-root,
.tree-branch {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.65rem;
  padding: 0.78rem;
}

.tree-root {
  border-color: rgba(94, 234, 212, 0.38);
}

.tree-root .q-icon,
.tree-branch .q-icon,
.follow-up .q-icon {
  color: #5eead4;
  font-size: 1.3rem;
}

.tree-root strong,
.tree-branch strong {
  display: block;
  color: #f0fdfa;
  line-height: 1.2;
}

.tree-root span,
.tree-branch span,
.follow-up span {
  display: block;
  margin-top: 0.22rem;
  color: rgba(207, 250, 254, 0.75);
  font-size: 0.82rem;
  line-height: 1.36;
}

.tree-branches {
  position: relative;
  display: grid;
  gap: 0.55rem;
  margin: 0.7rem 0 0.7rem 1.4rem;
  padding-left: 0.8rem;
  border-left: 1px solid rgba(94, 234, 212, 0.36);
}

.follow-up {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.78rem;
  border-color: rgba(216, 180, 254, 0.34);
  background: linear-gradient(135deg, rgba(11, 195, 171, 0.14), rgba(168, 85, 247, 0.16));
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

.map-node h2,
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

.investor-line {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.85rem;
  align-items: center;
}

@media (max-width: 920px) {
  .hero-grid,
  .difference-grid,
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
  .tree-page {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}
</style>
