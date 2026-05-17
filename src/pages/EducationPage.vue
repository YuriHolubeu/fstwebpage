<template>
  <q-page class="education-page q-pa-md q-pb-xl column items-center">
    <section class="hero q-mb-xl text-center column items-center">
      <h1 class="text-h3 text-weight-bold text-white q-mb-md">
        Solution for schoolkids and students
      </h1>
      <p class="text-body1 text-grey-4 hero-lead">
        We propose a revolutionary approach to education that solves many current problems at once.
      </p>
    </section>

    <section
      v-for="group in previewGroups"
      :key="group.title"
      class="education-group education-group--green-answers column items-center text-center q-mb-xl"
    >
      <h2 class="education-group__title text-h5 text-weight-bold q-mb-md">
        {{ group.title }}
      </h2>
      <div class="advantages-list">
        <article
          v-for="item in group.items"
          :key="item.title"
          class="advantage-card"
        >
          <div class="advantage-card__header row no-wrap items-center">
            <div
              class="advantage-card__icon-wrap flex flex-center"
              :class="`advantage-card__icon-wrap--${item.tone}`"
            >
              <q-icon :name="item.icon" size="20px" :color="item.iconColor" />
            </div>
            <h3 class="advantage-card__title q-ma-none">{{ item.title }}</h3>
          </div>
          <p class="advantage-card__text q-mb-none">{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="education-preview column items-center text-center">
      <h2 class="education-preview__heading text-h5 text-weight-bold q-mb-md text-center">
        Preview of the education with FST
      </h2>
      <p class="education-preview__text text-body1 q-ma-none text-center">
        (later, we'll add here screenshots of how it will work exactly for education)
      </p><br>
      <p class="education-preview__text text-body1 q-ma-none text-center">
        This educational direction remains in our focus area. Our current priority is
        the core research workflow; a dedicated offering for schools and universities will follow in a later release.
      </p>
      <p class="education-preview__text text-body1 q-mt-md q-mb-none text-center">
        If you represent an institution or are personally interested in the educational use of
        {{ SITE.projectName }}, we invite you to contact us at
        <a :href="contactMailto" class="education-preview__email">{{ SITE.contactEmail }}</a>.
      </p>
    </section>
  </q-page>
</template>

<script setup>
import { SITE } from 'src/constants/site'

const contactMailto = `mailto:${SITE.contactEmail}`

const generalIdeas = [
  {
    icon: 'view_module',
    tone: 'teal',
    iconColor: 'teal-3',
    title: 'Increasing motivation by reducing the mess in information',
    text:
      'Often, students can not work because all the information feels so dense that there is no way to understand in general what is going on. The structuring of information and the ability to fast edit it will increase motivation drastically.'
  },
  {
    icon: 'work_outline',
    tone: 'blue',
    iconColor: 'light-blue-3',
    title: 'Studying within approach that will be really used after studies',
    text:
      'There is no sense in learning in school an approach of studies that is unusable in real life. We propose to instead use a format that is guaranteed to work for the hardest university subjects.'
  },
  {
    icon: 'fact_check',
    tone: 'mint',
    iconColor: 'green-3',
    title: 'Make a real check of the progress easier',
    text:
      'One file with comments allows us to easily see if a student thought about some information or not. It will be easier not to fly in fantasies that there is progress, if actually there are only problems and imitation.'
  }
]

const particularRealizations = [
  {
    icon: 'picture_as_pdf',
    tone: 'cyan',
    iconColor: 'cyan-3',
    title: 'One PDF file for many years of study',
    text:
      'Keep materials for a subject in a single workspace so progress accumulates across terms and topics remain easy to revisit. Each new year of studying a subject is an addition of a new book to this PDF file, which the student then can edit as they want to sharpen their knowledge. No more stored paper notebooks and mess in information.'
  },
  {
    icon: 'hub',
    tone: 'teal',
    iconColor: 'teal-3',
    title: 'Graphical tool for restructuring and quick access',
    text:
      'Our application gives the key section of the book for finding answers way faster. Thus, students will save time and always be focused as much as they can.'
  },
  {
    icon: 'question_answer',
    tone: 'blue',
    iconColor: 'light-blue-3',
    title: 'Adding comments and questions to focus on',
    text:
      'Students often stop studying if they feel that there will be no answers to their questions. Here, one can add them and create a section for an answer in a few clicks.'
  }
]

const previewGroups = [
  { id: 'general', title: 'General idea and solved problems', items: generalIdeas },
  { id: 'particular', title: 'Particular realization', items: particularRealizations }
]
</script>

<style scoped>
.education-page {
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  color: var(--site-text-body);
}

.hero {
  width: 100%;
  max-width: 820px;
}

.hero-lead {
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.62;
}

.education-group {
  width: 100%;
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
}

.education-group__title {
  width: 100%;
  color: var(--site-text-heading);
  letter-spacing: -0.01em;
  text-align: center;
}

.education-preview {
  width: 100%;
  max-width: 820px;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
}

.education-preview__heading {
  color: var(--site-text-heading);
  letter-spacing: -0.01em;
}

.education-preview__text {
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  color: var(--site-text-muted);
  line-height: 1.62;
}

.education-group--green-answers .advantage-card__text {
  color: var(--site-text-muted);
}

.education-preview__email {
  color: var(--site-text-accent);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.education-preview__email:hover {
  color: var(--site-text-accent-soft);
  text-decoration: underline;
}

.advantages-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.advantage-card {
  padding: 0.85rem 0;
  border: none;
  background: transparent;
  text-align: left;
}

.advantage-card__header {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.35rem;
}

.advantage-card__icon-wrap {
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: 1.5px solid transparent;
}

.advantage-card__icon-wrap--teal {
  background: rgba(11, 195, 171, 0.22) !important;
  border-color: #5eead4 !important;
}

.advantage-card__icon-wrap--blue {
  background: rgba(3, 117, 204, 0.28) !important;
  border-color: #7dd3fc !important;
}

.advantage-card__icon-wrap--mint {
  background: rgba(125, 206, 184, 0.2) !important;
  border-color: #7dceb8 !important;
}

.advantage-card__icon-wrap--cyan {
  background: rgba(34, 211, 238, 0.18) !important;
  border-color: #67e8f9 !important;
}

.advantage-card__icon-wrap :deep(.q-icon) {
  color: inherit;
}

.advantage-card__title {
  flex: 1;
  min-width: 0;
  color: var(--site-text-heading);
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
}

.advantage-card__text {
  margin-left: calc(2.25rem + 0.75rem);
  color: var(--site-text-accent-soft);
  font-size: 18px;
  line-height: 1.55;
}

@media (max-width: 599px) {
  .advantage-card__title {
    font-size: 19px;
  }

  .advantage-card__text {
    margin-left: calc(2.25rem + 0.75rem);
  }
}
</style>
