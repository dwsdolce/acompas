import { defineStore } from 'pinia'
import { Screen } from 'quasar'
import type { Size } from 'src/composables/models'

interface State {
  trackVisits: boolean
  trackingInitialized: boolean
  trackingChosen: boolean
  privacyDialogOpen: boolean
  dialogOpen: boolean
  leftDrawerOpen: boolean,
  visualizationSize: Size,
}

export const useSessionStore = defineStore('session', {
  state: (): State => ({
    trackVisits: false,
    trackingInitialized: false,
    trackingChosen: false,
    privacyDialogOpen: false,
    dialogOpen: false,
    leftDrawerOpen: Screen.gt.md,
    visualizationSize: { width: null, height: null }
  }),
  actions: {
    toggleTrackVisits() {
      this.trackVisits = !this.trackVisits
      if (!this.trackingInitialized && this.trackVisits) {
        this.trackingInitialized = true
      }
    },
    enableTrackVisits() {
      this.trackVisits = true
      if (!this.trackingInitialized) {
        this.trackingInitialized = true
      }
    },
    disableTrackVisits() {
      this.trackVisits = false
    },
    initializeTracking() {
      this.trackingInitialized = true
    },
    enableTrackingChosen() {
      this.trackingChosen = true
    },
    openPrivacyDialog() {
      this.privacyDialogOpen = true
    },
    closePrivacyDialog() {
      this.privacyDialogOpen = false
    },
    toggleDialog(payload: boolean) {
      this.dialogOpen = payload
    },
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    setVisualizationSize(payload: Size) {
      this.visualizationSize = payload
    }
  },
})
