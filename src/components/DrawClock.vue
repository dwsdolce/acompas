<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUpdate } from 'vue'
import { getCssVar } from 'quasar'
import { storeToRefs } from 'pinia'
import anime from 'animejs'
import { usePatternStore } from 'src/stores/patterns'
import { useCompasVisual } from 'src/composables/visualization'
import { useSessionStore } from 'src/stores/session'
import type { CSSProperties } from 'vue'

const patternStore = usePatternStore()
// The dial is $blue-grey-1 in both themes, so its marks are chosen against a
// light surface whatever the app theme is.
const { roleOf, palmasWeight, compasColor, palmasColor, showsEighthNotes } =
  useCompasVisual({ onLightSurface: true })
const sessionStore = useSessionStore()

const {
  isPlaying,
  selectedPattern,
  selectedData,
  metronomeEvent,
  metronomeSubEvent,
  prestartBeat,
  beatLabels,
  tempo
} = storeToRefs(patternStore)

const {
  isDarkMode
} = storeToRefs(sessionStore)

const clockDeg = ref<number>(0)
const hand = ref<HTMLDivElement | null>(null)
const nums = ref<HTMLDivElement[] | null[]>([])
// One turn of the dial is one compás. The hand moves by whatever the drawn
// instrument is playing: an eighth when it plays the off-beats, a quarter when
// it does not. Stepping by quarters while eighths sound leaves half the compás
// with nothing on the dial to mark it.
const slotsPerStep = computed(() => (showsEighthNotes.value ? 1 : 2))
const clockStep = computed(
  () => 360 / (beatLabels.value?.length / slotsPerStep.value)
)
const clockVelocity = computed(() =>
    60000 / tempo.value
  )

// How long the hand takes to cross one step. clockVelocity is a quarter note,
// which is two slots, so an eighth-note step takes half of it. Without this the
// hand moved an eighth's worth over a quarter's duration and fell behind.
const stepDuration = computed(() => clockVelocity.value * slotsPerStep.value / 2)
const startingPoint = computed(() =>
  prestartBeat.value
    ? (selectedData.value.nbBeatsInPattern - prestartBeat.value * 2) / 2
    : 0
  )
// const rotationValue = computed(() => `rotate(${clockDeg.value}deg)`)

const getLiStyle = (i: number) => {
  if (selectedPattern.value && beatLabels.value) {
    return {
      position: 'absolute',
      transform: `rotate(${(360 / beatLabels.value.length) * i}deg)`
    }
  } else {
    return {}
  }
}

const getNumStyle = (i: number) => {
  if (beatLabels.value) {
    return {
      transform: `translateX(-62%) translateY(-35%) rotate(-${(360 / beatLabels.value.length) * i}deg)`
    }
  } else {
    return {}
  }
}

// Colour and size say what the slot is in the compás, as they do on the dots
// and the counter. This was primary against secondary — two shades of one red.
const getCompasStyle = computed(() => (i: number) => {
  const role = roleOf(i)
  return {
    color: compasColor(i),
    opacity: role === 'accent' ? 1 : role === 'beat' ? 0.9 : 0.6,
    fontWeight: role === 'accent' ? 700 : 400
  }
})

/**
 * The palmas layer: a tick outside the dial wherever the drawn instrument
 * strikes, its length the weight of the strike, and blue when that strike is
 * the accented one — the same language as the dots' ring and the counter's bar.
 * The dial is a light surface whatever the theme, so the blue comes back as the
 * darker of the two.
 */
const getTickStyle = computed(() => (i: number) => {
  const weight = palmasWeight(i)
  if (!weight) return { display: 'none' }
  return {
    position: 'absolute',
    height: `${weight * 4 + 2}px`,
    width: `${weight}px`,
    backgroundColor: palmasColor(i),
    opacity: 0.85,
    borderRadius: '1px'
  }
})

const idleClockPosition = () => {
  clockDeg.value = startingPoint.value * clockStep.value
  anime({
    targets: '.hand',
    rotate: [ clockDeg.value ],
    duration: 0
  })
}

const animateClock = (v: number | null) => {
  if (v) clockDeg.value = v / slotsPerStep.value * clockStep.value
  const animation = anime({
    targets: '.hand',
    rotate: [ clockDeg.value, clockDeg.value + clockStep.value ],
    duration: stepDuration.value,
    easing: 'linear',
    complete: () => {
      if (v !== null) {
        const newDeg = clockDeg.value + clockStep.value
        if (newDeg >= 360) {
          clockDeg.value = 0
        } else {
          clockDeg.value = newDeg
        }
      }
    },
    update: () => {
      if (!isPlaying.value) {
        animation.pause()
        idleClockPosition()
      }
    }
  })

  animation.finished.then(() => {
    if (!isPlaying.value) {
      idleClockPosition()
    }
  })
}

const animateNum = (v: number | null) => {
  if (v !== null) {
    anime({
      targets: nums.value[v],
      scale: [
        { value: 1, duration: 0 },
        { value: 2, duration: 1000 }
      ],
      direction: 'reverse',
      easing: 'easeInSine'
    })
  }
}

watch(metronomeEvent, (v) => {
  animateClock(v)
  animateNum(v)
  if (v === null) idleClockPosition()
})

// Off-beats reach the dial too, but only when the instrument being drawn is
// playing them - otherwise the hand would step through subdivisions that
// nothing is sounding.
watch(metronomeSubEvent, (v) => {
  if (v === null || !showsEighthNotes.value) return
  animateClock(v)
  animateNum(v)
})

watch(startingPoint, (oldValue, newValue) => {
  if (newValue !== oldValue) idleClockPosition()
})

watch(prestartBeat, (oldValue, newValue) => {
  if (newValue !== oldValue) idleClockPosition()
})

onMounted(() => {
  idleClockPosition()
})

// make sure to reset the refs before each update
onBeforeUpdate(() => {
  nums.value = []
})
</script>

<template lang="pug">
#clock.shadow-5
  .axis.shadow-2
  .hand(ref="hand").shadow-2
  ul
    li(
      v-for="(n, i) in beatLabels",
      :style="getLiStyle(i)"
    )
      .tick(:style="getTickStyle(i)")
      .num(
        :ref="el => { nums[i] = el }",
        :style="[getNumStyle(i), getCompasStyle(i)]"
      ) {{ n }}
</template>
