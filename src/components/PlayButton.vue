<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { usePaloStore } from 'src/stores/palo'

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
  size="lg",
  color="primary",
  :icon="isPlaying ? 'stop' : 'play_arrow'",
  @click="isPlaying ? stop() : play()"
)
</template>
