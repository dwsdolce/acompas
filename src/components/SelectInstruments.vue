<template lang="pug">
div
  p.caption.q-mb-sm Instruments
  q-btn(
    outline,
    @click="instrumentsDialog = true"
  ) Mixer
  q-dialog(v-model="instrumentsDialog")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Instruments mixer
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
      q-card-section(align="center")
        q-btn(
          color="primary",
          v-close-popup
        ) Close
</template>

<script>
import { mapState } from 'vuex'
import InstrumentMixer from './InstrumentMixer'

export default {
  components: { InstrumentMixer },
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
