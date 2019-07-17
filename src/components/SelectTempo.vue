<template lang="pug">
div
  .column.items-center
    p.caption.q-mb-sm Tempo
    q-knob(
      color="primary",
      track-color="grey-1",
      :value="tempo",
      :min="minTempo",
      :max="maxTempo",
      show-value,
      size="120px",
      :thickness="0.1",
      @input="selectTempo"
    ).text-weight-light
    .row.full-width.items-center
      .col-xs-3
        q-btn(
          outline,
          color="white",
          @click="decrement",
          round
        )
          q-icon(name="remove")
      .col-xs-6
        q-input(
          dark,
          type="number",
          :value="tempo",
          :min="0",
          :max="300",
          @input="selectTempo"
        )
      .col-xs-3
        q-btn(
          outline,
          color="white",
          @click="increment",
          round
        )
          q-icon(name="add")
  br
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
