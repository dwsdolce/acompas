<template lang="pug">
tr
  td
    q-checkbox(
      color="primary",
      :value="selectedInstruments",
      :val="instrument.value",
      :label="instrument.label",
      @input="selectInstruments"
    )
  td
    q-toggle(
      icon="audiotrack",
      :value="instrument.eighthNotes",
      :disable="!isChecked || isClick"
      @input="handleToggleEighthNotes($event)"
    ).primary
  td(style="width: 100%;")
    q-slider(
      :value="instrument.volume",
      :min="-30",
      :max="30",
      :step="1",
      label,
      snap,
      :disable="!isChecked"
      @change="handleChangeVolume($event)"
    )
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: [ 'slug' ],
  computed: {
    ...mapState({
      selectedInstruments: state => state.selectedInstruments
    }),
    instrument () {
      return this.$store.getters.getInstrument(this.$props.slug)
    },
    isChecked () {
      return this.selectedInstruments.includes(this.instrument.value)
    },
    isClick () {
      return this.instrument.value === 'click'
    }
  },
  watch: {
    selectedInstruments (value) {
      this.selectInstruments(value)
    }
  },
  methods: {
    ...mapActions([
      'toggleEighthNotes',
      'changeVolume',
      'selectInstruments'
    ]),
    handleToggleEighthNotes (e) {
      this.toggleEighthNotes(this.instrument)
    },
    handleChangeVolume (e) {
      this.changeVolume({
        instrument: this.instrument,
        volume: e
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
tr > td
  padding 0.5rem 0
</style>
