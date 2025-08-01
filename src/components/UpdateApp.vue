<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { Loading, Platform } from 'quasar'
import MarkdownRenderer from 'src/components/MarkdownRenderer.vue'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'
import { AppRestart } from 'src/plugins/app-restart'
import { Capacitor } from '@capacitor/core'

const router = useRouter()
const patternStore = usePatternStore()
const sessionStore = useSessionStore()

const {
  isUpToDatev4
} = storeToRefs(sessionStore)

const {
  restoreDefault
} = patternStore

const handleUpdateApp = async () => {
  Loading.show({
    message: 'Loading…',
  })
  localStorage.clear()
  isUpToDatev4.value = true
  await restoreDefault('all')
  Loading.hide()

  if (Capacitor.isNativePlatform()) {
    try {
      await AppRestart.restart()
    } catch (error) {
      console.error(error)
    }
  }
  router.go(0)
}

</script>

<template lang="pug">
.text-center
  MarkdownRenderer(:content="$t('doc.update.content')").q-mb-md
  q-btn(
    unelevated,
    :label="$t('doc.update.button')",
    color="primary",
    @click="handleUpdateApp()"
  ).q-mt-md
</template>
