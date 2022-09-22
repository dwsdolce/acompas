<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useTuningForkStore } from 'src/stores/tuning-fork'

const tuningForkStore = useTuningForkStore()

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

onMounted(() => {
  initTuningFork()
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
