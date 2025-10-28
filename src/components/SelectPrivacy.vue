<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CustomCard from 'src/components/CustomCard.vue'
import MarkdownRenderer from 'src/components/MarkdownRenderer.vue'
import { useSessionStore } from 'src/stores/session'

const router = useRouter()
const { t } = useI18n()
const sessionStore = useSessionStore()

const {
  enableTrackVisits,
  enableTrackingChosen,
  toggleTrackVisits
} = sessionStore

const {
  trackingEnabled
} = storeToRefs(sessionStore)

const handleEnableAndClose = () => {
  enableTrackVisits()
  enableTrackingChosen()
  router.push('/')
}

const handleClose = () => {
  enableTrackingChosen()
  router.push('/')
}
</script>

<template lang="pug">
custom-card(:popup="false")
  template(v-slot:title) {{ $t('doc.privacy.title') }}
  template(v-slot:content)
    .text-center
      MarkdownRenderer(:content="$t('doc.privacy.allow')").q-mb-sm
      q-toggle(
        :model-value="trackingEnabled",
        @update:model-value="toggleTrackVisits($event)",
        color="primary",
        keep-color
      ).primary
      MarkdownRenderer(:content="$t('doc.privacy.content')")
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
