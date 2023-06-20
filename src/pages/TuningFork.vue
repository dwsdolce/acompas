<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useTuningForkStore } from 'src/stores/tuning-fork'
import { usePatternStore } from 'src/stores/patterns'
import { useTuningFork } from 'src/composables/tuning-fork'
import { isFocusableElement } from 'src/utils/utils'
import type { QBtn } from 'quasar'

const router = useRouter()
const patternStore = usePatternStore()

const { initTuningFork, playNote, startSequence, stopSequence } = useTuningFork()

const isPlaying = ref<boolean>(false)
const notes = ref<string[]>(['E2', 'A2', 'D3', 'G3', 'B3', 'E4'])
const activeNote = ref<string | null>(null)

// const {
//   notes,
//   isPlaying,
//   activeNote
// } = storeToRefs(tuningForkStore)

// const {
//   init: initTuningFork,
//   play,
//   stop
// } = tuningForkStore

const {
  isPlaying: isPatternPlaying
} = storeToRefs(patternStore)

const {
  stop: stopPattern
} = patternStore

const play = (note?: string) => {
  if (note) {
    playNote(note)
  } else {
    startSequence()
    isPlaying.value = true
  }
}

const stop = () => {
  stopSequence()
  isPlaying.value = false
}

const changeNote = (payload: string | null) => {
  activeNote.value = payload
}

onMounted(() => {
  if (isPatternPlaying.value) stopPattern()
  initTuningFork()
})

onUnmounted(() => {
  stop()
})
</script>

<template lang="pug">
q-page.bg-grey-10.text-grey-1.q-pa-sm.flex.justify-center.items-center
  q-card(style="max-width: 750px;").text-grey-10
    q-card-section
      q-btn(
        icon="close",
        flat,
        round,
        dense,
        @click="router.back()"
      ).absolute.q-top-right.q-mr-sm
      .text-h6.text-center Tuning fork
    q-card-section(align="center")
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
