<template>
  <q-page class="science-plan-page q-pa-md q-pb-xl column items-center">
    <section class="science-plan-hero q-mb-xl text-center column items-center full-width">
      <h1 class="text-h4 text-weight-bold science-plan-hero__title q-mb-md">
        Plan to improve science
      </h1>
      <p class="science-plan-hero__lead text-body1 q-ma-none">
        Our idea goes beyond creating an advanced PDF reader. We want to make science clearer and more accessible to non-experts.
      </p>
    </section>

    <section class="science-plan-list full-width column items-center">
      <div class="science-plan-list__items">
        <article
          v-for="item in sciencePlan"
          :key="item.title"
          class="science-plan-item"
        >
          <div class="science-plan-item__header row no-wrap items-center">
            <div
              class="science-plan-item__icon-wrap flex flex-center"
              :class="`science-plan-item__icon-wrap--${item.tone}`"
            >
              <q-icon :name="item.icon" size="20px" :color="item.iconColor" />
            </div>
            <h2 class="science-plan-item__title q-ma-none">{{ item.title }}</h2>
          </div>
          <p class="science-plan-item__text q-mb-none">{{ item.text }}</p>
        </article>
      </div>
    </section>
  </q-page>
</template>

<script setup>
const sciencePlan = [
  {
    icon: 'folder_special',
    tone: 'teal',
    iconColor: 'teal-3',
    title: 'One environment for one research',
    text:
      'Instead of spreading work across disconnected PDFs, drafts, and notes, each project lives in a single structured workspace where everything belongs together.'
  },
  {
    icon: 'help_outline',
    tone: 'blue',
    iconColor: 'light-blue-3',
    title: 'Every question answered in context',
    text:
      'Open questions are recorded inside the project and answered where they arise, so important gaps do not stay hidden or get lost between files.'
  },
  {
    icon: 'functions',
    tone: 'cyan',
    iconColor: 'cyan-3',
    title: 'Derivations done clearly, step by step',
    text:
      'Calculations and logical steps stay visible and traceable, instead of being skipped, compressed, or buried in hard-to-follow writing.'
  },
  {
    icon: 'menu_book',
    tone: 'mint',
    iconColor: 'light-green-3',
    title: 'Research that others can actually follow',
    text:
      'Articles become easier to understand because structure, references, formulas, and explanations stay linked to the same living project.'
  },
  {
    icon: 'psychology',
    tone: 'violet',
    iconColor: 'deep-purple-3',
    title: 'Less confusion, more real thinking',
    text:
      'Researchers spend less time searching through scattered material and more time checking ideas, extending results, and doing actual science.'
  },
  {
    icon: 'hub',
    tone: 'teal',
    iconColor: 'teal-3',
    title: 'Knowledge that keeps building',
    text:
      'Papers, formulas, notes, and AI insights connect inside one system, so earlier work continues to help the next step instead of disappearing.'
  }
]
</script>

<style scoped>
.science-plan-page {
  width: 100%;
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
  color: var(--site-text-body);
}

.science-plan-hero {
  max-width: 720px;
}

.science-plan-hero__title {
  color: var(--site-text-heading);
  letter-spacing: -0.02em;
}

.science-plan-hero__lead {
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  color: var(--site-text-muted);
  line-height: 1.62;
}

.science-plan-list {
  max-width: 820px;
}

.science-plan-list__items {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.science-plan-item {
  padding: 0.85rem 0;
}

.science-plan-item__header {
  gap: 0.75rem;
  margin-bottom: 0.35rem;
}

.science-plan-item__icon-wrap {
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: 1.5px solid transparent;
}

.science-plan-item__icon-wrap--teal {
  background: rgba(11, 195, 171, 0.22) !important;
  border-color: #5eead4 !important;
}

.science-plan-item__icon-wrap--blue {
  background: rgba(3, 117, 204, 0.28) !important;
  border-color: #7dd3fc !important;
}

.science-plan-item__icon-wrap--mint {
  background: rgba(125, 206, 184, 0.2) !important;
  border-color: #7dceb8 !important;
}

.science-plan-item__icon-wrap--cyan {
  background: rgba(34, 211, 238, 0.18) !important;
  border-color: #67e8f9 !important;
}

.science-plan-item__icon-wrap--violet {
  background: rgba(167, 139, 250, 0.2) !important;
  border-color: #a78bfa !important;
}

.science-plan-item__title {
  flex: 1;
  min-width: 0;
  color: var(--site-text-heading);
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
}

.science-plan-item__text {
  margin-left: calc(2.25rem + 0.75rem);
  color: var(--site-text-muted);
  font-size: 1.05rem;
  line-height: 1.55;
}

@media (max-width: 599px) {
  .science-plan-item__text {
    font-size: 1rem;
  }
}
</style>
