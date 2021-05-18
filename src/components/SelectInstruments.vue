<template lang="pug">
div
  p.caption Mixer
  q-btn#mixerBtn(
    outline,
    icon="tune",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    @click="instrumentsDialog = true"
  )
  q-dialog#mixerDialog(v-model="instrumentsDialog", @show="toggleDialog(true)", @hide="toggleDialog(false)")
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
        q-btn#closeMixerDialogBtn(
          color="primary",
          v-close-popup
        ) Close
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import InstrumentMixer from './InstrumentMixer'

export default {
  components: { InstrumentMixer },
  data () {
    return {
      instrumentsDialog: false
    }
  },
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
  methods: {
    ...mapMutations({
      toggleDialog: 'TOGGLE_DIALOG'
    })
  }
}
</script>
