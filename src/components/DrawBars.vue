<template lang="pug">
    .full-width
        q-resize-observable(@resize="onResize")
        canvas#canvas(ref="canvas")
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import { QResizeObservable } from 'quasar'

    export default {
        components: { QResizeObservable },
        computed: {
            ...mapState({
                visualizationMode: state => state.selectedVisualizationMode
            })
        },
        mounted () {
            this.getCanvasEl(this.$refs.canvas)
        },
        methods: {
            ...mapMutations({
                getCanvasEl: 'GET_CANVAS_EL',
                getVisualizationSize: 'GET_VISUALIZATION_SIZE'
            }),
            onResize (size) {
                this.getVisualizationSize(size)
            }
        }
    }
</script>
