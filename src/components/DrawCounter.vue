<template lang="pug">
.item-center.full-width
  h2(:class="className").text-center.q-ma-none
    div(v-if="metronomeEvent === null")
      q-icon(name="more_horiz")
    div(v-else).counter {{ counter }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      counter: null,
      className: ''
    }
  },
  computed: {
    ...mapState({
      metronomeEvent: state => state.metronomeEvent,
      selectedPalo: state => state.selectedPalo
    })
  },
  watch: {
    metronomeEvent (v) {
      let index = v - (this.$store.state.selectedPreCount.value * 2) + this.$store.state.selectedStartBeat.value
      // index needs to be strictly positive as it will be used with a % operator
      if (index < 0) {
        index += this.$store.state.selectedPalo.nbBeatsInPattern
      }
      this.counter = this.selectedPalo.beatLabels[index % this.$store.state.selectedPalo.nbBeatsInPattern]
      if (this.selectedPalo.accents.includes((index % this.$store.state.selectedPalo.nbBeatsInPattern) / 2)) {
        this.className = 'accent'
      } else {
        this.className = ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.counter
  margin-bottom 9.5px
.accent
  color: firebrick
</style>
