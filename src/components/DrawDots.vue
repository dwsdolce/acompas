<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUpdate } from 'vue'
import { getCssVar, is } from 'quasar'
import { storeToRefs } from 'pinia'
import anime from 'animejs'
import { usePatternStore } from 'src/stores/patterns'
import { useCompasVisual } from 'src/composables/visualization'
import { useSessionStore } from 'src/stores/session'
import type { CSSProperties } from 'vue'
import type { Size } from 'src/utils/types'

const patternStore = usePatternStore()
// Compas and palmas are drawn the same way here, in the counter and in the
// clock; the encoding lives in one place so the three cannot drift apart.
const {
  roleOf,
  palmasWeight,
  compasColor,
  compasScale,
  compasOpacity,
  inkColor,
  isHidden,
  showsEighthNotes
} = useCompasVisual()
const sessionStore = useSessionStore()

// how to get the browser viewport size in a vue environment?
// https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-vuejs

const { innerWidth: width, innerHeight: height } = window
const {
  selectedPattern,
  selectedContext,
  selectedData,
  metronomeEvent,
  metronomeSubEvent,
  beatLabels
} = storeToRefs(patternStore)

const {
  visualizationSize,
  isDarkMode
} = storeToRefs(sessionStore)

// const dotSize = ref<number>(20)
const minDotSize = ref<number>(20)
const maxDotSize = ref<number>(60)
// const fontSize = ref<number>(16)
const minFontSize = ref<number>(16)
const maxFontSize = ref<number>(30)
const gutter = ref<number>(10)
const borderRadius = ref<number>(50)

const dots = ref<HTMLDivElement[] | null[]>([])
const nbs = ref<HTMLDivElement[] | null[]>([])

const dotSize = computed(() => {
  if (visualizationSize.value.width && selectedData.value?.nbBeatsInPattern) {
    const computedDotSize = visualizationSize.value.width / selectedData.value.nbBeatsInPattern / 1.5
    if (computedDotSize < minDotSize.value) {
      return minDotSize.value
    } else if (computedDotSize > maxDotSize.value) {
      return maxDotSize.value
    } else {
      return computedDotSize
    }
  } else {
    return 20
  }
})

const fontSize = computed(() => {
  if (visualizationSize.value.width && selectedData.value?.nbBeatsInPattern) {
    const computedDotSize = visualizationSize.value.width / selectedData.value.nbBeatsInPattern / 1.5
    if (computedDotSize < minFontSize.value) {
      return minFontSize.value
    } else if (computedDotSize > maxFontSize.value) {
      return maxFontSize.value
    } else {
      return computedDotSize
    }
  } else {
    return minFontSize.value
  }
})

const dotStyle = computed(() => (i: number) => {
  const base = dotSize.value / 2
  const max = base * compasScale.accent
  const role = roleOf(i)
  const size = base * compasScale[role]
  const weight = palmasWeight(i)

  return {
    width: size + 'px',
    height: size + 'px',
    borderRadius: borderRadius.value + '%',
    // Keep every dot on one centre line despite the differing diameters.
    marginTop: dotSize.value / 2 + (max - size) / 2 + 'px',
    backgroundColor: compasColor(i),
    opacity: compasOpacity[role],
    // The palmas layer: an outline set off the dot so it reads as a ring
    // rather than a fatter dot, its thickness the weight of the strike.
    // outline-offset leaves a real gap showing whatever is behind, so no
    // background colour has to be guessed here.
    outline: weight ? `${weight}px solid ${inkColor.value}` : 'none',
    outlineOffset: weight ? '2px' : '0'
  }
})

const nbStyle = computed(() => {
  return {
    fontSize: fontSize.value + 'px',
    // fontWeight: 'bold',
    color: isDarkMode.value ? 'white' : 'black',
    opacity: 0.6
  }
})

const animateDot = (index: number, scale: number, withLabel: boolean) => {
  anime({
    targets: dots.value[index],
    scale: [
      { value: 1, duration: 0 },
      { value: scale, duration: 1000 }
    ],
    direction: 'reverse',
    easing: 'easeInSine'
  })
  if (!withLabel) return
  anime({
    targets: nbs.value[index],
    opacity: [
      { value: 0.6, duration: 0 },
      { value: 1, duration: 1000 }
    ],
    direction: 'reverse',
    easing: 'easeInSine'
  })
}

watch(metronomeEvent, (v) => {
  if (v !== null) animateDot(v, 3, true)
})

// Subdivisions pulse smaller than counted beats, and carry no label to fade.
watch(metronomeSubEvent, (v) => {
  if (v !== null && showsEighthNotes.value) animateDot(v, 2, false)
})

// make sure to reset the refs before each update
onBeforeUpdate(() => {
  dots.value = []
  nbs.value = []
})
</script>

<template lang="pug">
.full-width.row.inline.no-wrap.justify-around.q-px-md
  .column.items-center(
    v-for="(beat, i) in beatLabels",
    v-show="i !== beatLabels.length - 1",
    :key="i"
  )
    span(
      :style="dotStyle(i)",
      :ref="el => { dots[i] = el }",
      :class="['shadow-1', `dot-${i}`, isHidden(i) ? 'invisible' : '']"
    ).item-center.q-mb-md
    span(
      v-if="selectedPattern && selectedPattern.name !== 'simple-click'",
      :style="nbStyle",
      :ref="el => { nbs[i] = el }"
    ).text-center {{ beat }}
</template>
