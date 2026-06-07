import { ref, watch, computed, onMounted } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { Screen, Dialog, is } from 'quasar'
import { useStorage } from '@vueuse/core'
import { useMatomo } from 'src/composables/matomo'
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
  const visualizationModes = ref([
    { label: 'Dots', value: 'dots' },
    { label: 'Counter', value: 'counter' },
    { label: 'Clock', value: 'clock' }
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

  onMounted(() => {
    if (trackingEnabled.value) {
      initializeTracking()
    }
  })

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
