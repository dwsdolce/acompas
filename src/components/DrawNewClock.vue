<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { CSSProperties } from 'vue'
import { storeToRefs } from 'pinia'
import anime from 'animejs'
import { SVG, Path } from '@svgdotjs/svg.js'
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
// const hand = ref(null)
const clock = ref(SVG())
const hand = ref<Path | null>(null)

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
      transform: `translate(0%, 0%) rotate(${(360 / beatLabels.length) * i}deg)`,
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
  if (isPlaying) {
    // hand.value?.children[0].beginElement()
    anime({
      targets: 'path.hand',
      rotate: [ clockDeg.value, clockDeg.value + clockStep ],
      // rotate: [ (clockDeg.value, '625', '625'), (clockDeg.value + clockStep, '625', '625') ],
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

onMounted(() => {
  // idleClockPosition()
  // console.log(hand.value?.children[0])
  // clock.value.addTo('#clock').viewbox(0, 0, 1250, 1250).width('100%').height('100%')
  // clock.value.circle().attr({ x: 625, y: 625, cx: 625, cy: 625, r: 625, fill: '#eceff1' })
  // clock.value.circle().attr({ x: 625, y: 625, cx: 625, cy: 625, r: 25, fill: '#000' })

  // if (beatLabels?.length) {
  //   for (let index = 0; index < beatLabels.length; index++) {
  //     const element = beatLabels[index]
  //     clock.value.text(element).attr({
  //       x: 625,
  //       y: 715,
  //       fill: 'tomato'
  //     }).font({
  //       family: 'Roboto',
  //       size: 180,
  //       anchor: 'middle',
  //       leading: '1.5em'
  //     })
  //   }
  // }

  // hand.value = clock.value.path('M 625, 625 L 615, 625 L 615, 315 C 615, 250, 615, 220, 625, 200 C 625, 200, 635, 220, 635, 250 L 635, 625 Z')

  // const anim = hand.value.animate({
  //   duration: 2000,
  //   delay: 1000,
  //   when: 'now',
  //   swing: true,
  //   times: 5,
  //   wait: 200
  // })

  // anim.rotate(45, 625, 625)
})

watch(
  [metronomeEvent, palo.value.selectedStartBeat, palo.value.selectedPreCount],
  (
    [newMetronomeEvent, newSelectedStartBeat, newSelectedPreCount],
    [prevMetronomeEvent, prevSelectedStartBeat, prevSelectedPreCount]
  ) => {
    // if (hand.value) hand.value.rotate(45, 625, 625)

    animateClock(newMetronomeEvent)
    if (newSelectedStartBeat !== prevSelectedStartBeat) {
      idleClockPosition()
    }
    if (newSelectedPreCount !== prevSelectedPreCount) {
      idleClockPosition()
    }
  }
)
</script>

<template lang="pug">
#clock
  svg(
    id="clock",
    width="100%",
    height="100%",
    viewBox="0 0 1250 1250",
    version="1.1",
    xmlns="http://www.w3.org/2000/svg",
    xmlns:xlink="http://www.w3.org/1999/xlink",
    xml:space="preserve",
    xmlns:serif="http://www.serif.com/"
  )
    circle(cx="625" cy="625" r="625" class="clock-bg")
    circle(cx="625" cy="625" r="25" class="axis")
    path(
      class="hand",
      ref="hand",
      d="M 625, 625 L 615, 625 L 615, 315 C 615, 250, 615, 220, 625, 200 C 625, 200, 635, 220, 635, 250 L 635, 625 Z"
    )
      //- animateTransform(
      //-   attributeName="transform",
      //-   attributeType="XML",
      //-   type="rotate",
      //-   :from="`${clockDeg} 625 625`",
      //-   :to="`${clockDeg + clockStep} 625 625`",
      //-   :dur="`${clockVelocity}s`",
      //-   begin="indefinite"
      //- )
    //- path(
    //-   id="num-path",
    //-   stroke="#000",
    //-   fill="none",
    //-   d="M 625, 625 m -550 , 0 a 550 , 550 0 1 , 0 1100 , 0 a 550 , 550 0 1 , 0 -1100 , 0"
    //- )
    g.numbers
      text(
        v-for="(n, i) in beatLabels",
        :key="i",
        class="number",
        :style="getNumStyle(i)"
      ) {{ n }}

//- #clock.shadow-20
//-   .axis.shadow-4
//-   .hand(ref="hand").shadow-2
//-   ul
//-     li(
//-       v-for="(n, i) in beatLabels",
//-       :style="getLiStyle(i)"
//-     )
//-       .num(
//-         :ref="`num-${n}`",
//-         :style="getNumStyle(i)"
//-       ) {{ n }}
</template>


<style lang="sass" scoped>
#clock
  .clock-bg
    fill: #eceff1
  .axis, .hand
    fill: #000
    stroke: #000
  .numbers
    transform: translate(625px, 625px)
    transform-origin: center
    .number
      font-family:'Roboto', '-apple-system', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif
      font-size: 180px
      fill: tomato
  .hand
    transform: rotate(0deg)
    transform-origin: center
</style>
