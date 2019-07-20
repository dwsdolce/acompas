<template lang="pug">
  .text-grey-1.full-width.q-pa-sm
    div(:style="parentRect")
      q-resize-observer(@resize="onResize")
      //- draw-bars(v-if="visualizationMode === 'dots'")
      draw-new-bars(v-if="visualizationMode === 'dots'")
      draw-counter(v-if="visualizationMode === 'counter'")
    div
      .row.text-center.no-wrap
        .col-6.col-lg-4
          .column
            select-palo.q-mb-md
            select-instruments.q-mb-md
            toggle-improvise.q-mb-md
            toggle-humanize
        .col-lg-4(v-if="visualizationSize.width > breakpoint.sm").column.justify-end
          .item-center
            play
        .col-6.col-lg-4
          .column
            select-tempo.q-mb-md
            .row.text-center.q-mt-md
              select-visualization.col
              .col(v-if="visualizationSize.width <= breakpoint.sm")
                play
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Dialog } from 'quasar'
import { isSupported } from '../plugins/metronome'
import Play from './Play'
import SelectTempo from './SelectTempo'
import SelectPalo from './SelectPalo'
import SelectInstruments from './SelectInstruments'
import ToggleImprovise from './ToggleImprovise'
import ToggleHumanize from './ToggleHumanize'
import DrawBars from './DrawBars'
import DrawNewBars from './DrawNewBars'
import DrawCounter from './DrawCounter'
import SelectVisualization from './SelectVisualization'

export default {
  components: {
    Play,
    SelectTempo,
    SelectPalo,
    SelectInstruments,
    ToggleImprovise,
    ToggleHumanize,
    DrawBars,
    DrawNewBars,
    DrawCounter,
    SelectVisualization
  },
  data () {
    return {
      parentRect: {
        width: '100%'
      }
    }
  },
  computed: {
    ...mapState({
      visualizationMode: state => state.selectedVisualizationMode,
      visualizationSize: state => state.visualizationSize,
      breakpoint: state => state.breakpoint
    })
  },
  mounted () {
    if (!isSupported) this.showDialog()
  },
  methods: {
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
