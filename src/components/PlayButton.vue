<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import { usePaloStore } from 'src/stores/palo'

const $q = useQuasar()
const route = useRoute()
const paloStore = usePaloStore(route.name as string)()

const {
  isPlaying
} = storeToRefs(paloStore)

const {
  play,
  stop
} = paloStore
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
