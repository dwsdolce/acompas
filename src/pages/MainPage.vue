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
q-page.bg-grey-10.text-grey-1
  .main-panel
    .top-panel(ref="visualization")
      draw-dots(v-if="visualizationMode === 'dots'")
      draw-counter(v-if="visualizationMode === 'counter'")
      draw-clock(v-if="visualizationMode === 'clock'")
    .bottom-panel
      .left-panel.q-px-xs
        select-palo.q-mb-sm
        rhythm-options.q-mb-sm
        select-instruments
      .middle-panel(v-if="$q.screen.gt.xs")
        play-button
      .right-panel.q-px-xs
        select-tempo
    .sub-panel(v-if="$q.screen.lt.sm || $q.screen.xs")
      play-button
</template>

<style lang="sass">
.top-panel,
.left-panel,
.middle-panel,
.right-panel,
.bottom-panel
  display: flex
  // flex-flow: column wrap
  justify-content: center
  align-items: center
  text-align: center
  align-content: center

.main-panel
  height: 90vh
  display: flex
  flex-flow: wrap
  .top-panel
    width: 100%
    // height: 20%
    @media screen and (min-height: 600px)
      height: 40%
  .bottom-panel
    width: 100%
    height: 40%
    @media screen and (min-width: 500px)
      height: 30%
    .left-panel
      height: 100%
      width: 50%
      flex-flow: column nowrap
      // justify-content: flex-start
      @media screen and (min-width: 500px)
        width: 40%
    .middle-panel
      width: 20%
      height: 100%
    .right-panel
      height: 100%
      width: 50%
      flex-flow: column nowrap
      // justify-content: flex-start
      @media screen and (min-width: 500px)
        width: 40%
  .sub-panel
    width: 100%
    height: 30%
    display: flex
    justify-content: center
    align-items: center
    text-align: center
    align-content: center
</style>
