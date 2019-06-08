<template lang="pug">
div
  b Instruments
  br
  q-btn(
    outline,
    @click="instrumentsDialog = true"
  ) Mixer
  q-dialog(v-model="instrumentsDialog")
    q-card
      q-card-section
        b Instruments mixer
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
      q-card-actions(align="right")
        q-btn(
          color="primary",
          v-close-popup
        ) Close
  br
  br
</template>

<script>
import { mapState } from 'vuex'
import { QIcon, QBtn, QDialog, QCard, QCardSection, QCardActions } from 'quasar'
import InstrumentMixer from './InstrumentMixer'

export default {
  components: { QIcon, QBtn, QDialog, QCard, QCardSection, QCardActions, InstrumentMixer },
  computed: {
    ...mapState({
      instruments: state => state.instruments,
      selectedInstruments: state => state.selectedInstruments
    })
  },
  watch: {
    selectedInstruments (value) {
      if (!value.length) {
        this.$q.notify({
          message: 'No instrument is selected. You will have no sound in the metronome ...',
          color: 'secondary',
          icon: 'warning'
        })
      }
    }
  },
  data () {
    return {
      instrumentsDialog: false
    }
  }
}
</script>
