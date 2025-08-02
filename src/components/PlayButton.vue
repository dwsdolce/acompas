<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'

const $q = useQuasar()
const patternStore = usePatternStore()
const sessionStore = useSessionStore()

const {
  isPlaying
} = storeToRefs(patternStore)

const {
  isDarkMode
} = storeToRefs(sessionStore)

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
  color="primary",
  :debounce="500",
  :padding="$q.screen.lt.md ? 'md' : 'xl'",
  :icon="isPlaying ? 'mdi-stop' : 'mdi-play'",
  :class="{ 'light-mode': !isDarkMode }",
  @click="isPlaying ? stop() : play()"
)
</template>

<style lang="scss" scoped>
#playBtn {
  text-shadow: 0 0 5px rgba(0,0,0,0.5);
  box-shadow: 0 0 5px rgba(0,0,0,0.8), 0 0 15px rgba(255, 255, 255, 0.25);
  transition: all .5s ease-out;
  &::before {
    box-shadow: 0 0 5px rgba(0,0,0,0.8), 0 0 15px rgba(255, 255, 255, 0.25);
    transition: all .5s ease-out;
  }
  &:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.6), 0 0 20px rgba(255, 255, 255, 0.3);
    &::before {
      box-shadow: 0 0 10px rgba(0,0,0,0.6), 0 0 20px rgba(255, 255, 255, 0.3);
    }
  }
  &.light-mode::before {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.4), 0 3px 4px rgba(0, 0, 0, 0.28), 0 3px 3px -2px rgba(0, 0, 0, 0.24);
  }
}
</style>
