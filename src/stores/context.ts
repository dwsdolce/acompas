import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { colors, setCssVar } from 'quasar'
import type { ContextOption } from 'src/utils/types'
import { on } from 'events'

export const useContextStore = defineStore('context', () => {
  const { getPaletteColor } = colors

  console.log('useContextStore', getPaletteColor('primary'))
  const options = ref<ContextOption[]>([
    { label: 'Flamenco', value: 'flamenco', colors: { primary: 'red-7', secondary: 'red-10' }},
    { label: 'Jazz', value: 'jazz', colors: { primary: 'purple-7', secondary: 'purple-10' }},
    { label: 'Rock', value: 'rock', colors: { primary: 'indigo-7', secondary: 'indigo-10' }},
    { label: 'Samba', value: 'samba', colors: { primary: 'blue-7', secondary: 'blue-10' }},
    { label: 'Salsa', value: 'salsa', colors: { primary: 'light-blue-7', secondary: 'light-blue-10' }},
    { label: 'Soca', value: 'soca', colors: { primary: 'teal-7', secondary: 'teal-10' }},
    { label: 'Swing', value: 'swing', colors: { primary: 'green-7', secondary: 'green-10' }},
    { label: 'Waltz', value: 'waltz', colors: { primary: 'amber-7', secondary: 'amber-10' }},
    { label: 'Zarabanda', value: 'zarabanda', colors: { primary: 'lime-7', secondary: 'lime-10' }}
  ])

  const context = ref<ContextOption>({} as ContextOption)

  const setContext = (payload?: ContextOption) => {
    if (!payload) payload = options.value[0]
    context.value = payload
    setCssVar('primary', getPaletteColor(payload.colors?.primary))
    setCssVar('secondary', getPaletteColor(payload.colors?.secondary))
  }

  onMounted(() => {
    setContext(options.value[0])
  })

  return {
    context,
    options,
    setContext
  }
})
