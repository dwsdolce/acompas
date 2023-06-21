<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useTuningForkStore } from 'src/stores/tuning-fork'
import { useTuningFork } from 'src/composables/tuning-fork'
import { isFocusableElement } from 'src/utils/utils'
import type { QBtn } from 'quasar'

const router = useRouter()
const tuningForkStore = useTuningForkStore()

const {
  notes,
  isPlaying,
  activeNote
} = storeToRefs(tuningForkStore)

const {
  init,
  play,
  stop
} = tuningForkStore

onMounted(() => {
  init()
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
