<template lang="pug">
div
  .column.items-center
    p.caption.auto.mb Tempo
    q-knob(
      color="primary",
      :value="tempo",
      :min="minTempo",
      :max="maxTempo",
      :placeholder="tempo + 'bpm'",
      size="120px",
      lineWidth="6px",
      @input="selectTempo"
    ).mt
    .row.full-width.items-center.mb
      .col-xs-12.col-md-6.mb
        q-input(
          dark,
          type="number"
          :value="tempo"
          :min="0"
          :max="300"
          @input="selectTempo"
        )
      .col-xs-6.col-md-3.decrement
        q-btn(
          outline,
          color="white",
          small,
          @click="decrement"
        )
          q-icon(name="remove")
      .col-xs-6.col-md-3.increment
        q-btn(
          outline,
          color="white",
          small,
          @click="increment"
        )
          q-icon(name="add")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { QKnob, QInput, QBtn, QIcon } from 'quasar'

export default {
  components: { QKnob, QInput, QBtn, QIcon },
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

<style lang="stylus">
/* @import '~variables'
@media (min-width $breakpoint-md-min)
  .increment
    order 1000
  .decrement
    order -1000 */
</style>
