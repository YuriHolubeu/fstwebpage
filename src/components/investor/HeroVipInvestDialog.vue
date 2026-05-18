<template>
  <q-dialog
    :model-value="modelValue"
    class="hero-signup-dlg hero-vip-invest-dlg"
    content-class="hero-vip-invest-dlg__inner"
    full-width
    no-refocus
    @update:model-value="$emit('update:modelValue', $event)"
    @before-hide="restorePageScroll()"
    @hide="restorePageScroll()"
  >
    <q-card
      flat
      bordered
      class="hero-signup-card hero-signup-card--wide column no-wrap"
      :style="vipDialogCardStyle"
    >
      <q-card-section class="hs-dialog-header row items-start no-wrap q-pa-lg">
        <div class="col">
          <div class="hs-title text-h6 text-weight-bold">VIP or invest</div>
          <div class="hs-subtitle text-caption">
            Choose how you would like to get involved.
          </div>
        </div>
        <q-btn flat round dense icon="close" class="hs-close" v-close-popup />
      </q-card-section>

      <q-separator class="hs-sep" />

      <q-card-section class="hs-form-body q-px-lg q-pb-lg">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-6">
            <form class="hs-option-panel hs-option-panel--vip column" @submit.prevent="submitVip">
              <h3 class="hs-option-title">Become a VIP user</h3>
              <div class="hs-option-copy">
                <p class="hs-option-text">
                  Get early access, first 3 months of application and priority support when we launch.
                </p>
                <p class="hs-option-text">
                  The idea is that users can pay $25 to receive the first four months of the application
                  with AI tools included, along with priority support once we launch. The paid version with
                  AI tools will cost $12 per month, while the free version will not include AI features.
                </p>
                <p class="hs-option-text">
                  At the moment, we do not yet have integrated payment processing. To get VIP access,
                  please submit the form, and we will contact you shortly with further details.
                </p>
                <p class="hs-option-text">
                  If you experience any issues, feel free to contact us at
                  <a :href="contactMailto" class="hs-option-link">{{ SITE.contactEmail }}</a>.
                </p>
              </div>
              <div class="hs-required-fields">
                <q-input
                  v-model="vipName"
                  outlined
                  dense
                  label="Your name *"
                  class="hs-field"
                  color="primary"
                  required
                  :error="Boolean(vipNameError)"
                  :error-message="vipNameError"
                />
                <q-input
                  v-model="vipEmail"
                  outlined
                  dense
                  type="email"
                  label="Email *"
                  class="hs-field"
                  color="primary"
                  required
                  :error="Boolean(vipEmailError)"
                  :error-message="vipEmailError"
                />
              </div>
              <q-input
                v-model="vipMessage"
                outlined
                type="textarea"
                autogrow
                label="Message to us (optional)"
                class="hs-field hs-message-field q-mb-md"
                color="primary"
              />
              <q-btn
                unelevated
                no-caps
                rounded
                type="submit"
                class="hs-btn-submit q-mt-auto"
                label="Join VIP"
                icon="workspace_premium"
                :loading="vipSubmitting"
                :disable="vipSubmitting || investorSubmitting"
              />
            </form>
          </div>

          <div class="col-12 col-sm-6">
            <form class="hs-option-panel hs-option-panel--invest column" @submit.prevent="submitInvest">
              <h3 class="hs-option-title">Invest with us</h3>
              <div class="hs-option-copy">
                <p class="hs-option-text">
                  Currently, we are in search of funding that will help us to develop a high-quality
                  application. We are open to discuss opportunities. Please, submit the form and we
                  will contact you as soon as possible.
                </p>
                <p class="hs-option-text">
                  If you experience any issues, feel free to contact us at
                  <a :href="contactMailto" class="hs-option-link">{{ SITE.contactEmail }}</a>.
                </p>
              </div>
              <div class="hs-required-fields">
                <q-input
                  v-model="investorName"
                  outlined
                  dense
                  label="Your name *"
                  class="hs-field"
                  color="primary"
                  required
                  :error="Boolean(investorNameError)"
                  :error-message="investorNameError"
                />
                <q-input
                  v-model="investorEmail"
                  outlined
                  dense
                  type="email"
                  label="Email *"
                  class="hs-field"
                  color="primary"
                  required
                  :error="Boolean(investorEmailError)"
                  :error-message="investorEmailError"
                />
              </div>
              <q-input
                v-model="investorMessage"
                outlined
                type="textarea"
                autogrow
                label="Message to us (optional)"
                class="hs-field hs-message-field q-mb-md"
                color="primary"
              />
              <q-btn
                unelevated
                no-caps
                rounded
                type="submit"
                class="hs-btn-submit q-mt-auto"
                label="Invest"
                icon="savings"
                :loading="investorSubmitting"
                :disable="vipSubmitting || investorSubmitting"
              />
            </form>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { restorePageScroll } from 'src/composables/useDialogScrollRestore'
import { SITE } from 'src/constants/site'
import {
  isHeroSignupStorageConfigured,
  saveInvestorSignup,
  saveVipSignup
} from 'src/services/hero-signups'

defineProps({
  modelValue: { type: Boolean, required: true }
})

const emit = defineEmits(['update:modelValue'])

const $q = useQuasar()

const vipDialogCardStyle = {
  width: 'min(calc(100vw - 48px), 1440px)',
  maxWidth: 'min(calc(100vw - 48px), 1440px)'
}

const contactMailto = `mailto:${SITE.contactEmail}`
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const vipName = ref('')
const vipEmail = ref('')
const vipMessage = ref('')
const vipNameError = ref('')
const vipEmailError = ref('')
const vipSubmitting = ref(false)

const investorName = ref('')
const investorEmail = ref('')
const investorMessage = ref('')
const investorNameError = ref('')
const investorEmailError = ref('')
const investorSubmitting = ref(false)

function validatePair (name, email, nameError, emailError) {
  nameError.value = ''
  emailError.value = ''
  if (!name.value.trim()) nameError.value = 'Name is required.'
  if (!email.value.trim()) {
    emailError.value = 'Email is required.'
  } else if (!emailPattern.test(email.value.trim())) {
    emailError.value = 'Use a valid email address.'
  }
  return !nameError.value && !emailError.value
}

async function submitVip () {
  if (!validatePair(vipName, vipEmail, vipNameError, vipEmailError)) return
  if (!isHeroSignupStorageConfigured()) {
    $q.notify({ type: 'negative', message: 'Supabase is not configured yet.', position: 'top' })
    return
  }

  vipSubmitting.value = true
  try {
    await saveVipSignup({
      name: vipName.value,
      email: vipEmail.value,
      message: vipMessage.value
    })
    vipName.value = ''
    vipEmail.value = ''
    vipMessage.value = ''
    $q.notify({ type: 'positive', message: 'VIP request received. Thank you!', position: 'top' })
  } catch (error) {
    console.error(error)
    $q.notify({ type: 'negative', message: 'Could not save your VIP request.', position: 'top' })
  } finally {
    vipSubmitting.value = false
  }
}

async function submitInvest () {
  if (!validatePair(investorName, investorEmail, investorNameError, investorEmailError)) return
  if (!isHeroSignupStorageConfigured()) {
    $q.notify({ type: 'negative', message: 'Supabase is not configured yet.', position: 'top' })
    return
  }

  investorSubmitting.value = true
  try {
    await saveInvestorSignup({
      name: investorName.value,
      email: investorEmail.value,
      message: investorMessage.value
    })
    investorName.value = ''
    investorEmail.value = ''
    investorMessage.value = ''
    $q.notify({ type: 'positive', message: 'Investment interest received. Thank you!', position: 'top' })
  } catch (error) {
    console.error(error)
    $q.notify({ type: 'negative', message: 'Could not save your investment interest.', position: 'top' })
  } finally {
    investorSubmitting.value = false
  }
}
</script>

<style scoped>
@import './hero-signup-dialog.css';
</style>

<style>
.hero-vip-invest-dlg .q-dialog__inner {
  width: 100%;
  max-width: 100%;
}

.hero-vip-invest-dlg__inner {
  width: min(calc(100vw - 48px), 1440px) !important;
  max-width: min(calc(100vw - 48px), 1440px) !important;
  margin-left: auto;
  margin-right: auto;
}

.hero-vip-invest-dlg .hs-title {
  font-size: 1.5rem;
  line-height: 1.3;
}

.hero-vip-invest-dlg .hs-subtitle {
  font-size: 1.05rem;
}

.hero-vip-invest-dlg .hs-option-title {
  font-size: 1.25rem;
}

.hero-vip-invest-dlg .hs-option-text,
.hero-vip-invest-dlg .hs-option-link {
  font-size: 1rem;
}

.hero-vip-invest-dlg .hs-field :deep(.q-field__native),
.hero-vip-invest-dlg .hs-field :deep(.q-field__input),
.hero-vip-invest-dlg .hs-field :deep(.q-field__label),
.hero-vip-invest-dlg .hs-field :deep(.q-field__messages),
.hero-vip-invest-dlg .hs-field :deep(.q-field__bottom) {
  font-size: 1rem;
}

.hero-vip-invest-dlg .hs-btn-submit,
.hero-vip-invest-dlg .hs-btn-cancel {
  font-size: 1rem;
}

.hero-vip-invest-dlg .hs-btn-submit :deep(.q-icon) {
  font-size: 1.25rem;
}
</style>
