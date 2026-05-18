import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import { capturePageScroll, restorePageScroll } from 'src/composables/useDialogScrollRestore'

export const useContactUiStore = defineStore('contact-ui', () => {
  const dialogOpen = ref(false)

  function openDialog () {
    capturePageScroll()
    dialogOpen.value = true
  }

  function closeDialog () {
    dialogOpen.value = false
  }

  return { dialogOpen, openDialog, closeDialog, restorePageScroll }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useContactUiStore, import.meta.hot))
}
