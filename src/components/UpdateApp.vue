<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { Loading } from 'quasar'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'

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
  router.go(0)
}

</script>

<template lang="pug">
.text-center
  div(v-html="$t('doc.update.content')").q-mb-md
  q-btn(
    unelevated,
    :label="$t('doc.update.button')",
    color="primary",
    @click="handleUpdateApp()"
  ).q-mt-md
</template>
