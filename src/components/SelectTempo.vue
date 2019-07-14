<template lang="pug">
div
  .column.items-center
    b Tempo
    q-knob(
      color="primary",
      track-color="grey-1",
      :value="tempo",
      :min="minTempo",
      :max="maxTempo",
      show-value,
      :placeholder="tempo + 'bpm'",
      size="120px",
      lineWidth="6px",
      @input="selectTempo"
    )
    .row.full-width.items-center
      .col-xs-4.decrement
        q-btn(
          outline,
          color="white",
          @click="decrement",
          round,
          style="float: right;"
        )
          q-icon(name="remove")
      .col-xs-4
        q-input(
          dark,
          type="number",
          :value="tempo",
          :min="0",
          :max="300",
          @input="selectTempo",
          style="max-width: 44px; margin-left: auto; margin-right: auto;"
        )
      .col-xs-4.increment
        q-btn(
          outline,
          color="white",
          @click="increment",
          round,
          style="float: left;"
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
