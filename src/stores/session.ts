import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Screen } from 'quasar'
import { useStorage } from '@vueuse/core'
import { useMatomo } from 'src/composables/matomo'
import type { Size, SessionState } from 'src/composables/models'

export const useSessionStore = defineStore('session', () => {
  const { initPiwik } = useMatomo()

  const trackVisits = useStorage('track-visits', ref<boolean>(false))
  const trackingInitialized = useStorage('tracking-initialized', ref<boolean>(false))
  const trackingChosen = useStorage('tracking-chosen', ref<boolean>(false))
  const privacyDialogOpen = ref<boolean>(false)
  const dialogOpen = ref<boolean>(false)
  const leftDrawerOpen = ref<boolean>(Screen.gt.md)
  const visualizationSize = ref<Size>({ width: null, height: null })

  const toggleTrackVisits = () => {
    trackVisits.value = !trackVisits.value
    if (!trackingInitialized.value && trackVisits.value) {
      initializeTracking()
    }
  }

  const enableTrackVisits = () => {
    trackVisits.value = true
    if (!trackingInitialized.value) {
      initializeTracking()
    }
  }

  const disableTrackVisits = () => {
    trackVisits.value = false
  }

  const initializeTracking = () => {
    trackingInitialized.value = true
    initPiwik()
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

  return {
    trackVisits,
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
