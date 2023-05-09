import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { Screen } from 'quasar'
import { useStorage } from '@vueuse/core'
import { useMatomo } from 'src/composables/matomo'
import type { Size, SessionState } from 'src/composables/models'

export const useSessionStore = defineStore('session', () => {
  const {
    init: initMatomo,
    deleteScript : deleteMatomo,
    scriptExists: matomoExists,
  } = useMatomo()
  const trackingEnabled = useStorage('tracking-enabled', ref<boolean>(false))
  const trackingInitialized = useStorage('tracking-initialized', ref<boolean>(false))
  const trackingChosen = useStorage('tracking-chosen', ref<boolean>(false))
  const privacyDialogOpen = ref<boolean>(false)
  const dialogOpen = ref<boolean>(false)
  const leftDrawerOpen = ref<boolean>(Screen.gt.md)
  const visualizationSize = ref<Size>({ width: null, height: null })

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

  const openPrivacyDialog = () => {
    privacyDialogOpen.value = true
  }

  const closePrivacyDialog = () => {
    privacyDialogOpen.value = false
  }

  const toggleDialog = (payload: boolean) => {
    dialogOpen.value = payload
  }

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

  const setVisualizationSize = (payload: Size) => {
    visualizationSize.value = payload
  }

  // watch(trackingEnabled, (value) => {
  //   if (value) {
  //     initializeTracking()
  //   }
  // }, { immediate: true })

  return {
    trackingEnabled,
    trackingInitialized,
    trackingChosen,
    privacyDialogOpen,
    dialogOpen,
    leftDrawerOpen,
    visualizationSize,

    toggleTrackVisits,
    enableTrackVisits,
    disableTrackVisits,
    initializeTracking,
    enableTrackingChosen,
    openPrivacyDialog,
    closePrivacyDialog,
    toggleDialog,
    toggleLeftDrawer,
    setVisualizationSize
  }
})
