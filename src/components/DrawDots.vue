<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUpdate } from 'vue'
import { getCssVar, is } from 'quasar'
import { storeToRefs } from 'pinia'
import anime from 'animejs'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'
import type { CSSProperties } from 'vue'
import type { Size } from 'src/utils/types'

const patternStore = usePatternStore()
const sessionStore = useSessionStore()

// how to get the browser viewport size in a vue environment?
// https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-vuejs

const { innerWidth: width, innerHeight: height } = window
const {
  selectedPattern,
  selectedContext,
  selectedData,
  metronomeEvent,
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

const dotStyle = computed(() => (n: number) => {
  return {
    width: dotSize.value / 2 + 'px',
    height: dotSize.value / 2 + 'px',
    borderRadius: borderRadius.value + '%',
    marginTop: dotSize.value / 2 + 'px'
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

const animateDot = (index: number) => {
  anime({
    targets: dots.value[index],
    scale: [
      { value: 1, duration: 0 },
      { value: 3, duration: 1000 }
    ],
    direction: 'reverse',
    easing: 'easeInSine'
  })
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
  if (v !== null) animateDot(v)
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
      :style="dotStyle(beat)",
      color="primary",
      :ref="el => { dots[i] = el }",
      :class="['shadow-1', `dot-${i}`, `${beat === null ? 'invisible' : ''}`, `bg-${selectedData?.accents.includes(i) ? 'secondary' : 'primary'}`]"
    ).item-center.q-mb-md
    span(
      v-if="selectedPattern && selectedPattern.name !== 'simple-click'",
      :style="nbStyle",
      :ref="el => { nbs[i] = el }"
    ).text-center {{ beat }}
</template>
