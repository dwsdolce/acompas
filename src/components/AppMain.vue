<template lang="pug">
    .layout-padding.horizontal.text-grey-1.full-height
        .row.no-wrap.justify-center(:style="parentRect")
            q-resize-observable(@resize="onResize")
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
            .col.p(v-if="visualizationSize.width > breakpoint.sm")
                .column.content-center.text-center.full-height.justify-end
                    .item-center
                        play
            .col-6.col-lg-4.p
                .row.column.content-stretch
                    select-tempo
                    .row.content-center.text-center
                        select-visualization.col.mr
                        .col(v-if="visualizationSize.width <= breakpoint.sm")
                            play
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import { QResizeObservable, Dialog } from 'quasar'
    import { isSupported } from '@plugins/metronome'
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
            QResizeObservable,
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
