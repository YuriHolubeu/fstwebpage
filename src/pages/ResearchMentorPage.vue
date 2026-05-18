<template>
  <q-page class="ai-feature-page q-pa-md q-pb-xl column items-center">
    <section class="ai-feature-hero column q-pt-md">
      <div class="text-overline text-grey-4 q-mb-sm">AI Features / Research Mentor</div>
      <h1 class="text-h3 text-weight-bold text-white q-mb-md">
        AI mentor for the next research move
      </h1>
      <p class="text-body1 text-grey-4 ai-feature-hero__lead q-ma-none">
        Researchers often get stuck not because they need one more answer, but because they do
        not know what to do next. The mentor reads the project state and suggests concrete,
        evidence-based steps: what to derive, compare, read, ask or write.
      </p>

      <div class="ai-feature-points">
        <div v-for="point in heroPoints" :key="point" class="ai-feature-point">
          <q-icon name="check_circle" />
          <span>{{ point }}</span>
        </div>
      </div>
    </section>

    <section class="ai-feature-preview column items-center text-center">
      <p class="ai-feature-preview__text text-body1 q-ma-none text-center">
        (later, we'll add here screenshots of how it will work exactly)
      </p>
      <br>
      <p class="ai-feature-preview__text text-body1 q-ma-none text-center">
        This feature remains in our focus area. Our current priority is the core research
        workflow; the full research mentor experience will follow in a later release.
      </p>
    </section>
  </q-page>
</template>

<script setup>
const heroPoints = [
  'suggests concrete next steps from the current project state',
  'explains the reason and provides evidence behind each recommendation',
  'supports different research styles: intuition, rigor, planning and review'
]
</script>
