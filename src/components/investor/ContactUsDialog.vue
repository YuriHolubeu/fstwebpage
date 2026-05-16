<template>
  <q-dialog
    :model-value="modelValue"
    class="contact-dlg"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-card flat bordered class="contact-card">
      <q-card-section class="contact-header row items-start no-wrap q-pa-lg q-pb-md">
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

      <q-card-section class="q-px-lg q-pt-lg q-gutter-md">
        <q-input
          v-model="name"
          outlined
          dense
          label="Your name and surname"
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
          label="Work email"
          hint="yourmail@mail.com"
          class="cd-field"
          color="primary"
          :error="Boolean(emailError)"
          :error-message="emailError"
        />
        <q-input
          v-model="message"
          outlined
          type="textarea"
          autogrow
          label="How can we help?"
          class="cd-field"
          color="primary"
          :error="Boolean(messageError)"
          :error-message="messageError"
        />
      </q-card-section>

      <q-card-actions align="right" class="contact-actions q-px-lg q-pb-lg q-pt-sm">
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

defineProps({
  modelValue: { type: Boolean, required: true }
})

const emit = defineEmits(['update:modelValue'])

const $q = useQuasar()

const name = ref('')
const email = ref('')
const message = ref('')
const nameError = ref('')
const emailError = ref('')
const messageError = ref('')
const isSubmitting = ref(false)

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const fullNamePattern = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*\s+[A-Za-z]+(?:[ '-][A-Za-z]+)*$/

function validateForm () {
  nameError.value = ''
  emailError.value = ''
  messageError.value = ''

  if (!name.value.trim()) {
    nameError.value = 'Name and surname are required.'
  } else if (!fullNamePattern.test(name.value.trim())) {
    nameError.value = 'Use Name Surname format.'
  }

  if (!email.value.trim()) {
    emailError.value = 'Email is required.'
  } else if (!emailPattern.test(email.value.trim())) {
    emailError.value = 'Use email format yourmail@mail.com.'
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

  isSubmitting.value = true

  try {
    await saveContactMessage({
      name: name.value,
      email: email.value,
      message: message.value
    })

    resetForm()
    emit('update:modelValue', false)
    $q.notify({
      type: 'positive',
      message: 'Thanks, your message was sent.',
      position: 'top'
    })
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: 'Could not send your message. Please try again.',
      position: 'top'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-card {
  --cd-high: #ecfeff;
  --cd-body: #cffafe;
  --cd-muted: #5eead4;
  --cd-soft: #2dd4bf;
  --cd-field-bg: rgba(19, 48, 49, 0.55);
  --cd-border: rgba(11, 195, 171, 0.32);
  --cd-border-soft: rgba(3, 117, 204, 0.22);

  width: min(100vw - 32px, 440px);
  border-radius: 18px;
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
  max-width: 17rem;
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

.contact-actions {
  border-top: 1px solid rgba(11, 195, 171, 0.14);
  background: rgba(19, 48, 49, 0.35);
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
  border-color: rgba(3, 117, 204, 0.55) !important;
  box-shadow: 0 0 0 1px rgba(3, 117, 204, 0.22);
}

.cd-field :deep(.q-field--outlined.q-field--focused .q-field__control:after) {
  border-width: 2px !important;
  border-color: #0bc3ab !important;
}

.cd-field :deep(textarea.q-field__native) {
  min-height: 88px;
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
  color: #ecfeff !important;
  background: linear-gradient(135deg, #0bc3ab 0%, #0375cc 48%, #0660a8 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    0 6px 20px rgba(3, 117, 204, 0.4);
  text-shadow: 0 1px 2px rgba(19, 48, 49, 0.4);
}

.cd-btn-submit :deep(.q-btn__wrapper) {
  color: #ecfeff !important;
}

.cd-btn-submit :deep(.q-icon) {
  color: #cffafe !important;
}

.cd-btn-submit:hover :deep(.q-focus-helper) {
  opacity: 0.14 !important;
}
</style>
