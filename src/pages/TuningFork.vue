<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import CustomCard from 'src/components/CustomCard.vue'
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
q-page.q-pa-sm.flex.justify-center.items-center
  custom-card(:popup="false")
    template(v-slot:title) Tuning fork
    template(v-slot:content)
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
              :icon="isPlaying ? 'mdi-stop' : 'mdi-play'",
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
