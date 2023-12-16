import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { colors, setCssVar } from 'quasar'
import type { ContextOption } from 'src/utils/types'
import { on } from 'events'

export const useContextStore = defineStore('context', () => {
  const { getPaletteColor } = colors

  console.log('useContextStore', getPaletteColor('primary'))
  const options = ref<ContextOption[]>([
    { label: 'Flamenco', value: 'flamenco', colors: { primary: getPaletteColor('red-7'), secondary: getPaletteColor('red-10') }},
    { label: 'Jazz', value: 'jazz', colors: { primary: getPaletteColor('purple-7'), secondary: getPaletteColor('purple-10') }},
    { label: 'Rock', value: 'rock', colors: { primary: getPaletteColor('indigo-7'), secondary: getPaletteColor('indigo-10') }},
    { label: 'Samba', value: 'samba', colors: { primary: getPaletteColor('blue-7'), secondary: getPaletteColor('blue-10') }},
    { label: 'Salsa', value: 'salsa', colors: { primary: getPaletteColor('light-blue-7'), secondary: getPaletteColor('light-blue-10') }},
    { label: 'Soca', value: 'soca', colors: { primary: getPaletteColor('teal-7'), secondary: getPaletteColor('teal-10') }},
    { label: 'Swing', value: 'swing', colors: { primary: getPaletteColor('green-7'), secondary: getPaletteColor('green-10') }},
    { label: 'Waltz', value: 'waltz', colors: { primary: getPaletteColor('amber-7'), secondary: getPaletteColor('amber-10') }},
    { label: 'Zarabanda', value: 'zarabanda', colors: { primary: getPaletteColor('lime-7'), secondary: getPaletteColor('lime-10') }}
  ])

  const context = ref<ContextOption>({} as ContextOption)

  const setContext = (payload?: ContextOption) => {
    if (!payload) payload = options.value[0]
    context.value = payload
    setCssVar('primary', payload.colors?.primary)
    setCssVar('secondary', payload.colors?.secondary)
    console.log('useContextStore', getPaletteColor('primary'))

  }

  onMounted(() => {
    console.log('onUnmounted')
    setContext(options.value[0])
  })

  return {
    context,
    options,
    setContext
  }
})
