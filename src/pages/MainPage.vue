<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import PlayButton from 'src/components/PlayButton.vue'
import SelectTempo from 'src/components/SelectTempo.vue'
import RhythmOptions from 'src/components/RhythmOptions.vue'
import SelectPalo from 'src/components/SelectPalo.vue'
import SelectInstruments from 'src/components/SelectInstruments.vue'
import DrawDots from 'src/components/DrawDots.vue'
import DrawCounter from 'src/components/DrawCounter.vue'
import DrawClock from 'src/components/DrawClock.vue'
import { useMetronome } from 'src/composables/metronome'
import { useSessionStore } from 'src/stores/session'
import { usePaloStore } from 'src/stores/palo'

const $q = useQuasar()
const route = useRoute()
const paloStore = usePaloStore(route.name as string)()
const sessionStore = useSessionStore()

const { palo, visualizationMode } = storeToRefs(paloStore)

const { init, playStop, selectTempo } = paloStore

const { dialogOpen } = storeToRefs(sessionStore)

const { toggleDialog } = sessionStore

const { isSupported } = useMetronome()

const visualization = ref(null)

const showDialog = () => {
  toggleDialog(false)
  $q.dialog({
    title: 'Update your browser!',
    message:
      "Your browser doesn't support one or more technologies used by this app. Please come back with another one or another version of this one.",
    persistent: true
  })
}

onMounted(() => {
  init()

  isSupported().catch(() => {
    showDialog()
  })
})
</script>

<template lang="pug">
q-page.text-grey-1
  .main-panel
    .top-panel(ref="visualization")
      draw-dots(v-if="visualizationMode === 'dots'")
      draw-counter(v-if="visualizationMode === 'counter'")
      draw-clock(v-if="visualizationMode === 'clock'")
    .bottom-panel.row.no-wrap
      .left-panel.col-6.col-sm-5
        select-palo.q-mb-sm
        rhythm-options.q-mb-sm
        select-instruments
      .middle-panel(v-if="$q.screen.gt.xs").col-2
        play-button
      .right-panel.col-6.col-sm-5
        select-tempo
    .sub-panel(v-if="$q.screen.lt.sm || $q.screen.xs")
      play-button
</template>

<style lang="sass">
.main-panel
  height: calc( 100vh - 50px )
  display: flex
  flex-direction: column
  .top-panel
    display: flex
    flex-wrap: nowrap
    justify-content: center
    align-items: center
    text-align: center
    align-content: center
    flex-grow: 1
  .bottom-panel
    align-items: center
    text-align: center
    flex-grow: 3
    .left-panel
      flex-grow: 1
    .middle-panel
      flex-grow: 1
    .right-panel
      display: flex
      align-items: center
      flex-direction: column
      flex-grow: 1
  .sub-panel
    display: flex
    justify-content: center
    align-items: center
    flex-grow: 1
</style>
