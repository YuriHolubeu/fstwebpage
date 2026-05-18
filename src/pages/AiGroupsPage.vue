<template>
  <q-page class="ai-groups-page q-pa-md q-pb-xl">
    <section class="hero-section">
      <div class="text-overline ai-overline">AI Features / Groups</div>
      <h1>AI Groups: from scattered papers to a connected research map</h1>
      <p>
        AI Groups turns uploaded papers, notes and formulas into a structured research map. It
        helps users find related work, reveal hidden connections and understand how equations move
        across the project.
      </p>
    </section>

    <section class="idea-section" aria-label="General idea and solved problems">
      <h2>General idea and solved problems</h2>

      <article v-for="item in featureRows" :key="item.title" class="feature-row">
        <div class="feature-icon" :class="`feature-icon--${item.accent}`">
          <q-icon :name="item.icon" />
        </div>
        <div class="feature-copy">
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
          <div class="feature-result">
            <span>{{ item.label }}</span>
            {{ item.result }}
          </div>
        </div>
      </article>
    </section>

    <section class="investor-summary">
      <span>Investor signal</span>
      <p>
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

<style scoped>
.ai-groups-page {
  max-width: 1380px;
  margin-left: auto;
  margin-right: auto;
  color: var(--site-text-body);
}

.hero-section {
  min-height: clamp(28rem, 52vh, 39rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: clamp(3rem, 8vw, 6rem) 1rem clamp(4rem, 10vw, 7rem);
}

.ai-overline {
  margin-bottom: 1.2rem;
  color: #5eead4;
  letter-spacing: 0.16em;
}

.hero-section h1 {
  max-width: 72rem;
  margin: 0;
  color: var(--site-text-heading);
  font-size: clamp(3.05rem, 7vw, 6.2rem);
  font-weight: 900;
  line-height: 1.02;
  letter-spacing: 0;
}

.hero-section p {
  max-width: 68rem;
  margin: 1.8rem auto 0;
  color: #8ee6d5;
  font-size: clamp(1.22rem, 2.35vw, 2rem);
  font-weight: 420;
  line-height: 1.52;
}

.idea-section {
  max-width: 1180px;
  margin: 0 auto;
}

.idea-section h2 {
  margin: 0 0 clamp(2rem, 5vw, 3.5rem);
  color: var(--site-text-heading);
  font-size: clamp(2rem, 3vw, 3rem);
  font-weight: 900;
  line-height: 1.12;
  text-align: center;
  letter-spacing: 0;
}

.feature-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: clamp(1.1rem, 2.4vw, 1.7rem);
  margin-bottom: clamp(3rem, 7vw, 5.3rem);
}

.feature-icon {
  width: 4.25rem;
  height: 4.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 3px solid currentColor;
  border-radius: 999px;
  font-size: 2rem;
  background: rgba(204, 251, 241, 0.08);
  box-shadow: 0 20px 54px rgba(10, 24, 28, 0.24);
}

.feature-icon--mint {
  color: #5eead4;
}

.feature-icon--blue {
  color: #7dd3fc;
}

.feature-icon--violet {
  color: #d8b4fe;
}

.feature-copy h3 {
  margin: 0;
  color: var(--site-text-heading);
  font-size: clamp(1.35rem, 2.1vw, 2rem);
  font-weight: 900;
  line-height: 1.18;
  letter-spacing: 0;
}

.feature-copy p {
  max-width: 75rem;
  margin: 1.25rem 0 0;
  color: #8ee6d5;
  font-size: clamp(1.15rem, 2vw, 1.9rem);
  font-weight: 390;
  line-height: 1.48;
}

.feature-result {
  max-width: 62rem;
  margin-top: 1.25rem;
  padding: 1rem 1.15rem;
  border-left: 4px solid #5eead4;
  border-radius: 0 8px 8px 0;
  color: rgba(236, 254, 255, 0.92);
  font-size: clamp(1rem, 1.45vw, 1.25rem);
  font-weight: 720;
  line-height: 1.4;
  background: linear-gradient(90deg, rgba(94, 234, 212, 0.13), rgba(56, 189, 248, 0.04));
}

.feature-result span {
  display: block;
  margin-bottom: 0.35rem;
  color: #5eead4;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.investor-summary {
  max-width: 1120px;
  margin: clamp(1rem, 4vw, 2.8rem) auto 0;
  padding: clamp(1.3rem, 3vw, 2rem);
  border: 1px solid rgba(94, 234, 212, 0.28);
  border-radius: 8px;
  background:
    radial-gradient(circle at 0% 0%, rgba(94, 234, 212, 0.16), transparent 36%),
    linear-gradient(135deg, rgba(15, 55, 56, 0.78), rgba(10, 24, 28, 0.88));
}

.investor-summary span {
  color: #5eead4;
  font-size: 0.86rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.investor-summary p {
  margin: 0.8rem 0 0;
  color: var(--site-text-heading);
  font-size: clamp(1.35rem, 2.5vw, 2.3rem);
  font-weight: 850;
  line-height: 1.22;
}

@media (max-width: 760px) {
  .hero-section {
    min-height: auto;
    padding-top: 2.5rem;
    padding-bottom: 3rem;
  }

  .feature-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .feature-icon {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 1.6rem;
  }
}

@media (max-width: 520px) {
  .ai-groups-page {
    padding-left: 0.85rem;
    padding-right: 0.85rem;
  }

  .hero-section h1 {
    font-size: clamp(2.55rem, 13vw, 3.55rem);
  }

  .hero-section p,
  .feature-copy p {
    font-size: 1.1rem;
  }
}
</style>
