<script setup lang="ts">
import { ref, computed, onUpdated, onMounted, onUnmounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar, Platform, setCssVar, colors, is } from 'quasar'
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

const { getPaletteColor } = colors
const { context, pattern } = route.params


const {
  data,
  isPlaying,
  selectedPattern,
  selectedContext,
  selectedContextName,
  selectedPatternName
} = storeToRefs(patternStore)

const {
  initAll,
  initContext,
  initPattern,
  stop
} = patternStore

const { isDarkMode, visualizationMode } = storeToRefs(sessionStore)

const { setVisualizationSize } = sessionStore

const headerHeight = computed(() => window.innerHeight - ($q.platform.is.electron ? 82 : 50))

const activeComponent = computed(() => {
  if (visualizationMode.value === 'dots') {
    return DrawDots
  } else if (visualizationMode.value === 'counter') {
    return DrawCounter
  } else if (visualizationMode.value === 'clock') {
    return DrawClock
  }
  return DrawDots // Default fallback
})

onMounted(() => {
  if (context && pattern) {
    initAll(context as string, pattern as string)
    setCssVar('primary', getPaletteColor(selectedContext.value.colors?.primary))
    setCssVar('secondary', getPaletteColor(selectedContext.value.colors?.secondary))
  }
})

onUnmounted(() => {
  if (isPlaying.value) stop()
})

watch(() => route.params, async (params) => {
  if (params.context && params.pattern) {
    await initContext(params.context as string)
    await initPattern(params.context as string, params.pattern as string)
  }
})

watch(() => selectedContext.value, async (context) => {
  if (context) {
    setCssVar('primary', getPaletteColor(selectedContext.value.colors?.primary))
    setCssVar('secondary', getPaletteColor(selectedContext.value.colors?.secondary))
  }
})
</script>

<template lang="pug">
q-page.flex(
  :class="isDarkMode ? 'text-white' : 'text-black'"
)
  global-events
  .main-panel.q-pa-xs.col-grow
    .top-panel(ref="visualization")
      transition(name="fade" mode="out-in")
        component(:is="activeComponent", :key="visualizationMode")
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
