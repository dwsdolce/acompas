<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUpdate } from 'vue'
import { getCssVar } from 'quasar'
import { storeToRefs } from 'pinia'
import anime from 'animejs'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'
import type { CSSProperties } from 'vue'

const patternStore = usePatternStore()
const sessionStore = useSessionStore()

const {
  isPlaying,
  selectedPattern,
  selectedData,
  metronomeEvent,
  prestartBeat,
  beatLabels,
  tempo
} = storeToRefs(patternStore)

const clockDeg = ref<number>(0)
const hand = ref<HTMLDivElement | null>(null)
const nums = ref<HTMLDivElement[] | null[]>([])
const clockStep = computed(() => 360 / (beatLabels.value?.length / 2))
const clockVelocity = computed(() =>
    60000 / tempo.value
  )
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

const getNumClass = computed(() => (i: number) => {
  const isAccent = selectedData.value.accents.includes(i / 2 as never)
  return {
    'text-secondary': isAccent,
    'text-primary': !isAccent
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
  if (v) clockDeg.value = v / 2 * clockStep.value
  const animation = anime({
    targets: '.hand',
    rotate: [ clockDeg.value, clockDeg.value + clockStep.value ],
    duration: clockVelocity.value,
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
#clock.shadow-20
  .axis.shadow-4
  .hand(ref="hand").shadow-2
  ul
    li(
      v-for="(n, i) in beatLabels",
      :style="getLiStyle(i)"
    )
      .num(
        :ref="el => { nums[i] = el }",
        :style="getNumStyle(i)",
        :class="getNumClass(i)"
      ) {{ n }}
</template>


<style lang="sass" scoped>
$size : 30vh
$axis : 2vh

#clock
  width: $size
  height: $size
  border-radius: 50%
  background-color: $blue-grey-1
  position: relative
  .axis
    width: $axis
    height: $axis
    border-radius: calc($axis / 2)
    background-color: black
    position: absolute
    top: calc($size / 2) - calc($axis / 2)
    left: calc($size / 2) - calc($axis / 2)
  .hand
    width: calc($axis / 2)
    height: calc($size / 3)
    position: absolute
    top: calc($size / 6) - calc($axis / 4)
    left: calc($size / 2) - calc($axis / 4)
    background-color: black
    border-radius: 100% 100% 0% 0%
    // transform: v-bind('rotationValue')
    transform-origin: center (calc($size / 3) + calc($axis / 4))
  ul
    height: calc($size / 2.2)
    position: absolute
    list-style: none
    width: 0
    left: 50%
    bottom: 50%
    margin: 0
    li
      left: 0
      height: 100%
      transform-origin: 0% 100%
      .num
        color: $primary
        font-size: calc($size / 10)
        font-weight: bold
        // @media screen and (max-height: 600px)
        //   font-size: 0.8rem
</style>
