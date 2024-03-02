<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar, Platform } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import SelectPattern from 'src/components/SelectPattern.vue'
import RhythmOptions from 'src/components/RhythmOptions.vue'
import SelectInstruments from 'src/components/SelectInstruments.vue'
import PlayButton from 'src/components/PlayButton.vue'
import SelectTempo from 'src/components/SelectTempo.vue'
import DrawDots from 'src/components/DrawDots.vue'
import DrawCounter from 'src/components/DrawCounter.vue'
import DrawClock from 'src/components/DrawClock.vue'
import GlobalEvents from 'src/components/GlobalEvents.vue'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const patternStore = usePatternStore()
const sessionStore = useSessionStore()

const { context, pattern } = route.params

const { selectedPattern, data } = storeToRefs(patternStore)
const { visualizationMode } = storeToRefs(sessionStore)
const { setVisualizationSize } = sessionStore
const headerHeight = computed(() => window.innerHeight - ($q.platform.is.electron ? 82 : 50))
</script>

<template lang="pug">
q-page.text-grey-1.flex
  global-events
  .main-panel.q-pa-xs.col-grow
    .top-panel(ref="visualization")
      draw-dots(v-if="visualizationMode === 'dots'")
      draw-counter(v-if="visualizationMode === 'counter'")
      draw-clock(v-if="visualizationMode === 'clock'")
    .bottom-panel.row.no-wrap
      .left-panel.col-6.col-sm-5
        select-pattern.q-mb-sm
        rhythm-options.q-mb-sm
        select-instruments
      .middle-panel(v-if="$q.screen.md || $q.screen.gt.md").col-2
        play-button
      .right-panel.col-6.col-sm-5
        select-tempo
    .sub-panel(v-if="$q.screen.lt.md")
      play-button
</template>

<style lang="sass">
.main-panel
  height: 100%
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
src/stores/settings
