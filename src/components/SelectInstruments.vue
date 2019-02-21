<template lang="pug">
div
  p.caption.auto Instruments
  q-btn(
    outline,
    @click="instrumentsDialog = true"
  ).mt.mb Mixer
  q-dialog(v-model="instrumentsDialog")
    q-card
      q-card-section
        b Instruments mixer
        //- q-alert(
        //-   v-if="!selectedInstruments.length",
        //-   color="negative",
        //-   icon="warning",
        //-   transition-show="jump-down",
        //-   transition-hide="jump-up"
        //- ) No instrument is selected. You will have no sound in the metronome...
      q-card-section
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
      q-card-actions
        q-btn(
          color="primary",
          @click="instrumentsDialog = false"
        ).float-right Close
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { QIcon, QBtn, QDialog, QCard, QCardSection, QCardActions } from 'quasar'
import InstrumentMixer from './InstrumentMixer'

export default {
  components: { QIcon, QBtn, QDialog, QCard, QCardSection, QCardActions, InstrumentMixer },
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
