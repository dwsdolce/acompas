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
  metronomeSubEvent,
  hasEighthNotes,
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

// A slot is one of three things, and each reads differently:
//   accent — a stressed beat, listed in the pattern's `accents`
//   beat   — a counted beat, i.e. one carrying a label
//   sub    — an off-beat subdivision, whose label is null
// Accents were originally distinguished by colour alone (primary vs
// secondary), but those are two shades of the same red and are
// indistinguishable at this size. Hue, size and opacity now all carry the
// distinction, so it survives a viewer who can't separate red from blue.
const accentScale = 1.5
const pulseScale = 0.65
const subScale = 0.4

// Accents take the context's own colour, everything else a neutral grey.
// Grey rather than a second hue because --q-primary changes per rhythm
// context — red for flamenco, but light-blue for Fundamental Global and teal
// for Ternary African, either of which would collide with a coloured second
// tier and leave size as the only cue. Grey contrasts with all five.
const accentColor = 'var(--q-primary)'
const beatColor = computed(() => (isDarkMode.value ? '#bdbdbd' : '#616161'))

const isAccent = (i: number) => selectedData.value?.accents?.includes(i) ?? false
const isBeat = (i: number) => (beatLabels.value?.[i] ?? null) !== null

// An even slot carrying no label is still part of the pulse grid the
// instruments play — the compás just doesn't count it. Siguiriya is the case
// that matters: its 12 pulses are counted as 5 uneven beats (2+2+3+3+2), so
// seven of the twelve strokes you hear have no label. Draw them, or those
// strokes sound with nothing happening on screen. For every other pattern
// each even slot is labelled, so this tier is empty and nothing changes.
const isPulse = (i: number) => !isBeat(i) && i % 2 === 0

// Odd slots are off-beat subdivisions: reserved-but-hidden unless something
// is actually playing them, so the beat spacing never shifts.
const isHidden = (i: number) => !isBeat(i) && !isPulse(i) && !hasEighthNotes.value

const dotStyle = computed(() => (i: number) => {
  const base = dotSize.value / 2
  const max = base * accentScale
  const size = isAccent(i)
    ? max
    : isBeat(i)
      ? base
      : isPulse(i)
        ? base * pulseScale
        : base * subScale
  return {
    width: size + 'px',
    height: size + 'px',
    borderRadius: borderRadius.value + '%',
    // Keep every dot on one centre line despite the differing diameters.
    marginTop: dotSize.value / 2 + (max - size) / 2 + 'px',
    backgroundColor: isAccent(i) ? accentColor : beatColor.value,
    opacity: isAccent(i) ? 1 : isBeat(i) ? 0.9 : isPulse(i) ? 0.6 : 0.4
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
  if (v !== null && hasEighthNotes.value) animateDot(v, 2, false)
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
