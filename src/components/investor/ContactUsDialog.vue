<template>
  <q-dialog
    :model-value="modelValue"
    class="contact-dlg"
    no-refocus
    @update:model-value="$emit('update:modelValue', $event)"
    @before-hide="contact.restorePageScroll()"
    @hide="contact.restorePageScroll()"
  >
    <q-card
      flat
      bordered
      class="contact-card column no-wrap"
      :style="contactCardStyle"
    >
      <q-card-section class="contact-header row items-start no-wrap">
        <div class="col">
          <div class="cd-title text-h6 text-weight-bold">Contact us</div>
          <div class="cd-subtitle text-caption q-mt-xs">
            We typically reply within one business day.
          </div>
        </div>
        <q-btn
          flat
          round
          dense
          icon="close"
          class="cd-close"
          v-close-popup
          @click="$emit('update:modelValue', false)"
        />
      </q-card-section>

      <q-separator class="cd-sep" />

      <q-card-section class="contact-body">
        <div class="contact-fields">
        <q-input
          v-model="name"
          outlined
          dense
          label="Your name *"
          class="cd-field"
          color="primary"
          :error="Boolean(nameError)"
          :error-message="nameError"
        />
        <q-input
          v-model="email"
          outlined
          dense
          type="email"
          label="Email *"
          class="cd-field"
          color="primary"
          :error="Boolean(emailError)"
          :error-message="emailError"
        />
        <q-input
          v-model="message"
          outlined
          dense
          type="textarea"
          rows="3"
          label="How can we help? *"
          class="cd-field cd-field--message"
          color="primary"
          :error="Boolean(messageError)"
          :error-message="messageError"
        />
        </div>
        <div class="subscription-panel">
          <div class="subscription-title">I also want to</div>
          <div class="subscription-options">
            <q-checkbox
              v-model="selectedInterests"
              val="waitlist"
              class="cd-checkbox subscription-option"
              color="primary"
              label="Join the app waitlist"
            />
            <q-checkbox
              v-model="selectedInterests"
              val="vip"
              class="cd-checkbox subscription-option"
              color="primary"
              label="Become a VIP user"
            />
            <q-checkbox
              v-model="selectedInterests"
              val="newsletter"
              class="cd-checkbox subscription-option"
              color="primary"
              label="Subscribe to the newsletter"
            />
            <q-checkbox
              v-model="selectedInterests"
              val="sponsor"
              class="cd-checkbox subscription-option"
              color="primary"
              label="Sponsor project"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="contact-actions col-auto">
        <q-btn
          flat
          no-caps
          rounded
          label="Cancel"
          class="cd-btn-cancel"
          v-close-popup
        />
        <q-btn
          unelevated
          no-caps
          rounded
          class="cd-btn-submit"
          label="Send"
          icon="send"
          :loading="isSubmitting"
          :disable="isSubmitting"
          @click="sendContactMessage"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import {
  isContactStorageConfigured,
  saveContactMessage
} from 'src/services/contact-messages'
import {
  INTEREST_LABELS,
  isAudienceStorageConfigured,
  notifyAudienceSignup,
  saveAudienceSubscriptions
} from 'src/services/audience-subscriptions'
import { useContactUiStore } from 'src/stores/contact-ui'

function formatFailedInterests (errors) {
  return errors
    .map((entry) => INTEREST_LABELS[entry.interest] || entry.interest)
    .join(', ')
}

defineProps({
  modelValue: { type: Boolean, required: true }
})

const emit = defineEmits(['update:modelValue'])

const $q = useQuasar()
const contact = useContactUiStore()

const name = ref('')
const email = ref('')
const message = ref('')
const selectedInterests = ref([])
const nameError = ref('')
const emailError = ref('')
const messageError = ref('')
const isSubmitting = ref(false)

const contactCardStyle = {
  width: 'min(calc(100vw - 32px), calc(616px + 2cm))',
  maxWidth: 'min(calc(100vw - 32px), calc(616px + 2cm))'
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateForm () {
  nameError.value = ''
  emailError.value = ''
  messageError.value = ''

  if (!name.value.trim()) {
    nameError.value = 'Name is required.'
  }

  if (!email.value.trim()) {
    emailError.value = 'Email is required.'
  } else if (!emailPattern.test(email.value.trim())) {
    emailError.value = 'Use a valid email address.'
  }

  if (!message.value.trim()) {
    messageError.value = 'Message is required.'
  }

  return !nameError.value && !emailError.value && !messageError.value
}

function resetForm () {
  name.value = ''
  email.value = ''
  message.value = ''
  selectedInterests.value = []
  nameError.value = ''
  emailError.value = ''
  messageError.value = ''
}

async function sendContactMessage () {
  if (!validateForm()) return

  if (!isContactStorageConfigured()) {
    $q.notify({
      type: 'negative',
      message: 'Supabase is not configured yet.',
      position: 'top'
    })
    return
  }

  if (selectedInterests.value.length > 0 && !isAudienceStorageConfigured()) {
    $q.notify({
      type: 'negative',
      message: 'Subscription storage is not configured yet.',
      position: 'top'
    })
    return
  }

  isSubmitting.value = true

  try {
    await saveContactMessage({
      name: name.value,
      email: email.value,
      message: message.value
    })

    let savedInterests = []
    let subscriptionErrors = []

    if (selectedInterests.value.length > 0) {
      const result = await saveAudienceSubscriptions({
        name: name.value,
        email: email.value,
        message: message.value,
        sourcePath: window.location.pathname,
        interests: selectedInterests.value
      })
      savedInterests = result.saved
      subscriptionErrors = result.errors
    }

    if (subscriptionErrors.length > 0 && savedInterests.length === 0) {
      throw new Error(subscriptionErrors[0]?.message || 'Subscription save failed.')
    }

    await notifyAudienceSignup({
      name: name.value,
      email: email.value,
      message: message.value,
      sourcePath: window.location.pathname,
      interests: savedInterests
    })

    resetForm()
    emit('update:modelValue', false)

    if (subscriptionErrors.length > 0 && savedInterests.length > 0) {
      $q.notify({
        type: 'warning',
        message: `Saved partially. Could not store: ${formatFailedInterests(subscriptionErrors)}.`,
        position: 'top',
        timeout: 8000
      })
      return
    }

    if (subscriptionErrors.length > 0) {
      $q.notify({
        type: 'warning',
        message: `Message sent, but could not store: ${formatFailedInterests(subscriptionErrors)}.`,
        position: 'top',
        timeout: 8000
      })
      return
    }

    $q.notify({
      type: 'positive',
      message: savedInterests.length
        ? 'Thanks, your subscription was saved.'
        : 'Thanks, your message was sent.',
      position: 'top'
    })
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: error?.message?.includes('Failed')
        ? 'Could not send your message. Please try again.'
        : (error?.message || 'Could not send your message. Please try again.'),
      position: 'top'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-card {
  --cd-scale: 1.4;
  --cd-high: #ecfeff;
  --cd-body: var(--site-text-body);
  --cd-muted: #5eead4;
  --cd-soft: #2dd4bf;
  --cd-field-bg: rgba(19, 48, 49, 0.55);
  --cd-border: rgba(11, 195, 171, 0.32);
  --cd-border-soft: rgba(3, 117, 204, 0.22);
  --cd-pad-x: calc(1.5rem * var(--cd-scale));
  --cd-pad-y: calc(0.5rem * var(--cd-scale));

  width: min(calc(100vw - 32px), calc(616px + 2cm)) !important;
  max-width: min(calc(100vw - 32px), calc(616px + 2cm)) !important;
  max-height: none;
  border-radius: calc(18px * var(--cd-scale));
  overflow: hidden;
  background: linear-gradient(
    165deg,
    rgba(26, 44, 51, 0.98) 0%,
    rgba(19, 48, 49, 0.98) 42%,
    rgba(15, 36, 42, 0.99) 100%
  );
  border: 1px solid var(--cd-border);
  box-shadow:
    0 0 0 1px rgba(3, 117, 204, 0.12),
    0 24px 56px rgba(10, 20, 24, 0.75),
    0 0 80px rgba(11, 195, 171, 0.12);
}

.cd-title {
  color: var(--cd-high);
  letter-spacing: 0.02em;
}

.cd-subtitle {
  color: var(--cd-muted);
  line-height: 1.45;
  white-space: nowrap;
}

@media (max-width: 380px) {
  .cd-subtitle {
    white-space: normal;
    font-size: 0.72rem;
  }
}

.contact-header {
  padding: calc(1rem * var(--cd-scale)) var(--cd-pad-x) calc(0.5rem * var(--cd-scale));
}

.contact-body {
  flex: 0 1 auto;
  overflow: visible;
  padding: var(--cd-pad-y) var(--cd-pad-x);
}

.contact-actions {
  flex: 0 0 auto;
  border-top: 1px solid rgba(11, 195, 171, 0.14);
  background: rgba(19, 48, 49, 0.96);
  padding: calc(0.35rem * var(--cd-scale)) var(--cd-pad-x) calc(1rem * var(--cd-scale));
}

.cd-close {
  color: var(--cd-muted) !important;
  margin-top: -4px;
}

.cd-close:hover :deep(.q-focus-helper) {
  background: rgba(11, 195, 171, 0.15) !important;
}

.cd-sep {
  background: rgba(11, 195, 171, 0.2);
  opacity: 1;
}

.contact-fields {
  display: flex;
  flex-direction: column;
  gap: calc(0.3rem * var(--cd-scale));
}

.contact-fields :deep(.q-field) {
  margin-bottom: 0;
  padding-bottom: 0;
}

/* ---- Form fields ---- */
.cd-field :deep(.q-field__control) {
  color: var(--cd-high);
  background: var(--cd-field-bg);
  border-radius: 12px;
}

.cd-field :deep(.q-field__native),
.cd-field :deep(.q-field__input) {
  color: var(--cd-high) !important;
  caret-color: #5eead4;
}

.cd-field :deep(.q-field__native)::placeholder {
  color: rgba(94, 234, 212, 0.5);
}

.cd-field :deep(.q-field__label) {
  color: var(--cd-soft) !important;
}

.cd-field :deep(.q-field--float .q-field__label),
.cd-field :deep(.q-field--highlighted .q-field__label) {
  color: var(--cd-muted) !important;
}

.cd-field :deep(.q-field__marginal) {
  color: var(--cd-soft);
}

.cd-field :deep(.q-field--outlined .q-field__control:before) {
  border-color: var(--cd-border-soft) !important;
}

.cd-field :deep(.q-field--outlined:hover .q-field__control:before) {
  border-color: rgba(11, 195, 171, 0.4) !important;
}

.cd-field :deep(.q-field--outlined.q-field--focused .q-field__control:before) {
  border-color: #0bc3ab !important;
}

.cd-field :deep(.q-field--outlined.q-field--focused .q-field__control:after) {
  border-color: transparent !important;
}

.cd-field--message :deep(textarea.q-field__native) {
  min-height: calc(88px * var(--cd-scale));
  line-height: 1.4;
}

.cd-field--message :deep(.q-field__control) {
  min-height: calc(88px * var(--cd-scale));
  align-items: flex-start;
}

.subscription-panel {
  margin-top: calc(0.65rem * var(--cd-scale));
  padding: calc(0.75rem * var(--cd-scale)) calc(0.85rem * var(--cd-scale));
  border-radius: calc(10px * var(--cd-scale));
  background: rgba(5, 20, 28, 0.28);
}

.subscription-title {
  margin-bottom: calc(0.55rem * var(--cd-scale));
  color: var(--cd-muted);
  font-size: calc(11px * var(--cd-scale));
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.subscription-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(0.5rem * var(--cd-scale));
}

.cd-checkbox {
  color: var(--cd-high);
  font-weight: 700;
}

.subscription-option {
  min-height: 0;
  padding: calc(0.28rem * var(--cd-scale)) calc(0.42rem * var(--cd-scale));
  border: 1px solid rgba(94, 234, 212, 0.12);
  border-radius: calc(8px * var(--cd-scale));
  background: rgba(204, 251, 241, 0.04);
}

.subscription-option :deep(.q-checkbox__label) {
  font-size: calc(0.78rem * var(--cd-scale));
  line-height: 1.3;
}

.subscription-option :deep(.q-checkbox__inner) {
  font-size: calc(1.15rem * var(--cd-scale));
  width: calc(1.15rem * var(--cd-scale));
  min-width: calc(1.15rem * var(--cd-scale));
  height: calc(1.15rem * var(--cd-scale));
}

.cd-checkbox :deep(.q-checkbox__label) {
  color: var(--cd-high);
}

.cd-checkbox :deep(.q-checkbox__inner) {
  color: var(--cd-soft);
}

/* ---- Buttons ---- */
.cd-btn-cancel {
  color: var(--cd-muted) !important;
  font-weight: 600;
}

.cd-btn-cancel:hover :deep(.q-focus-helper) {
  background: rgba(11, 195, 171, 0.12) !important;
}

.cd-btn-submit {
  padding: 8px 18px;
  font-weight: 600;
  color: var(--site-text-high) !important;
  background: linear-gradient(135deg, #0bc3ab 0%, #0375cc 48%, #0660a8 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    0 6px 20px rgba(3, 117, 204, 0.4);
  text-shadow: 0 1px 2px rgba(19, 48, 49, 0.4);
}

.cd-btn-submit :deep(.q-btn__wrapper) {
  color: var(--site-text-high) !important;
}

.cd-btn-submit :deep(.q-icon) {
  color: var(--site-text-body) !important;
}

.cd-btn-submit:hover :deep(.q-focus-helper) {
  opacity: 0.14 !important;
}
</style>

<style>
.contact-dlg .q-dialog__inner > div {
  width: min(calc(100vw - 32px), calc(616px + 2cm)) !important;
  max-width: min(calc(100vw - 32px), calc(616px + 2cm)) !important;
}

.contact-dlg .contact-card {
  width: min(calc(100vw - 32px), calc(616px + 2cm)) !important;
  max-width: min(calc(100vw - 32px), calc(616px + 2cm)) !important;
}
</style>
