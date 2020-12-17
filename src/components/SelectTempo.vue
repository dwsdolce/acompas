<template lang="pug">
div
  div
    p.caption Tempo
    q-knob(
      color="primary",
      track-color="grey-1",
      :value="tempo",
      :min="minTempo",
      :max="maxTempo",
      show-value,
      size="152px",
      :thickness="0.12",
      @input="selectTempo"
    ).text-weight-light.q-mb-md
  .row.justify-center.items-center
    .col-2.q-mr-md-md
      q-btn(
        outline,
        round,
        color="white",
        :size="$q.screen.lt.md ? 'sm' : 'md'",
        @click="decrement"
      )
        q-icon(name="remove")
    .col-6.col-md-4.col-lg-3.col-xl-2
      q-input(
        dark,
        type="number",
        :value="tempo",
        :min="0",
        :max="300",
        @input="selectTempo"
        class="q-mx-md"
      )
    .col-2.q-ml-md-md
      q-btn(
        outline,
        round,
        color="white",
        :size="$q.screen.lt.md ? 'sm' : 'md'",
        @click="increment"
      )
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
      minTempo: state => state.selectedPalo.minTempo
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
