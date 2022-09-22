<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { CSSProperties } from 'vue'
import { storeToRefs } from 'pinia'
import anime from 'animejs'
import { useRoute } from 'vue-router'
import palosData from 'src/data/palosData'
import { useSessionStore } from 'src/stores/session'
import { usePaloStore } from 'src/stores/palo'
import { useCoreStore } from 'src/stores/core'

const sessionStore = useSessionStore()
const coreStore = useCoreStore()

const route = useRoute()
const paloStore = usePaloStore(route.name as string)()

const paloData = palosData.find(palo => palo.value === route.name)
const { palo } = storeToRefs(paloStore)

const {
  isPlaying,
  metronomeEvent
} = storeToRefs(coreStore)

const {
  startingPoint,
  alpha,
  velocity
} = paloStore

const clockDeg = ref<number>(0)
const hand = ref(null)

const getLiStyle = (i: number): CSSProperties => {
  if (paloData) {
    return {
      position: 'absolute',
      transform: `rotate(${(360 / paloData?.nbBeatsInPattern) * i}deg)`
    }
  } else {
    return {}
  }
}

const getNumStyle = (i: number): CSSProperties => {
  if (paloData && i) {
    return {
      transform: `translateX(-50%) translateY(-30%) rotate(-${(360 / paloData?.nbBeatsInPattern) * i}deg)`,
      color: paloData?.accents.includes((i / 2) as never) ? 'firebrick' : 'tomato'
    }
  } else {
    return {}
  }
}

const idleClockPosition = () => {
  const newDeg: number = startingPoint === 0 ? 0 : startingPoint * alpha + 0
  anime({
    targets: hand,
    rotate: [ clockDeg, newDeg ],
    duration: 0,
    complete: (anim: any) => {
      clockDeg.value = newDeg
    }
  })
}

const animateClock = (v: number | null) => {
  if (v !== null && isPlaying) {
    anime({
      targets: hand,
      rotate: [ clockDeg, clockDeg.value + alpha ],
      duration: velocity,
      easing: 'linear',
      begin: (anim: any) => {
        clockDeg.value += alpha
      },
      complete: (anim: any) => {
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
  if (newMetronomeEvent !== prevMetronomeEvent) {
    if (newMetronomeEvent) animateClock(newMetronomeEvent.value)
  }
  if (newSelectedStartBeat !== prevSelectedStartBeat) {
    idleClockPosition()
  }
  if (newSelectedPreCount !== prevSelectedPreCount) {
    idleClockPosition()
  }
})

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
        v-for="(n, i) in paloData?.beatLabels",
        :style="getLiStyle(i)"
      )
        .num(
          :ref="`num-${n}`",
          :style="getNumStyle(i)"
        ) {{ n }}
</template>


<style lang="sass" scoped>
$size : 31vmin
$axis : .7vmin

#clock
  width: $size
  height: $size
  border-radius: 50%
  background-color: $blue-grey-1
  position: relative
  .axis
    width: ($axis * 2)
    height: ($axis * 2)
    border-radius: $axis
    background-color: black
    position: absolute
    top: calc($size / 2 - $axis)
    left: calc($size / 2 - $axis)
  .hand
    width: $axis
    height: ($size / 3)
    position: absolute
    top: calc($size / 6 - $axis / 2)
    left: calc($size / 2 - $axis / 2)
    background-color: black
    border-radius: 100% 100% 0% 0%
    transform: rotate(0deg)
    transform-origin: center calc($size / 3 - $axis / 2)
  ul
    height: calc($size / 2.2)
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
