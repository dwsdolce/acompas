<template lang="pug">
div
  p.caption.auto Instruments
  q-btn(
    outline,
    @click="instrumentsDialog = true"
  ).mt.mb Mixer
  q-dialog(v-model="instrumentsDialog")
    h5.m-none.mb Mix instruments
    //- q-alert(
    //-   v-if="!selectedInstruments.length",
    //-   color="negative",
    //-   icon="warning",
    //-   transition-show="jump-down",
    //-   transition-hide="jump-up"
    //- ) No instrument is selected. You will have no sound in the metronome...
    table(style="width: 100%;").q-table
      thead
        tr
          th.text-center Active
          th.text-center 8th
          th.text-center Volume (db)
      tbody
        instrument-mixer(
          v-for="instrument in instruments",
          :key="instrument.value",
          :slug="instrument.value"
        )
    q-btn(
      color="primary",
      @click="instrumentsDialog = false"
    ).float-right Close
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { QIcon, QBtn, QDialog } from 'quasar'
import InstrumentMixer from './InstrumentMixer'

export default {
  components: { QIcon, QBtn, QDialog, InstrumentMixer },
  computed: {
    ...mapState({
      selectedInstruments: state => state.selectedInstruments,
      instruments: state => state.instruments
    })
  },
  watch: {
    selectedInstruments (value) {
      this.selectInstruments(value)
    }
  },
  methods: {
    ...mapActions([
      'selectInstruments'
    ])
  },
  data () {
    return {
      instrumentsDialog: false
    }
  }
}
</script>
