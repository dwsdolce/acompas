<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUpdate } from 'vue'
import type { CSSProperties } from 'vue'
import { storeToRefs } from 'pinia'
import anime from 'animejs'
import { useRoute } from 'vue-router'
import { usePaloStore } from 'src/stores/palo'
import palosData from 'src/data/palosData'

const route = useRoute()
const paloData = palosData.find(palo => palo.value === route.name)
const paloStore = usePaloStore(route.name as string)()

// how to get the browser viewport size in a vue environment?
// https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-vuejs

const { innerWidth: width, innerHeight: height } = window
const {
  palo,
  visualizationSize,
  metronomeEvent
} = storeToRefs(paloStore)

const dotSize = ref<number>(20)
const minDotSize = ref<number>(20)
const maxDotSize = ref<number>(50)
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
  if (paloData?.accents) {
    return {
      width: dotSize.value / 2 + 'px',
      height: dotSize.value / 2 + 'px',
      borderRadius: borderRadius.value + '%',
      marginTop: dotSize.value / 2 + 'px',
      backgroundColor: paloData?.accents.includes(i as never) ? 'firebrick' : 'tomato'
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
  if (paloData?.nbBeatsInPattern) {
    const computedDotSize = size.width / paloData.nbBeatsInPattern / 2
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

const animateDot = (v: number) => {
  const index = v

  anime({
    targets: dots.value[index],
    scale: [
      { value: 1, duration: 0 },
      { value: 5, duration: 1000 }
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

watch(
  [metronomeEvent, visualizationSize],
  (
    [newMetronomeEvent, newVisualizationSize],
    [prevMetronomeEvent, prevVisualizationSize]
  ) => {
    if (newMetronomeEvent !== null) animateDot(newMetronomeEvent)
    resizeDots(newVisualizationSize as Size)
  }
)

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
.full-width.row.inline.no-wrap.justify-around
  .column.items-center(
    v-for="(n, i) in paloData?.beatLabels",
    v-show="i !== paloData?.beatLabels.length - 1",
    :key="i"
  )
    .dot(
      :style="getDotStyle(i / 2)",
      :ref="el => { dots[i] = el }",
      :class="[`dot-${i} ${n === null ? 'invisible' : ''}`]"
    ).item-center.q-mb-md
    span(
      v-if="palo && palo.name !== 'no-compas'",
      :style="getNbStyle",
      :ref="el => { nbs[i] = el }"
    ).text-center {{ n }}
</template>

<style lang="sass" scoped>
.dot
  background-color: $primary
</style>
