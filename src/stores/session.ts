import { ref, watch, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { Screen, Dialog, is } from 'quasar'
import { useStorage } from '@vueuse/core'
import { useMatomo } from 'src/composables/matomo'
import { t } from 'src/boot/i18n'
import type { Size, SessionState } from 'src/utils/types'

export const useSessionStore = defineStore('session', () => {
  const {
    initMatomo,
    deleteMatomo,
  } = useMatomo()

  const isUpToDatev4 = useStorage('is-up-to-date-v4', ref<boolean>(false))
  const trackingEnabled = useStorage('tracking-enabled', ref<boolean>(false))
  const trackingInitialized = useStorage('tracking-initialized', ref<boolean>(false))
  const trackingChosen = useStorage('tracking-chosen', ref<boolean>(false))
  const isDarkMode = useStorage('is-dark-mode', ref<boolean>(true))
  // Manual audio/visual calibration (ms) added on top of the auto-detected
  // output latency. Lets users compensate Bluetooth delay that the browser
  // under-reports via AudioContext.outputLatency.
  const audioVisualOffset = useStorage('audio-visual-offset', ref<number>(0))
  const leftDrawerOpen = ref<boolean>(Screen.gt.md)
  const visualizationSize = ref<Size>({ width: null, height: null })
  // Computed rather than a plain ref so the labels follow the locale: a ref
  // would be built once, at whatever language the app started in, and then
  // stay in English for the rest of the session.
  const visualizationModes = computed(() => [
    { label: t('doc.visualizationModes.dots'), value: 'dots' },
    { label: t('doc.visualizationModes.counter'), value: 'counter' },
    { label: t('doc.visualizationModes.clock'), value: 'clock' }
  ])
  const selectedVisualizationMode = useStorage('visualization-mode', ref('dots'))

  const visualizationMode = computed({
    get: () => selectedVisualizationMode.value,
    set: (value: string) => {
      selectedVisualizationMode.value = value
    }
  })

  const toggleTrackVisits = (v: boolean) => {
    v ? enableTrackVisits() : disableTrackVisits()
  }

  const enableTrackVisits = () => {
    if (!trackingEnabled.value) trackingEnabled.value = true
    initMatomo()
  }

  const disableTrackVisits = () => {
     if (trackingEnabled.value) trackingEnabled.value = false
    deleteMatomo()
  }

  const initializeTracking = () => {
    if (!trackingInitialized.value) trackingInitialized.value = true
    initMatomo()
  }

  const enableTrackingChosen = () => {
    trackingChosen.value = true
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
  }

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

  const setVisualizationSize = (payload: Size) => {
    visualizationSize.value = payload
  }

  // No onMounted here. The watcher below is immediate, so it already runs
  // initializeTracking() when the store is created and tracking is on - an
  // onMounted doing the same thing fired a second time once the component
  // mounted, initialising Matomo twice. It also tied initialisation to the
  // store first being used inside a component: created anywhere else, from a
  // test or a boot file, the hook never ran and Vue warned that there was no
  // instance to attach it to.
  watch(trackingEnabled, (value) => {
    if (value) {
      initializeTracking()
    } else {
      deleteMatomo()
    }
  }, { immediate: true })

  return {
    isUpToDatev4,
    trackingEnabled,
    trackingInitialized,
    trackingChosen,
    isDarkMode,
    audioVisualOffset,
    leftDrawerOpen,
    visualizationSize,
    visualizationModes,
    selectedVisualizationMode,
    visualizationMode,
    toggleTrackVisits,
    enableTrackVisits,
    disableTrackVisits,
    initializeTracking,
    enableTrackingChosen,
    toggleDarkMode,
    toggleLeftDrawer,
    setVisualizationSize
  }
})
