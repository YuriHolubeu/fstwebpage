<template>
  <q-page class="ai-feature-page q-pa-md q-pb-xl column items-center">
    <section class="ai-feature-hero q-mb-xl text-center column items-center">
      <div class="text-overline text-grey-4 q-mb-sm">AI Features / Explain Fragment</div>
      <h1 class="text-h3 text-weight-bold text-white q-mb-md">
        Explain Fragment: from copy-paste chat to source-anchored understanding
      </h1>
      <p class="text-body1 text-grey-4 ai-feature-hero__lead q-ma-none">
        Users can select a formula, paragraph, or note and ask the AI to explain it in place. Answers stay linked to the source, form a branching tree of follow-ups, and become searchable project memory instead of temporary chat.
      </p>
    </section>

    <section class="ai-feature-section column" aria-label="General idea and solved problems">
      <h2 class="text-h5 text-weight-bold text-white q-mb-lg text-center">
        General idea and solved problems
      </h2>

      <article v-for="item in featureRows" :key="item.title" class="ai-feature-row">
        <div class="ai-feature-row__icon" :class="`ai-feature-row__icon--${item.accent}`">
          <q-icon :name="item.icon" size="20px" />
        </div>
        <div>
          <h3 class="ai-feature-row__title q-ma-none">{{ item.title }}</h3>
          <p class="ai-feature-row__text q-mb-none">{{ item.text }}</p>
          <div class="ai-feature-result">
            <span class="ai-feature-result__label">{{ item.label }}</span>
            {{ item.result }}
          </div>
        </div>
      </article>
    </section>

    <section class="ai-feature-investor">
      <span class="ai-feature-investor__label">Investor signal</span>
      <p class="ai-feature-investor__text q-ma-none">
        The product does not send researchers to another chat window. It turns reading into
        source-anchored understanding trees that stay inside the project and compound over time.
      </p>
    </section>
  </q-page>
</template>

<script setup>
const featureRows = [
  {
    icon: 'push_pin',
    accent: 'mint',
    title: 'Explain the exact formula or paragraph inside the paper',
    text: 'Researchers select a fragment in a PDF, LaTeX file or note and ask what it means without copying text into a separate chatbot. The AI already knows the paper title, section, page, surrounding notation and project context, so the explanation starts from the real source instead of a detached prompt.',
    label: 'Why users need it',
    result: 'A week later, they can jump back to the exact place where the question started.'
  },
  {
    icon: 'account_tree',
    accent: 'blue',
    title: 'Follow-up questions grow as a tree, not a lost thread',
    text: 'Research thinking is branching: symbols, intuition, proof steps, connections to other papers. Explain Fragment lets users ask the next question on a specific branch instead of scrolling through a long linear chat that forgets what was selected.',
    label: 'Why is it different',
    result: 'The interface matches how people actually explore hard material, not how generic chat products are designed.'
  },
  {
    icon: 'bookmark_added',
    accent: 'violet',
    title: 'Answers become searchable project memory',
    text: 'Explanations stay in the workspace. Users can reopen a branch, save it as a note, link it to related formulas and papers, and reuse the wording later in a literature review, article, thesis or LaTeX draft.',
    label: 'Why users return',
    result: 'The workspace accumulates understanding instead of producing disposable AI replies.'
  },
  {
    icon: 'compare_arrows',
    accent: 'mint',
    title: 'Beat generic chat for real research work',
    text: 'In ChatGPT, answers drift down a single thread and the original formula, page and section are easy to lose. Here, users can go back to the source fragment, continue a specific branch, save the answer as a note and link it to related formulas and papers inside the same project.',
    label: 'Why investors should care',
    result: 'This is research memory inside the reading workflow, not another disposable conversation.'
  }
]
</script>
