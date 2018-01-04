<template lang="pug">
    .layout-padding.horizontal.text-grey-1.full-height
        q-window-resize-observable(@resize="onResize")
        .row.no-wrap.justify-center
            draw-bars(v-if="visualizationMode === 'dots'")
            draw-counter(v-if="visualizationMode === 'counter'")
        .row.justify-between.content-center.text-center.no-wrap
            .col-6.col-lg-4.p
                .row.content-stretch
                    .col-xs-12
                        select-palo
                        select-instruments
                    .col-xs-12
                        toggle-improvise
                        toggle-humanize
            .col.p.gt-md(v-if="windowSize.width > 991")
                .column.content-center.text-center.full-height.justify-end
                    .item-center
                        play
            .col-6.col-lg-4.p
                .row.column.content-stretch
                    select-tempo
                    .row.content-center.text-center
                        select-visualization.col.mr
                        .lt-lg(v-if="windowSize.width <= 991").col
                            play
</template>

<script>
    import { mapState } from 'vuex'
    import { QWindowResizeObservable } from 'quasar'
    import Play from '@components/Play'
    import SelectTempo from '@components/SelectTempo'
    import SelectPalo from '@components/SelectPalo'
    import SelectInstruments from '@components/SelectInstruments'
    import ToggleImprovise from '@components/ToggleImprovise'
    import ToggleHumanize from '@components/ToggleHumanize'
    import DrawBars from '@components/DrawBars'
    import DrawCounter from '@components/DrawCounter'
    import SelectVisualization from '@components/SelectVisualization'

    export default {
        components: {
            QWindowResizeObservable,
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
                windowSize: {}
            }
        },
        computed: {
            ...mapState({
                visualizationMode: state => state.selectedVisualizationMode
            })
        },
        methods: {
            onResize (size) {
                this.windowSize = size
            }
        }
    }
</script>
