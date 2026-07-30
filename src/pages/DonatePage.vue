<template>
  <q-page class="donate-page" :style-fn="donatePageStyle">
    <div class="donate-page__stage">
      <div class="donate-page__media">
        <picture>
          <source
            media="only screen and (max-width: 600px) and (hover: none)"
            :srcset="donateBgMobileUrl"
          />
          <img
            class="donate-page__bg"
            :src="donateBgDesktopUrl"
            alt=""
            decoding="async"
          />
        </picture>
        <picture class="donate-page__blur-picture" aria-hidden="true">
          <source
            media="only screen and (max-width: 600px) and (hover: none)"
            :srcset="donateBgMobileUrl"
          />
          <img
            class="donate-page__bg donate-page__bg--blur"
            :src="donateBgDesktopUrl"
            alt=""
            decoding="async"
          />
        </picture>
      </div>

      <section class="donate-content column items-center">
        <h1 class="donate-title text-weight-bold q-mb-sm">
          {{ SITE.donate.title }}
        </h1>
        <p class="donate-intro q-mt-none q-mb-sm text-center">
          {{ SITE.donate.intro }}
        </p>
        <p class="donate-reward q-mt-none q-mb-md text-center">
          {{ SITE.donate.reward }}
        </p>

        <a
          class="donate-revolut-link q-mb-md"
          :href="SITE.donate.revolutMeUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ SITE.donate.revolutMeUrl }}
        </a>

        <div class="donate-fields column">
          <button
            type="button"
            class="donate-copy-field"
            @click="copyField('Recipient name', SITE.donate.recipientName)"
          >
            <span class="donate-copy-field__meta">
              <span class="donate-copy-field__label">Recipient name</span>
              <span class="donate-copy-field__value">{{ SITE.donate.recipientName }}</span>
            </span>
            <q-icon name="content_copy" size="20px" class="donate-copy-field__icon" />
          </button>

          <button
            type="button"
            class="donate-copy-field"
            @click="copyField('IBAN', SITE.donate.ibanCopyValue)"
          >
            <span class="donate-copy-field__meta">
              <span class="donate-copy-field__label">IBAN</span>
              <span class="donate-copy-field__value">{{ SITE.donate.iban }}</span>
            </span>
            <q-icon name="content_copy" size="20px" class="donate-copy-field__icon" />
          </button>

          <button
            type="button"
            class="donate-copy-field"
            @click="copyField('Transfer reference', SITE.donate.transferReference)"
          >
            <span class="donate-copy-field__meta">
              <span class="donate-copy-field__label">Transfer reference</span>
              <span class="donate-copy-field__value">{{ SITE.donate.transferReference }}</span>
            </span>
            <q-icon name="content_copy" size="20px" class="donate-copy-field__icon" />
          </button>
        </div>

        <button
          type="button"
          class="donate-purpose-btn"
          @click="purposeOpen = true"
        >
          {{ SITE.donate.purposeHelpLabel }}
        </button>
      </section>
    </div>

    <q-dialog
      v-model="purposeOpen"
      class="donate-purpose-dlg"
      no-refocus
    >
      <q-card flat bordered class="donate-purpose-card column no-wrap">
        <q-card-section class="donate-purpose-header row items-start no-wrap">
          <div class="col">
            <div class="donate-purpose-title">Donation transfer details</div>
            <div class="donate-purpose-subtitle">
              Use these details if your bank asks for full Revolut information.
            </div>
          </div>
          <q-btn
            flat
            round
            dense
            icon="close"
            class="donate-purpose-close"
            aria-label="Close"
            v-close-popup
          />
        </q-card-section>

        <q-separator class="donate-purpose-sep" />

        <q-card-section class="donate-purpose-body column q-gutter-y-sm">
          <button
            v-for="row in purposeRows"
            :key="row.label"
            type="button"
            class="donate-purpose-row"
            @click="copyField(row.label, row.copyValue)"
          >
            <span class="donate-purpose-row__meta">
              <span class="donate-purpose-row__label">{{ row.label }}</span>
              <span class="donate-purpose-row__value">{{ row.value }}</span>
            </span>
            <q-icon name="content_copy" size="18px" class="donate-purpose-row__icon" />
          </button>

          <p class="donate-purpose-footer q-mb-none q-mt-sm">
            If there are still problems - contact us
          </p>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import { copyToClipboard, useQuasar } from 'quasar'
import donateBgDesktopUrl from 'src/assets/donate-thank-you.png'
import donateBgMobileUrl from 'src/assets/donate-thank-you-mobile.png'
import { SITE } from 'src/constants/site'

const $q = useQuasar()
const purposeOpen = ref(false)

function donatePageStyle () {
  return { minHeight: '0' }
}

const purposeRows = computed(() => [
  { label: 'Bank', value: SITE.donate.bankName, copyValue: SITE.donate.bankName },
  { label: 'BIC / SWIFT', value: SITE.donate.bic, copyValue: SITE.donate.bic },
  { label: 'Bank address', value: SITE.donate.bankAddress, copyValue: SITE.donate.bankAddress },
  { label: 'Recipient name', value: SITE.donate.recipientName, copyValue: SITE.donate.recipientName },
  { label: 'Street', value: SITE.donate.street, copyValue: SITE.donate.street },
  { label: 'City', value: SITE.donate.city, copyValue: SITE.donate.city },
  { label: 'Country', value: SITE.donate.country, copyValue: SITE.donate.country },
  { label: 'IBAN', value: SITE.donate.iban, copyValue: SITE.donate.ibanCopyValue },
  {
    label: 'Transfer reference',
    value: SITE.donate.transferReference,
    copyValue: SITE.donate.transferReference
  },
  {
    label: 'Purpose code',
    value: `${SITE.donate.purposeCode} — ${SITE.donate.purposeCodeLabel}`,
    copyValue: SITE.donate.purposeCode
  }
])

async function copyField (label, value) {
  try {
    await copyToClipboard(value)
    $q.notify({
      type: 'positive',
      message: `${label} copied`,
      position: 'top',
      timeout: 1800
    })
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: `Could not copy ${label.toLowerCase()}.`,
      position: 'top'
    })
  }
}
</script>

<style scoped>
.donate-page {
  position: relative;
  isolation: isolate;
  width: 100%;
  /* Bleed under the transparent header so no dark strip appears above the image */
  margin-top: calc(-1 * var(--q-header-height, 64px));
  padding: 0;
  min-height: 0 !important;
  height: auto;
}

.donate-page__stage {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  width: 100%;
  min-height: 100svh;
  overflow: hidden;
  /* Typical dark tone from the artwork — fills space below the full image */
  background: #050b14;
}

.donate-page__media {
  grid-area: 1 / 1;
  position: relative;
  align-self: start;
  width: 100%;
  line-height: 0;
}

.donate-page__media picture {
  display: block;
  width: 100%;
}

.donate-page__blur-picture {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.donate-page__blur-picture .donate-page__bg--blur {
  width: 100%;
  height: 100%;
}

.donate-page__bg {
  display: block;
  width: 100%;
  height: auto;
  pointer-events: none;
  user-select: none;
}

.donate-page__bg--blur {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  filter: blur(1.75px);
  transform: scale(1.02);
  transform-origin: center top;
  mask-image: linear-gradient(
    to bottom,
    #000 0%,
    #000 60%,
    transparent 72%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    #000 0%,
    #000 60%,
    transparent 72%
  );
}

.donate-content {
  grid-area: 1 / 1;
  position: relative;
  z-index: 1;
  align-self: start;
  justify-self: center;
  width: min(calc(100% - 2.5rem), 420px);
  margin: calc(var(--q-header-height, 64px) + 0.5cm) auto 2rem;
  line-height: normal;
  padding: 0 0 1.5rem;
}

.donate-title {
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2.35rem);
  line-height: 1.15;
  color: #ffffff;
  text-align: center;
  text-shadow:
    0 2px 18px rgba(0, 0, 0, 0.75),
    0 0 24px rgba(0, 0, 0, 0.45);
}

.donate-intro,
.donate-reward {
  font-size: 0.98rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.92);
  text-shadow:
    0 2px 14px rgba(0, 0, 0, 0.8),
    0 1px 3px rgba(0, 0, 0, 0.9);
}

.donate-revolut-link {
  display: inline-block;
  max-width: 100%;
  font-size: 1.05rem;
  font-weight: 700;
  color: #a5f3fc;
  text-decoration: underline;
  text-underline-offset: 0.15em;
  text-align: center;
  word-break: break-all;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.8);
  transition: color 0.15s ease;
}

.donate-revolut-link:hover {
  color: #ffffff;
}

.donate-fields {
  width: min(100%, 280px);
  gap: 0.65rem;
}

.donate-copy-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  margin: 0;
  padding: 0.75rem 0.9rem;
  text-align: left;
  cursor: pointer;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(8, 16, 24, 0.42);
  backdrop-filter: blur(6px);
  color: inherit;
  font: inherit;
  transition:
    border-color 0.15s ease,
    background 0.15s ease,
    transform 0.15s ease;
}

.donate-copy-field:hover,
.donate-copy-field:focus-visible {
  outline: none;
  border-color: rgba(255, 255, 255, 0.55);
  background: rgba(8, 16, 24, 0.58);
}

.donate-copy-field:active {
  transform: scale(0.995);
}

.donate-copy-field__meta {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.donate-copy-field__label {
  color: rgba(165, 243, 252, 0.95);
  font-size: 0.72rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.donate-copy-field__value {
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 650;
  line-height: 1.3;
  word-break: break-word;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.55);
}

.donate-copy-field__icon {
  flex-shrink: 0;
  color: #a5f3fc;
}

.donate-purpose-btn {
  margin: 0.85rem 0 0;
  padding: 0.7rem 1.1rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(8, 16, 24, 0.55);
  backdrop-filter: blur(8px);
  color: #ffffff;
  font: inherit;
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.3;
  cursor: pointer;
  white-space: nowrap;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.7);
  transition:
    border-color 0.15s ease,
    background 0.15s ease;
}

.donate-purpose-btn:hover,
.donate-purpose-btn:focus-visible {
  outline: none;
  border-color: rgba(165, 243, 252, 0.7);
  background: rgba(8, 16, 24, 0.72);
}

.donate-purpose-card {
  width: min(100vw - 32px, 420px);
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(
    165deg,
    rgba(26, 44, 51, 0.98) 0%,
    rgba(19, 48, 49, 0.98) 42%,
    rgba(15, 36, 42, 0.99) 100%
  );
  border: 1px solid rgba(11, 195, 171, 0.35);
  box-shadow:
    0 0 0 1px rgba(3, 117, 204, 0.12),
    0 24px 56px rgba(10, 20, 24, 0.75);
}

.donate-purpose-header {
  padding: 1rem 1rem 0.75rem;
}

.donate-purpose-title {
  color: #ecfeff;
  font-size: 1.05rem;
  font-weight: 700;
}

.donate-purpose-subtitle {
  margin-top: 0.25rem;
  color: #5eead4;
  font-size: 0.8rem;
  line-height: 1.4;
}

.donate-purpose-close {
  color: #5eead4 !important;
  margin-top: -2px;
}

.donate-purpose-sep {
  background: rgba(11, 195, 171, 0.2);
  opacity: 1;
}

.donate-purpose-body {
  padding: 0.85rem 1rem 1.1rem;
}

.donate-purpose-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  margin: 0;
  padding: 0.55rem 0.7rem;
  text-align: left;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid rgba(11, 195, 171, 0.22);
  background: rgba(19, 48, 49, 0.45);
  color: inherit;
  font: inherit;
  transition:
    border-color 0.15s ease,
    background 0.15s ease;
}

.donate-purpose-row:hover,
.donate-purpose-row:focus-visible {
  outline: none;
  border-color: rgba(11, 195, 171, 0.55);
  background: rgba(3, 117, 204, 0.18);
}

.donate-purpose-row__meta {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.donate-purpose-row__label {
  color: #5eead4;
  font-size: 0.7rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.donate-purpose-row__value {
  color: #ecfeff;
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.35;
  word-break: break-word;
}

.donate-purpose-row__icon {
  flex-shrink: 0;
  color: #5eead4;
}

.donate-purpose-footer {
  color: #5eead4;
  font-size: 0.88rem;
  line-height: 1.45;
  text-align: center;
}
</style>
