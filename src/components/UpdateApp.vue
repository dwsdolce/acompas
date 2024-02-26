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
  p You need to delete all your local settings and reload the page in order to use the new version of the app.
  p You will lose all your settings and patterns. But this is the only way to get the new features.
  q-btn(
    unelevated,
    label="Delete settings and reload",
    color="primary",
    @click="handleUpdateApp()"
  ).q-mt-md
</template>
