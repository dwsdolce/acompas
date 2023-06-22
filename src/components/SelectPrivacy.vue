<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import CustomCard from 'src/components/CustomCard.vue'
import { useSessionStore } from 'src/stores/session'

const router = useRouter()
const sessionStore = useSessionStore()

const {
  enableTrackVisits,
  enableTrackingChosen,
  toggleTrackVisits,
  closePrivacyDialog
} = sessionStore

const {
  trackingEnabled,
  privacyDialogOpen
} = storeToRefs(sessionStore)

const handleEnableAndClose = () => {
  enableTrackVisits()
  enableTrackingChosen()
  if (privacyDialogOpen.value) {
    closePrivacyDialog()
  } else {
    router.back()
  }
}

const handleClose = () => {
  enableTrackingChosen()
  if (privacyDialogOpen.value) {
    closePrivacyDialog()
  } else {
    router.back()
  }
}
</script>

<template lang="pug">
custom-card(:popup="false")
  template(v-slot:title) Privacy policy
  template(v-slot:content)
    .text-center
      p: b We don't collect any nominative personal data.
      p This app uses a tool called "Matomo" to collect anonymised visits analytics data.
        | If you activate the option below, Matomo will set a cookie in the web browser (for the acompas.org website), or in the mobile device (for the Android app),
        | and observe some of your actions in the app
        | (essentially metronome 'Play' and 'Stop' actions to infer time playing),
        | anonymising your IP address.
      p This information is only part of our usage statistics (to have an idea about how many users we have). We don't sell nor give access to this data to anyone else.
      p You can enable or disable this feature when you want to.
      p.q-mb-sm: b Allow this app to send us some anonymised usage data ?
      q-toggle(
        :model-value="trackingEnabled",
        @update:model-value="toggleTrackVisits($event)",
        color="primary",
        keep-color
      ).primary
  template(v-slot:actions)
    q-btn(
      unelevated,
      color="primary",
      @click="handleEnableAndClose()",
    ).q-mr-lg Enable &amp; close
    q-btn(
      unelevated,
      color="secondary",
      v-close-popup,
      @click="handleClose()"
    ) Close
</template>
