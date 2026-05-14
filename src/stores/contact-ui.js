import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useContactUiStore = defineStore('contact-ui', () => {
  const dialogOpen = ref(false)

  function openDialog () {
    dialogOpen.value = true
  }

  function closeDialog () {
    dialogOpen.value = false
  }

  return { dialogOpen, openDialog, closeDialog }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useContactUiStore, import.meta.hot))
}
