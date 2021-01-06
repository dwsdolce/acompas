<template lang="pug">
div
  p.caption.text-center Tempo
  .row.justify-center.items-end.content-end
    q-btn(
      outline,
      round,
      color="white",
      :size="$q.screen.lt.md ? 'sm' : 'md'",
      :padding="$q.screen.lt.md ? 'xs' : 'sm'",
      @click="decrement"
    ).self-end
      q-icon(name="remove")
    q-knob(
      color="primary",
      track-color="grey-1",
      :value="tempo",
      :min="minTempo",
      :max="maxTempo",
      show-value,
      :size="knobSize",
      :thickness="0.12",
      @input="selectTempo"
    ).text-weight-light
    q-btn(
      outline,
      round,
      color="white",
      :size="$q.screen.lt.md ? 'sm' : 'md'",
      :padding="$q.screen.lt.md ? 'xs' : 'sm'",
      @click="increment"
    ).self-end
      q-icon(name="add")
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      tempo: state => state.tempo,
      palo: state => state.selectedPalo,
      maxTempo: state => state.selectedPalo.maxTempo,
      minTempo: state => state.selectedPalo.minTempo,
      knobSize: state => {
        if (state.visualizationSize.width < 860) {
          return (state.visualizationSize.width * 25 / 100) + 'px'
        } else {
          return '148px'
        }
      }
    })
  },
  methods: {
    ...mapActions([
      'selectTempo'
    ]),
    increment () {
      this.selectTempo(this.tempo + 1)
    },
    decrement () {
      this.selectTempo(this.tempo - 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.custom-input
  max-width 300px
</style>
