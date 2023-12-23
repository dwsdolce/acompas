<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUpdate } from 'vue'
import type { CSSProperties } from 'vue'
import { storeToRefs } from 'pinia'
import anime from 'animejs'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'
import { colors, setCssVar, getCssVar } from 'quasar'


const patternStore = usePatternStore()
const sessionStore = useSessionStore()

// how to get the browser viewport size in a vue environment?
// https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-vuejs

const { innerWidth: width, innerHeight: height } = window
const {
  selectedPattern,
  metronomeEvent,
  beatLabels
} = storeToRefs(patternStore)

const {
  visualizationSize
} = storeToRefs(sessionStore)

const dotSize = ref<number>(20)
const minDotSize = ref<number>(20)
const maxDotSize = ref<number>(60)
const fontSize = ref<number>(16)
const minFontSize = ref<number>(16)
const maxFontSize = ref<number>(35)
const gutter = ref<number>(10)
const borderRadius = ref<number>(50)

const dots = ref<HTMLDivElement[] | null[]>([])
const nbs = ref<HTMLDivElement[] | null[]>([])

interface Size {
  width: number,
  height: number
}

const getDotStyle = (i: number): CSSProperties => {
  if (selectedPattern.value?.accents) {
    return {
      width: dotSize.value / 2 + 'px',
      height: dotSize.value / 2 + 'px',
      borderRadius: borderRadius.value + '%',
      marginTop: dotSize.value / 2 + 'px',
      backgroundColor: selectedPattern.value?.accents.includes(i as never) ? getCssVar('secondary')?.toString() : getCssVar('primary')?.toString()
    }
  } else {
    return {}
  }
}

const getNbStyle: CSSProperties = {
  fontSize: fontSize.value + 'px',
  opacity: 0.6
}

const resizeDots = (size: Size) => {
  if (selectedPattern.value?.nbBeatsInPattern) {
    const computedDotSize = size.width / selectedPattern.value.nbBeatsInPattern / 1.5
    if (computedDotSize < minDotSize.value) {
      dotSize.value = minDotSize.value
    } else if (computedDotSize > maxDotSize.value) {
      dotSize.value = maxDotSize.value
    } else {
      dotSize.value = computedDotSize
    }
    if (computedDotSize < minFontSize.value) {
      fontSize.value = minFontSize.value
    } else if (computedDotSize > maxFontSize.value) {
      fontSize.value = maxFontSize.value
    } else {
      fontSize.value = computedDotSize
    }
  }
}

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

const handleDotRef = (i: number, el: HTMLDivElement) => {
  if (el) {
    dots.value[i] = el as HTMLDivElement
  } else {
    return
  }}

const handleNbRef = (i: number, el: HTMLDivElement) => {
  if (el) {
    nbs.value[i] = el as HTMLDivElement
  } else {
    return
  }
}

watch(metronomeEvent, (newMetronomeEvent, prevMetronomeEvent) => {
  if (newMetronomeEvent !== null) {
    if (selectedPattern.value?.name === 'simple-click') {
      animateDot(0)
    } else {
      animateDot(newMetronomeEvent)
    }
  }
})

watch(visualizationSize, (newVisualizationSize, prevVisualizationSize) => {
  if (newVisualizationSize !== prevVisualizationSize) {
    resizeDots(newVisualizationSize as Size)
  }
})

onMounted(() => {
  resizeDots(visualizationSize.value as Size)
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
    v-for="(n, i) in beatLabels",
    v-show="i !== beatLabels.length - 1",
    :key="i"
  )
    .dot(
      :style="getDotStyle(i / 2)",
      :ref="el => { dots[i] = el }",
      :class="[`dot-${i} ${n === null ? 'invisible' : ''}`]"
    ).item-center.q-mb-md
    span(
      v-if="selectedPattern.name !== 'simple-click'",
      :style="getNbStyle",
      :ref="el => { nbs[i] = el }"
    ).text-center {{ n }}
</template>
