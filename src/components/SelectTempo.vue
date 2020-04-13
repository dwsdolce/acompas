<template lang="pug">
div
  .column.items-center
    p.caption Tempo
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
    ).text-weight-light.q-mb-md
    .row.items-center
      .col-xs-3
        q-btn(
          outline,
          round,
          color="white",
          :size="screen.lt.md ? 'sm' : 'md'",
          @click="decrement"
        ).q-mr-md
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
          round,
          color="white",
          :size="screen.lt.md ? 'sm' : 'md'",
          @click="increment"
        ).q-ml-md
          q-icon(name="add")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Screen } from 'quasar'

export default {
  computed: {
    ...mapState({
      tempo: state => state.tempo,
      palo: state => state.selectedPalo,
      maxTempo: state => state.selectedPalo.maxTempo,
      minTempo: state => state.selectedPalo.minTempo
    }),
    screen () { return Screen }
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
