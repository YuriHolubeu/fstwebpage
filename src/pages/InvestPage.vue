<template>
  <q-page class="q-pa-md q-pb-xl">
    <section class="team-section q-mb-xl column items-center">
      <div class="text-overline text-primary q-mb-sm text-center">Team</div>
      <h1 class="text-h4 text-weight-bold text-white q-mb-md text-center">People behind the product</h1>
      <p class="text-body2 text-grey-4 q-mb-xl text-center team-intro">
        Lead with credibility: past companies, domain years, and the specific superpower each
        person brings to GTM and engineering.
      </p>

      <div class="row q-col-gutter-xl justify-center full-width team-grid">
        <div
          v-for="member in team"
          :key="member.name"
          class="col-12 col-sm-6 col-md-4 team-grid__col"
        >
          <q-card flat bordered class="team-card q-pa-lg text-center column items-center">
            <q-avatar size="152px" class="q-mb-lg team-avatar text-weight-bold text-h5">
              <img
                v-if="member.photo"
                :src="member.photo"
                :alt="member.name"
              >
              <template v-else>{{ member.initials }}</template>
            </q-avatar>
            <div class="text-h6 text-weight-medium text-white">{{ member.name }}</div>
            <div class="text-caption text-primary q-mb-sm">{{ member.role }}</div>
            <p class="text-caption text-grey-5 q-mb-none">{{ member.bio }}</p>
          </q-card>
        </div>
      </div>
    </section>

    <q-separator dark color="cyan-4" class="q-mb-xl opacity-30" />

    <section class="q-mb-xl">
      <div class="text-overline text-primary q-mb-sm">Investment</div>
      <h2 class="text-h4 text-weight-bold text-white q-mb-md">Why partner with us</h2>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-card flat bordered class="glass-panel q-pa-lg">
            <div class="text-h6 text-weight-medium text-white q-mb-sm">What you receive</div>
            <q-list dense dark class="rounded-borders">
              <q-item v-for="(line, i) in investorGets" :key="i" class="q-px-none">
                <q-item-section avatar>
                  <q-icon name="check_circle" color="primary" />
                </q-item-section>
                <q-item-section class="text-body2 text-grey-3">{{ line }}</q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
        <div class="col-12 col-md-6">
          <q-card flat bordered class="glass-panel q-pa-lg">
            <div class="text-h6 text-weight-medium text-white q-mb-sm">Use of funds</div>
            <p class="text-body2 text-grey-4 q-mb-md">
              Tie capital to milestones investors can verify: hires, infra, compliance,
              or geographic expansion — pick what is true for your round.
            </p>
            <q-linear-progress
              :value="0.62"
              rounded
              size="10px"
              color="primary"
              track-color="blue-grey-10"
              class="q-mb-xs"
            />
            <div class="text-caption text-grey-5">Example: 62% product and engineering</div>
          </q-card>
        </div>
      </div>
    </section>

    <section class="q-mb-xl">
      <h3 class="text-h6 text-weight-bold text-white q-mb-md">Round snapshot</h3>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-4" v-for="card in snapshot" :key="card.label">
          <q-card flat bordered class="metric-card q-pa-md">
            <div class="text-caption text-grey-5">{{ card.label }}</div>
            <div class="text-h6 text-weight-bold text-white q-mt-xs">{{ card.value }}</div>
          </q-card>
        </div>
      </div>
    </section>

    <section class="cta-strip row items-center justify-between q-pa-lg">
      <div>
        <div class="text-subtitle1 text-weight-bold text-white">Request the data room</div>
        <div class="text-caption text-grey-5">Financials, cap table, and technical appendix.</div>
      </div>
      <ContactUsButton label="Contact us" />
    </section>
  </q-page>
</template>

<script setup>
import ContactUsButton from 'src/components/investor/ContactUsButton.vue'

const team = [
  {
    initials: 'YH',
    name: 'Yury Holubeu',
    role: 'Founder / CEO',
    photo: '/team/yury-holubeu.png',
    bio: 'Replace with your background: markets built, teams led, technical depth.'
  },
  {
    initials: 'ER',
    name: 'Egor Riter',
    role: 'Co-founder / CEO',
    photo: '/team/egor-riter.png',
    bio: 'Replace with your background: markets built, teams led, technical depth.'
  },
  {
    initials: 'JP',
    name: 'Jevgenij Posashkov',
    role: 'Co-founder / CEO',
    photo: '/team/jevgenij-posashkov.png',
    bio: 'Replace with your background: markets built, teams led, technical depth.'
  }
]

const investorGets = [
  'Pro-rata rights on standard terms (if applicable)',
  'Monthly investor updates with KPI table',
  'Direct line to founders for strategic intros',
  'Visibility into product roadmap and hiring plan'
]

const snapshot = [
  { label: 'Round', value: 'Seed / Strategic' },
  { label: 'Instrument', value: 'Priced equity (example)' },
  { label: 'Closing', value: 'Rolling through Q3' }
]
</script>

<style scoped>
.team-section {
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}

.team-intro {
  max-width: 720px;
}

.team-grid {
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
}

.team-grid__col {
  display: flex;
  justify-content: center;
}

.team-card {
  width: 100%;
  max-width: 300px;
  border-radius: 16px;
  background: rgba(26, 44, 51, 0.55);
  border-color: rgba(11, 195, 171, 0.22);
}

.team-avatar {
  background: linear-gradient(135deg, #0375cc, #0bc3ab);
  color: #133031;
}

.team-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.glass-panel {
  border-radius: 16px;
  background: rgba(26, 44, 51, 0.55);
  border-color: rgba(11, 195, 171, 0.22);
  min-height: 100%;
}
.metric-card {
  border-radius: 14px;
  background: rgba(19, 48, 49, 0.45);
  border-color: rgba(3, 117, 204, 0.2);
}
.cta-strip {
  border-radius: 16px;
  border: 1px solid rgba(11, 195, 171, 0.25);
  background: linear-gradient(
    120deg,
    rgba(3, 117, 204, 0.28) 0%,
    rgba(19, 48, 49, 0.88) 100%
  );
}
</style>
