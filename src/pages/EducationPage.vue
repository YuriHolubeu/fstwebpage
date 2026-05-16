<template>
  <q-page class="education-page q-pa-md q-pb-xl">
    <section class="hero q-mb-xl text-center column items-center">
      <div class="text-overline edu-overline q-mb-sm">Education</div>
      <h1 class="text-h3 text-weight-bold text-white q-mb-md">
        Built for learning and research
      </h1>
      <p class="text-body1 text-grey-4 hero-lead">
        {{ SITE.projectName }} helps students and educators turn scattered readings into
        structured understanding — from first sources to final arguments.
      </p>
    </section>

    <section class="advantages-wrap column items-center">
      <div class="advantages-list">
        <article
          v-for="item in advantages"
          :key="item.title"
          class="advantage-card row no-wrap items-start"
        >
          <div class="advantage-card__icon-wrap flex flex-center">
            <q-icon :name="item.icon" size="26px" />
          </div>
          <div class="advantage-card__copy">
            <h2 class="advantage-card__title">{{ item.title }}</h2>
            <p class="advantage-card__text q-mb-none">{{ item.text }}</p>
          </div>
        </article>
      </div>
    </section>

    <GetInTouchSection />
  </q-page>
</template>

<script setup>
import GetInTouchSection from 'src/components/investor/GetInTouchSection.vue'
import { SITE } from 'src/constants/site'

const advantages = [
  {
    icon: 'menu_book',
    title: 'One PDF file for one topic',
    text:
      'Keep each reading assignment in its own workspace so students stay focused on a single subject instead of mixing unrelated sources.'
  },
  {
    icon: 'account_tree',
    title: 'See the structure of long papers',
    text:
      'Outlines and knowledge maps reveal how arguments are built — ideal for theses, review papers, and seminar prep.'
  },
  {
    icon: 'code',
    title: 'LaTeX and notes in one place',
    text:
      'Write, cite, and revise without jumping between a PDF viewer, editor, and separate note app.'
  },
  {
    icon: 'psychology',
    title: 'AI explanations on demand',
    text:
      'Highlight a difficult paragraph or formula and get an explanation tied to the source, so learning stays grounded in the text.'
  },
  {
    icon: 'compare',
    title: 'Compare sources side by side',
    text:
      'Open related passages next to each other to contrast methods, definitions, or claims — useful for essays and literature reviews.'
  },
  {
    icon: 'bookmark_add',
    title: 'Notes that stay with the project',
    text:
      'AI answers and your own comments become reusable project knowledge for exams, presentations, and group work.'
  },
  {
    icon: 'hub',
    title: 'Themes across many sections',
    text:
      'AI groups hundreds of outline sections into research themes so students can navigate large reading lists faster.'
  },
  {
    icon: 'groups',
    title: 'Shared language for teams',
    text:
      'Groups and advisors work from the same structured view of sources, notes, and open questions.'
  }
]
</script>

<style scoped>
.education-page {
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  color: #cffafe;
}

.edu-overline {
  color: #5eead4;
  letter-spacing: 0.12em;
}

.hero-lead {
  max-width: 720px;
  line-height: 1.62;
}

.advantages-wrap {
  width: 100%;
}

.advantages-list {
  width: 100%;
  max-width: 820px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.advantage-card {
  padding: 1.15rem 1.25rem;
  border-radius: 16px;
  border: 1px solid rgba(11, 195, 171, 0.22);
  background: rgba(26, 44, 51, 0.55);
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    transform 0.25s ease;
}

.advantage-card:hover {
  border-color: rgba(94, 234, 212, 0.38);
  background: rgba(26, 44, 51, 0.68);
  transform: translateY(-2px);
}

.advantage-card__icon-wrap {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  border-radius: 12px;
  color: #7dd3fc;
  background: rgba(3, 117, 204, 0.2);
  border: 1px solid rgba(94, 234, 212, 0.2);
}

.advantage-card__title {
  margin: 0 0 0.35rem;
  color: #f0fdfa;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
}

.advantage-card__text {
  color: #bae6fd;
  font-size: 0.92rem;
  line-height: 1.55;
}

@media (max-width: 599px) {
  .advantage-card__icon-wrap {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.75rem;
  }

  .advantage-card__title {
    font-size: 0.98rem;
  }
}
</style>
