<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTuningForkStore } from 'src/stores/tuning-fork'
import { usePaloStore } from 'src/stores/palo'

const route = useRoute()

const tuningForkStore = useTuningForkStore()
const paloStore = usePaloStore(route.name as string)()

const {
  notes,
  isPlaying,
  activeNote
} = storeToRefs(tuningForkStore)

const {
  init: initTuningFork,
  play,
  stop
} = tuningForkStore

const {
  init: initPalo,
  stop: stopPalo
} = paloStore

const {
  isPlaying: isPaloPlaying
} = storeToRefs(paloStore)

onMounted(() => {
  if (isPaloPlaying.value) stopPalo()
  initTuningFork()
})

onUnmounted(() => {
  initPalo()
})
</script>

<template lang="pug">
.column.wrap.content-center
  .flex.justify-center.q-gutter-md
    q-btn(
      v-for="note in notes",
      :ref="note",
      :key="note"
      :class="[ 'tuning-btn', `${note}`, activeNote === note ? 'active' : '' ]"
      @click="play(note)"
    ) {{ note }}
  .flex.justify-center.q-gutter-md.q-mt-md
    div
      p.caption {{ isPlaying ? 'Stop' : 'Play' }} all
      q-btn(
        flat,
        round,
        :icon="isPlaying ? 'stop' : 'play_arrow'",
        @click="isPlaying ? stop() : play()"
      )
</template>

<style lang="sass" scoped>
.tuning-btn
  border: 1px solid black
  background: transparent
  &.active
    background: rgba(0, 0, 0, 0.15)
</style>
