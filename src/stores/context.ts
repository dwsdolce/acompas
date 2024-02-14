import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { colors, setCssVar } from 'quasar'
import type { ContextOption } from 'src/utils/types'
import { on } from 'events'

export const useContextStore = defineStore('context', () => {
  const { getPaletteColor } = colors

  const options = ref<ContextOption[]>([
    { label: 'Flamenco', value: 'flamenco', colors: { primary: 'red-7', secondary: 'red-10' }},
    { label: 'Afro-Cuban', value: 'afro-cuban', colors: { primary: 'amber-7', secondary: 'amber-10' }},
    { label: 'Afro-Brazilian', value: 'afro-brazilian', colors: { primary: 'indigo-7', secondary: 'indigo-10' }},
    { label: 'Fundamental Global', value: 'fundamental-global', colors: { primary: 'blue-7', secondary: 'blue-10' }},
    { label: 'Ternary African', value: 'ternary-african', colors: { primary: 'green-7', secondary: 'green' }}
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
