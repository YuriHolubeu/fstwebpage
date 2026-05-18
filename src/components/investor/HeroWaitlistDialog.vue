<template>
  <q-dialog
    :model-value="modelValue"
    class="hero-signup-dlg"
    no-refocus
    @update:model-value="$emit('update:modelValue', $event)"
    @before-hide="restorePageScroll()"
    @hide="restorePageScroll()"
  >
    <q-card flat bordered class="hero-signup-card column no-wrap">
      <q-card-section class="hs-dialog-header row items-start no-wrap q-pa-lg">
        <div class="col">
          <div class="hs-title text-h6 text-weight-bold">Join waitlist</div>
          <div class="hs-subtitle text-caption">
            Be first to know when the app launches.
          </div>
        </div>
        <q-btn
          flat
          round
          dense
          icon="close"
          class="hs-close"
          v-close-popup
        />
      </q-card-section>

      <q-separator class="hs-sep" />

      <q-card-section class="hs-form-body q-px-lg q-pb-md">
        <div class="hs-required-fields">
          <q-input
            v-model="name"
            outlined
            dense
            label="Your name *"
            class="hs-field"
            color="primary"
            required
            :error="Boolean(nameError)"
            :error-message="nameError"
          />
          <q-input
            v-model="email"
            outlined
            dense
            type="email"
            label="Email *"
            hint="yourmail@mail.com"
            class="hs-field"
            color="primary"
            required
            :error="Boolean(emailError)"
            :error-message="emailError"
          />
        </div>
        <q-input
          v-model="message"
          outlined
          type="textarea"
          autogrow
          label="Message to us (optional)"
          class="hs-field hs-message-field"
          color="primary"
        />
      </q-card-section>

      <q-card-actions align="right" class="q-px-lg q-pb-lg q-pt-sm">
        <q-btn flat no-caps rounded label="Cancel" class="hs-btn-cancel" v-close-popup />
        <q-btn
          unelevated
          no-caps
          rounded
          class="hs-btn-submit"
          label="Join waitlist"
          icon="how_to_reg"
          :loading="isSubmitting"
          :disable="isSubmitting"
          @click="submit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { restorePageScroll } from 'src/composables/useDialogScrollRestore'
import {
  isHeroSignupStorageConfigured,
  saveWaitlistSignup
} from 'src/services/hero-signups'

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
const isSubmitting = ref(false)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate () {
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

function reset () {
  name.value = ''
  email.value = ''
  message.value = ''
  nameError.value = ''
  emailError.value = ''
}

async function submit () {
  if (!validate()) return
  if (!isHeroSignupStorageConfigured()) {
    $q.notify({ type: 'negative', message: 'Supabase is not configured yet.', position: 'top' })
    return
  }

  isSubmitting.value = true
  try {
    await saveWaitlistSignup({
      name: name.value,
      email: email.value,
      message: message.value
    })
    reset()
    emit('update:modelValue', false)
    $q.notify({ type: 'positive', message: 'You are on the waitlist. Thank you!', position: 'top' })
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: 'Could not save your signup. Please try again.',
      position: 'top'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
@import './hero-signup-dialog.css';
</style>
