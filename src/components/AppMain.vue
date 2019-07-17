<template lang="pug">
  .text-grey-1.full-height.full-width
    .row.no-wrap.justify-center.full-width(:style="parentRect")
      q-resize-observer(@resize="onResize")
      draw-bars(v-if="visualizationMode === 'dots'")
      draw-counter(v-if="visualizationMode === 'counter'")
    .row.justify-between.content-center.text-center.no-wrap.q-mb-sm
      .col-6.col-lg-4
        .column.content-stretch
            select-palo
            select-instruments
            toggle-improvise
            toggle-humanize
      .col-lg-4(v-if="visualizationSize.width > breakpoint.sm").column.justify-end
        .item-center
          play
      .col-6.col-lg-4
        .column.content-stretch
          select-tempo
          .row.content-center.text-center(style="margin-top: 12px")
            select-visualization.col.mr
            .col(v-if="visualizationSize.width <= breakpoint.sm")
              play
    //- .row(v-if="visualizationSize.width > breakpoint.sm")
    //-   .col
    //-     .column.content-center.text-center.full-height.justify-end
    //-       .item-center
    //-         play

</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { QResizeObserver, Dialog } from 'quasar'
import { isSupported } from '../plugins/metronome'
import Play from './Play'
import SelectTempo from './SelectTempo'
import SelectPalo from './SelectPalo'
import SelectInstruments from './SelectInstruments'
import ToggleImprovise from './ToggleImprovise'
import ToggleHumanize from './ToggleHumanize'
import DrawBars from './DrawBars'
import DrawCounter from './DrawCounter'
import SelectVisualization from './SelectVisualization'

export default {
  components: {
    QResizeObserver,
    Play,
    SelectTempo,
    SelectPalo,
    SelectInstruments,
    ToggleImprovise,
    ToggleHumanize,
    DrawBars,
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
