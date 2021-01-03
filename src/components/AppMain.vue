<template lang="pug">
q-page.bg-grey-10.column.justify-around.text-grey-1.q-pa-sm
  q-resize-observer(@resize="onResize")
  .column.justify-between
    .col-2(ref="visualization").q-mb-xs-sm.q-mb-md-lg.q-mb-lg-xl.q-pb-xs-sm.q-pb-md-lg.q-pb-lg-xl
      draw-dots(v-if="visualizationMode === 'dots'")
      draw-counter(v-if="visualizationMode === 'counter'")
      draw-clock(v-if="visualizationMode === 'clock'")
    .col-10
      .row.text-center.justify-center.no-wrap
        .col-6.col-md-5.column.justify-between
          .row.justify-center
            select-palo.q-mb-xs
          .row.justify-center
            select-start-beat.q-mb-xs
          .row.justify-center
            select-pre-count.q-mb-xs
          .row.justify-center
            rythm-options
        .col-2(v-if="$q.screen.gt.lg").flex.justify-center.content-end
          play
        .col-6.col-md-5.column.justify-between
          select-tempo.q-mb-xs
          .row.justify-center
            .col.col-lg-4.col-xl-2
              select-instruments.q-mb-xs
            .col.col-lg-4.col-xl-2
              select-visualization.q-mb-xs
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
import DrawClock from './DrawClock'
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
    DrawClock,
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
    isSupported().then(() => {
    }).catch(() => {
      this.showDialog()
    })
    document.addEventListener('keypress', event => {
      if (event.which === 32) {
        this.playStop()
      }
    })
    this.resize(this.visualizationSize)
    initMetronome(this.$store)
  },
  watch: {
    visualizationSize (size) {
      this.resize(size)
    }
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
    resize (size) {
      this.$refs.visualization.style.marginBottom = size.height / 12
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
