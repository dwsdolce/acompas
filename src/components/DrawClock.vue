<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { CSSProperties } from 'vue'
import { storeToRefs } from 'pinia'
import anime from 'animejs'
import { useRoute } from 'vue-router'
import palosData from 'src/data/palosData'
import { usePaloStore } from 'src/stores/palo'

const route = useRoute()
const paloStore = usePaloStore(route.name as string)()
const paloData = palosData.find(palo => palo.value === route.name)

const {
  palo,
  isPlaying,
  metronomeEvent
} = storeToRefs(paloStore)

const {
  startingPoint,
  clockStep,
  clockVelocity
} = paloStore

const clockDeg = ref<number>(0)
const hand = ref(null)
const beatLabels = paloData?.beatLabels.reduce((acc, el) => {
  if (el !== null) acc.push(el)
  return acc
}, [])

const getLiStyle = (i: number): CSSProperties => {
  if (paloData && beatLabels) {
    return {
      position: 'absolute',
      transform: `rotate(${(360 / beatLabels.length) * i}deg)`
    }
  } else {
    return {}
  }
}

const getNumStyle = (i: number): CSSProperties => {
  if (paloData && beatLabels) {
    return {
      transform: `translateX(-62%) translateY(-35%) rotate(-${(360 / beatLabels.length) * i}deg)`,
      color: paloData?.accents.includes(i as never) ? 'firebrick' : 'tomato'
    }
  } else {
    return {}
  }
}

const idleClockPosition = () => {
  const newDeg: number = startingPoint === 0 ? 0 : startingPoint * clockStep + 0
  anime({
    targets: '.hand',
    rotate: [ clockDeg.value, newDeg ],
    duration: 0,
    complete: () => {
      clockDeg.value = newDeg
    }
  })
}

const animateClock = (v: number | null) => {
  console.log(v)
  console.log('clockDeg', clockDeg.value)
  console.log('clockStep', clockStep)
  console.log('clockVelocity', clockVelocity)

  if (isPlaying) {
    anime({
      targets: '.hand',
      rotate: [ clockDeg.value, clockDeg.value + clockStep ],
      duration: clockVelocity,
      easing: 'linear',
      begin: () => {
        clockDeg.value += clockStep
      },
      complete: () => {
        if (v === null || !isPlaying) {
          idleClockPosition()
        }
      }
    })
  }
}

watch(
  [metronomeEvent, palo.value.selectedStartBeat, palo.value.selectedPreCount],
  (
    [newMetronomeEvent, newSelectedStartBeat, newSelectedPreCount],
    [prevMetronomeEvent, prevSelectedStartBeat, prevSelectedPreCount]
  ) => {
    animateClock(newMetronomeEvent)
    if (newSelectedStartBeat !== prevSelectedStartBeat) {
      idleClockPosition()
    }
    if (newSelectedPreCount !== prevSelectedPreCount) {
      idleClockPosition()
    }
  }
)

onMounted(() => {
  idleClockPosition()
})
</script>

<template lang="pug">
.full-width.flex.justify-center.items-center
  #clock.shadow-20
    .axis.shadow-4
    .hand(ref="hand").shadow-2
    ul
      li(
        v-for="(n, i) in beatLabels",
        :style="getLiStyle(i)"
      )
        .num(
          :ref="`num-${n}`",
          :style="getNumStyle(i)"
        ) {{ n }}
</template>


<style lang="sass" scoped>
$size : 31vmin
$axis : 1.4vmin

#clock
  width: $size
  height: $size
  border-radius: 50%
  background-color: $blue-grey-1
  position: relative
  .axis
    width: $axis
    height: $axis
    border-radius: $axis / 2
    background-color: black
    position: absolute
    top: 14.8vmin
    left: 14.53vmin
  .hand
    width: $axis / 2
    height: ($size / 3)
    position: absolute
    top: 4.5vmin
    left: 14.8vmin
    background-color: black
    border-radius: 100% 100% 0% 0%
    transform: rotate(0deg)
    transform-origin: center ($size / 3 + $axis / 2)
  ul
    height: $size / 2.2
    position: absolute
    list-style: none
    width: 0
    left: 50%
    bottom: 50%
    margin: 0
    li
      // position absolute
      // top 0
      left: 0
      height: 100%
      transform-origin: 0% 100%
      .num
        color: tomato
        font-size: 3vmin
        // position absolute
        // top 0
        // left 50%
        // transform translateX(-50%)
        font-weight: bold
</style>
