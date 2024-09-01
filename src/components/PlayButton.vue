<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { usePatternStore } from 'src/stores/patterns'

const $q = useQuasar()
const patternStore = usePatternStore()

const {
  isPlaying
} = storeToRefs(patternStore)

const {
  play,
  stop
} = patternStore
</script>

<template lang="pug">
q-btn(
  id="playBtn",
  ref="playBtn",
  round,
  unelevated,
  size="xl",
  :padding="$q.screen.lt.md ? 'md' : 'xl'",
  color="primary",
  :icon="isPlaying ? 'mdi-stop' : 'mdi-play'",
  @click="isPlaying ? stop() : play()"
)
</template>
