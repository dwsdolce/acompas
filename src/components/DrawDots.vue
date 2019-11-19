<template lang="pug">
.full-width.row.inline.no-wrap.justify-around.q-mb-md
  q-resize-observer(@resize="onResize")
  .column(v-for="(n, i) in beatLabels")
    .dot(:style="getDotStyle(i)", :ref="`dot-${i}`").item-center.q-mb-md
    span(:style="getNbStyle(i)", :ref="`nb-${i}`").text-center {{ n }}
</template>

<script>
import { mapState } from 'vuex'
import anime from 'animejs'

export default {
  data () {
    return {
      dotSize: 20,
      minDotSize: 20,
      maxDotSize: 50,
      fontSize: 16,
      minFontSize: 16,
      maxFontSize: 35,
      gutter: 10,
      borderRadius: 50
    }
  },
  computed: {
    ...mapState({
      selectedPalo: state => state.selectedPalo,
      nbBeats: state => state.selectedPalo.nbBeatsInPattern,
      beatLabels: state => state.selectedPalo.beatLabels,
      accents: state => state.selectedPalo.accents,
      metronomeEvent: state => state.metronomeEvent
    })
  },
  watch: {
    metronomeEvent (v) {
      this.animateDot(v)
    }
  },
  methods: {
    onResize (size) {
      let computedDotSize = size.width / this.nbBeats / 2
      if (computedDotSize < this.minDotSize) {
        this.dotSize = this.minDotSize
      } else if (computedDotSize > this.maxDotSize) {
        this.dotSize = this.maxDotSize
      } else {
        this.dotSize = computedDotSize
      }
      if (computedDotSize < this.minFontSize) {
        this.fontSize = this.minFontSize
      } else if (computedDotSize > this.maxFontSize) {
        this.fontSize = this.maxFontSize
      } else {
        this.fontSize = computedDotSize
      }
    },
    getDotStyle (i) {
      return {
        width: this.dotSize + 'px',
        height: this.dotSize + 'px',
        borderRadius: this.borderRadius + '%',
        marginTop: this.dotSize + 'px',
        backgroundColor: this.accents.includes(i / 2) ? 'firebrick' : 'tomato'
      }
    },
    getNbStyle (n) {
      return {
        fontSize: this.fontSize + 'px',
        opacity: 0.6
      }
    },
    animateDot (v) {
      let index = v - (this.$store.state.selectedPreCount.value * 2) + this.$store.state.selectedStartBeat.value
      // index needs to be strictly positive as it will be used with a % operator
      if (index < 0) {
        index += this.$store.state.selectedPalo.nbBeatsInPattern
      }
      let dotToAnimate = index % this.$store.state.selectedPalo.nbBeatsInPattern
      anime({
        targets: this.$refs['dot-' + dotToAnimate],
        scale: [
          { value: 1, duration: 0 },
          { value: 2, duration: 500 }
        ],
        direction: 'reverse',
        easing: 'linear'
      })
      anime({
        targets: this.$refs['nb-' + dotToAnimate],
        opacity: [
          { value: 0.6, duration: 0 },
          { value: 1, duration: 500 }
        ],
        direction: 'reverse',
        easing: 'linear'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.dot
  background-color $primary
</style>
