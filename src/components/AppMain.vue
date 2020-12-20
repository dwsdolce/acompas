<template lang="pug">
  .text-grey-1.full-width.q-pa-sm.column.content-center
    .col-2.col-md-3.full-width.flex.content-center
      q-resize-observer(@resize="onResize")
      draw-dots(v-if="visualizationMode === 'dots'")
      draw-counter(v-if="visualizationMode === 'counter'")
    .col-10.col-md-9.container
      .row.text-center.justify-center.no-wrap
        .col-6.col-md-5
          .row.justify-center.q-mb-md
            select-palo
          .row.justify-center.q-mb-md
            select-start-beat
          .row.justify-center.q-mb-md
            select-pre-count
          .row.justify-center
            rythm-options
        .col-2(v-if="$q.screen.gt.lg").flex.justify-center.content-end
          play
        .col-6.col-md-5
          select-tempo.q-mb-md
          .row.justify-center.q-mb-md
            .col.col-lg-4.col-xl-2
              select-instruments
            .col.col-lg-4.col-xl-2
              select-visualization
          .row.justify-center
            .col.col-lg-4.col-xl-2(v-if="$q.screen.lt.lg || $q.screen.lg").flex.justify-center.content-end
              play
            .col.col-lg-4.col-xl-2
              reset
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { Dialog } from 'quasar'
import Play from './Play'
import SelectTempo from './SelectTempo'
import RythmOptions from './RythmOptions'
import SelectPalo from './SelectPalo'
import SelectPreCount from './SelectPreCount'
import SelectStartBeat from './SelectStartBeat'
import SelectInstruments from './SelectInstruments'
import DrawDots from './DrawDots'
import DrawCounter from './DrawCounter'
import SelectVisualization from './SelectVisualization'
import Reset from './Reset'
import { isSupported, initMetronome } from '../plugins/metronome'

export default {
  components: {
    Play,
    SelectTempo,
    RythmOptions,
    SelectPalo,
    SelectPreCount,
    SelectStartBeat,
    SelectInstruments,
    DrawDots,
    DrawCounter,
    SelectVisualization,
    Reset
  },
  computed: {
    ...mapState({
      isPlaying: state => state.isPlaying,
      visualizationMode: state => state.selectedVisualizationMode,
      visualizationSize: state => state.visualizationSize
    })
  },
  mounted () {
    if (!isSupported) this.showDialog()
    document.addEventListener('keypress', event => {
      if (event.which === 32) {
        this.playStop()
      }
    })
    initMetronome(this.$store)
  },
  methods: {
    ...mapActions([
      'playStop'
    ]),
    ...mapMutations({
      getVisualizationSize: 'GET_VISUALIZATION_SIZE'
    }),
    onResize (size) {
      this.getVisualizationSize(size)
    },
    showDialog () {
      Dialog.create({
        title: 'Update your browser!',
        message: 'Your browser doesn\'t support one or more technologies used by this app. Please come back with another one or another version of this one.',
        buttons: [
          {
            label: 'Unable to close',
            preventClose: true,
            handler () {}
          }
        ],
        noBackdropDismiss: true,
        noEscDismiss: true
      })
    }
  }
}
</script>
