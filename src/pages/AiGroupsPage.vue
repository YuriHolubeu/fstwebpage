<template>
  <q-page class="ai-feature-page q-pa-md q-pb-xl column items-center">
    <section class="ai-feature-hero q-mb-xl text-center column items-center">
      <div class="text-overline text-grey-4 q-mb-sm">AI Features / Groups</div>
      <h1 class="text-h3 text-weight-bold text-white q-mb-md">
        AI Groups: from scattered papers to a connected research map
      </h1>
      <p class="text-body1 text-grey-4 ai-feature-hero__lead q-ma-none">
        AI Groups turns uploaded papers, notes and formulas into a structured research map. It
        helps users find related work, reveal hidden connections and understand how equations move
        across the project.
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
        The product does not only store research files. It understands how the project is organized
        and how papers, formulas and ideas are connected.
      </p>
    </section>
  </q-page>
</template>

<script setup>
const featureRows = [
  {
    icon: 'auto_awesome_mosaic',
    accent: 'mint',
    title: 'Group uploaded articles by research meaning',
    text: 'Researchers can import papers from arXiv or upload their own PDFs, notes and LaTeX files. The AI analyzes titles, abstracts, sections, formulas and key terms, then organizes the material into meaningful themes such as core theory, methods, experiments, applications and open questions. Instead of manually creating folders, the user immediately sees what the project is about.',
    label: 'Why users need it',
    result: 'A growing research library stays readable even after weeks or months of work.'
  },
  {
    icon: 'hub',
    accent: 'blue',
    title: 'Surface hidden links between formulas and papers',
    text: 'Important research connections are often invisible when papers are stored as separate files. AI Groups can suggest links between formulas, concepts, methods, claims and source papers. It can show where an idea appears, where it is reused, and which papers support or extend each other.',
    label: 'Why it is attractive',
    result: 'The workspace becomes a knowledge map, not just another PDF reader or file manager.'
  },
  {
    icon: 'memory',
    accent: 'violet',
    title: 'Turn scattered files into project memory',
    text: 'When the system groups material or explains a connection, that insight becomes part of the project. Users can return to the source paper, reopen the relevant section, continue from a saved formula, and use the structure later while writing a literature review, article, thesis or LaTeX draft.',
    label: 'Why users return',
    result: 'Static documents become searchable, connected memory that helps research move forward.'
  }
]
</script>
