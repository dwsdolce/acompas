import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ContextOption } from 'src/utils/types'

export const useContextStore = defineStore('context', () => {
  const options = ref([
    { label: 'Flamenco', value: 'flamenco' },
    { label: 'Jazz', value: 'jazz' },
    { label: 'Rock', value: 'rock' },
    { label: 'Samba', value: 'samba' },
    { label: 'Salsa', value: 'salsa' },
    { label: 'Soca', value: 'soca' },
    { label: 'Swing', value: 'swing' },
    { label: 'Waltz', value: 'waltz' },
    { label: 'Zarabanda', value: 'zarabanda' }
  ])

  const context = ref<ContextOption>(options.value[0])

  const setContext = (payload: ContextOption) => {
    context.value = payload
  }

  return {
    context,
    options,
    setContext
  }
})
