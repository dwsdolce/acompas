<template lang="pug">
  .text-grey-1.full-width.q-pa-sm
    .full-width
      q-resize-observer(@resize="onResize")
      draw-dots(v-if="visualizationMode === 'dots'")
      draw-counter(v-if="visualizationMode === 'counter'")
    div
      .row.text-center.no-wrap
        .col-6
          .column
            select-palo.q-mb-md
            select-pre-count.q-mb-md
            select-start-beat.q-mb-md
            toggle-improvise.q-mb-md
            toggle-humanize.q-mb-md
        .col-6
          .column
            select-tempo.q-mb-md
            select-instruments.q-mb-md
            .row.text-center.q-mt-md
              .col
                .item-center
                  select-visualization.col
              .col(v-if="visualizationSize.width <= breakpoint.sm")
                .item-center
                  play
      .row.text-center.no-wrap
        .col-12(v-if="visualizationSize.width > breakpoint.sm").column.justify-end
          .item-center
            play
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { Dialog } from 'quasar'
import StartAudioContext from 'startaudiocontext'
import Play from './Play'
import SelectTempo from './SelectTempo'
import SelectPalo from './SelectPalo'
import SelectPreCount from './SelectPreCount'
import SelectStartBeat from './SelectStartBeat'
import SelectInstruments from './SelectInstruments'
import ToggleImprovise from './ToggleImprovise'
import ToggleHumanize from './ToggleHumanize'
import DrawDots from './DrawDots'
import DrawCounter from './DrawCounter'
import SelectVisualization from './SelectVisualization'
import { isSupported, getContext, initMetronome, metronomeData } from '../plugins/metronome'

export default {
  components: {
    Play,
    SelectTempo,
    SelectPalo,
    SelectPreCount,
    SelectStartBeat,
    SelectInstruments,
    ToggleImprovise,
    ToggleHumanize,
    DrawDots,
    DrawCounter,
    SelectVisualization
  },
  data () {
    return {
      audioContextState: null
    }
  },
  computed: {
    ...mapState({
      isPlaying: state => state.isPlaying,
      visualizationMode: state => state.selectedVisualizationMode,
      visualizationSize: state => state.visualizationSize,
      breakpoint: state => state.breakpoint
    })
  },
  mounted () {
    if (!isSupported) this.showDialog()
    document.addEventListener('keypress', event => {
      if (event.which === 32) {
        this.playStop()
      }
    })
    StartAudioContext(getContext, '#playBtn').then(async () => {
      this.audioContextState = await initMetronome(this.$store)
      if (this.audioContextState === 'running') this.startAudioContext()
      // "export" metronomeData as a window object to make it available for testing
      // See test/cypress/integration/home/metronomePlugin.spec.js
      window.metronomeData = metronomeData
    })
  },
  methods: {
    ...mapActions([
      'startAudioContext',
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

<style lang="stylus">
.caption
  color: $primary
  text-transform: uppercase
  font-weight: bold
  font-size: 14px
body.screen--xs
 .caption
    margin-bottom: 4px
    font-size: 13px
  .q-mb-md
    margin-bottom: 6px
</style>
