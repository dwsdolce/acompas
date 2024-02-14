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
  size="xl",
  :padding="$q.screen.lt.md ? 'md' : 'xl'"
  color="primary",
  :icon="isPlaying ? 'stop' : 'play_arrow'",
  @click="isPlaying ? stop() : play()"
)
</template>

<style lang="sass" scoped>
#playBtn
  box-shadow: 0 0 30px 10px rgb(255 255 255 / 10%)
  &::before
    box-shadow: 0 0 5px 5px rgb(10 10 10 / 70%)
</style>
src/stores/settings
