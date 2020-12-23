<template lang="pug">
.full-width.row.inline.no-wrap.justify-around.q-mb-md
  #clock.shadow-20
    .axis.shadow-4
    .hand(ref="hand").shadow-2
    ul
      li(v-for="(n, i) in beatLabels", :style="getLiStyle(n, i)")
        .num(:ref="`num-${n}`", :style="getNumStyle(n, i)") {{ n }}
</template>

<script>
import { mapState } from 'vuex'
import anime from 'animejs'

export default {
  data () {
    return {
      clockDeg: 90
    }
  },
  computed: {
    ...mapState({
      selectedPalo: state => state.selectedPalo,
      nbBeatsInPattern: state => state.selectedPalo.nbBeatsInPattern,
      selectedPreCount: state => state.selectedPreCount,
      selectedStartBeat: state => state.selectedStartBeat,
      beatLabels: state => state.selectedPalo.beatLabels,
      accents: state => state.selectedPalo.accents,
      metronomeEvent: state => state.metronomeEvent,
      isPlaying: state => state.isPlaying,
      alpha: state => 360 / (state.selectedPalo.nbBeatsInPattern / 2),
      velocity: state => Math.floor(60000 / state.tempo),
      startingPoint: state => state.selectedStartBeat.value / 2 - state.selectedPreCount.value
    })
  },
  watch: {
    metronomeEvent (v) {
      this.animateClock(v)
    },
    selectedStartBeat (v) {
      this.idleClockPosition()
    },
    selectedPreCount (v) {
      this.idleClockPosition()
    }
  },
  mounted () {
    this.idleClockPosition()
  },
  methods: {
    getLiStyle (n, i) {
      return {
        position: 'absolute',
        transform: `rotate(${(360 / this.nbBeatsInPattern) * i}deg)`
      }
    },
    getNumStyle (n, i) {
      return {
        transform: `translateX(-50%) rotate(-${(360 / this.nbBeatsInPattern) * i}deg)`,
        color: this.accents.includes(i / 2) ? 'firebrick' : 'tomato'
      }
    },
    idleClockPosition () {
      const newDeg = this.startingPoint === 0 ? 90 : this.startingPoint * this.alpha + 90
      anime({
        targets: this.$refs.hand,
        rotate: [ this.clockDeg, newDeg ],
        duration: 0,
        complete: anim => {
          this.clockDeg = newDeg
        }
      })
    },
    animateClock (v) {
      if (v !== null && this.isPlaying) {
        anime({
          targets: this.$refs.hand,
          rotate: [ this.clockDeg, this.clockDeg + this.alpha ],
          duration: this.velocity,
          easing: 'linear',
          begin: anim => {
            this.clockDeg += this.alpha
          },
          complete: anim => {
            if (v === null || !this.isPlaying) {
              this.idleClockPosition()
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#clock
  width 260px
  height 260px
  border-radius 50%
  background-color $blue-grey-1
  position relative
  &:before
    border-width: 2px
  .axis
    width 12px
    height 12px
    border-radius 50%
    background-color black
    position absolute
    top 130px - 6
    left 130px - 6
  ul
    height 124px
    position absolute
    list-style none
    width 0
    left 50%
    bottom 50%
    margin 0
    li
      position absolute
      top 0
      left 0
      height 100%
      transform-origin 60% 100%
      .num
        color tomato
        font-size 20px
        position absolute
        top 0
        left 50%
        transform translateX(-50%)
        font-weight bold
  .hand
    height 6px
    position absolute
    top 130px - 3
    left 33px - 3
    background-color black
    border-radius 100% 0% 0% 100%
    transform-origin right 3px
    width: 100px
</style>
