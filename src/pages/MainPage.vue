<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import PlayButton from 'src/components/PlayButton.vue'
import SelectTempo from 'src/components/SelectTempo.vue'
import RhythmOptions from 'src/components/RhythmOptions.vue'
import SelectPalo from 'src/components/SelectPalo.vue'
import SelectPreCount from 'src/components/SelectPreCount.vue'
import SelectStartBeat from 'src/components/SelectStartBeat.vue'
import SelectInstruments from 'src/components/SelectInstruments.vue'
import DrawDots from 'src/components/DrawDots.vue'
import DrawCounter from 'src/components/DrawCounter.vue'
import DrawClock from 'src/components/DrawClock.vue'
import SelectVisualization from 'src/components/SelectVisualization.vue'
import ResetButton from 'src/components/ResetButton.vue'
import { useMetronome } from 'src/composables/metronome'
import { useSessionStore } from 'src/stores/session'
import { usePaloStore } from 'src/stores/palo'

const $q = useQuasar()
const route = useRoute()
const paloStore = usePaloStore(route.name as string)()
const sessionStore = useSessionStore()

const { palo } = storeToRefs(paloStore)

const { visualizationMode, init, playStop, selectTempo } = paloStore

const { dialogOpen } = storeToRefs(sessionStore)

const { toggleDialog } = sessionStore

const { isSupported } = useMetronome()

const visualization = ref(null)

// const getVisualizationSize = (size) => metronomeStore.commit('GET_VISUALIZATION_SIZE', size)
// const toggleDialog = () => store.commit('TOGGLE_DIALOG')

// const onResize = (size) => {
//   getVisualizationSize(size)
// }

// const resize = (size) => {
//   visualization.value.style.marginBottom = size.height / 12
// }

const showDialog = () => {
  toggleDialog(false)
  $q.dialog({
    title: 'Update your browser!',
    message:
      "Your browser doesn't support one or more technologies used by this app. Please come back with another one or another version of this one.",
    persistent: true
  })
}

const onKeyup = (e: KeyboardEvent) => {
  e.preventDefault()
  if (dialogOpen.value) return
  if (palo.value.tempo) {
    const key = e.key || e.keyCode
    switch (key) {
      case 32: // Space
        playStop()
        break
      case 38: // Arrow up
        if (e.shiftKey) {
          selectTempo(palo.value.tempo + 10)
        } else if (e.altKey) {
          selectTempo(palo.value.tempo + 5)
        } else {
          selectTempo(palo.value.tempo + 1)
        }
        break
      case 40: // Arrow down
        if (e.shiftKey) {
          selectTempo(palo.value.tempo - 10)
        } else if (e.altKey) {
          selectTempo(palo.value.tempo - 5)
        } else {
          selectTempo(palo.value.tempo - 1)
        }
        break
      case 80: // Arrow down
        break
      default:
        break
    }
  }
}

onMounted(() => {
  init()

  isSupported().catch(() => {
    showDialog()
  })
  document.addEventListener('keyup', (event: KeyboardEvent) => {
    onKeyup(event)
  })
  // resize(visualizationSize)
  // initMetronome()
})

// watch()
</script>

<template lang="pug">
q-page.bg-grey-10.text-grey-1.q-pa-sm.column.no-wrap.justify-around.content-stretch
  //- q-resize-observer(@resize="onResize")
  div(ref="visualization")
    draw-dots(v-if="visualizationMode?.value === 'dots'")
    draw-counter(v-if="visualizationMode?.value === 'counter'")
    draw-clock(v-if="visualizationMode?.value === 'clock'")
  .row.text-center.justify-center.no-wrap
    .col-6.col-md-5.column.justify-between
      .row.justify-center
        select-palo.q-mb-xs
      .row.justify-center
        select-start-beat.q-mb-xs
      .row.justify-center
        select-pre-count.q-mb-xs
      .row.justify-center
        rhythm-options
    .col-2(v-if="$q.screen.gt.lg").flex.justify-center.content-end
      play-button
    .col-6.col-md-5.column.justify-between
      select-tempo.q-mb-xs
      .row.justify-center
        .col.col-lg-4.col-xl-2
          select-instruments.q-mb-xs
        .col.col-lg-4.col-xl-2
          select-visualization.q-mb-xs
      .row.justify-center
        .col.col-lg-4.col-xl-2(v-if="$q.screen.lt.lg || $q.screen.lg").flex.justify-center.content-end
          play-button
        .col.col-lg-4.col-xl-2
          reset-button
</template>
