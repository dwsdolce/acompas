<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { Loading, Platform } from 'quasar'
import MarkdownRenderer from 'src/components/MarkdownRenderer.vue'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'

const { t } = useI18n()
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
    message: t('notify.loading'),
  })
  localStorage.clear()
  isUpToDatev4.value = true
  await restoreDefault('all')
  Loading.hide()

  // Reload rather than restart. An iOS app cannot relaunch itself - there is
  // no API for it, and terminating yourself is grounds for rejection - so the
  // AppRestart plugin this used to call had no implementation on either
  // platform. Every native run threw "AppRestart does not have an
  // implementation", the catch swallowed it, and the reload on the next line
  // did the work regardless. Reloading the webview re-runs the app, which is
  // all a restart meant here now that the settings have been cleared above.
  window.location.reload()
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
