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

<style lang="sass" scoped>
$shadow_1: 0 0 5px 5px rgba(0,0,0,0.4)
$shadow_2: 0 0 15px 15px rgba(255,255,255,0.12)
$shadow_3: inset 0 0 2px 2px rgba(255,255,255,0.2)

#playBtn
  text-shadow: 0 0 15px rgba(0,0,0,0.5)
  &::before
    box-shadow: $shadow_1, $shadow_2, $shadow_3
</style>
