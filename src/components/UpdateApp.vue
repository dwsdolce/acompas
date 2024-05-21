<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'

const router = useRouter()
const patternStore = usePatternStore()
const sessionStore = useSessionStore()

const {
  isUpToDatev3
} = storeToRefs(sessionStore)

const {
  restoreDefault
} = patternStore

const handleUpdateApp = () => {
  isUpToDatev3.value = true
  restoreDefault('all')
}

</script>

<template lang="pug">
.text-center
  div(v-html="$t('doc.update.content')").q-mb-md
  q-btn(
    unelevated,
    label="Delete settings and reload",
    color="primary",
    @click="handleUpdateApp()"
  ).q-mt-md
</template>
