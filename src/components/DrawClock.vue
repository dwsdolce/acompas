<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUpdate } from 'vue'
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
  metronomeEvent,
  clockVelocity,
  numLabels,
  startingPoint,
  clockStep
} = storeToRefs(paloStore)

const clockDeg = ref<number>(0)
const hand = ref(null)
const nums = ref<HTMLDivElement[] | null[]>([])

const getLiStyle = (i: number): CSSProperties => {
  if (paloData && numLabels.value) {
    return {
      position: 'absolute',
      transform: `rotate(${(360 / numLabels.value.length) * i}deg)`
    }
  } else {
    return {}
  }
}

const getNumStyle = (i: number): CSSProperties => {
  if (paloData && numLabels.value) {
    return {
      transform: `translateX(-62%) translateY(-35%) rotate(-${(360 / numLabels.value.length) * i}deg)`,
      color: paloData?.accents.includes(i as never) ? 'firebrick' : 'tomato'
    }
  } else {
    return {}
  }
}

const idleClockPosition = () => {
  const newDeg: number = startingPoint.value * clockStep.value + 0
  anime({
    targets: '.hand',
    rotate: [ clockDeg.value, newDeg ],
    duration: 50,
    complete: () => {
      clockDeg.value = newDeg
    }
  })
}

const animateClock = (v: number | null) => {
  const animation = anime({
    targets: '.hand',
    rotate: [ clockDeg.value, clockDeg.value + clockStep.value ],
    duration: clockVelocity.value,
    easing: 'linear',
    begin: () => {
      if (v !== null) clockDeg.value += clockStep.value
    },
    change: () => {
      if (v == null) {
        idleClockPosition()
      }
    }
  })

  if (isPlaying) {
    animation.play()
  } else {
    animation.pause()
    idleClockPosition()
  }
}

const animateNum = (v: number | null) => {
  if (v !== null) {
    const index = v / 2
    anime({
      targets: nums.value[index],
      scale: [
        { value: 1, duration: 0 },
        { value: 2, duration: 1000 }
      ],
      direction: 'reverse',
      easing: 'easeInSine'
    })
  }
}

watch(
  [metronomeEvent, startingPoint, palo.value.selectedPreCount],
  (
    [newMetronomeEvent, newStartingPoint, newSelectedPreCount],
    [prevMetronomeEvent, prevStartingPoint, prevSelectedPreCount]
  ) => {
    animateClock(newMetronomeEvent)
    animateNum(newMetronomeEvent)
    if (newStartingPoint !== prevStartingPoint) {
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
      v-for="(n, i) in numLabels",
      :style="getLiStyle(i)"
    )
      .num(
        :ref="el => { nums[i] = el }"
        :style="getNumStyle(i)"
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
    border-radius: $axis / 2
    background-color: black
    position: absolute
    top: $size / 2 - $axis / 2
    left: $size / 2 - $axis / 2
  .hand
    width: $axis / 2
    height: ($size / 3)
    position: absolute
    top: $size / 6 - $axis / 4
    left: $size / 2 - $axis / 4
    background-color: black
    border-radius: 100% 100% 0% 0%
    transform: rotate(0deg)
    transform-origin: center ($size / 3 + $axis / 4)
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
        font-size: 1.5em
        // position absolute
        // top 0
        // left 50%
        // transform translateX(-50%)
        font-weight: bold
</style>
