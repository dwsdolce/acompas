<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CustomCard from 'src/components/CustomCard.vue'
import { useSessionStore } from 'src/stores/session'
import { usePatternStore } from 'src/stores/patterns'

const router = useRouter()
const { t } = useI18n()
const sessionStore = useSessionStore()
const patternStore = usePatternStore()

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

const {
  selectedContextName,
  selectedPatternName
} = storeToRefs(patternStore)

const handleEnableAndClose = () => {
  enableTrackVisits()
  enableTrackingChosen()
  if (privacyDialogOpen.value) {
    closePrivacyDialog()
  } else {
    router.push(`/${selectedContextName.value}/${selectedPatternName.value}`)
  }
}

const handleClose = () => {
  enableTrackingChosen()
  if (privacyDialogOpen.value) {
    closePrivacyDialog()
  } else {
    router.push(`/${selectedContextName.value}/${selectedPatternName.value}`)
  }
}
</script>

<template lang="pug">
custom-card(:popup="false")
  template(v-slot:title) {{ $t('doc.privacy.title') }}
  template(v-slot:content)
    .text-center
      div(v-html="$t('doc.privacy.allow')").q-mb-sm
      q-toggle(
        :model-value="trackingEnabled",
        @update:model-value="toggleTrackVisits($event)",
        color="primary",
        keep-color
      ).primary
      div(v-html="$t('doc.privacy.content')")
  template(v-slot:actions)
    q-btn(
      unelevated,
      color="primary",
      @click="handleEnableAndClose()",
    ).q-mr-lg {{ $t('doc.privacy.enable') }}
    q-btn(
      unelevated,
      color="secondary",
      v-close-popup,
      @click="handleClose()"
    ) {{ $t('doc.privacy.close') }}
</template>
